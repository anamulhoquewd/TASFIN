import type { IAdmin } from "../interfaces/index.js";
import { uploadSingleFile } from "../utils/cloudinary.js";
import {
  authenticationError,
  authorizationError,
  badRequestHandler,
  serverErrorHandler,
} from "./../error/index.js";
import Admin from "./../models/admins.model.js";
import { adminService } from "./../services/index.js";
import { generateAccessToken } from "./../utils/index.js";
import axios from "axios";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await adminService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getAdmins = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const search = c.req.query("search") as string;

  const response = await adminService.getAdmins({
    page,
    limit,
    sortBy,
    sortType,

    search,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getAdmin = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await adminService.getUser(_id, { userType: "admin" });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getMe = async (c: Context) => {
  try {
    // Get admin from auth token
    const me: IAdmin = c.get("admin");

    // Check if admin is authenticated
    if (!me) {
      return authenticationError(c);
    }

    // Check if avatar is exist
    const avatarUrl = me?.avatar?.url;

    if (avatarUrl) {
      try {
        // Check if signed URL is valid
        await axios.get(avatarUrl, {
          headers: { Range: "bytes=0-0" },
        });
      } catch (error: any) {
        throw error;
      }
    }

    // Response
    return c.json(
      {
        success: true,
        message: "Admin fetched successfully",
        data: me,
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

export const updateMe = async (c: Context) => {
  // Get admin from auth token
  const admin: IAdmin = c.get("admin");

  if (!admin) {
    return authenticationError(c);
  }

  const body = await c.req.json();

  const response = await adminService.updateProfile({ admin, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const login = async (c: Context) => {
  const body = await c.req.json();

  const response = await adminService.login(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const refreshToken = async (c: Context) => {
  try {
    const rToken = getCookie(c, "refreshToken");

    if (!rToken) {
      return authenticationError(c);
    }

    // Verify refresh token
    const token = await verify(rToken, JWT_REFRESH_SECRET);

    if (!token) {
      return authenticationError(c);
    }

    // Check if refresh token is valid
    const admin = await Admin.findOne({ refresh: rToken });

    if (!admin) {
      return authorizationError(c, "Forbidden");
    }

    // Generate new access token
    const accessToken = await generateAccessToken({ user: admin });

    if (!accessToken) {
      return serverErrorHandler(c, {
        message: "Access token generation failed",
      });
    }

    // await setAuthCookie(c, "accessToken", accessToken, 60 * 60 * 24); // 1 day

    // Response
    return c.json(
      {
        success: true,
        message: "Token refreshed",
        tokens: {
          accessToken,
        },
      },
      200
    );
  } catch (error: any) {
    console.log("Error during token refresh:", error);
    if (error.name === "JwtTokenExpired") {
      return authorizationError(
        c,
        "Refresh token expired. Please login again."
      );
    }

    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

export const logout = async (c: Context) => {
  try {
    const user: IAdmin = c.get("admin");
    // Remove refresh token from database
    const admin = await Admin.updateOne({ _id: user._id }, { refresh: "" });

    if (!admin) {
      return authenticationError(c);
    }

    // Response
    return c.json(
      {
        success: true,
        message: "Logout successful",
      },
      200
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500
    );
  }
};

export const changePassword = async (c: Context) => {
  const body = await c.req.json();

  // Check if admin exists. and get email from token
  const { email }: IAdmin = c.get("admin");

  const admin = await Admin.findOne({ email }).select("password");

  if (!admin) {
    return authenticationError(c);
  }

  const response = await adminService.changePassword({
    collection: admin,
    body,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const deleteAdmin = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await adminService.deleteAdmins(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const forgotPassword = async (c: Context) => {
  const { email } = await c.req.json();

  const response = await adminService.forgotPassword(email);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const resetPassword = async (c: Context) => {
  // Token come from param
  const resetToken = c.req.param("resetToken");

  // Password come from body
  const { password } = await c.req.json();

  const response = await adminService.resetPassword({
    password,
    resetToken,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const changeAvatar = async (c: Context) => {
  try {
    const body = await c.req.parseBody();
    const file = body["avatar"] as File;

    // Get admin from auth token
    const admin = c.get("admin");
    if (!admin) {
      return authenticationError(c);
    }

    // Check if file exists
    if (!file) {
      return badRequestHandler(c, {
        message: "No file provided",
        fields: [
          {
            name: "avatar",
            message: "Avatar file is required",
          },
        ],
      });
    }

    const response = await uploadSingleFile(file, "tasfin_users");

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update admin.avatar.url and save
    admin.avatar = {
      alt: response.success.data.publicId,
      url: response.success.data.url,
      publicId: response.success.data.publicId,
    };

    await admin.save();

    return c.json(response.success, 201);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: "Avatar upload failed",
        error: error.message,
      },
      500
    );
  }
};
