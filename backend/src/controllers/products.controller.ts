import { badRequestHandler, serverErrorHandler } from "@/error";
import { productService } from "@/services";
import { parseDeleteUrls } from "@/utils";
import { Context } from "hono";

export const register = async (c: Context) => {
  const formData = await c.req.formData();

  // Extract all fields from form data
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const fabric = formData.get("fabric") as string;
  const valueAddition = formData.get("valueAddition") as string;
  const cutFit = formData.get("cutFit") as string;
  const collarNeck = formData.get("collarNeck") as string;
  const sleeve = formData.get("sleeve") as string;
  const length = formData.get("length") as string;
  const washCare = formData.get("washCare") as string;
  const sideCut = formData.get("sideCut") as string;
  const description = formData.get("description") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") === "true";

  // Parse array fields
  const categories = JSON.parse(formData.get("categories") as string);
  const tags = JSON.parse(formData.get("tags") as string);

  // Parse key-featured description
  const keyFeatures = JSON.parse(formData.get("keyFeatures") as string);

  // Get main images
  const images = formData.getAll("images") as File[];

  // Process variants
  const variants = [];
  let variantIndex = 0;

  while (formData.get(`variants[${variantIndex}][size]`)) {
    const variant = {
      size: formData.get(`variants[${variantIndex}][size]`) as string,
      stock: parseInt(
        formData.get(`variants[${variantIndex}][stock]`) as string
      ),
      price: parseFloat(
        formData.get(`variants[${variantIndex}][price]`) as string
      ),
      images: formData.getAll(`variants[${variantIndex}][images]`) as File[],
    };
    variants.push(variant);
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
    fabric,
    valueAddition,
    cutFit,
    collarNeck,
    sleeve,
    length,
    washCare,
    sideCut,
    isFeatured,
    isActive,
    tags,
    keyFeatures,
  };

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
  const productId = c.req.param("productId");

  const response = await productService.getProduct(productId);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getProductBySlug = async (c: Context) => {
  const slug = c.req.param("slug");

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
export const updateGeneralInfo = async (c: Context) => {
  const productId = c.req.param("productId");
  if (!productId) {
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

    const data = {
      title: formData["title"] || "",
      slug: formData["slug"] || "",
      description: formData["description"] || "",
      keyFeatures,
      fabric: formData["fabric"] || "",
      valueAddition: formData["valueAddition"] || "",
      cutFit: formData["cutFit"] || "",
      collarNeck: formData["collarNeck"] || "",
      sleeve: formData["sleeve"] || "",
      length: formData["length"] || "",
      washCare: formData["washCare"] || "",
      sideCut: formData["sideCut"] || "",
      isFeatured: formData["isFeatured"] === "true",
      isActive: formData["isActive"] === "true",
      categories,
      tags,
    };

    const response = await productService.updateGeneralInfo({
      productId,
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
  const productId = c.req.param("productId");
  const variantId = c.req.param("variantId");
  if (!productId || !variantId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  // form-data
  const formData = await c.req.parseBody();

  const body = {
    size: formData["size"] || "",
    price: parseInt(formData["price"] as string) || 0,
    stock: parseInt(formData["stock"] as string) || 0,
  };

  const response = await productService.updateVariantInfo({
    productId,
    variantId,
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
  const productId = c.req.param("productId");
  if (!productId) return c.json({ message: "Product ID is required" }, 400);

  const formData = await c.req.formData();

  // Main images
  const mainImages = (formData.getAll("images") as File[]).filter(
    (f) => f && (f as File).name
  );

  const deleteImageUrls = parseDeleteUrls(formData, "deleteImageUrl");

  const response = await productService.updateMainImages({
    productId,
    data: { mainImages, deleteImageUrls },
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
  const productId = c.req.param("productId");
  const variantId = c.req.param("variantId");
  if (!productId || !variantId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  const formData = await c.req.formData();

  // Main images
  const images = (formData.getAll("images") as File[]).filter(
    (f) => f && (f as File).name
  );

  const deleteImageUrls = parseDeleteUrls(formData, "deleteImageUrl");

  const response = await productService.updateVImages({
    productId,
    variantId,
    data: { images, deleteImageUrls },
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
  const productId = c.req.param("productId");
  const variantId = c.req.param("variantId");
  if (!productId || !variantId)
    return badRequestHandler(c, {
      message: "Product & Variant ID is required",
    });

  const response = await productService.deleteVariant({ productId, variantId });

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
  const productId = c.req.param("productId");
  if (!productId)
    return badRequestHandler(c, {
      message: "Product ID is required",
    });

  const formData = await c.req.formData();

  // Get main images
  const images = formData.getAll("images") as File[];

  const size = formData.get("size") as string;
  const stock = parseInt(formData.get("stock") as string);
  const price = parseFloat(formData.get("price") as string);

  // Call service
  const response = await productService.createVariant({
    data: { images, size, stock, price },
    productId,
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
  const productId = c.req.param("productId");

  const response = await productService.deleteProduct(productId);

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
