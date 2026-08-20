import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import connectDB from "./config/db.js";
import { notFound } from "./error/index.js";
import adminRoutes from "./routes/admins.route.js";
import categoryRoutes from "./routes/categorise.route.js";
import orderRoutes from "./routes/orders.route.js";
import productRoutes from "./routes/products.route.js";
import settingsRoutes from "./routes/settings.route.js";
import subscriberRoutes from "./routes/subscribers.controller.js";
import userRoutes from "./routes/users.route.js";

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const app = new Hono().basePath("/api/v1");

// Config MongoDB
connectDB()

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
