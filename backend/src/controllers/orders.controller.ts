import { badRequestHandler, serverErrorHandler } from "@/error";
import { orderService } from "@/services";
import { setAuthCookie } from "@/utils";
import { Context } from "hono";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await orderService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  await setAuthCookie(
    c,
    "X-User-Phone",
    response.success.user.phone,
    60 * 60 * 24 * 365
  );

  return c.json(response.success, 201);
};

// Update order
export const updateOrder = async (c: Context) => {
  const body = await c.req.json();
  const _id = c.req.param("_id");

  const response = await orderService.updateOrder({ body, _id });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// // Delete Order
export const deleteOrder = async (c: Context) => {
  const orderId = c.req.param("orderId");

  const response = await orderService.deleteOrder(orderId);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// // Get all products
export const getOrders = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const search = c.req.query("search") as string;
  // date range in format from-to, e.g., 2023-01-01_2023-12-31
  const fromDate = c.req.query("fromDate") ?? undefined;
  const toDate = c.req.query("toDate") ?? undefined;
  const variantId = c.req.query("variantId") as string;
  const date = c.req.query("date") as string;
  const userId = c.req.query("userId") as string;
  const status = c.req.query("status") as
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  const paymentStatus = c.req.query("paymentStatus") as "paid" | "unpaid";
  const phone = c.req.query("phone") as string;
  const email = c.req.query("email") as string;

  const response = await orderService.getOrders({
    page,
    limit,
    sortBy,
    sortType,
    search,
    dateRange: { from: fromDate, to: toDate },
    date,
    userId,
    status,
    paymentStatus,
    variantId,
    phone,
    email,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getOrder = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await orderService.getOrder(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
