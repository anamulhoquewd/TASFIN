import axios from "axios";
import type { Context } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import {
  authenticationError,
  authorizationError,
  badRequestHandler,
  serverErrorHandler,
} from "./../error/index.js";
import Admin from "./../models/admins.model.js";
import { adminService } from "./../services/index.js";
import { generateAccessToken, setAuthCookie } from "./../utils/index.js";

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

// Get all admins
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
  const _id = c.req.param("_id") as string;

  const response = await adminService.getUser(_id, { userType: "admin" });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Get Me
export const getMe = async (c: Context) => {
  try {
    // Get admin from auth token
    const me = c.get("admin");

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
      200,
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500,
    );
  }
};

// Update profile
export const updateMe = async (c: Context) => {
  // Get admin from auth token
  const admin = c.get("admin");

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

// Login admin
export const login = async (c: Context) => {
  const body = await c.req.json();

  const response = await adminService.login(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  await setAuthCookie(
    c,
    "accessToken",
    response.success.tokens.accessToken,
    60 * 60 * 24,
  ); // 1 day
  await setAuthCookie(
    c,
    "refreshToken",
    response.success.tokens.refreshToken,
    60 * 60 * 24 * 30,
  ); // 30 days

  return c.json(response.success, 200);
};

// Refresh Token
export const refreshToken = async (c: Context) => {
  try {
    const rToken = getCookie(c, "refreshToken");

    if (!rToken) {
      return authenticationError(c);
    }

    // Verify refresh token
    const token = await verify(rToken, JWT_REFRESH_SECRET, { alg: "HS256" });

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

    await setAuthCookie(c, "accessToken", accessToken, 60 * 60 * 24); // 1 day

    // Response
    return c.json(
      {
        success: true,
        message: "Token refreshed",
        tokens: {
          accessToken,
        },
      },
      200,
    );
  } catch (error: any) {
    console.log("Error during token refresh:", error);
    if (error.name === "JwtTokenExpired") {
      return authorizationError(
        c,
        "Refresh token expired. Please login again.",
      );
    }

    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500,
    );
  }
};

// Logout admin
export const logout = async (c: Context) => {
  try {
    const user = c.get("admin");
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
      200,
    );
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
      },
      500,
    );
  }
};

// Change Password
export const changePassword = async (c: Context) => {
  const body = await c.req.json();

  // Check if admin exists. and get email from token
  const { email } = c.get("admin");

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

// Delete admin
export const deleteAdmin = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await adminService.deleteAdmins(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Forgot Password
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

// Reset Password
export const resetPassword = async (c: Context) => {
  // Token come from param
  const resetToken = c.req.param("resetToken") as string;

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

// Change Admin Avatar
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
    const response = await adminService.uploadSingleFileService({
      body: { avatar: file },
      folder: "admins",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update admin.avatar.url and save
    admin.avatar = {
      alt: response.success.data.key,
      url: response.success.data.url,
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
      500,
    );
  }
};
