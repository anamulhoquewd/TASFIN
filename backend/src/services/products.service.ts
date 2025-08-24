import s3 from "@/config/s3";
import { schemaValidationError } from "@/error";
import Category from "@/models/categorise.model";
import Product from "@/models/products.model";
import { uploadAvatar } from "@/utils";
import pagination from "@/utils/pagination";
import {
  avatarSchemaZ,
  CategoryUpdateInput,
  categoryUpdateZ,
  idSchemaZ,
  ProductCreateInput,
  productSchemaZ,
} from "@/validations/zod";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import z from "zod";

export type UpdateProductInput = {
  productId: string;
  data: any; // validated update data (FormData parsed)
  mainImages?: File[]; // new main images to add
  variantImages?: Record<number, File[]>; // new images for specific variants
  deleteImageUrls?: string[]; // URLs of main images to delete
  deleteVariantImageUrls?: Record<number, string[]>; // variant index → URLs to delete
};

export const register = async ({
  body,
  folder,
}: {
  body: any; // ProductCreateInput + { images: File[], variants: [{ images: File[] }] }
  folder: string;
}) => {
  let uploadedRootUrls: string[] = [];
  let uploadedVariantUrls: Record<number, string[]> = {}; // { variantIndex: [urls] }

  // Step 1: validate fields (skip file validation here)
  const validData = productSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  // Check if category already exists
  const existingProduct = await Product.findOne({
    slug: validData.data.slug,
  });

  if (existingProduct) {
    return {
      error: {
        message: "Sorry! This product already exists.",
        fields: [
          {
            name: "slug",
            message: "Slug must be unique",
          },
        ],
      },
    };
  }

  try {
    // -------------------------------
    // Step 2: Upload Root Images
    // -------------------------------
    const rootUpload = await uploadMultipleFiles({
      body: { images: validData.data.images || [] },
      folder: `${folder}/root`,
      filenames: (validData.data.images || []).map(
        (f: File, i: number) => `${Date.now()}-root-${i}-${f.name}`
      ),
    });

    if (rootUpload.error) throw new Error(rootUpload?.error?.message);
    if (rootUpload.serverError)
      throw new Error(rootUpload?.serverError?.message);

    uploadedRootUrls = rootUpload?.success?.data ?? [];

    const imageObjects = uploadedRootUrls.map((url) => ({
      alt: validData.data.title || "product image",
      url,
    }));

    // -------------------------------
    // Step 3: Upload Variant Images
    // -------------------------------
    const variantsWithUrls = await Promise.all(
      (validData.data.variants || []).map(
        async (variant: any, vIdx: number) => {
          let variantUrls: string[] = [];

          if (variant.images && variant.images.length > 0) {
            const variantUpload = await uploadMultipleFiles({
              body: { images: variant.images },
              folder: `${folder}/variants/${vIdx}`,
              filenames: variant.images.map(
                (f: File, i: number) =>
                  `${Date.now()}-variant-${vIdx}-${i}-${f.name}`
              ),
            });

            if (variantUpload.error)
              throw new Error(variantUpload?.error?.message);
            if (variantUpload.serverError)
              throw new Error(variantUpload?.serverError?.message);

            variantUrls = variantUpload?.success?.data ?? [];
            uploadedVariantUrls[vIdx] = variantUrls;
          }

          return {
            ...variant,
            images: variantUrls.map((url) => ({
              alt: `${variant.color}-${variant.size}`,
              url,
            })),
          };
        }
      )
    );

    // -------------------------------
    // Step 4: Save in DB
    // -------------------------------
    const product = new Product({
      ...validData.data,
      images: imageObjects,
      variants: variantsWithUrls,
    });

    const docs = await product.save();

    return {
      success: {
        success: true,
        message: "Product created successfully",
        data: docs,
      },
    };
  } catch (error: any) {
    console.error("Error in register product:", error);
    // Rollback root images
    if (uploadedRootUrls.length > 0) {
      await Promise.all(uploadedRootUrls.map((url) => deleteFromS3(url)));
    }
    // Rollback variant images
    for (const vIdx in uploadedVariantUrls) {
      await Promise.all(
        uploadedVariantUrls[vIdx].map((url) => deleteFromS3(url))
      );
    }

    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const updateProduct = async ({
  productId,
  data,
  mainImages = [],
  variantImages = {},
  deleteImageUrls = [],
  deleteVariantImageUrls = {},
}: UpdateProductInput) => {
  let uploadedMainUrls: string[] = [];
  let uploadedVariantUrls: Record<number, string[]> = {};

  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Step 1: Fetch existing product
    const product = await Product.findById(productId);
    if (!product) {
      return {
        error: {
          message: `Product not found with provided ID!`,
        },
      };
    }

    // Step 2: Handle main images
    // 2a: Delete images from S3 and from product
    if (deleteImageUrls.length > 0) {
      await Promise.all(deleteImageUrls.map((url) => deleteFromS3(url)));
      product.images = product.images.filter(
        (img) => !deleteImageUrls.includes(img.url)
      );
    }

    // 2b: Upload new main images
    if (mainImages.length > 0) {
      const mainFilenames = mainImages.map(
        (f, idx) => `${Date.now()}-${idx}-${f.name}`
      );
      const uploadResult = await uploadMultipleFiles({
        body: { images: mainImages },
        folder: "products",
        filenames: mainFilenames,
      });

      if (!uploadResult.success) {
        throw new Error(
          uploadResult.error?.message || "Failed to upload main images"
        );
      }

      uploadedMainUrls = uploadResult.success?.data || [];
      const newImageObjects = uploadedMainUrls.map((url) => ({
        alt: data.title || product.title,
        url,
      }));
      product.images.push(...newImageObjects);
    }

    // Step 3: Handle variants
    if (data.variants && Array.isArray(data.variants)) {
      data.variants.forEach(async (variantUpdate: any, idx: number) => {
        let existingVariant = product.variants[idx];

        if (existingVariant) {
          // Update existing variant
          Object.assign(existingVariant, {
            ...variantUpdate,
            // keep images if not explicitly replacing
            images: existingVariant.images || [],
          });

          // Delete variant images
          if (deleteVariantImageUrls[idx]?.length) {
            existingVariant.images = existingVariant.images?.filter(
              (img: any) => !deleteVariantImageUrls[idx].includes(img.url)
            );
            await Promise.all(
              deleteVariantImageUrls[idx].map((url) => deleteFromS3(url))
            );
          }

          // Add new variant images
          if (variantImages[idx]?.length) {
            const filenames = variantImages[idx].map(
              (f, i) => `${Date.now()}-${idx}-${i}-${f.name}`
            );
            const uploadRes = await uploadMultipleFiles({
              body: { images: variantImages[idx] },
              folder: "products/variants",
              filenames,
            });
            if (!uploadRes.success)
              throw new Error(
                uploadRes.error?.message || "Failed to upload variant images"
              );
            uploadedVariantUrls[idx] = uploadRes.success?.data || [];

            const newVariantImageObjects = uploadedVariantUrls[idx].map(
              (url) => ({
                url,
                alt: variantUpdate.color || "variant image",
              })
            );
            existingVariant.images?.push(...newVariantImageObjects);
          }
        } else {
          // New variant
          const newVariant = { ...variantUpdate, images: [] };

          // Upload variant images if provided
          if (variantImages[idx]?.length) {
            const filenames = variantImages[idx].map(
              (f, i) => `${Date.now()}-${idx}-${i}-${f.name}`
            );
            const uploadRes = await uploadMultipleFiles({
              body: { images: variantImages[idx] },
              folder: "products/variants",
              filenames,
            });
            if (!uploadRes.success)
              throw new Error(
                uploadRes.error?.message || "Failed to upload variant images"
              );

            const newVariantImageObjects =
              uploadRes.success?.data.map((url) => ({
                url,
                alt: variantUpdate.color || "variant image",
              })) || [];
            newVariant.images.push(...newVariantImageObjects);
          }

          product.variants.push(newVariant);
        }
      });
    }

    // Step 4: Update other info
    const updatableFields = [
      "title",
      "description",
      "categories",
      "fabric",
      "valueAddition",
      "cutFit",
      "collarNeck",
      "sleeve",
      "length",
      "washCare",
      "sideCut",
      "isFeatured",
      "isActive",
      "tags",
    ];

    updatableFields.forEach((key) => {
      if (key in data) (product as any)[key] = data[key];
    });

    // Optional: slug update
    // Decide if you allow slug to change; usually better to keep it immutable for SEO
    if (data.slug) product.slug = data.slug;

    // Step 5: Save
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Update successful",
        data: updated,
      },
    };
  } catch (error: any) {
    // Rollback uploaded files if needed
    if (uploadedMainUrls.length)
      await Promise.all(uploadedMainUrls.map(deleteFromS3));
    Object.values(uploadedVariantUrls).flat().forEach(deleteFromS3);

    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const getProducts = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  search: string;

  isFeatured: string;
  isActive: string;
}) => {
  // Safe Parse for better error handling
  const validData = z
    .object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(10),
      sortBy: z
        .enum(["createdAt", "updatedAt", "title", "slug"])
        .default("createdAt"),
      sortType: z.enum(["asc", "desc"]).optional().default("asc"),
      search: z.string().optional(),
      isFeatured: z
        .string()
        .optional()
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : undefined
        ),
      isActive: z
        .string()
        .optional()
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : undefined
        ),
    })
    .safeParse(queryParams);

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  const { page, limit, sortBy, sortType, search, isFeatured, isActive } =
    validData.data;

  try {
    // Build query
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }
    if (typeof isFeatured === "boolean") query.isFeatured = isFeatured;
    if (typeof isActive === "boolean") query.isActive = isActive;

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "title", "slug"].includes(
      sortBy
    )
      ? sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch products
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      Product.countDocuments(query),
    ]);

    // Pagination
    const createPagination = pagination({
      page: queryParams.page,
      limit: queryParams.limit,
      total,
    });

    return {
      success: {
        success: true,
        message: "Products fetched successfully!",
        data: products,
        pagination: createPagination,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const getProduct = async (productId: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if product exists
    const product = await Product.findById(idValidation.data._id);

    if (!product) {
      return {
        error: {
          message: `Product not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Product fetched successfully!`,
        data: product,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

// export const updateProduct = async ({
//   _id,
//   body,
// }: {
//   _id: string;
//   body: CategoryUpdateInput;
// }) => {
//   // Validate ID
//   const idValidation = idSchemaZ.safeParse({ _id });
//   if (!idValidation.success) {
//     return { error: schemaValidationError(idValidation.error, "Invalid ID") };
//   }

//   // Validation without NID for update
//   const validData = categoryUpdateZ.safeParse(body);

//   if (!validData.success) {
//     return {
//       error: schemaValidationError(validData.error, "Invalid request body"),
//     };
//   }

//   try {
//     // Check if category exists
//     const category = await Category.findById(idValidation.data._id);

//     if (!category) {
//       return {
//         error: {
//           message: `Category not found with provided ID!`,
//         },
//       };
//     }

//     // Merge only allowed fields into category
//     Object.assign(category, validData.data);

//     const docs = await category.save();

//     return {
//       success: {
//         success: true,
//         message: "Category updated successfully!",
//         data: docs,
//       },
//     };
//   } catch (error: any) {
//     return {
//       serverError: {
//         success: false,
//         message: error.message,
//         stack: process.env.NODE_ENV === "production" ? null : error.stack,
//       },
//     };
//   }
// };

export const deleteProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const category = await Category.findById(idValidation.data._id);

    if (!category) {
      return {
        error: {
          message: `Admin not found with provided ID!`,
        },
      };
    }

    // Delete admin
    await category.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Category deleted successfully!`,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const uploadMultipleFiles = async ({
  body,
  folder,
  filenames,
}: {
  folder: string;
  filenames: string[];
  body: {
    images: File[] | File;
  };
}) => {
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET_NAME
  ) {
    return {
      error: {
        message:
          "AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY is missing in env variables",
      },
    };
  }

  let images = body.images;

  if (!images) {
    return {
      error: { message: "No file provided" },
    };
  }

  // Convert to array if single file
  if (!Array.isArray(images)) {
    images = [images];
  }

  // Validate with zod (same as single avatar but array)
  const imagesSchema = z.object({
    images: z
      .array(z.file())
      .nonempty({ message: "At least one file is required" }),
  });

  const validData = imagesSchema.safeParse({ images });
  if (!validData.success) {
    console.log("Validation error:", validData.error);
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const uploadPromises = validData.data.images.map((file, index) =>
      uploadAvatar({
        s3,
        file,
        key: `tasfin/${folder}/${
          filenames[index] || `${Date.now()}-${file.name}`
        }`,
        fileType: file.type,
        bucketName: process.env.AWS_BUCKET_NAME!,
      }).then(() => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${
          process.env.AWS_REGION
        }.amazonaws.com/tasfin/${folder}/${
          filenames[index] || `${Date.now()}-${file.name}`
        }`;
      })
    );

    const urls = await Promise.all(uploadPromises);

    return {
      success: {
        success: true,
        message: "Files uploaded successfully",
        data: urls,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const uploadSingleFile = async ({
  filename,
  body,
  folder,
}: {
  filename: string;
  folder: string;
  body: {
    avatar: File;
  };
}) => {
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET_NAME
  ) {
    return {
      error: {
        message:
          "AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY is missing in env variables",
      },
    };
  }

  const file = body.avatar;

  if (!file) {
    return {
      error: { message: "No file provided" },
    };
  }

  const validData = avatarSchemaZ.safeParse({ avatar: file });
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    await uploadAvatar({
      s3,
      file: validData.data.avatar,
      key: `uploads/${folder}/${filename}`,
      fileType: validData.data.avatar.type,
      bucketName: process.env.AWS_BUCKET_NAME,
    });

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${folder}/${filename}`;

    return {
      success: {
        success: true,
        message: "Avatar updated successfully",
        data: url,
      },
    };
  } catch (error: any) {
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const deleteFromS3 = async (fileUrl: string) => {
  const bucket = process.env.AWS_BUCKET_NAME!;

  const key = fileUrl.split(`.amazonaws.com/`)[1];

  if (!key) throw new Error("Invalid S3 file URL");

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    console.log(`Deleted from S3: ${key}`);
  } catch (error) {
    console.error("Failed to delete from S3:", error);
  }
};
