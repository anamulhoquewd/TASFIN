import mongoose from "mongoose";
import z from "zod";
import { uploadSingleFile } from "../utils/r2-utils.js";
import { transporter } from "./../config/email.js";
import { schemaValidationError } from "./../error/index.js";
import type { IAdmin } from "./../interfaces/index.js";
import Admin from "./../models/admins.model.js";
import User from "./../models/users.model.js";
import { generateAccessToken, generateRefreshToken } from "./../utils/index.js";
import pagination from "./../utils/pagination.js";
import { stringGenerator } from "./../utils/string-generator.js";
import {
  adminCreateZ,
  adminUpdateLimitedZ,
  avatarSchemaZ,
  changePasswordZ,
  idSchemaZ,
  loginSchemeZ,
  querySchemaZ,
  type AdminCreateInput,
  type AdminUpdateInput,
} from "./../validations/zod.js";

export const register = async (body: AdminCreateInput) => {
  // Safe Parse for better error handling
  const validData = adminCreateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { email: validData.data.email },
        { phone: validData.data.phone },
        { nid: validData.data.nid },
      ],
    });

    if (existingAdmin) {
      return {
        error: {
          message: "Sorry! This admin already exists.",
          fields: [
            {
              name: "email",
              message: "Email must be unique",
            },
            {
              name: "phone",
              message: "Phone number must be unique",
            },
            {
              name: "nid",
              message: "NID must be unique",
            },
          ],
        },
      };
    }

    // Generate Password
    const password = stringGenerator(8);

    // Create Admin
    const admin = new Admin({
      ...validData.data,
      password,
      role: "admin",
    });

    // Save Admin
    const docs = await admin.save();

    // Send Email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: validData.data.email,
      subject: "Your Account Details",
      text: `Hello ${validData.data.name},\n\nYour account has been created successfully. Here are your login details:\n\nEmail: ${validData.data.email}\nPassword: ${password}\n\nPlease log in and change your password immediately for security.\n\nThank you!`,
    };

    // Send Email
    // await transporter.sendMail(mailOptions);

    return {
      success: {
        success: true,
        message: "Admin created successfully",
        data: docs,
      },
    };
  } catch (error: any) {
    console.error("Error in user register service: ", error);
    return {
      serverError: {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
    };
  }
};

