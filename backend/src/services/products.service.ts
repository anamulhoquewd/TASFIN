import mongoose from "mongoose";
import { schemaValidationError } from "./../error/index.js";
import Product from "./../models/products.model.js";
import pagination from "./../utils/pagination.js";
import {
  mongoIdZ,
  objectIdZ,
  productVariantUpdateZ,
  productZ,
  type TProduct,
  type TVariant,
} from "./../validations/zod.js";
import z from "zod";
import {
  deleteMultipleFiles,
  deleteSingleFile,
  uploadMultipleFiles,
} from "../utils/cloudinary.js";
import type { IProductVariant } from "../interfaces/index.js";

// Register new product
export const register = async ({
  body,
}: {
  body: TProduct & { images: File[]; variants: { images: File[] }[] };
}) => {
  let imageObjects: { url: string; publicId: string }[] = [];
  let varinatImageObjects: { url: string; publicId: string }[] = []; // { variantIndex: [urls] }

  // Step 1: validate fields (skip file validation here)
  const validData = productZ.safeParse(body);

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
    const response = await uploadMultipleFiles(
      validData.data.images,
      "tasfin_products"
    );

    if (response.error) throw new Error(response?.error?.message);
    if (response.serverError) throw new Error(response?.serverError?.message);
    if (!response.success) throw new Error("Failed to upload main images");

    const data = response.success?.data || [];

    imageObjects = data ?? [];

    // -------------------------------
    // Step 3: Upload Variant Images
    // -------------------------------
    const variantsWithImages = await Promise.all(
      (validData.data.variants || []).map(async (variant: TVariant) => {
        if (variant.images && variant.images.length > 0) {
          const response = await uploadMultipleFiles(
            variant.images,
            "tasfin_products"
          );

          if (response.error) throw new Error(response?.error?.message);
          if (response.serverError)
            throw new Error(response?.serverError?.message);

          varinatImageObjects = response?.success?.data;
        }

        return {
          ...variant,
          images: varinatImageObjects.map((image) => ({
            alt: `${variant?.color}-${variant.size}`,
            ...image,
          })),
        };
      })
    );

    // -------------------------------
    // Step 4: Save in DB
    // -------------------------------
    const product = new Product({
      ...validData.data,
      images: imageObjects,
      variants: variantsWithImages,
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
    if (imageObjects.length > 0) {
      await Promise.all(
        imageObjects.map((image) => deleteSingleFile(image.publicId))
      );
    }
    // Rollback variant images
    if (varinatImageObjects.length > 0) {
      await Promise.all(
        varinatImageObjects.map((image) => deleteSingleFile(image.publicId))
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
  const idValidation = mongoIdZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }
  // Validate body
  const validData = z
    .object({
      title: z.string().min(1).optional(),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
      description: z.string().min(1).max(2000).optional(),
      details: {
        fabric: z.string().max(100).optional(),
        keyFeatures: z.array(z.string().min(1).max(1000)).optional(),
        valueAddition: z.string().max(500).optional(),
        cutFit: z.string().max(100).optional(),
        collarNeck: z.string().max(100).optional(),
        sleeve: z.string().max(100).optional(),
        length: z.string().max(100).optional(),
        washCare: z.string().max(500).optional(),
        sideCut: z.string().max(100).optional(),
      },
      isFeatured: z.boolean().optional(),
      isItNew: z.boolean().optional(),
      status: z.boolean().optional(),
      categories: z.array(objectIdZ),
      tags: z.array(z.string().max(50)).optional(),
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
  data: { newImages: File[]; deleteImagePublicId: string[] };
}) => {
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      newImages: z.array(z.file()),
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

    // Delete old images
    if (validData.data.deleteImageUrls.length) {
      const deleteUrls = validData.data.deleteImageUrls.filter((url) =>
        product.images.some((img: { url: string }) => img.url === url)
      );

      if (deleteUrls.length) {
        await Promise.all(deleteUrls.map((url) => deleteSingleFile(url)));
        product.images = product.images.filter(
          (img: { url: string }) => !deleteUrls.includes(img.url)
        );
      }
    }

    // Upload new images
    if (validData.data.images.length) {
      const response = await uploadMultipleFiles(
        validData.data.images,
        "tasfin_products"
      );

      if (response.error) throw new Error(response?.error?.message);
      if (response.serverError) throw new Error(response?.serverError?.message);
      if (!response.success) throw new Error("Failed to upload main images");

      const data = response.success?.data || [];

      const existingUrlsSet = new Set(product.images.map((img) => img.url));
      const uniqueNewImages = data.filter(
        (img) => !existingUrlsSet.has(img.url)
      );
      product.images.push(
        ...uniqueNewImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          alt: product.title,
        }))
      );
    }

    // Save changes
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Main images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    // Rollback uploaded images
    if (uploadedUrls.length) {
      await Promise.all(uploadedUrls.map((url) => deleteSingleFile(url)));
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
  data: { newImages: File[]; deleteImagePublicId: string[] };
}) => {
  const idValidation = idSchemaZ.safeParse({ _id: productId });
  const vIdValidation = idSchemaZ.safeParse({ _id: variantId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      newImages: z.array(z.file()),
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

    // Delete old images
    if (validData.data.deleteImageUrls.length) {
      const deleteUrls = validData.data.deleteImageUrls.filter((url) =>
        variant.images?.some((img: { url: string }) => img.url === url)
      );

      if (deleteUrls.length) {
        await Promise.all(deleteUrls.map((url) => deleteSingleFile(url)));
        variant.images = (variant.images || []).filter(
          (img: { url: string }) => !deleteUrls.includes(img.url)
        );
      }
    }

    // Upload new images
    if (validData.data.images?.length) {
      const filenames = validData.data.images.map(
        (f: File, idx: number) => `${Date.now()}-${idx}-${f.name}`
      );

      const response = await uploadMultipleFiles(
        validData.data.images,
        "tasfin_products"
      );

      if (response.error) throw new Error(response?.error?.message);
      if (response.serverError) throw new Error(response?.serverError?.message);
      if (!response.success) throw new Error("Failed to upload main images");

      const data = response.success?.data || [];

      const existingUrlsSet = new Set(product.images.map((img) => img.url));
      const uniqueNewImages = data.filter(
        (img) => !existingUrlsSet.has(img.url)
      );
      product.images.push(
        ...uniqueNewImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          alt: product.title,
        }))
      );

      if (!variant.images) variant.images = [];
      variant.images.push(
        ...uniqueNewImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
          alt: product.title,
        }))
      );
    }

    // Save product
    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Variant images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
    // Rollback uploaded images
    if (uploadedUrls.length) {
      await Promise.all(uploadedUrls.map((url) => deleteSingleFile(url)));
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
  let imageObjects: { url: string; publicId: string }[] = [];

  const idValidation = idSchemaZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Step 1: validate fields (skip file validation here)
  const validData = z
    .object({
      sku: z.string(),
      size: z.string(),
      color: z.string(),
      isCustom: z.boolean().default(false),
      stock: z.number().int().min(0, "stock must be >= 0"),
      price: z.number().nonnegative("price must be >= 0"),
      images: z.array(z.file()).optional().default([]),
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
    if (validData.data.images.length > 0) {
      const response = await uploadMultipleFiles(
        validData.data.images,
        "tasfin_products"
      );

      if (response.error) throw new Error(response?.error?.message);
      if (response.serverError) throw new Error(response?.serverError?.message);
      if (!response.success) throw new Error("Failed to upload main images");

      const data = response.success?.data || [];

      const existingUrlsSet = new Set(product.images.map((img) => img.url));
      const uniqueNewImages = data.filter(
        (img) => !existingUrlsSet.has(img.url)
      );

      imageObjects = uniqueNewImages ?? [];
    }

    // -------------------------------
    // Step 3: Build variant & Save in DB
    // -------------------------------
    const { size, stock, price, sku, isCustom, color } = validData.data;

    product.variants.push({
      size,
      stock,
      price,
      images: imageObjects,
      sku,
      isCustom,
      color,
    } as IProductVariant);

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
    if (imageObjects.length > 0) {
      await Promise.all(
        imageObjects.map((imageObject) =>
          deleteSingleFile(imageObject.publicId)
        )
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
      return { error: { message: "Product not found!" } };
    }

    const variant = product.variants.find(
      (v) => v._id.toString() === vIdValidation.data._id
    );

    if (!variant) {
      return { error: { message: "Variant not found!" } };
    }

    // Delete variant images from Cloudinary
    if (variant.images?.length) {
      const publicIds = variant.images.map(
        (img: { publicId: string }) => img.publicId
      );

      if (publicIds.length) {
        await deleteMultipleFiles(publicIds);
      }
    }

    // Remove variant from product
    product.variants = product.variants.filter(
      (v) => v._id.toString() !== vIdValidation.data._id
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
  isItNew: string;
  status: string;
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

// Get product by ID
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
        await Promise.all(existingUrls.map((url) => deleteSingleFile(url)));
        product.images = [];
      }
    }

    // Delete variant images
    for (const variant of product.variants) {
      if (variant.images?.length) {
        const vUrls = variant.images.map((img: { url: string }) => img.url);
        await Promise.all(vUrls.map((url) => deleteSingleFile(url)));
        variant.images = [];
      }
    }

    // Delete product from DB
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
    "keyFeatures",
  ];

  updatableFields.forEach((key) => {
    if (key in data) product[key] = data[key];
  });

  // Optional slug
  if (data.slug) product.slug = data.slug;
}
