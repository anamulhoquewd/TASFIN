import {
  badRequestHandler,
  schemaValidationError,
  serverErrorHandler,
} from "@/error";
import Category from "@/models/categorise.model";
import { adminService, categoryService } from "@/services";
import { idSchemaZ } from "@/validations/zod";
import { Context } from "hono";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await categoryService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getCategories = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;

  const search = c.req.query("search") as string;

  const response = await categoryService.getCategories({
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

export const getCategory = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await categoryService.getCategory(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

// Update category
export const updateCategory = async (c: Context) => {
  const _id = c.req.param("_id");
  const body = await c.req.json();

  const response = await categoryService.updateCategory({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Delete category
export const deleteCategory = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await categoryService.deleteCategory(_id);

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
  const _id = c.req.param("_id");
  const body = await c.req.parseBody();
  const file = body["avatar"] as File;

  const idValidation = idSchemaZ.safeParse({ _id });
  if (!idValidation.success) {
    return badRequestHandler(
      c,
      schemaValidationError(idValidation.error, "Invalid ID")
    );
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

  try {
    const category = await Category.findById(idValidation.data._id);

    if (!category) {
      return badRequestHandler(c, {
        message: `Category not found with provided ID!`,
      });
    }

    const response = await adminService.uploadSingleFile({
      body: { avatar: file },
      filename,
      folder: "admins",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update category.avatar.url and save
    category.image = {
      alt: filename,
      url: response.success.data,
    };

    await category.save();

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
