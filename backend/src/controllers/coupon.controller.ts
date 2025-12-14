import type { Context } from "hono";
import { couponService } from "../services/index.js";
import { badRequestHandler, serverErrorHandler } from "../error/index.js";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const response = await couponService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const validate = async (c: Context) => {
  const body = await c.req.json();

  const response = await couponService.validate(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getCoupons = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const search = c.req.query("search") as string;

  const response = await couponService.getCoupons({
    page,
    limit,
    sortBy,
    sortType,

    search,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getCoupon = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await couponService.getCoupon(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const updateCoupon = async (c: Context) => {
  const _id = c.req.param("_id");
  if (!_id) return badRequestHandler(c, { message: "coupon ID is required" });

  const body = await c.req.json();

  const response = await couponService.updateCoupon({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const deleteCoupon = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await couponService.deleteCoupon(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
