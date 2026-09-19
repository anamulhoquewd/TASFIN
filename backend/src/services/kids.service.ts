import mongoose from "mongoose";
import z from "zod";
import { schemaValidationError } from "../error/index.js";
import KidsProduct from "../models/kids.model.js";
import pagination from "../utils/pagination.js";
import { deleteMultipleFiles, uploadMultipleFiles } from "../utils/r2-utils.js";
import {
  idSchemaZ,
  type KidsInput,
  kidsQueryZ,
  kidsSchemaUpdateZ,
  kidsSchemaZ,
  type KidsUpdateInput,
  updateProductImagesZ,
} from "../validations/zod.js";
import { transporter } from "../config/email.js";

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

export const register = async (body: KidsInput) => {
  // Safe Parse for better error handling
  const validData = kidsSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const uploads = await uploadMultipleFiles(
      validData.data.images,
      `kids/${validData.data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    );

    if (uploads.error) throw new Error(uploads.error.message);
    if (uploads.serverError) throw new Error(uploads.serverError.message);

    const uploadedImages = uploads.success?.data ?? [];
    const kidsProduct = new KidsProduct({
      ...validData.data,
      images: uploadedImages,
    });

    // Save kidsProduct
    const docs = await kidsProduct.save();

    return {
      success: {
        success: true,
        message: "Kids Product created successfully",
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

interface IInquery {
  fullName: string;
  shopName: string;
  city: string;
  phone: string;
  email?: string;
  interestedProductIds: [];
  estimatedQty?: string;
  message?: string;
}

export const inquiry = async (body: IInquery) => {
  try {
    // Step 4: Send Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Order Received — TASFIN|Kids",
      text: `Hello Kids Admin,
    
    A new order has been placed on the website. Here are the order details:
    
    fullName: ${body.fullName}
    shopName: ${body.shopName}
    Phone: ${body.phone}
    Email: ${body?.email}
    City: ${body.city}
    Interested Products: ${body.interestedProductIds}
    Estimated Qty: ${body.estimatedQty}
    Message: ${body?.message}
    Date: ${new Date()}
    
    Please contact with this buyer.
    
    Thank you!
    Tasfin Team
    `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return {
      success: {
        success: true,
        message: "Request created successfully",
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

export const getKidsProducts = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  isActive: string;

  search: string;
}) => {
  // Safe Parse for better error handling
  const validData = kidsQueryZ.safeParse({
    sortBy: queryParams.sortBy,
    sortType: queryParams.sortType,

    isActive: queryParams.isActive, // boolean
    search: queryParams.search,
  });

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  const { search, isActive, sortBy, sortType } = validData.data;

  try {
    // Build query
    const query: any = {};
    if (queryParams.search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }

    if (typeof isActive === "boolean") query.isActive = isActive;

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name"].includes(sortBy)
      ? sortBy
      : "createdAt";
    const sortDirection = sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch products
    const [products, total] = await Promise.all([
      KidsProduct.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      KidsProduct.countDocuments(query),
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
        message: "products fetched successfully!",
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

export const getKidsProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if kidsProducts exists
    const kidsProduct = await KidsProduct.findById(idValidation.data._id);

    if (!kidsProduct) {
      return {
        error: {
          message: `kids Product not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Kids Product fetched successfully!`,
        data: kidsProduct,
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

export const updateKidsProduct = async ({
  body,
  _id,
}: {
  body: KidsUpdateInput;
  _id: string;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return {
      error: schemaValidationError(idValidation.error, "Invalid ID"),
    };
  }
  // Validation without NID for update
  const validData = kidsSchemaUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if kids Product exists
    const kidsProduct = await KidsProduct.findById(idValidation.data._id);

    if (!kidsProduct) {
      return {
        error: {
          message: "kids Product not found with the provided ID",
        },
      };
    }

    // Merge only allowed fields into kids Product
    Object.assign(kidsProduct, validData.data);

    const docs = await kidsProduct.save();

    return {
      success: {
        success: true,
        message: "kids Product profile updated successfully!",
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

export const updateKidsImages = async ({
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
    const kidsProduct = await KidsProduct.findById(idValidation.data._id);
    if (!kidsProduct) {
      return { error: { message: "Kids product not found!" } };
    }

    if (validData.data.deleteImageUrls.length) {
      const imagesToDelete = kidsProduct.images.filter((img) =>
        validData.data.deleteImageUrls.includes(img.url),
      );

      if (imagesToDelete.length) {
        await deleteMultipleFiles(imagesToDelete.map((img) => img.key));
        kidsProduct.images = kidsProduct.images.filter(
          (img) => !validData.data.deleteImageUrls.includes(img.url),
        );
      }
    }

    if (validData.data.images.length) {
      const res = await uploadMultipleFiles(
        validData.data.images,
        `kids/${kidsProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      );

      if (res.error) throw new Error(res?.error?.message);
      if (res.serverError) throw new Error(res?.serverError?.message);
      if (!res.success) throw new Error("Failed to upload kids images");

      const newImages = res.success?.data || [];
      uploadedImages.push(...newImages);

      const existingImageSet = new Set(
        kidsProduct.images.map((img) => img.url),
      );
      const uniqueNewImages = newImages.filter(
        (img) => !existingImageSet.has(img.url),
      );

      kidsProduct.images.push(
        ...uniqueNewImages.map((img) => ({
          ...img,
          alt: img.alt || kidsProduct.name,
        })),
      );
    }

    const remainingCount = kidsProduct.images.length;
    if (remainingCount < 1) {
      if (uploadedImages.length) {
        await deleteMultipleFiles(uploadedImages.map((img) => img.key));
      }
      return {
        error: { message: "At least one image is required" },
      };
    }

    const reorderedUrls = validData.data.reorderedImageUrls.filter(Boolean);
    if (reorderedUrls.length > 0 || kidsProduct.images.length > 0) {
      kidsProduct.images = orderImages(
        kidsProduct.images,
        reorderedUrls,
      ) as typeof kidsProduct.images;
    }

    kidsProduct.markModified("images");
    const updated = await kidsProduct.save();

    return {
      success: {
        success: true,
        message: "Kids images updated successfully!",
        data: updated,
      },
    };
  } catch (error: any) {
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

export const deleteKidsProduct = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const data = await KidsProduct.findById(idValidation.data._id);

    if (!data) {
      return {
        error: {
          message: `Kids Product not found with provided ID!`,
        },
      };
    }

    // Delete Kids Product
    await data.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Kids Product deleted successfully!`,
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
