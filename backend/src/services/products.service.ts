import s3 from "@/config/s3";
import { schemaValidationError } from "@/error";
import Product from "@/models/products.model";
import { uploadAvatar } from "@/utils";
import pagination from "@/utils/pagination";
import {
  avatarSchemaZ,
  idSchemaZ,
  objectIdSchemaZ,
  productSchemaZ,
  productVariantUpdateZ,
} from "@/validations/zod";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import z from "zod";

// Register new product
export const register = async ({
  body,
}: {
  body: any; // ProductCreateInput + { images: File[], variants: [{ images: File[] }] }
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
      folder: `products/root/${validData.data.slug || ""}`,
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
              folder: `products/${validData.data.slug || ""}/variants/${vIdx}`,
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

// Update general info (non-images)
export const updateGeneralInfo = async ({
  productId,
  data,
}: {
  productId: string;
  data: any;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }
  // Validate body
  const validData = z
    .object({
      title: z.string().min(1).optional(),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case")
        .optional(),
      description: z
        .object({
          html: z.string().optional(),
          json: z.any().optional(),
        })
        .optional(),
      fabric: z.string().max(100).optional(),
      valueAddition: z.string().max(500).optional(),
      cutFit: z.string().max(100).optional(),
      collarNeck: z.string().max(100).optional(),
      sleeve: z.string().max(100).optional(),
      length: z.string().max(100).optional(),
      washCare: z.string().max(500).optional(),
      sideCut: z.string().max(100).optional(),
      isFeatured: z.boolean().optional(),
      isActive: z.boolean().optional(),
      categories: z.array(objectIdSchemaZ),
      tags: z.array(z.string()).optional(),
    })
    .safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Validate product existence and slug uniqueness
    const product = await Product.findById(idValidation.data._id);
    if (!product) {
      return {
        error: {
          message: `Product not found!`,
        },
      };
    }

    const existingProduct = await Product.findOne({
      slug: validData.data.slug,
      _id: { $ne: product._id }, // exclude current product itself
    });

    if (existingProduct) {
      return {
        error: {
          message: "Sorry! This slug already used.",
          fields: [
            {
              name: "slug",
              message: "Slug must be unique",
            },
          ],
        },
      };
    }

    // Update fields
    updateProductFields(product, validData.data);

    const updated = await product.save();
    return {
      success: {
        success: true,
        message: "Product general info updated successfully!",
        data: updated,
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

// Update product variant info
export const updateVariantInfo = async ({
  productId,
  variantId,
  data,
}: {
  productId: string;
  variantId: string;
  data: any;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  const vIdValidation = idSchemaZ.safeParse({ _id: variantId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }
  // Validate body
  const validData = productVariantUpdateZ.safeParse(data);
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Validate product existence and slug uniqueness
    const product = await Product.findById(idValidation.data._id);
    if (!product) {
      return {
        error: {
          message: "Product not found!",
        },
      };
    }

    const variant = product.variants.find(
      (v) => v._id.toString() === vIdValidation.data._id
    );

    if (!variant) {
      return {
        error: {
          message: "Variant not found!",
        },
      };
    }

    // Update fields
    Object.assign(variant, validData.data);

    const updated = await product.save();
    return {
      success: {
        success: true,
        message: "Product variant info updated successfully!",
        data: updated,
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

// Update main images
export const updateMainImages = async ({
  productId,
  data,
}: {
  productId: string;
  data: { mainImages: File[]; deleteImageUrls: string[] };
}) => {
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      mainImages: z.array(z.file()),
      deleteImageUrls: z.array(z.string()),
    })
    .safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  const uploadedUrls: string[] = [];
  try {
    const product = await Product.findById(idValidation.data._id);
    if (!product) return { error: { message: "Product not found!" } };

    /** 🔹 Delete old images */
    if (validData.data.deleteImageUrls.length) {
      const deleteUrls = validData.data.deleteImageUrls.filter((url) =>
        product.images.some((img: { url: string }) => img.url === url)
      );

      if (deleteUrls.length) {
        await Promise.all(deleteUrls.map((url) => deleteFromS3(url)));
        product.images = product.images.filter(
          (img: { url: string }) => !deleteUrls.includes(img.url)
        );
      }
    }

    /** 🔹 Upload new images */
    if (validData.data.mainImages.length) {
      const filenames = validData.data.mainImages.map(
        (f: File, idx: number) => `${Date.now()}-${idx}-${f.name}`
      );

      const res = await uploadMultipleFiles({
        body: { images: validData.data.mainImages },
        folder: "products", // @TODO: Path thik moto dite hobe.
        filenames,
      });

      if (res.error) throw new Error(res?.error?.message);
      if (res.serverError) throw new Error(res?.serverError?.message);
      if (!res.success) throw new Error("Failed to upload main images");

      const newUrls = res.success?.data || [];
      uploadedUrls.push(...newUrls);

      const existingUrlsSet = new Set(product.images.map((img) => img.url));
      const uniqueNewUrls = newUrls.filter((url) => !existingUrlsSet.has(url));

      product.images.push(
        ...uniqueNewUrls.map((url) => ({ url, alt: product.title }))
      );
    }

    /** 🔹 Save changes */
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Main images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    /** 🔹 Rollback uploaded images */
    if (uploadedUrls.length) {
      await Promise.all(uploadedUrls.map((url) => deleteFromS3(url)));
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

// Update variant images
export const updateVImages = async ({
  productId,
  variantId,
  data,
}: {
  productId: string;
  variantId: string;
  data: { images: File[]; deleteImageUrls: string[] };
}) => {
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  const vIdValidation = idSchemaZ.safeParse({ _id: variantId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      images: z.array(z.file()),
      deleteImageUrls: z.array(z.string()),
    })
    .safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  const uploadedUrls: string[] = [];
  try {
    const product = await Product.findById(idValidation.data._id);
    if (!product) return { error: { message: "Product not found!" } };

    const variantIndex = product.variants.findIndex(
      (v) => v._id.toString() === vIdValidation.data._id
    );
    if (variantIndex === -1) {
      return { error: { message: "Variant not found!" } };
    }
    const variant = product.variants[variantIndex];

    /** 🔹 Delete old images */
    if (validData.data.deleteImageUrls.length) {
      const deleteUrls = validData.data.deleteImageUrls.filter((url) =>
        variant.images?.some((img: { url: string }) => img.url === url)
      );

      if (deleteUrls.length) {
        await Promise.all(deleteUrls.map((url) => deleteFromS3(url)));
        variant.images = (variant.images || []).filter(
          (img: { url: string }) => !deleteUrls.includes(img.url)
        );
      }
    }

    /** 🔹 Upload new images */
    if (validData.data.images?.length) {
      const filenames = validData.data.images.map(
        (f: File, idx: number) => `${Date.now()}-${idx}-${f.name}`
      );

      const res = await uploadMultipleFiles({
        body: { images: validData.data.images },
        folder: `products/variants/${variantIndex}/${product.title}-${variant.color}-${variant.size}`,
        filenames,
      });

      if (res.error) throw new Error(res?.error?.message);
      if (res.serverError) throw new Error(res?.serverError?.message);
      if (!res.success) throw new Error("Failed to upload variant images");

      const newUrls = res.success?.data || [];
      uploadedUrls.push(...newUrls);

      const existingUrls = new Set(
        (variant.images || []).map((img) => img.url)
      );
      const uniqueNewUrls = newUrls.filter((url) => !existingUrls.has(url));

      if (!variant.images) variant.images = [];
      variant.images.push(
        ...uniqueNewUrls.map((url) => ({
          url,
          alt: `${product.title}-${variant.color}-${variant.size}`,
        }))
      );
    }

    /** 🔹 Save product */
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Variant images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    /** 🔹 Rollback uploaded images */
    if (uploadedUrls.length) {
      await Promise.all(uploadedUrls.map((url) => deleteFromS3(url)));
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

// Create new variant
export const createVariant = async ({
  data,
  productId,
}: {
  data: any;
  productId: string;
}) => {
  let uploadedUrls: string[] = [];

  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Step 1: validate fields (skip file validation here)
  const validData = z
    .object({
      size: z.string().min(1),
      color: z.string().min(1),
      stock: z.number().int().min(0, "stock must be >= 0"),
      price: z.number().nonnegative("price must be >= 0"),
      images: z.array(z.file()).optional(),
    })
    .safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  try {
    // Check if product exists
    const product = await Product.findById(idValidation.data._id);

    if (!product) {
      return {
        error: {
          message: `Product not found!`,
        },
      };
    }

    // -------------------------------
    // Step 2: Upload Images
    // -------------------------------
    const uploads = await uploadMultipleFiles({
      body: { images: validData.data.images || [] },
      folder: `products/variants/${product.variants.length}`,
      filenames: (validData.data.images || []).map(
        (f: File, idx: number) => `${Date.now()}-${idx}-${f.name}`
      ),
    });

    if (uploads.error) throw new Error(uploads?.error?.message);
    if (uploads.serverError) throw new Error(uploads?.serverError?.message);

    uploadedUrls = uploads?.success?.data ?? [];

    // -------------------------------
    // Step 3: Build variant & Save in DB
    // -------------------------------
    const { size, color, stock, price } = validData.data;
    const imageObjects = (uploadedUrls || []).map((url) => ({
      url,
      alt: `${color}-${size}`,
    }));

    product.variants.push({
      size,
      color,
      stock,
      price,
      images: imageObjects,
    } as any);

    const docs = await product.save();

    return {
      success: {
        success: true,
        message: "Variant created successfully",
        data: docs,
      },
    };
  } catch (error: any) {
    console.error("Error in register product:", error);
    // Rollback root images
    if (uploadedUrls.length > 0) {
      await Promise.all(uploadedUrls.map((url) => deleteFromS3(url)));
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

// Delete variant
export const deleteVariant = async ({
  productId,
  variantId,
}: {
  productId: string;
  variantId: string;
}) => {
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  const vIdValidation = idSchemaZ.safeParse({ _id: variantId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const product = await Product.findById(idValidation.data._id);

    if (!product) {
      return {
        error: {
          message: "Product not found!",
        },
      };
    }
    const variant = product.variants.find(
      (v) => v._id.toString() === vIdValidation.data._id
    );
    if (!variant) {
      return {
        error: {
          message: "Variant not found!",
        },
      };
    }

    if (variant.images?.length) {
      const existingUrls = variant.images.map(
        (img: { url: string }) => img.url
      );

      if (existingUrls.length) {
        await Promise.all(existingUrls.map((url) => deleteFromS3(url)));
        variant.images = [];
      }
    }

    variant.deleteOne();
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Variant deleted successfully!",
        data: updated,
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

// Get all products
export const getProducts = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  search: string;

  isFeatured: string;
  isActive: string;
  priceRange: { min: number; max: number };
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
      priceRange: z
        .object({
          min: z.number().min(0).optional().default(0),
          max: z.number().min(0).optional().default(10000),
        })
        .optional(),
    })
    .safeParse(queryParams);

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  const { sortBy, search, isFeatured, isActive, priceRange } = validData.data;

  try {
    // Build query
    const query: any = {};
    if (priceRange) {
      query["variants.price"] = {
        $gte: priceRange.min,
        $lte: priceRange.max,
      };
    }
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

// Get product
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
          message: `Product not found!`,
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

// Delete product
export const deleteProduct = async (productId: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const product = await Product.findById(idValidation.data._id);

    if (!product) {
      return {
        error: {
          message: `Product not found!`,
        },
      };
    }

    if (product.images.length) {
      const existingUrls = product.images.map(
        (img: { url: string }) => img.url
      );

      if (existingUrls.length) {
        await Promise.all(existingUrls.map((url) => deleteFromS3(url)));
        product.images = [];
      }
    }

    /** 🔹 Delete variant images */
    for (const variant of product.variants) {
      if (variant.images?.length) {
        const vUrls = variant.images.map((img: { url: string }) => img.url);
        await Promise.all(vUrls.map((url) => deleteFromS3(url)));
        variant.images = [];
      }
    }

    /** 🔹 Delete product from DB */
    await product.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: "Product deleted successfully!",
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

// Upload files
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

// Upload file
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

// Halper functio of deleting images from S3
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

// Halper function
function updateProductFields(product: any, data: any) {
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
    if (key in data) product[key] = data[key];
  });

  // Optional slug
  if (data.slug) product.slug = data.slug;
}
