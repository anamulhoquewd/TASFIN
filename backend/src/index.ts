import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import connectDB from "@/config/db.js";
import adminRoutes from "@/routes/admins.route.js";
import { notFound } from "@/error/index.js";
import userRoutes from "./routes/users.route";
import { adminService } from "./services";
import categoryRoutes from "./routes/categorise.route";

const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB()
  .then(async () => {
    // Call the Super Admin Service function after connecting to MongoDB
    const result = await adminService.registerSuperAdmin();

    if (result.success) {
      console.log(result.message || "Super admin created successfully!");
    }
  })
  .catch((error) => {
    console.error("Failed to initialize super admin:", error);
  });

app.use(
  logger(),
  prettyJSON(),
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow cookies
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Ensure OPTIONS is handled
    allowHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// Health check
app.get("/health", (c) => c.text("API is healthy!"));

// Admin routes
app.route("/admins", adminRoutes);

// User routes
app.route("/users", userRoutes);

// Category routes
app.route("/categories", categoryRoutes);

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
