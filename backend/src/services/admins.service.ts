import { schemaValidationError } from "@/error";
import Admin from "@/models/admins.model";
import { stringGenerator } from "@/utils/string-generator";
import dotenv from "dotenv";
import {
  AdminCreateInput,
  adminCreateZ,
  AdminUpdateInput,
  adminUpdateZ,
  avatarSchemaZ,
  changePasswordZ,
  idSchemaZ,
  loginSchemeZ,
  querySchemaZ,
} from "@/validations/zod";
import { transporter } from "@/config/email";
import z from "zod";
import pagination from "@/utils/pagination";
import { IAdmin, IUser } from "@/interfaces";
import s3 from "@/config/s3";
import {
  generateAccessToken,
  generateRefreshToken,
  uploadAvatar,
} from "@/utils";
import User from "@/models/users.model";
dotenv.config();

// Get environment variables
const NAME = process.env.ADMIN_NAME;
const EMAIL = process.env.ADMIN_EMAIL;
const PHONE = process.env.ADMIN_PHONE;
const PASSWORD = process.env.ADMIN_PASSWORD;
const NID = process.env.ADMIN_NID;

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
    await transporter.sendMail(mailOptions);

    return {
      success: {
        success: true,
        message: "Admin created successfully",
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

export const registerSuperAdmin = async () => {
  // Safe Parse for better error handling
  const validData = adminCreateZ.safeParse({
    name: NAME,
    email: EMAIL,
    phone: PHONE,
    nid: NID,
  });

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: "super_admin" });

    if (existingSuperAdmin) {
      return {
        success: false,
        error: {
          message: "Super Admin already exists",
        },
      };
    }

    // Create Super Admin
    const admin = new Admin({
      name: validData.data.name,
      email: validData.data.email,
      phone: validData.data.phone,
      nid: validData.data.nid,
      password: PASSWORD,
      role: "super_admin",
    });

    // Save Super Admin
    const docs = await admin.save();

    // Response
    return {
      message: "Super Admin created successfully!",
      success: true,
      data: docs,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
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
    }
    // Allowable sort fields
    const sortField = ["createdAt", "updatedAt", "name", "email"].includes(
      queryParams.sortBy
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

export const getUser = async (
  _id: string,
  { userType }: { userType: "user" | "admin" }
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
  const validData = adminUpdateZ.omit({ nid: true }).safeParse(body);

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
  collection: IUser | IAdmin;
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

export const forgotPassword = async (
  email: string,
  { userType }: { userType: "user" | "admin" }
) => {
  // Validate email
  const validateSchema = z.object({
    email: z.string().email(),
  });

  const validData = validateSchema.safeParse({ email });
  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    let data;

    if (userType === "admin") {
      data = await Admin.findOne({ email: validData.data.email });
    } else if (userType === "user") {
      data = await User.findOne({ email: validData.data.email });
    }

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
    const resetUrl = `${process.env.DOMAIN_BASE_URL}/auth/reset-password/${resetToken}`;

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

export const resetPassword = async (
  {
    password,
    resetToken,
  }: {
    password: string;
    resetToken: string;
  },
  {
    userType,
  }: {
    userType: "user" | "admin";
  }
) => {
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
    let data;

    if (userType === "admin") {
      data = await Admin.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpireDate: { $gt: Date.now() },
      });
    } else if (userType === "user") {
      data = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpireDate: { $gt: Date.now() },
      });
    }

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

export const changeAvatar = async ({
  collection,
  filename,
  body,
  folder,
}: {
  collection: IAdmin | IUser;
  filename: string;
  folder: string;
  body: {
    avatar: File;
  };
}) => {
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET_NAME
  ) {
    return {
      error: {
        message:
          "AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY is missing in env variables",
      },
    };
  }

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
    // Upload to S3 (uploadAvatar function assumed async - যদি না হয়, তাহলে await বাদ দিবে)
    await uploadAvatar({
      s3,
      file: validData.data.avatar,
      key: `uploads/${folder}/${filename}`,
      fileType: validData.data.avatar.type,
      bucketName: process.env.AWS_BUCKET_NAME,
    });

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${folder}/${filename}`;

    // Update collection.avatar.url and save
    collection.avatar = {
      alt: filename,
      url: url,
    };

    await collection.save();

    return {
      success: {
        success: true,
        message: "Avatar updated successfully",
        data: url,
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
