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

export const getProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if category exists
    const category = await Category.findById(idValidation.data._id);

    if (!category) {
      return {
        error: {
          message: `Category not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Category fetched successfully!`,
        data: category,
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

export const updateProduct = async ({
  _id,
  body,
}: {
  _id: string;
  body: CategoryUpdateInput;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Validation without NID for update
  const validData = categoryUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if category exists
    const category = await Category.findById(idValidation.data._id);

    if (!category) {
      return {
        error: {
          message: `Category not found with provided ID!`,
        },
      };
    }

    // Merge only allowed fields into category
    Object.assign(category, validData.data);

    const docs = await category.save();

    return {
      success: {
        success: true,
        message: "Category updated successfully!",
        data: docs,
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
  console.log("Valid data:", validData);

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
      },
    };
  }
};

export const deleteFromS3 = async (fileUrl: string) => {
  try {
    const bucket = process.env.AWS_BUCKET_NAME!;

    const key = fileUrl.split(`.amazonaws.com/`)[1];

    if (!key) throw new Error("Invalid S3 file URL");

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
