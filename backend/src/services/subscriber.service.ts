import mongoose from "mongoose";
import { schemaValidationError } from "../error/index.js";
import Subscriber from "../models/subscribers.model.js";
import pagination from "../utils/pagination.js";
import {
  mongoIdZ,
  subscriberQueryZ,
  subscriberUpdateZ,
  subscriberZ,
  type TSubscribe,
  type TUpdateSubscribe,
} from "../validations/zod.js";

export const register = async (body: TSubscribe) => {
  // Safe Parse for better error handling
  const validData = subscriberZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if Subscriber already exists
    const existingSubscriber = await Subscriber.findOne({
      $or: [{ email: validData.data.email }],
    });

    if (existingSubscriber) {
      return {
        error: {
          message: "Sorry! This subscriber already exists.",
          fields: [
            {
              name: "email",
              message: "Email must be unique",
            },
          ],
        },
      };
    }

    // Create subscriber
    const subscriber = new Subscriber(validData.data);

    // Save subscriber
    const docs = await subscriber.save();

    return {
      success: {
        success: true,
        message: "Subscriber created successfully",
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

export const getSubscribers = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  verified: string;
  isBlocked: string;

  search: string;
}) => {
  // Safe Parse for better error handling
  const validData = subscriberQueryZ.safeParse({
    sortBy: queryParams.sortBy,
    sortType: queryParams.sortType,
    verified: queryParams.verified, // boolean
    isBlocked: queryParams.isBlocked, // boolean
    search: queryParams.search,
  });

  // Return error if validation fails
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid query parameters"),
    };
  }

  const { verified, search, isBlocked, sortBy, sortType } = validData.data;

  try {
    // Build query
    const query: any = {};
    if (queryParams.search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { source: { $regex: search, $options: "i" } },
      ];
      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }

    if (typeof verified === "boolean") query.verified = verified;
    if (typeof isBlocked === "boolean") query.isBlocked = isBlocked;

    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "email"].includes(sortBy)
      ? sortBy
      : "createdAt";
    const sortDirection = sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch Subscribers
    const [subscribers, total] = await Promise.all([
      Subscriber.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      Subscriber.countDocuments(query),
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
        message: "Subscribers fetched successfully!",
        data: subscribers,
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

export const getSubscriber = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if subscriber exists
    const subscriber = await Subscriber.findById(idValidation.data._id);

    if (!subscriber) {
      return {
        error: {
          message: `Subscriber not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Subscriber fetched successfully!`,
        data: subscriber,
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

export const updateSubscriber = async ({
  body,
  _id,
}: {
  body: TUpdateSubscribe;
  _id: string;
}) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id });
  if (!idValidation.success) {
    return {
      error: schemaValidationError(idValidation.error, "Invalid ID"),
    };
  }
  // Validation without NID for update
  const validData = subscriberUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if subscriber exists
    const subscriber = await Subscriber.findById(idValidation.data._id);

    if (!subscriber) {
      return {
        error: {
          message: "subscriber not found with the provided ID",
        },
      };
    }

    // Merge only allowed fields into subscriber
    Object.assign(subscriber, validData.data);

    const docs = await subscriber.save();

    return {
      success: {
        success: true,
        message: "subscriber profile updated successfully!",
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

export const deleteSubscriber = async (_id: string) => {
  // Validate ID
  const idValidation = mongoIdZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const data = await Subscriber.findById(idValidation.data._id);

    if (!data) {
      return {
        error: {
          message: `Subscriber not found with provided ID!`,
        },
      };
    }

    // Delete Subscriber
    await data.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Subscriber deleted successfully!`,
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
