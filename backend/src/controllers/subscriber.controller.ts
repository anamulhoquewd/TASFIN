import type { Context } from "hono";
import { badRequestHandler, serverErrorHandler } from "../error/index.js";
import { subscribersService } from "../services/index.js";

export const register = async (c: Context) => {
  const userAgent = c.req.header("User-Agent");
  const ip = c.req.header("X-Forwarded-For") || "Unknown IP";
  const body = await c.req.json();

  body.userAgent = userAgent;
  body.ipAddress = ip;

  const response = await subscribersService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getSubscribers = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const verified = c.req.query("verified") as string;
  const isBlocked = c.req.query("isBlocked") as string;
  const search = c.req.query("search") as string;

  const response = await subscribersService.getSubscribers({
    page,
    limit,
    sortBy,
    sortType,
    verified,
    isBlocked,
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

export const getSubscriber = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await subscribersService.getSubscriber(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update subscriber
export const updateSubscriber = async (c: Context) => {
  const _id = c.req.param("_id");
  if (!_id)
    return badRequestHandler(c, { message: "subscriber ID is required" });

  const body = await c.req.json();

  const response = await subscribersService.updateSubscriber({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Delete subscriber
export const deleteSubscriber = async (c: Context) => {
  const _id = c.req.param("_id");

  const response = await subscribersService.deleteSubscriber(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
