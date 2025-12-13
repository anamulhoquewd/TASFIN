import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admins.route.js";
import { notFound } from "./error/index.js";
import userRoutes from "./routes/users.route.js";
import { adminService, settingsService } from "./services/index.js";
import categoryRoutes from "./routes/categorise.route.js";
import productRoutes from "./routes/products.route.js";
import orderRoutes from "./routes/orders.route.js";
import settingsRoutes from "./routes/settings.route.js";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscribers.controller.js";
import {
  deleteSingleFile,
  uploadMultipleFiles,
  uploadSingleFile,
} from "./utils/cloudinary.js";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB()
  .then(async () => {
    // Call the Super Admin Service function after connecting to MongoDB
    const [settingsResult, adminResult] = await Promise.all([
      settingsService.register(),
      adminService.registerSuperAdmin(),
    ]);

    if (settingsResult.success) {
      console.log(settingsResult.message || "Settings created successfully!");
    }
    if (adminResult.success) {
      console.log(
        adminResult.message || "Super admin initialized successfully!"
      );
    }
  })
  .catch((error) => {
    console.error("Failed to initialize super admin:", error);
  });

app.use(
  logger(),
  prettyJSON(),
  cors({
    origin: (origin) => {
      if (allowedOrigins.includes(origin)) return origin;

      return null;
    },
    // origin: "http://localhost:3000",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "X-User-ID"],
  })
);

// Health check
app.get("/health", (c) => c.text("API is healthy!"));

app.get("/", (c) => {
  const userAgent = c.req.header("User-Agent");
  return c.text(`Your user agent is ${userAgent}`);
});

// Admin routes
app.route("/admins", adminRoutes);

// User routes
app.route("/users", userRoutes);

// Category routes
app.route("/categories", categoryRoutes);

// Product routes
app.route("/products", productRoutes);

// Order routes
app.route("/orders", orderRoutes);

// Order routes
app.route("/subscribers", subscriberRoutes);

// Settings routes
app.route("/settings", settingsRoutes);

// ------------------

app.post("/upload-single", async (c) => {
  const form = await c.req.formData(); // FormData
  const file = form.get("file") as File; // 'file'

  const uploaded = await uploadSingleFile(file, "tasfin_products");
  return c.json(uploaded);
});

app.post("/upload-multiple", async (c) => {
  const form = await c.req.formData(); // FormData
  const files = form.getAll("files") as File[]; // 'files'

  console.log("Files: ", files);

  const uploaded = await uploadMultipleFiles(files, "tasfin_products");
  return c.json(uploaded);
});

app.delete("/delete", async (c) => {
  const publicId = c.req.query("publicId")!;
  const deleted = await deleteSingleFile(publicId);
  return c.json(deleted);
});

// ------------------

// Global Error Handler
app.onError((error: any, c) => {
  console.error("error: ", error);
  return c.json(
    {
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    },
    500
  );
});

// Not Found Handler
app.notFound((c) => {
  const error = notFound(c);
  return error;
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
