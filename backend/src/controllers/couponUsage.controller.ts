import type { Context } from "hono";
import { badRequestHandler, serverErrorHandler } from "../error/index.js";
import { couponUsageService } from "../services/index.js";

export const getCouponUsages = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const couponId = c.req.query("couponId") as string;
  const phone = c.req.query("phone") as string;

  const response = await couponUsageService.getCouponUsages({
    page,
    limit,
    sortBy,
    sortType,

    couponId,
    phone,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getCouponUsage = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await couponUsageService.getCouponUsage(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const updateCouponUsage = async (c: Context) => {
  const _id = c.req.param("_id");
  if (!_id)
    return badRequestHandler(c, { message: "coupon usage ID is required" });

  const body = await c.req.json();

  const response = await couponUsageService.updateCouponUsage({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const deleteCouponUsage = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await couponUsageService.deleteCouponUsage(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
