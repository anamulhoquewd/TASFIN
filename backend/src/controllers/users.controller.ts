import {
  authenticationError,
  authorizationError,
  badRequestHandler,
  serverErrorHandler,
} from "@/error";
import User from "@/models/users.model";
import { adminService, userService } from "@/services";
import { generateAccessToken, setAuthCookie } from "@/utils";
import axios from "axios";
import { Context } from "hono";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";

const JWT_REFRESH_SECRET =
  (process.env.JWT_REFRESH_SECRET as string) || "JWT_REFRESH_SECRET";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await userService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

// Get all users
export const getUsers = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const search = c.req.query("search") as string;

  const response = await userService.getUsers({
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

export const getUser = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await adminService.getUser(_id, { userType: "user" });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

// Get Me
export const getMe = async (c: Context) => {
  try {
    // Get user from auth token
    const me = c.get("user");

    // Check if user is authenticated
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
        message: "User fetched successfully",
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

// Update profile
export const updateMe = async (c: Context) => {
  // Get user from auth token
  const user = c.get("user");

  if (!user) {
    return authenticationError(c);
  }

  const body = await c.req.json();

  const response = await userService.updateProfile({ user, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update user
export const updateUser = async (c: Context) => {
  const body = await c.req.json();
  const _id = c.req.param("_id");

  const response = await userService.updateUser({ body, _id });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Login user
export const login = async (c: Context) => {
  const body = await c.req.json();

  const response = await userService.login(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  await setAuthCookie(
    c,
    "refreshToken",
    response.success.tokens.refreshToken,
    60 * 60 * 24 * 7
  ); // 7d
  await setAuthCookie(
    c,
    "accessToken",
    response.success.tokens.accessToken,
    60 * 60
  ); // 1h

  return c.json(response.success, 200);
};

// Refresh Token
export const refreshToken = async (c: Context) => {
  try {
    // Get refresh token from cookie
    const rToken = await getSignedCookie(c, JWT_REFRESH_SECRET, "refreshToken");

    if (!rToken) {
      return authenticationError(c);
    }

    // Verify refresh token
    const token = await verify(rToken, JWT_REFRESH_SECRET);

    if (!token) {
      return authenticationError(c);
    }

    // Check if refresh token is valid
    const admin = await User.findOne({ refresh: rToken });

    if (!admin) {
      return authorizationError(c, "Forbidden");
    }

    // Generate new access token
    const accessToken = await generateAccessToken({ user: admin });

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

// Logout user
export const logout = async (c: Context) => {
  try {
    // Clear cookie using Hono's deleteCookie
    const refreshToken = deleteCookie(c, "refreshToken", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      domain: process.env.NODE_ENV === "production" ? "tasfin.com" : undefined,
    });

    if (!refreshToken) {
      return authenticationError(c);
    }

    const { payload } = decode(refreshToken as string) as any;

    if (!payload) {
      return authenticationError(c, "Invalid refresh token on the cookie");
    }

    // Remove refresh token from database
    const user = await User.updateOne({ _id: payload._id }, { refresh: "" });

    if (!user) {
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

// Change Password
export const changePassword = async (c: Context) => {
  const body = await c.req.json();

  // Check if user exists. and get email from token
  const { email } = c.get("user");

  const user = await User.findOne({ email }).select("password");

  if (!user) {
    return authenticationError(c);
  }

  const response = await adminService.changePassword({
    collection: user,
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

// Delete user
export const deleteUser = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await userService.deleteUsers(_id);

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

  const response = await adminService.forgotPassword(email, {
    userType: "user",
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

// Reset Password
export const resetPassword = async (c: Context) => {
  // Token come from param
  const resetToken = c.req.param("resetToken");

  // Password come from body
  const { password } = await c.req.json();

  const response = await adminService.resetPassword(
    {
      password,
      resetToken,
    },
    { userType: "user" }
  );

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Change user Avatar
export const changeAvatar = async (c: Context) => {
  try {
    const body = await c.req.parseBody();
    const file = body["avatar"] as File;

    // Get user from auth token
    const user = c.get("user");
    if (!user) {
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

    // Generate filename
    const fileN = c.req.query("filename") || "avatar";
    const filename = `${fileN}-${Date.now()}.webp`;

    const response = await adminService.changeAvatar({
      body: { avatar: file },
      filename,
      collection: user,
      folder: "users",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    return c.json(response.success, 200);
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
