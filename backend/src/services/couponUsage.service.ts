import mongoose from "mongoose";
import { schemaValidationError } from "../error/index.js";
import { CouponUsage } from "../models/couponUsage.model.js";
import pagination from "../utils/pagination.js";
import {
  mongoIdZ,
  queryZ,
  updateCouponUsageZ,
  type TUpdateCouponUsage,
} from "../validations/zod.js";

export const getCouponUsages = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  couponId?: string;
  phone?: string;
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
    if (queryParams.couponId) {
      query.couponId = new mongoose.Types.ObjectId(queryParams.couponId);
    }
    if (queryParams.phone) {
      query.phone = { $regex: queryParams.phone, $options: "i" };
    }

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt"].includes(queryParams.sortBy)
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch coupon usage
    const [couponUsages, total] = await Promise.all([
      CouponUsage.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      CouponUsage.countDocuments(query),
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
        message: "Coupon usages fetched successfully!",
        data: couponUsages,
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

export const getCouponUsage = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if coupon usage exists
    const couponUsage = await CouponUsage.findById(idValidation.data._id);

    if (!couponUsage) {
      return {
        error: {
          message: `Coupon usage not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Coupon usage fetched successfully!`,
        data: couponUsage,
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

export const updateCouponUsage = async ({
  _id,
  body,
}: {
  _id: string;
  body: TUpdateCouponUsage;
}) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Validation without NID for update
  const validData = updateCouponUsageZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if coupon usage exists
    const couponUsage = await CouponUsage.findById(idValidation.data._id);

    if (!couponUsage) {
      return {
        error: {
          message: `Coupon not found with provided ID!`,
        },
      };
    }

    // Merge only allowed fields into coupon usage
    Object.assign(couponUsage, validData.data);

    const docs = await couponUsage.save();

    return {
      success: {
        success: true,
        message: "Coupon usage pdated successfully!",
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

export const deleteCouponUsage = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const couponUsage = await CouponUsage.findById(idValidation.data._id);

    if (!couponUsage) {
      return {
        error: {
          message: `coupon usage not found with provided ID!`,
        },
      };
    }

    // Delete coupon usage
    await couponUsage.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Coupon usage deleted successfully!`,
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
