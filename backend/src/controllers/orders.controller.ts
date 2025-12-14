import { badRequestHandler, serverErrorHandler } from "./../error/index.js";
import { orderService } from "./../services/index.js";
import type { Context } from "hono";

export const register = async (c: Context) => {
  const formData = await c.req.formData();

  try {
    /* ================= BASIC INFO ================= */
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = (formData.get("email") as string) || undefined;
    const paymentMethod = formData.get("paymentMethod") as "cod";
    const couponCode = (formData.get("couponCode") as string) || undefined;

    /* ================= ADDRESS ================= */
    const address = {
      street: formData.get("address[street]") as string,
      city: formData.get("address[city]") as string,
      state: formData.get("address[state]") as string,
      zipCode: formData.get("address[zipCode]") as string,
      country: formData.get("address[country]") as string,
    };

    /* ================= ORDER ITEMS ================= */
    const items = JSON.parse(formData.get("items") as string);

    /* ================= FLAGS ================= */
    const isCustom = formData.get("customOrder[isCustom]") === "true";

    /* ================= CUSTOM ORDER ================= */
    let customOrder: any = { isCustom };

    if (isCustom) {
      /* ---- Measurements ---- */
      const topMeasurement = formData.get("customOrder[measurements][top]");
      const bottomMeasurement = formData.get(
        "customOrder[measurements][bottom]"
      );

      customOrder.measurements = {
        top: topMeasurement ? JSON.parse(topMeasurement as string) : undefined,
        bottom: bottomMeasurement
          ? JSON.parse(bottomMeasurement as string)
          : undefined,
      };

      /* ---- Reference Images ---- */
      const refImages = formData.getAll(
        "customOrder[referenceImages][files][]"
      ) as File[];

      const refPositions = formData
        .getAll("customOrder[referenceImages][positions][]")
        .map(Number);

      customOrder.referenceImages = refImages.map((file, i) => ({
        file,
        position: refPositions[i] ?? i,
      }));

      /* ---- Note ---- */
      const note = formData.get("customOrder[note]");
      if (note) customOrder.note = note;
    }

    /* ================= FINAL PAYLOAD ================= */
    const body = {
      name,
      phone,
      email,
      address,
      items,
      paymentMethod,
      customOrder,
      couponCode,
      shippingCost: 0,
    };

    /* ================= SERVICE ================= */
    const response = await orderService.register(body);

    if (response.error) {
      return badRequestHandler(c, response.error);
    }

    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    return c.json(response.success, 201);
  } catch (error: any) {
    return serverErrorHandler(c, {
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
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
