import { schemaValidationError } from "@/error";
import Category from "@/models/categorise.model";
import pagination from "@/utils/pagination";
import {
  CategoryCreateInput,
  categoryCreateZ,
  CategoryUpdateInput,
  categoryUpdateZ,
  idSchemaZ,
  querySchemaZ,
} from "@/validations/zod";

export const register = async (body: CategoryCreateInput) => {
  // Safe Parse for better error handling
  const validData = categoryCreateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body!"),
    };
  }

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({
      slug: validData.data.slug,
    });

    if (existingCategory) {
      return {
        error: {
          message: "Sorry! This category already exists.",
          fields: [
            {
              name: "slug",
              message: "Slug must be unique",
            },
          ],
        },
      };
    }

    // Create category
    const category = new Category(validData.data);

    // Save category
    const docs = await category.save();

    return {
      success: {
        success: true,
        message: "Category created successfully",
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

export const getCategories = async (queryParams: {
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
        { slug: { $regex: queryParams.search, $options: "i" } },
      ];
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name", "slug"].includes(
      queryParams.sortBy
    )
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch categorise
    const [categorise, total] = await Promise.all([
      Category.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      Category.countDocuments(query),
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

export const getCategory = async (_id: string) => {
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

export const updateCategory = async ({
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

export const deleteCategory = async (_id: string) => {
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
