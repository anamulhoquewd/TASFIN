import mongoose from "mongoose";
import z from "zod";
import { deleteMultipleFiles, uploadMultipleFiles } from "../utils/r2-utils.js";
import { schemaValidationError } from "./../error/index.js";
import Product from "./../models/products.model.js";
import pagination from "./../utils/pagination.js";
import {
  idSchemaZ,
  keyValueArrayToRecord,
  keyValueSchemaZ,
  objectIdSchemaZ,
  type ProductCreateInput,
  productSchemaZ,
  productVariantSchemaZ,
  productVariantUpdateZ,
  updateProductImagesZ,
} from "./../validations/zod.js";

function toPlainImage(image: {
  url: string;
  key: string;
  alt?: string;
  position?: number;
  toObject?: () => Record<string, unknown>;
}) {
  const plain =
    typeof image.toObject === "function"
      ? (image.toObject() as {
          url: string;
          key: string;
          alt?: string;
        })
      : image;

  return {
    url: plain.url,
    key: plain.key,
    alt: plain.alt ?? "",
  };
}

function orderImages<
  T extends { url: string; key: string; alt?: string; position?: number },
>(images: T[], reorderedUrls: string[]) {
  const orderSet = new Set(reorderedUrls);
  const remaining = images.filter((image) => !orderSet.has(image.url));

  return reorderedUrls
    .map((url) => images.find((image) => image.url === url))
    .filter((image): image is T => Boolean(image))
    .concat(remaining)
    .map((image, index) => ({
      ...toPlainImage(image),
      position: index + 1,
    }));
}

