import mongoose from "mongoose";
import { schemaValidationError } from "../error/index.js";
import { Coupon } from "../models/coupon.model.js";
import {
  couponZ,
  mongoIdZ,
  queryZ,
  updateCouponZ,
  type TCoupon,
  type TUpdateCoupon,
} from "../validations/zod.js";
import pagination from "../utils/pagination.js";
import { CouponUsage } from "../models/couponUsage.model.js";

export const register = async (body: TCoupon) => {
  const validData = couponZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  try {
    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({
      code: validData.data.code,
    });

    if (existingCoupon) {
      return {
        error: {
          message: "Sorry! This coupon code already exists.",
          fields: [
            {
              name: "code",
              message: "Code must be unique",
            },
          ],
        },
      };
    }

    // Create coupon
    const coupon = new Coupon(validData.data);

    // Save coupon
    const docs = await coupon.save();

    return {
      success: {
        success: true,
        message: "Coupon created successfully",
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

export const validate = async ({
  code,
  subtotal,
  phone,
}: {
  code: string;
  subtotal: number;
  phone?: string;
}) => {
  try {
    const now = new Date();

    /* ================= FIND COUPON ================= */
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      status: true,
    });

    if (!coupon) {
      return {
        error: {
          message: "Invalid coupon code",
          fields: [{ name: "code", message: "Coupon not found or inactive" }],
        },
      };
    }

    /* ================= DATE VALIDATION ================= */
    if (now < coupon.startAt || now > coupon.endAt) {
      return {
        error: {
          message: "Coupon expired",
          fields: [{ name: "code", message: "Coupon is not valid right now" }],
        },
      };
    }

    /* ================= TOTAL USAGE LIMIT ================= */
    if (coupon.usedCount >= coupon.totalUsageLimit) {
      return {
        error: {
          message: "Coupon limit reached",
          fields: [{ name: "code", message: "Coupon usage limit exceeded" }],
        },
      };
    }

    /* ================= MIN SUBTOTAL ================= */
    if (subtotal < coupon.minSubtotal) {
      return {
        error: {
          message: "Minimum order amount not met",
          fields: [
            {
              name: "code",
              message: `Minimum order amount is ${coupon.minSubtotal}`,
            },
          ],
        },
      };
    }

    /* ================= USER USAGE LIMIT ================= */
    if (phone) {
      const usage = await CouponUsage.findOne({
        couponId: coupon._id,
        phone,
      });

      if (usage && usage.usedCount >= coupon.perUserUsageLimit) {
        return {
          error: {
            message: "Coupon already used",
            fields: [{ name: "code", message: "You already used this coupon" }],
          },
        };
      }
    }

    /* ================= CALCULATE DISCOUNT ================= */
    let discountAmount = 0;

    if (coupon.discountType === "percent") {
      discountAmount = (subtotal * coupon.value) / 100;
      discountAmount = Math.min(discountAmount, coupon.maxValue);
    } else {
      discountAmount = coupon.value;
    }

    discountAmount = Math.min(discountAmount, subtotal);

    /* ================= SUCCESS ================= */
    return {
      success: {
        success: true,
        message: "Coupon applied successfully",
        data: {
          couponId: coupon._id,
          code: coupon.code,
          discountType: coupon.discountType,
          discountAmount,
          finalSubtotal: subtotal - discountAmount,
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

export const getCoupons = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  search: string;
}) => {
  // Safe Parse for better error handling
  const validData = queryZ.safeParse({
    sortBy: queryParams.sortBy,
    sortType: queryParams.sortType,
  });

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  try {
    // Build query
    const query: any = {};
    if (queryParams.search) {
      query.code = { $regex: queryParams.search, $options: "i" };

      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt"].includes(queryParams.sortBy)
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch coupon
    const [coupon, total] = await Promise.all([
      Coupon.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      Coupon.countDocuments(query),
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
        message: "Coupon fetched successfully!",
        data: coupon,
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

export const getCoupon = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if coupon exists
    const coupon = await Coupon.findById(idValidation.data._id);

    if (!coupon) {
      return {
        error: {
          message: `Coupon not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Coupon fetched successfully!`,
        data: coupon,
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

export const updateCoupon = async ({
  _id,
  body,
}: {
  _id: string;
  body: TUpdateCoupon;
}) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Validation without NID for update
  const validData = updateCouponZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if coupon exists
    const coupon = await Coupon.findById(idValidation.data._id);

    if (!coupon) {
      return {
        error: {
          message: `Coupon not found with provided ID!`,
        },
      };
    }

    // Merge only allowed fields into coupon
    Object.assign(coupon, validData.data);

    const docs = await coupon.save();

    return {
      success: {
        success: true,
        message: "Coupon updated successfully!",
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

export const deleteCoupon = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const coupon = await Coupon.findById(idValidation.data._id);

    if (!coupon) {
      return {
        error: {
          message: `coupon not found with provided ID!`,
        },
      };
    }

    // Delete coupon
    await coupon.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Coupon deleted successfully!`,
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
