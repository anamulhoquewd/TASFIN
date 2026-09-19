import type { Context } from "hono";
import { kidsService } from "../services/index.js";
import { badRequestHandler, serverErrorHandler } from "../error/index.js";
import { parseDeleteUrls } from "../utils/index.js";

export const register = async (c: Context) => {
  const formData = await c.req.formData();
  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const fabric = String(formData.get("fabric") ?? "");

  let sizes: string[];
  let colors: string[];
  try {
    sizes = JSON.parse(String(formData.get("sizes") ?? "[]"));
    colors = JSON.parse(String(formData.get("colors") ?? "[]"));
  } catch {
    return badRequestHandler(c, { message: "Invalid JSON in sizes or colors" });
  }

  const images = (formData.getAll("images") as File[]).map((file, index) => ({
    file,
    position: Number(formData.get(`images[${index}][position]`) ?? index),
    alt: String(formData.get(`images[${index}][alt]`) ?? name),
  }));

  const body = {
    name,
    description,
    fabric,
    sizes,
    colors,
    images,
    moq: Number(formData.get("moq") ?? 0),
    minPrice: Number(formData.get("minPrice") ?? 0),
    maxPrice: Number(formData.get("maxPrice") ?? 0),
    isActive: formData.get("isActive") === "true",
  };

  const response = await kidsService.register(body);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const inquiry = async (c: Context) => {
  const body = await c.req.json();

  const response = await kidsService.inquiry(body);

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getKidsProducts = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;

  const isActive = c.req.query("isActive") as string;
  const search = c.req.query("search") as string;

  const response = await kidsService.getKidsProducts({
    page,
    limit,
    sortBy,
    sortType,
    isActive,
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

export const getKidsProduct = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await kidsService.getKidsProduct(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Update subscriber
export const updateKidsProduct = async (c: Context) => {
  const _id = c.req.param("_id");
  if (!_id)
    return badRequestHandler(c, { message: "subscriber ID is required" });

  const body = await c.req.json();

  const response = await kidsService.updateKidsProduct({ _id, body });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const updateKidsImages = async (c: Context) => {
  const _id = c.req.param("_id");
  if (!_id) {
    return badRequestHandler(c, { message: "Kids product ID is required" });
  }

  const formData = await c.req.formData();

  const images = (formData.getAll("images") as File[])
    .filter((file) => file && file.name)
    .map((file, index) => ({
      file,
      position: Number(formData.get(`images[${index}][position]`) ?? index),
      alt: String(
        formData.get(`images[${index}][alt]`) ?? "kids-product-image",
      ),
    }));

  const deleteImageUrls = parseDeleteUrls(formData, "deleteImageUrl");
  const reorderedImageUrlsRaw = formData.get("reorderedImageUrls");
  const reorderedImageUrls = reorderedImageUrlsRaw
    ? JSON.parse(String(reorderedImageUrlsRaw))
    : [];

  const response = await kidsService.updateKidsImages({
    _id,
    data: { images, deleteImageUrls, reorderedImageUrls },
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Delete subscriber
export const deleteKidsProduct = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await kidsService.deleteKidsProduct(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
