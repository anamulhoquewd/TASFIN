import { badRequestHandler, serverErrorHandler } from "@/error";
import { orderService } from "@/services";
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
  const user = c.req.query("user") as string;
  const status = c.req.query("status") as
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  const paymentStatus = c.req.query("paymentStatus") as "paid" | "unpaid";

  const response = await orderService.getOrders({
    page,
    limit,
    sortBy,
    sortType,
    search,
    dateRange: { from: fromDate, to: toDate },
    date,
    user,
    status,
    paymentStatus,
    variantId,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
