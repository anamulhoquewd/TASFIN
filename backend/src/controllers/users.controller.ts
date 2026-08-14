import {
  authenticationError,
  badRequestHandler,
  serverErrorHandler,
} from "./../error/index.js";
import { adminService, userService } from "./../services/index.js";
import axios from "axios";
import type { Context } from "hono";

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
  const _id = c.req.param("_id") as string;

  const response = await adminService.getUser(_id, { userType: "user" });

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

// Update user by admin
export const updateUser = async (c: Context) => {
  const body = await c.req.json();
  const _id = c.req.param("_id") as string;

  const response = await userService.updateUser({ body, _id });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Delete user by admin
export const deleteUser = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await userService.deleteUsers(_id);

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

    const response = await adminService.uploadSingleFile({
      body: { avatar: file },
      filename,
      folder: "user-avatars",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update user.avatar.url and save
    user.avatar = {
      alt: filename,
      url: response.success.data,
    };

    await user.save();

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
