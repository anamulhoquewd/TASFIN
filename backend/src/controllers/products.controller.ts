import type { Context } from "hono";
import { badRequestHandler, serverErrorHandler } from "./../error/index.js";
import { productService } from "./../services/index.js";
import { parseDeleteUrls } from "./../utils/index.js";

export const register = async (c: Context) => {
  const formData = await c.req.formData();

  // Extract all fields from form data
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") === "true";

  let categories: string[], tags: string[], keyFeatures: string[];
  let specifications: Array<{
    key: string;
    value: string;
  }>;
  let discount:
    | {
        discountType: "percentage" | "fixed";
        value: number;
        startAt?: Date;
        endAt?: Date;
      }
    | undefined;

  try {
    categories = JSON.parse((formData.get("categories") as string) ?? "[]");
    tags = JSON.parse((formData.get("tags") as string) ?? "[]");
    keyFeatures = JSON.parse((formData.get("keyFeatures") as string) ?? "[]");

    specifications = JSON.parse(
      (formData.get("specifications") as string) ?? "[]",
    );

    const rawDiscount = formData.get("discount") as string | null;
    const parsedDiscount = rawDiscount ? JSON.parse(rawDiscount) : undefined;

    if (
      parsedDiscount &&
      parsedDiscount.discountType &&
      typeof parsedDiscount.value === "number"
    ) {
      discount = {
        discountType: parsedDiscount.discountType,
        value: Number(parsedDiscount.value),
        startAt: parsedDiscount.startAt
          ? new Date(parsedDiscount.startAt)
          : undefined,
        endAt: parsedDiscount.endAt
          ? new Date(parsedDiscount.endAt)
          : undefined,
      };
    } else {
      discount = undefined;
    }
  } catch {
    return badRequestHandler(c, {
      message: "Invalid JSON in categories/tags/keyFeatures/specifications",
    });
  }

  // Get main images
  const images = (formData.getAll("images") as File[]).map((file, index) => ({
    file,
    position: Number(formData.get(`images[${index}][position]`) ?? index),
    alt: (formData.get(`images[${index}][alt]`) as string) || title,
  }));

  // Process variants
  const variants = [];
  let variantIndex = 0;

  while (formData.get(`variants[${variantIndex}][sku]`)) {
    let rawAttributes: Array<{ key: string; value: string }>;
    try {
      rawAttributes = JSON.parse(
        (formData.get(`variants[${variantIndex}][attributes]`) as string) ??
          "[]",
      );
    } catch {
      return badRequestHandler(c, {
        message: `Invalid JSON in variants[${variantIndex}][attributes]`,
      });
    }

    variants.push({
      sku: formData.get(`variants[${variantIndex}][sku]`) as string,
      attributes: rawAttributes,
      stock: parseInt(
        formData.get(`variants[${variantIndex}][stock]`) as string,
        10,
      ),
      price: parseFloat(
        formData.get(`variants[${variantIndex}][price]`) as string,
      ),
      images: (
        formData.getAll(`variants[${variantIndex}][images]`) as File[]
      ).map((file, index) => ({
        file,
        position: Number(
          formData.get(
            `variants[${variantIndex}][images][${index}][position]`,
          ) ?? index,
        ),
        alt:
          (formData.get(
            `variants[${variantIndex}][images][${index}][alt]`,
          ) as string) ||
          (formData.get(`variants[${variantIndex}][sku]`) as string),
      })),
    });
    variantIndex++;
  }
  // Prepare body for service
  const body = {
    title,
    slug,
    description,
    categories,
    images,
    variants,
    isFeatured,
    isActive,
    tags,
    keyFeatures,
    specifications,
    discount,
  };

  console.log("Body: ", body);

  // Call service
  const response = await productService.register({
    body,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const getProduct = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await productService.getProduct(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getProductBySlug = async (c: Context) => {
  const slug = c.req.param("slug") as string;

  const response = await productService.getProductBySlug(slug);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// update general info
export const updateDiscount = async (c: Context) => {
  const _id = c.req.param("productId");
  const body = await c.req.json();

  if (!_id) {
    return badRequestHandler(c, { message: "Product ID is required" });
  }

  console.log("Discount body: ", body)

  try {
    const response = await productService.updateDiscount({
      _id,
      data: body,
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }
    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    return c.json({ success: true, data: response.success }, 200);
  } catch (err: any) {
    console.error("Update General Info Error:", err);
    return serverErrorHandler(c, { message: err.message || "Server error" });
  }
};

// update general info
export const updateGeneralInfo = async (c: Context) => {
  const _id = c.req.param("productId");
  if (!_id) {
    return badRequestHandler(c, { message: "Product ID is required" });
  }

  try {
    // form-data
    const formData = await c.req.parseBody();

    // categories / tags
    const categories = formData["categories"]
      ? JSON.parse(formData["categories"] as string)
      : [];
    const tags = formData["tags"] ? JSON.parse(formData["tags"] as string) : [];
    const keyFeatures = formData["keyFeatures"]
      ? JSON.parse(formData["keyFeatures"] as string)
      : [];
    const specifications = formData["specifications"]
      ? JSON.parse(formData["specifications"] as string)
      : [];
    const discount = formData["discount"]
      ? JSON.parse(formData["discount"] as string)
      : undefined;

    const data = {
      title: formData["title"] || "",
      slug: formData["slug"] || "",
      description: formData["description"] || "",
      keyFeatures,
      specifications,
      discount,
      isFeatured: formData["isFeatured"] === "true",
      isActive: formData["isActive"] === "true",
      categories,
      tags,
    };

    const response = await productService.updateGeneralInfo({
      _id,
      data,
    });

    if (response.error) {
      return badRequestHandler(c, response.error);
    }
    if (response.serverError) {
      return serverErrorHandler(c, response.serverError);
    }

    return c.json({ success: true, data: response.success }, 200);
  } catch (err: any) {
    console.error("Update General Info Error:", err);
    return serverErrorHandler(c, { message: err.message || "Server error" });
  }
};

// Update variant info
export const updateVariantInfo = async (c: Context) => {
  const _id = c.req.param("productId");
  const vId = c.req.param("variantId");
  if (!_id || !vId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  // form-data
  const formData = await c.req.parseBody();

  const body = {
    sku: formData["sku"] || "",
    attributes: formData["attributes"]
      ? JSON.parse(formData["attributes"] as string)
      : [],
    price: parseFloat(formData["price"] as string) || 0,
    stock: parseInt(formData["stock"] as string, 10) || 0,
  };

  const response = await productService.updateVariantInfo({
    _id,
    vId,
    data: body,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }
  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }
  return c.json(response.success, 200);
};

// Update main iamges
export const updateMainImages = async (c: Context) => {
  const _id = c.req.param("productId");
  if (!_id) return c.json({ message: "Product ID is required" }, 400);

  const formData = await c.req.formData();

  const images = (formData.getAll("images") as File[])
    .filter((file) => file && file.name)
    .map((file, index) => ({
      file,
      position: Number(formData.get(`images[${index}][position]`) ?? index),
      alt: (formData.get(`images[${index}][alt]`) as string) || "product-image",
    }));

  const deleteImageUrls = parseDeleteUrls(formData, "deleteImageUrl");
  const reorderedImageUrlsRaw = formData.get("reorderedImageUrls");
  const reorderedImageUrls = reorderedImageUrlsRaw
    ? JSON.parse(String(reorderedImageUrlsRaw))
    : [];

  const response = await productService.updateMainImages({
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

// Update variant iamges
export const updateVImages = async (c: Context) => {
  const _id = c.req.param("productId");
  const vId = c.req.param("variantId");
  if (!_id || !vId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  const formData = await c.req.formData();

  const images = (formData.getAll("images") as File[])
    .filter((file) => file && file.name)
    .map((file, index) => ({
      file,
      position: Number(formData.get(`images[${index}][position]`) ?? index),
      alt: (formData.get(`images[${index}][alt]`) as string) || "product-image",
    }));

  const deleteImageUrls = parseDeleteUrls(formData, "deleteImageUrl");
  const reorderedImageUrlsRaw = formData.get("reorderedImageUrls");
  const reorderedImageUrls = reorderedImageUrlsRaw
    ? JSON.parse(String(reorderedImageUrlsRaw))
    : [];

  const response = await productService.updateVImages({
    _id,
    vId,
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

// Delet variant
export const deleteVariant = async (c: Context) => {
  const _id = c.req.param("productId");
  const vId = c.req.param("variantId");
  if (!_id || !vId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  const response = await productService.deleteVariant({ _id, vId });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// Create new variant
export const createVariant = async (c: Context) => {
  const _id = c.req.param("productId");
  if (!_id)
    return badRequestHandler(c, {
      message: "Product ID is required",
    });

  const formData = await c.req.formData();

  const images = (formData.getAll("images") as File[]).map((file, index) => ({
    file,
    position: Number(formData.get(`images[${index}][position]`) ?? index),
    alt: (formData.get(`images[${index}][alt]`) as string) || "product-image",
  }));

  let attributes: Array<{ key: string; value: string }>;
  try {
    attributes = JSON.parse((formData.get("attributes") as string) ?? "[]");
  } catch {
    return badRequestHandler(c, { message: "Invalid JSON in attributes" });
  }
  const sku = formData.get("sku") as string;
  const stock = parseInt(formData.get("stock") as string, 10);
  const price = parseFloat(formData.get("price") as string);

  console.log("Images: ", images);

  // Call service
  const response = await productService.createVariant({
    data: { images, sku, attributes, stock, price },
    _id,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// // Delete product
export const deleteProduct = async (c: Context) => {
  const _id = c.req.param("_id") as string;

  const response = await productService.deleteProduct(_id);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// // Get all products
export const getProducts = async (c: Context) => {
  const page = parseInt(c.req.query("page") as string, 10) || 1;
  const limit = parseInt(c.req.query("limit") as string, 10) || 10;
  const sortBy = c.req.query("sortBy") as string;
  const sortType = c.req.query("sortType") as string;
  const search = c.req.query("search") as string;
  const isFeatured = c.req.query("isFeatured") as string;
  const isActive = c.req.query("isActive") as string;

  // categories in format category1,category2
  const categories = (c.req.query("categories") as string)?.split(",") || [];

  // priceRange in format min-max, e.g., 100-500
  const minPrice = parseInt(c.req.query("minPrice") as string, 10) || 0;
  const maxPrice = parseInt(c.req.query("maxPrice") as string, 10) || 10000;

  const response = await productService.getProducts({
    page,
    limit,
    sortBy,
    sortType,

    search,

    isFeatured,
    isActive,
    priceRange: { min: minPrice, max: maxPrice },
    categories,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
