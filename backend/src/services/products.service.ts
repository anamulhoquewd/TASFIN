import mongoose from "mongoose";
import z from "zod";
import type { IProductVariant } from "../interfaces/index.js";
import {
  deleteMultipleFiles,
  deleteSingleFile,
  uploadMultipleFiles,
} from "../utils/cloudinary.js";
import { schemaValidationError } from "./../error/index.js";
import Product from "./../models/products.model.js";
import pagination from "./../utils/pagination.js";
import {
  mongoIdZ,
  objectIdZ,
  productFetchQueryZ,
  productVariantUpdateZ,
  productVariantZ,
  productZ,
  type TProduct,
  type TVariant,
} from "./../validations/zod.js";

// Register new product
export const register = async (body: TProduct) => {
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
        let uploadedImages: {
          url: string;
          publicId: string;
          position: number;
        }[] = [];

        if (variant.images?.length) {
          const response = await uploadMultipleFiles(
            variant.images, // { file, position }[]
            "tasfin_v_products"
          );

          if (response?.error) throw new Error(response.error.message);
          if (response?.serverError)
            throw new Error(response.serverError.message);

          uploadedImages = response.success.data;
        }

        return {
          ...variant,
          images: uploadedImages,
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

// update activity status
export const updateActivity = async ({
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

  try {
    const product = await Product.findById(idValidation.data._id);
    if (!product) {
      return {
        error: {
          message: "Product not found!",
        },
      };
    }

    // Update fields
    product.isFeatured = data.isFeatured;
    product.isItNew = data.isItNew;
    product.isCustom = data.isCustom;
    product.status = data.status;

    const updated = await product.save();
    return {
      success: {
        success: true,
        message: "Product activity updated successfully!",
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
      title: z.string().min(1, "title is required"),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
      description: z.string().max(2000).optional(),
      keyFeatures: z.array(z.string().max(1000)).optional(),

      categories: z.array(objectIdZ),
      tags: z.array(z.string().max(50)).optional(),

      details: z.object({
        fabric: z.string().optional(),
        valueAddition: z.string().optional(),
        cutFit: z.string().optional(),
        collarNeck: z.string().optional(),
        sleeve: z.string().optional(),
        length: z.string().optional(),
        washCare: z.string().optional(),
        sideCut: z.string().optional(),
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
  const idValidation = mongoIdZ.safeParse({ _id: productId });
  const vIdValidation = mongoIdZ.safeParse({ _id: variantId });
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
  data: {
    newImages: { file: File; position: number }[];
    deleteImagePublicIds: string[];
    keptImagePublicIds: string[]; // New field
  };
}) => {
  const idValidation = mongoIdZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      newImages: z.array(
        z.object({
          file: z.instanceof(File),
          position: z.number().int().min(0),
        })
      ),
      deleteImagePublicIds: z.array(z.string()),
      keptImagePublicIds: z.array(z.string()), // New
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
    if (validData.data.deleteImagePublicIds.length) {
      const publicIds = validData.data.deleteImagePublicIds.filter((publicId) =>
        product.images.some(
          (image: { publicId: string }) => image.publicId === publicId
        )
      );

      if (publicIds.length) {
        await deleteMultipleFiles(publicIds);
        product.images = product.images.filter(
          (image: { publicId: string }) => !publicIds.includes(image.publicId)
        );
      }
    }

    // Reorder kept images based on frontend order
    const keptPublicIds = validData.data.keptImagePublicIds;
    if (keptPublicIds.length !== product.images.length) {
      return { error: { message: "Mismatch in kept images count" } };
    }

    // Validate all kept IDs exist in remaining images
    const remainingPublicIds = new Set(
      product.images.map((img: { publicId: string }) => img.publicId)
    );
    if (!keptPublicIds.every((id) => remainingPublicIds.has(id))) {
      return { error: { message: "Invalid kept image IDs provided" } };
    }

    // Assign new positions to kept images (0 to m-1 in the order provided)
    product.images.forEach((image: { publicId: string; position: number }) => {
      const newPosition = keptPublicIds.indexOf(image.publicId);
      if (newPosition !== -1) {
        image.position = newPosition;
      }
    });

    // Upload new images (unchanged, but positions will start after kept)
    if (validData.data.newImages.length) {
      const response = await uploadMultipleFiles(
        validData.data.newImages,
        "tasfin_products"
      );

      if (response.error) throw new Error(response?.error?.message);
      if (response.serverError) throw new Error(response?.serverError?.message);
      if (!response.success) throw new Error("Failed to upload main images");

      const data = response.success?.data || [];

      const existingUrlsSet = new Set(product.images.map((image) => image.url));
      const uniqueNewImages = data.filter(
        (image) => !existingUrlsSet.has(image.url)
      );

      const start = product.images.length;

      product.images.push(
        ...uniqueNewImages.map((image) => ({
          url: image.url,
          publicId: image.publicId,
          alt: product.title,
          position: start + image.position, // image.position is relative (from frontend order)
        }))
      );
    }

    product.images.sort((a, b) => a.position - b.position);

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
  data: {
    newImages: { file: File; position: number }[];
    deleteImagePublicIds: string[];
  };
}) => {
  const idValidation = mongoIdZ.safeParse({ _id: productId });
  const vIdValidation = mongoIdZ.safeParse({ _id: variantId });
  if (!idValidation.success || !vIdValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  const validData = z
    .object({
      newImages: z
        .array(
          z.object({
            file: z.instanceof(File),
            position: z.number().int().min(0),
          })
        )
        .nonempty("At least 1 image is required"),
      deleteImagePublicIds: z.array(z.string()),
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
    if (validData.data.deleteImagePublicIds.length) {
      const publicIds = validData.data.deleteImagePublicIds.filter((publicId) =>
        variant.images?.some(
          (image: { publicId: string }) => image.publicId === publicId
        )
      );

      if (publicIds.length) {
        await deleteMultipleFiles(publicIds);
        variant.images = (variant.images || []).filter(
          (image: { publicId: string }) => !publicIds.includes(image.publicId)
        );
      }
    }

    // Upload new images
    if (validData.data.newImages?.length) {
      const response = await uploadMultipleFiles(
        validData.data.newImages,
        "tasfin_products"
      );

      if (response.error) throw new Error(response?.error?.message);
      if (response.serverError) throw new Error(response?.serverError?.message);
      if (!response.success) throw new Error("Failed to upload main images");

      const data = response.success?.data || [];

      const existingUrlsSet = new Set(product.images.map((image) => image.url));
      const uniqueNewImages = data.filter(
        (image) => !existingUrlsSet.has(image.url)
      );
      product.images.push(
        ...uniqueNewImages.map((image) => ({
          url: image.url,
          publicId: image.publicId,
          alt: product.title,
          position: image.position,
        }))
      );

      if (!variant.images) variant.images = [];
      variant.images.push(
        ...uniqueNewImages.map((image) => ({
          url: image.url,
          publicId: image.publicId,
          alt: product.title,
          position: image.position,
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
  data: {
    color: string;
    size: string;
    stock: number;
    price: number;
    sku: string;
  };
  productId: string;
}) => {
  let imageObjects: { url: string; publicId: string }[] = [];

  const idValidation = mongoIdZ.safeParse({ _id: productId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Step 1: validate fields (skip file validation here)
  const validData = productVariantZ.omit({ images: true }).safeParse(data);

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
    // Step 3: Build variant & Save in DB
    // -------------------------------
    const { size, stock, price, sku, color } = validData.data;

    product.variants.push({
      size,
      stock,
      price,
      images: imageObjects,
      sku,
      color,
    } as IProductVariant);

    const updated = await product.save();

    return {
      success: {
        success: true,
        message: "Variant created successfully",
        data: updated,
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
  const idValidation = mongoIdZ.safeParse({ _id: productId });
  const vIdValidation = mongoIdZ.safeParse({ _id: variantId });

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
  isCustom: string;
  priceRange: { min: number; max: number };
  categories: string[];
  category?: string;
}) => {
  // Safe Parse for better error handling
  const validData = productFetchQueryZ.safeParse(queryParams);

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  const {
    sortBy,
    search,
    isFeatured,
    isItNew,
    isCustom,
    status,
    priceRange,
    category,
    categories,
  } = validData.data;

  try {
    // Build query
    const query: any = {};
    if (categories && categories.length) {
      query.categories = { $in: categories };
    }
    if (category) {
      query.categories = { $in: [category] };
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
    if (typeof status === "boolean") query.status = status;
    if (typeof isItNew === "boolean") query.isItNew = isItNew;
    if (typeof isCustom === "boolean") query.isCustom = isCustom;

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
  const idValidation = mongoIdZ.safeParse({ _id: productId });
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

// Get product by variant id
export const getProductByVariantId = async (variantId: string) => {
  const idValidation = mongoIdZ.safeParse({ _id: variantId });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const product = await Product.findOne({
      "variants._id": idValidation.data._id,
    });

    if (!product) {
      return {
        error: {
          message: "Product not found!",
        },
      };
    }

    // extract only selected variant
    const selectedVariant = product.variants.find(
      (v: any) => v._id.toString() === idValidation.data._id
    );

    return {
      success: {
        success: true,
        message: "Product fetched successfully!",
        data: {
          product,
          selectedVariant,
        },
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

// Get product by variant sku
export const getProductBySku = async (sku: string) => {
  if (!sku || sku.trim() === "") {
    return {
      error: {
        message: "SKU is required",
      },
    };
  }

  try {
    const product = await Product.findOne({
      "variants.sku": sku,
    });

    if (!product) {
      return {
        error: {
          message: "Product not found for this SKU!",
        },
      };
    }

    // matched variant বের করা
    const selectedVariant = product.variants.find((v: any) => v.sku === sku);

    if (!selectedVariant) {
      return {
        error: {
          message: "Variant not found for this SKU!",
        },
      };
    }

    return {
      success: {
        success: true,
        message: "Product fetched successfully by SKU!",
        data: {
          product,
          selectedVariant,
        },
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
  const idValidation = mongoIdZ.safeParse({ _id: productId });
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
      const publicIds = product.images.map(
        (image: { publicId: string }) => image.publicId
      );

      if (publicIds.length) {
        await deleteMultipleFiles(publicIds);
        product.images = [];
      }
    }

    // Delete variant images
    for (const variant of product.variants) {
      if (variant.images?.length) {
        const publicIds = variant.images.map(
          (image: { publicId: string }) => image.publicId
        );
        await deleteMultipleFiles(publicIds);
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
    "isItNew",
    "status",
    "tags",
    "keyFeatures",
  ];

  updatableFields.forEach((key) => {
    if (key in data) product[key] = data[key];
  });

  // Optional slug
  if (data.slug) product.slug = data.slug;
}
