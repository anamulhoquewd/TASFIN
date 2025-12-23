import type { Context } from "hono";
import { badRequestHandler, serverErrorHandler } from "./../error/index.js";
import { productService } from "./../services/index.js";
import { parseDeleteUrls } from "./../utils/index.js";

export const register = async (c: Context) => {
  const formData = await c.req.formData();

  try {
    // Extract all fields from form data
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;

    const details = {
      fabric: formData.get("details[fabric]") as string,
      valueAddition: formData.get("details[valueAddition]") as string,
      cutFit: formData.get("details[cutFit]") as string,
      collarNeck: formData.get("details[collarNeck]") as string,
      sleeve: formData.get("details[sleeve]") as string,
      length: formData.get("details[length]") as string,
      washCare: formData.get("details[washCare]") as string,
      sideCut: formData.get("details[sideCut]") as string,
    };

    const description = formData.get("description") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    const isItNew = formData.get("isItNew") === "true";
    const isCustom = formData.get("isCustom") === "true";
    const status = formData.get("status") === "true";

    // Parse array fields
    const categories = JSON.parse(formData.get("categories") as string);
    const tags = JSON.parse(formData.get("tags") as string);

    // Parse key-featured description
    const keyFeatures = JSON.parse(formData.get("keyFeatures") as string);

    // Get main images
    const images = (formData.getAll("images") as File[]).filter(
      (f) => f && (f as File).name
    );

    const finalImages = images.map((file, index) => ({
      file,
      position: index,
    }));

    // Process variants
    const variants = [];
    let variantIndex = 0;

    while (formData.get(`variants[${variantIndex}][size]`)) {
      const images = (formData.getAll("images") as File[]).filter(
        (f) => f && (f as File).name
      );

      const finalImages = images.map((file, index) => ({
        file,
        position: index,
      }));

      const variant = {
        sku: formData.get(`variants[${variantIndex}][sku]`) as string,
        size: formData.get(`variants[${variantIndex}][size]`) as string,
        color: formData.get(`variants[${variantIndex}][color]`) as string,
        stock: parseInt(
          formData.get(`variants[${variantIndex}][stock]`) as string
        ),
        price: parseFloat(
          formData.get(`variants[${variantIndex}][price]`) as string
        ),

        images: finalImages,
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
      images: finalImages,
      variants,

      details,

      isFeatured,
      isItNew,
      isCustom,
      status,
      tags,
      keyFeatures,
    };

    console.log("BODY: ", body);

    // Call service
    const response = await productService.register(body);

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

export const getProductByVariantId = async (c: Context) => {
  const variantId = c.req.param("variantId");

  const response = await productService.getProductByVariantId(variantId);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

export const getProductBySku = async (c: Context) => {
  const sku = c.req.param("sku");

  const response = await productService.getProductBySku(sku);

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};

// update activity
export const updateActivity = async (c: Context) => {
  const productId = c.req.param("productId");
  if (!productId) {
    return badRequestHandler(c, { message: "Product ID is required" });
  }
  try {
    const body = await c.req.json();
    const response = await productService.updateActivity({
      productId,
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
    console.error("Update Activity Error:", err);
    return serverErrorHandler(c, { message: err.message || "Server error" });
  }
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

    const details = {
      fabric: formData["details[fabric]"] as string,
      valueAddition: formData["details[valueAddition]"] as string,
      cutFit: formData["details[cutFit]"] as string,
      collarNeck: formData["details[collarNeck]"] as string,
      sleeve: formData["details[sleeve]"] as string,
      length: formData["details[length]"] as string,
      washCare: formData["details[washCare]"] as string,
      sideCut: formData["details[sideCut]"] as string,
    };

    const data = {
      title: formData["title"] || "",
      slug: formData["slug"] || "",
      description: formData["description"] || "",
      keyFeatures,

      details,

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
    color: formData["color"] || "",
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

// Update main images
export const updateMainImages = async (c: Context) => {
  const productId = c.req.param("productId");
  if (!productId) return c.json({ message: "Product ID is required" }, 400);

  const formData = await c.req.formData();

  // Main images
  const newImages = (formData.getAll("images") as File[]).filter(
    (f) => f && (f as File).name
  );

  const finalImages = newImages.map((file, index) => ({
    file,
    position: index,
  }));

  const deleteImagePublicIds = formData.getAll(
    "deleteImagePublicIds"
  ) as string[];

  // In the controller:
  const keptImagePublicIds = formData.getAll("keptImagePublicIds") as string[];

  // In the service call:
  const response = await productService.updateMainImages({
    productId,
    data: { newImages: finalImages, deleteImagePublicIds, keptImagePublicIds },
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
  const newImages = (formData.getAll("images") as File[]).filter(
    (f) => f && (f as File).name
  );

  const finalImages = newImages.map((file, index) => ({
    file,
    position: index,
  }));

  const deleteImagePublicIds = parseDeleteUrls(formData, "deleteImagePublicId");

  const response = await productService.updateVImages({
    productId,
    variantId,
    data: { newImages: finalImages, deleteImagePublicIds },
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

  const body = await c.req.json();

  // Call service
  const response = await productService.createVariant({
    productId,
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
  const sortBy = c.req.query("sortBy") as "createdAt" | "updatedAt" | "title";
  const sortType = c.req.query("sortType") as "desc" | "asc";
  const search = c.req.query("search") as string;
  const isFeatured = c.req.query("isFeatured") as string;
  const isItNew = c.req.query("isItNew") as string;
  const isCustom = c.req.query("isCustom") as string;
  const status = c.req.query("status") as string;

  // categories in format category1,category2
  const categories = (c.req.query("categories") as string)?.split(",") || [];

  const category = c.req.query("category") as string;
  if (category) {
    categories.push(category);
  }

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
    isItNew,
    isCustom,
    status,
    priceRange: { min: minPrice, max: maxPrice },
    categories,
    category,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
