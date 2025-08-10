import { schemaValidationError } from "@/error";
import { IUser } from "@/interfaces";
import User from "@/models/users.model";
import { generateAccessToken, generateRefreshToken } from "@/utils";
import pagination from "@/utils/pagination";
import {
  idSchemaZ,
  loginSchemeZ,
  querySchemaZ,
  UserCreateInput,
  userCreateZ,
  UserUpdateInput,
  userUpdateZ,
} from "@/validations/zod";
import dotenv from "dotenv";

dotenv.config();

export const register = async (body: UserCreateInput) => {
  // Safe Parse for better error handling
  const validData = userCreateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: validData.data.email }, { phone: validData.data.phone }],
    });

    if (existingUser) {
      return {
        error: {
          message: "Sorry! This user already exists.",
          fields: [
            {
              name: "email",
              message: "Email must be unique",
            },
            {
              name: "phone",
              message: "Phone number must be unique",
            },
          ],
        },
      };
    }

    // Create user
    const user = new User(validData.data);

    // Save user
    const docs = await user.save();

    return {
      success: {
        success: true,
        message: "User created successfully",
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

export const getUsers = async (queryParams: {
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
        { email: { $regex: queryParams.search, $options: "i" } },
        { phone: { $regex: queryParams.search, $options: "i" } },
      ];
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name", "email"].includes(
      queryParams.sortBy
    )
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch users
    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .exec(),
      User.countDocuments(query),
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
        message: "Users fetched successfully!",
        data: users,
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

export const updateProfile = async ({
  user,
  body,
}: {
  user: IUser;
  body: UserCreateInput;
}) => {
  // Validation without NID for update
  const validData = userUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Merge only allowed fields into user
    Object.assign(user, validData.data);

    const docs = await user.save();

    return {
      success: {
        success: true,
        message: "User profile updated successfully!",
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

export const updateUser = async ({
  body,
  _id,
}: {
  body: UserUpdateInput;
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
  const validData = userUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if user exists
    const user = await User.findById(idValidation.data._id);

    if (!user) {
      return {
        error: {
          message: "User not found with the provided ID",
        },
      };
    }

    // Merge only allowed fields into user
    Object.assign(user, validData.data);

    const docs = await user.save();

    return {
      success: {
        success: true,
        message: "User profile updated successfully!",
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

export const login = async (body: {
  email: string;
  phone: string;
  password: string;
}) => {
  // Safe Parse for better error handling
  const validData = loginSchemeZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  // Destructure Body
  const { email, phone, password } = validData.data;

  try {
    // Check if user exists
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    }).select("password email isBlocked");

    if (!user) {
      return {
        error: {
          message: "Invalid credentials",
          fields: [
            {
              name: "email",
              message: "Sorry! User not found with this email or phone",
            },
          ],
        },
      };
    }

    if (user.isBlocked) {
      return {
        error: {
          message:
            "Your account has been blocked. Please contact customer support for assistance.",
          fields: [
            {
              name: "email",
              message:
                "Your account is currently blocked. Contact our support team to resolve this issue.",
            },
          ],
        },
      };
    }

    // Validate password
    if (!(await user.matchPassword(password))) {
      return {
        error: {
          message: "Invalid credentials",
          fields: [
            {
              name: "password",
              message: "Password is incorrect",
            },
          ],
        },
      };
    }

    // Generate access token
    const accessToken = await generateAccessToken({ user });

    // Generate refresh token
    const refreshToken = await generateRefreshToken({ user });

    // Refresh token store in database
    user.refresh = refreshToken;
    await user.save();
    // Response
    return {
      success: {
        success: true,
        message: "Login successfully!",
        tokens: {
          accessToken,
          refreshToken,
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

export const deleteUsers = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const data = await User.findById(idValidation.data._id);

    if (!data) {
      return {
        error: {
          message: `User not found with provided ID!`,
        },
      };
    }

    // Delete user
    await data.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `User deleted successfully!`,
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