// Register new product
export const register = async ({
  body,
}: {
  body: ProductCreateInput & {
    images: { file: File; position: number; alt: string }[];
    variants: { images: { file: File; position: number; alt: string }[] }[];
  };
}) => {
  let rootImages: {
    url: string;
    alt: string;
    position: number;
    key: string;
  }[] = [];
  let variantImages: Record<number, typeof rootImages> = {}; // { variantIndex: [urls] }

  // Step 1: validate fields (skip file validation here)
  const validData = productSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  // Step 2: slug uniqueness (friendly check; unique index is the real guarantee)
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
    // Step 3: Upload Root Images
    // -------------------------------
    const rootUpload = await uploadMultipleFiles(
      validData.data.images,
      `products/root/${validData.data.slug}`,
    );

    if (rootUpload.error) throw new Error(rootUpload?.error?.message);
    if (rootUpload.serverError)
      throw new Error(rootUpload?.serverError?.message);

    rootImages = rootUpload?.success?.data ?? [];

    const imageObjects = rootImages.map((image) => ({
      ...image,
      alt: image.alt || validData.data.title,
    }));

    // -------------------------------
    // Step 4: Upload Variant Images
    // FIXED: Promise.allSettled so we never lose track of files that
    // finished uploading even if a sibling variant's upload fails —
    // this is what makes rollback in the catch block actually complete.
    // -------------------------------
    const variantResults = await Promise.allSettled(
      validData.data.variants.map(async (variant: any, vIdx: number) => {
        if (!variant.images || variant.images.length === 0) {
          return { ...variant, images: [] };
        }

        const variantUpload = await uploadMultipleFiles(
          variant.images,
          `products/${validData.data.slug}/variants/${variant.sku}`,
        );

        if (variantUpload.error) throw new Error(variantUpload.error.message);
        if (variantUpload.serverError)
          throw new Error(variantUpload.serverError.message);

        const urls = variantUpload.success?.data ?? [];
        variantImages[vIdx] = urls; // recorded regardless of siblings' outcome

        return {
          ...variant,
          images: urls.map((image) => ({ ...image, alt: `${variant.sku}` })),
        };
      }),
    );

    const firstFailure = variantResults.find((r) => r.status === "rejected") as
      | PromiseRejectedResult
      | undefined;

    if (firstFailure) {
      // every fulfilled upload is already in variantImages above,
      // so the catch block below can roll ALL of them back, not just some.
      throw new Error(
        firstFailure.reason?.message ?? "Variant image upload failed",
      );
    }

    const variantsWithUrls = variantResults.map(
      (r) => (r as PromiseFulfilledResult<any>).value,
    );

    // -------------------------------
    // Step 5: Save in DB
    // -------------------------------
    const product = new Product({
      ...validData.data,
      images: imageObjects,
      variants: variantsWithUrls,
    });

    console.log("Valid data: ", validData, imageObjects, variantsWithUrls);

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
    if (rootImages.length > 0) {
      await deleteMultipleFiles(rootImages.map((image) => image.key));
    }
    // Rollback variant images (now guaranteed complete, see Step 4 fix)
    await deleteMultipleFiles(
      Object.values(variantImages)
        .flat()
        .map((image) => image.key),
    );

    // Handle duplicate-key race (two concurrent requests, same slug)
    if (error.code === 11000) {
      return {
        error: {
          message: "Sorry! This product already exists.",
          fields: [{ name: "slug", message: "Slug must be unique" }],
        },
      };
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
export const updateDiscount = async ({
  _id,
  data,
}: {
  _id: string;
  data: any;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }
  // Validate body
  const validData = z
    .object({
      discount: z
        .object({
          discountType: z.enum(["percentage", "fixed"]),
          value: z.number().min(0),
          startAt: z.coerce.date().optional(),
          endAt: z.coerce.date().optional(),
        })
        .optional()
        .refine((d) => !d?.startAt || !d?.endAt || d.startAt < d.endAt, {
          message: "startAt must be before endAt",
        }),
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

    // Update fields
    Object.assign(product, validData.data);

    const updated = await product.save();
    return {
      success: {
        success: true,
        message: "Product discount updated successfully!",
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

// Update general info (non-images)
export const updateGeneralInfo = async ({
  _id,
  data,
}: {
  _id: string;
  data: any;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }
  // Validate body
  const validData = z
    .object({
      title: z.string().min(1, "title is required"),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
      description: z.string().max(1000).optional(),
      keyFeatures: z.array(z.string().min(1)).optional(),

      categories: z
        .array(objectIdSchemaZ)
        .nonempty("At least 1 category is required"),

      specifications: z
        .array(keyValueSchemaZ)
        .optional()
        .default([])
        .transform((arr, ctx) => {
          try {
            return keyValueArrayToRecord(arr);
          } catch (e: any) {
            ctx.addIssue({ code: "custom", message: e.message });
            return z.NEVER;
          }
        }),

      isFeatured: z.boolean().optional().default(false),
      isActive: z.boolean().default(true),
      tags: z.array(z.string().min(1).max(10)).optional(),
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
  _id,
  vId,
  data,
}: {
  _id: string;
  vId: string;
  data: any;
}) => {
  // product id
  const idValidation = idSchemaZ.safeParse({ _id });
  // variant id
  const vIdValidation = idSchemaZ.safeParse({ _id: vId });
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
      (v) => v._id.toString() === vIdValidation.data._id,
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
  _id,
  data,
}: {
  _id: string;
  data: z.input<typeof updateProductImagesZ>;
}) => {
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = updateProductImagesZ.safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  const uploadedImages: { url: string; key: string }[] = [];
  try {
    const product = await Product.findById(idValidation.data._id);
    if (!product) return { error: { message: "Product not found!" } };

    /** Delete old images */
    if (validData.data.deleteImageUrls.length) {
      const imagesToDelete = product.images.filter((img) =>
        validData.data.deleteImageUrls.includes(img.url),
      );

      if (imagesToDelete.length) {
        await deleteMultipleFiles(imagesToDelete.map((img) => img.key));
        product.images = product.images.filter(
          (img) => !validData.data.deleteImageUrls.includes(img.url),
        );
      }
    }

    /** Upload new images */
    if (validData.data.images.length) {
      const res = await uploadMultipleFiles(
        validData.data.images,
        `products/root/${product.slug}`,
      );

      if (res.error) throw new Error(res?.error?.message);
      if (res.serverError) throw new Error(res?.serverError?.message);
      if (!res.success) throw new Error("Failed to upload main images");

      const newImages = res.success?.data || [];
      uploadedImages.push(...newImages);

      const existingImageSet = new Set(product.images.map((img) => img.url));
      const uniqueNewImages = newImages.filter(
        (img) => !existingImageSet.has(img.url),
      );

      product.images.push(
        ...uniqueNewImages.map((img) => ({ ...img, alt: product.title })),
      );
    }

    const reorderedUrls = validData.data.reorderedImageUrls.filter(Boolean);

    if (reorderedUrls.length > 0 || product.images.length > 0) {
      product.images = orderImages(
        product.images,
        reorderedUrls,
      ) as typeof product.images;
    }

    product.markModified("images");
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Main images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    /** Rollback uploaded images */
    if (uploadedImages.length) {
      await deleteMultipleFiles(uploadedImages.map((img) => img.key));
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
  _id,
  vId,
  data,
}: {
  _id: string;
  vId: string;
  data: z.input<typeof updateProductImagesZ>;
}) => {
  // product id
  const idValidation = idSchemaZ.safeParse({ _id });
  // variant id
  const vIdValidation = idSchemaZ.safeParse({ _id: vId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = updateProductImagesZ.safeParse(data);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  const uploadedImages: { key: string; url: string }[] = [];
  try {
    const product = await Product.findById(idValidation.data._id);
    if (!product) return { error: { message: "Product not found!" } };

    const variantIndex = product.variants.findIndex(
      (v) => v._id.toString() === vIdValidation.data._id,
    );
    if (variantIndex === -1) {
      return { error: { message: "Variant not found!" } };
    }
    const variant = product.variants[variantIndex];

    /** Delete old images if needed */
    if (validData.data.deleteImageUrls.length) {
      const imagesToDelete = (variant.images || []).filter((img) =>
        validData.data.deleteImageUrls.includes(img.url),
      );

      if (imagesToDelete.length) {
        await deleteMultipleFiles(imagesToDelete.map((img) => img.key));
        variant.images = (variant.images || []).filter(
          (img) => !validData.data.deleteImageUrls.includes(img.url),
        );
      }
    }

    /** Upload new images */
    if (validData.data.images?.length) {
      const res = await uploadMultipleFiles(
        validData.data.images,
        `products/${product.slug}/variants/${variant.sku}`,
      );

      if (res.error) throw new Error(res?.error?.message);
      if (res.serverError) throw new Error(res?.serverError?.message);
      if (!res.success) throw new Error("Failed to upload variant images");

      const newImages = res.success?.data || [];
      uploadedImages.push(...newImages);

      const existingUrls = new Set(
        (variant.images || []).map((img) => img.url),
      );
      const uniqueNewImages = newImages.filter(
        (img) => !existingUrls.has(img.url),
      );

      if (!variant.images) variant.images = [];
      variant.images.push(
        ...uniqueNewImages.map((img) => ({
          key: img.key,
          url: img.url,
          alt: `${product.title}-${variant.sku}`,
          position: img.position,
        })),
      );
    }

    const reorderedUrls = validData.data.reorderedImageUrls.filter(Boolean);

    if (reorderedUrls.length > 0 || (variant.images || []).length > 0) {
      variant.images = orderImages(
        variant.images || [],
        reorderedUrls,
      ) as typeof variant.images;
    }

    /** Save product */
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Variant images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    /** Rollback uploaded images */
    if (uploadedImages.length) {
      await deleteMultipleFiles(uploadedImages.map((img) => img.url));
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
  _id,
}: {
  data: any;
  _id: string;
}) => {
  let uploadedImages: {
    url: string;
    key: string;
    position: number;
    alt: string;
  }[] = [];

  console.log("Data: ", data);

  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Step 1: validate fields (skip file validation here)
  const validData = productVariantSchemaZ.safeParse(data);

  console.log("Valid data: ", validData.error);

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
    if (validData.data.images.length > 0) {
      const uploads = await uploadMultipleFiles(
        validData.data.images,
        `products/${product.slug}/variants/${validData.data.sku}`,
      );
      if (uploads.error) throw new Error(uploads?.error?.message);
      if (uploads.serverError) throw new Error(uploads?.serverError?.message);

      uploadedImages = uploads?.success?.data ?? [];
    }

    // -------------------------------
    // Step 3: Build variant & Save in DB
    // -------------------------------
    const { sku, stock, price, attributes } = validData.data;
    // const imageObjects = (uploadedImages || []).map((img) => ({
    //   url: img.url,
    //   alt: `products/${validData.data.slug}/variants/${variant.sku}`,
    // }));

    product.variants.push({
      sku,
      attributes,
      stock,
      price,
      images: uploadedImages,
    } as any);

    const docs = product.save();

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
    if (uploadedImages.length > 0) {
      await deleteMultipleFiles(uploadedImages.map((img) => img.key));
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
  _id,
  vId,
}: {
  _id: string;
  vId: string;
}) => {
  const idValidation = idSchemaZ.safeParse({ _id });
  const vIdValidation = idSchemaZ.safeParse({ _id: vId });
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
      (v) => v._id.toString() === vIdValidation.data._id,
    );
    if (!variant) {
      return {
        error: {
          message: "Variant not found!",
        },
      };
    }

    if (variant.images?.length) {
      await deleteMultipleFiles(variant.images.map((img) => img.key));
      variant.images = [];
    }

    product.variants = product.variants.filter(
      (v) => v._id.toString() !== variant._id.toString(),
    );
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
  categories: string[];
}) => {
  // Safe Parse for better error handling
  const validData = z
    .object({
      page: z.number().min(1).default(1),
      limit: z.number().min(1).max(100).default(10),
      sortBy: z.enum(["createdAt", "updatedAt", "title"]).default("createdAt"),
      sortType: z.enum(["asc", "desc"]).optional().default("asc"),
      search: z.string().optional(),
      isFeatured: z
        .string()
        .optional()
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : undefined,
        ),
      isActive: z
        .string()
        .optional()
        .transform((val) =>
          val === "true" ? true : val === "false" ? false : undefined,
        ),
      priceRange: z
        .object({
          min: z.number().min(0).default(0),
          max: z.number().min(0).default(10000),
        })
        .optional(),
      categories: z.array(z.string()).optional(),
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
    if (validData.data.categories && validData.data.categories.length) {
      query.categories = { $in: validData.data.categories };
    }

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

      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }
    if (typeof isFeatured === "boolean") query.isFeatured = isFeatured;
    if (typeof isActive === "boolean") query.isActive = isActive;

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "title"].includes(sortBy)
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

// Get product by ID
export const getProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
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

// Get product by slug
export const getProductBySlug = async (slug: string) => {
  // Validate slug
  const slugValidation = z.string().min(1).max(100).safeParse(slug);
  if (!slugValidation.success) {
    return {
      error: schemaValidationError(slugValidation.error, "Invalid slug"),
    };
  }

  try {
    // Check if product exists
    const product = await Product.findOne({ slug: slugValidation.data });

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
export const deleteProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
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
      await deleteMultipleFiles(product.images.map((img) => img.key));
      product.images = [];
    }

    /** Delete variant images */
    for (const variant of product.variants) {
      if (variant.images?.length) {
        await deleteMultipleFiles(variant.images.map((img) => img.key));

        variant.images = [];
      }
    }

    /** Delete product from DB */
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

// Halper function
function updateProductFields(product: any, data: any) {
  const updatableFields = [
    "title",
    "description",
    "categories",
    "attributes",
    "isFeatured",
    "isActive",
    "tags",
    "keyFeatures",
  ];

  updatableFields.forEach((key) => {
    if (key in data) product[key] = data[key];
  });

  // Optional slug
  if (data.slug) product.slug = data.slug;
}