export const getAdmins = async (queryParams: {
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
        { NID: { $regex: queryParams.search, $options: "i" } },
      ];

      if (mongoose.Types.ObjectId.isValid(queryParams.search)) {
        query.$or.push({
          _id: new mongoose.Types.ObjectId(queryParams.search),
        });
      }
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name", "email"].includes(
      queryParams.sortBy,
    )
      ? queryParams.sortBy
      : "createdAt";
    const sortDirection =
      validData.data.sortType.toLocaleLowerCase() === "asc" ? 1 : -1;

    // Fetch admins
    const [admins, total] = await Promise.all([
      Admin.find(query)
        .sort({ [sortField]: sortDirection })
        .skip((queryParams.page - 1) * queryParams.limit)
        .limit(queryParams.limit)
        .lean()
        .exec(),

      Admin.countDocuments(query),
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
        message: "Admins fetched successfully!",
        data: admins,
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

// shared function to get user by ID, can be used for both admin and user (customer)
export const getUser = async (
  _id: string,
  { userType }: { userType: "user" | "admin" },
) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    // Check if admin exists
    let data;

    if (userType === "admin") {
      data = await Admin.findById(idValidation.data._id);
    } else if (userType === "user") {
      data = await User.findById(idValidation.data._id);
    }

    if (!data) {
      return {
        error: {
          message: `${userType} not found with provided ID!`,
        },
      };
    }

    return {
      success: {
        success: true,
        message: `${userType} fetched successfully!`,
        data: data,
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
  admin,
  body,
}: {
  admin: IAdmin;
  body: AdminUpdateInput;
}) => {
  // Validation without NID for update
  const validData = adminUpdateLimitedZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Merge only allowed fields into admin
    Object.assign(admin, validData.data);

    const docs = await admin.save();

    return {
      success: {
        success: true,
        message: "Admin profile updated successfully!",
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

export const deleteAdmins = async (_id: string) => {
  // Validate ID
  const idValidation = idSchemaZ.safeParse({ _id: _id });
  if (!idValidation.success) {
    return { error: schemaValidationError(idValidation.error, "Invalid ID") };
  }

  try {
    const data = await Admin.findById(idValidation.data._id);

    if (!data) {
      return {
        error: {
          message: `Admin not found with provided ID!`,
        },
      };
    }

    if (data.role === "super_admin") {
      return {
        error: {
          message: "It is not possible to delete the super admin.",
        },
      };
    }

    // Delete admin
    await data.deleteOne();

    // Response
    return {
      success: {
        success: true,
        message: `Admin deleted successfully!`,
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

export const changePassword = async ({
  collection,
  body,
}: {
  collection: IAdmin;
  body: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}) => {
  // Validate body
  const validData = changePasswordZ.safeParse(body);
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  const { currentPassword, newPassword, confirmPassword } = validData.data;

  if (newPassword !== confirmPassword) {
    return {
      error: {
        message: "New password and confirm password do not match",
        fields: [
          {
            name: "confirmPassword",
            message: "Passwords must match",
          },
        ],
      },
    };
  }

  try {
    // Validate current password
    if (!(await collection.matchPassword(currentPassword))) {
      return {
        error: {
          message: "Current password is incorrect",
          fields: [
            {
              name: "currentPassword",
              message: "Current password is incorrect",
            },
          ],
        },
      };
    }

    // Update password
    collection.password = newPassword;
    await collection.save();

    return {
      success: {
        success: true,
        message: "Password changed successfully",
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

export const forgotPassword = async (email: string) => {
  // Validate email
  const validateSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
  });

  const validData = validateSchema.safeParse({ email });
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const data = await Admin.findOne({ email: validData.data.email });

    if (!data) {
      return {
        error: {
          message: "User not found with this email",
          fields: [
            {
              name: "email",
              message: "User not found with this email",
            },
          ],
        },
      };
    }

    // Generate reset token
    const resetToken = data.generateResetPasswordToken(15);

    // Save the reset token and expire time
    await data.save();

    // Generate URL
    const resetUrl = `${process.env.DOMAIN}/auth/reset-password/${resetToken}`;

    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Account Details",
      text: `Hello ${data.name},\n\nClick the link below to reset your password:\n\n${resetUrl}\n\nIf you didn't request this, please ignore this email. This token will expire in 30 minutes.\n\nBest regards,\n${data.name}`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: {
        success: true,
        message: "Password reset link sent successfully.",
        token: resetToken,
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

export const resetPassword = async ({
  password,
  resetToken,
}: {
  password: string;
  resetToken: string;
}) => {
  const bodySchema = z.object({
    password: z.string().min(8).max(20),
  });
  const tokenSchema = z.object({
    resetToken: z.string().length(64, "Invalid reset token format"),
  });

  const validData = bodySchema.safeParse({ password });
  const tokenValidation = tokenSchema.safeParse({ resetToken });

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  if (!tokenValidation.success) {
    return {
      error: {
        msg: "Token Validation error",
        fields: tokenValidation.error.issues.map((issue) => ({
          name: String(issue.path[0]),
          message: issue.message,
        })),
      },
    };
  }

  try {
    const data = await Admin.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpireDate: { $gt: Date.now() },
    });

    if (!data) {
      return {
        error: {
          message: "Invalid or expired reset token",
        },
      };
    }

    data.password = password;
    data.resetPasswordToken = null;
    data.resetPasswordExpireDate = null;

    await data.save();

    return {
      success: {
        success: true,
        message: "Password reset successfully",
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

export const uploadSingleFileService = async ({
  body,
  folder,
}: {
  folder: string;
  body: {
    avatar: File;
  };
}) => {
  const file = body.avatar;

  if (!file) {
    return {
      error: { message: "No file provided" },
    };
  }

  const validData = avatarSchemaZ.safeParse({ avatar: file });
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const response = await uploadSingleFile(file, folder);

    if (response.error) {
      return {
        error: response.error,
      };
    } else if (response.serverError) {
      return {
        serverError: response.serverError,
      };
    }

    const data = response.success.data;

    return {
      success: {
        success: true,
        message: "Avatar updated successfully",
        data,
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
    // Check if admin exists
    const admin = await Admin.findOne({
      $or: [{ email }, { phone }],
    }).select("password email role");

    if (!admin) {
      return {
        error: {
          message: "Invalid credentials",
          fields: [
            {
              name: "email",
              message: "admin not found with this email or phone",
            },
          ],
        },
      };
    }

    // Validate password
    if (!(await admin.matchPassword(password))) {
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
    const accessToken = await generateAccessToken({ user: admin });

    // Generate refresh token
    const refreshToken = await generateRefreshToken({ user: admin });

    // Refresh token store in database
    admin.refresh = refreshToken;
    await admin.save();

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
