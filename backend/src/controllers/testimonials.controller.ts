import type { Context } from "hono";
import Testimonial from "../models/testimonial.model.js";
import {
  badRequestHandler,
  schemaValidationError,
  serverErrorHandler,
} from "./../error/index.js";
import { adminService, testimonialsService } from "./../services/index.js";
import { idSchemaZ } from "./../validations/zod.js";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await testimonialsService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getTestimonials = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;

  const search = c.req.query("search") as string;

  const response = await testimonialsService.getTestimonials({
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

export const getTestimonial = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await testimonialsService.getTestimonial(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update testimonial
export const updateTestimonial = async (c: Context) => {
  const _id = c.req.param("_id") as string;
  if (!_id) return badRequestHandler(c, { message: "testimonial ID is required" });

  const body = await c.req.json();

  const response = await testimonialsService.updateTestimonial({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Delete testimonial
export const deleteTestimonial = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await testimonialsService.deleteTestimonial(_id);

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
      schemaValidationError(idValidation.error, "Invalid ID"),
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
    const testimonial = await Testimonial.findById(idValidation.data._id);

    if (!testimonial) {
      return badRequestHandler(c, {
        message: `testimonial not found with provided ID!`,
      });
    }

    const response = await adminService.uploadSingleFileService({
      body: { avatar: file },
      folder: "testimonials",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update testimonial.avatar.url and save
    testimonial.avatar = {
      alt: filename,
      url: response.success.data.url,
      key: response.success.data.key,
      position: 0, // Default position
    };

    await testimonial.save();

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
