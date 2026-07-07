import type { Context } from "hono";
import { uploadSingleFile } from "../utils/cloudinary.js";
import { badRequestHandler, serverErrorHandler } from "./../error/index.js";
import Settings from "./../models/settings.model.js";
import { settingsService } from "./../services/index.js";

export const getSettings = async (c: Context) => {
  const response = await settingsService.getSettings();

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update settings
export const updateSettings = async (c: Context) => {
  const body = await c.req.json();

  const response = await settingsService.updateSettings(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Change Admin Logo
export const changeLogo = async (c: Context) => {
  const body = await c.req.parseBody();
  const file = body["avatar"] as File;

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

  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return badRequestHandler(c, {
        message: `Settings not found`,
      });
    }

    const response = await uploadSingleFile(file, "settings");

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update and save
    settings.logo = {
      url: response.success.data.url,
      publicId: response.success.data.publicId,
      position: 0,
    };

    await settings.save();

    return c.json(response.success, 201);
  } catch (error: any) {
    return c.json(
      {
        success: false,
        message: "Logo avatar upload failed",
        error: error.message,
      },
      500
    );
  }
};
