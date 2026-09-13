import { config } from "dotenv";
import { schemaValidationError } from "../src/error/index.js";
import Admin from "../src/models/admins.model.js";
import { adminCreateZ } from "../src/validations/zod.js";
import connectDB from "../src/config/db.js";
config();

// Config MongoDB
connectDB()

// Get environment variables
const NAME = process.env.ADMIN_NAME;
const EMAIL = process.env.ADMIN_EMAIL;
const PHONE = process.env.ADMIN_PHONE;
const PASSWORD = process.env.ADMIN_PASSWORD;
const NID = process.env.ADMIN_NID;

const registerSuperAdmin = async () => {
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

registerSuperAdmin()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
