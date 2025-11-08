import { schemaValidationError } from "./../error/index.js";
import Settings from "./../models/settings.model.js";
import {
  settingCreateZ,
  type SettingUpdateInput,
  settingUpdateZ,
} from "./../validations/zod.js";
import dotenv from "dotenv";
dotenv.config();

const NAME = process.env.SITE_NAME;
const PHONE = process.env.SITE_PHONE;
const EMAIL = process.env.SITE_EMAIL;
const STREET = process.env.SITE_STREET;

export const register = async () => {
  // Safe Parse for better error handling
  const validData = settingCreateZ.safeParse({
    siteName: NAME,
    siteDescription: `${NAME} E-commerce Platform`,
    contactEmail: EMAIL,
    contactPhone: PHONE,
    address: {
      street: STREET,
      country: "Bangladesh",
      city: "Dhaka",
      state: "Dhaka",
      zipCode: "1219",
    },
  });

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    // Create Settings
    const settings = new Settings(validData.data);

    // Save Settings
    const docs = await settings.save();

    // Response
    return {
      message: "Settings created successfully!",
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

export const getSettings = async () => {
  try {
    const settings = await Settings.findOne();

    return {
      success: {
        success: true,
        message: "Settings fetched successfully!",
        data: settings,
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

export const updateSettings = async (body: SettingUpdateInput) => {
  // Validation without NID for update
  const validData = settingUpdateZ.safeParse(body);

  if (!validData.success) {
    return {
      error: schemaValidationError(validData.error, "Invalid request body"),
    };
  }

  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return {
        notFound: {
          success: false,
          message: "Settings not found",
        },
      };
    }

    // Merge only allowed fields into settings
    Object.assign(settings, validData.data);

    const docs = await settings.save();

    return {
      success: {
        success: true,
        message: "Settings updated successfully!",
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
