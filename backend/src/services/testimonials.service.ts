import mongoose from "mongoose";
import { schemaValidationError } from "../error/index.js";
import Testimonial from "../models/testimonial.model.js";
import pagination from "../utils/pagination.js";
import {
  idSchemaZ,
  querySchemaZ,
  testimonialSchemaZ,
  testimonialUpdateZ,
  type TestimoalCreateInput,
  type TestimoalUpdateInput,
} from "../validations/zod.js";

export const register = async (body: TestimoalCreateInput) => {
  // Safe Parse for better error handling
  const validData = testimonialSchemaZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  try {
    // Create testimonial
    const testimonial = new Testimonial(validData.data);

    // Save testimonial
    const docs = await testimonial.save();

    return {
      success: {
        success: true,
        message: "Testimonial created successfully",
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

export const getTestimonials = async (queryParams: {
  page: number;
  limit: number;
  sortBy: string;
  sortType: string;

  search: string;
}) => {
  // Safe Parse for better error handling
  const validData = querySchemaZ.safeParse({
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
      query.$or = [
        { name: { $regex: queryParams.search, $options: "i" } },
        { location: { $regex: queryParams.search, $options: "i" } },
      ];

      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name", "slug"].includes(
      queryParams.sortBy,
    )
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch categorise
    const [categorise, total] = await Promise.all([
      Testimonial.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .lean()
        .exec(),
      Testimonial.countDocuments(query),
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
        message: "Categorise fetched successfully!",
        data: categorise,
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

export const getTestimonial = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if testimonial exists
    const testimonial = await Testimonial.findById(idValidation.data._id);

    if (!testimonial) {
      return {
        error: {
          message: `Testimonial not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `Testimonial fetched successfully!`,
        data: testimonial,
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

export const updateTestimonial = async ({
  _id,
  body,
}: {
  _id: string;
  body: TestimoalUpdateInput;
}) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  // Validation without NID for update
  const validData = testimonialUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if testimonial exists
    const testimonial = await Testimonial.findById(idValidation.data._id);

    if (!testimonial) {
      return {
        error: {
          message: `Testimonial not found with provided ID!`,
        },
      };
    }

    // Merge only allowed fields into testimonial
    Object.assign(testimonial, validData.data);

    const docs = await testimonial.save();

    return {
      success: {
        success: true,
        message: "Testimonial updated successfully!",
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

export const deleteTestimonial = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const testimonial = await Testimonial.findById(idValidation.data._id);

    if (!testimonial) {
      return {
        error: {
          message: `Admin not found with provided ID!`,
        },
      };
    }

    // Delete admin
    await testimonial.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Testimonial deleted successfully!`,
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
