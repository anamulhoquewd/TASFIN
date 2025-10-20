import { badRequestHandler, serverErrorHandler } from "@/error";
import Settings from "@/models/settings.model";
import { adminService, settingsService } from "@/services";
import { Context } from "hono";

export const getSettings = async (c: Context) => {
  const response = await settingsService.getSettings();

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
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

  // Generate filename
  const fileN = c.req.query("filename") || "avatar";
  const filename = `${fileN}-${Date.now()}.webp`;

  try {
    const settings = await Settings.findOne();

    if (!settings) {
      return badRequestHandler(c, {
        message: `Settings not found`,
      });
    }

    const response = await adminService.uploadSingleFile({
      body: { avatar: file },
      filename,
      folder: "settings",
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    // Update settings.logo.url and save
    settings.logo = {
      alt: filename,
      url: response.success.data,
    };

    await settings.save();

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
