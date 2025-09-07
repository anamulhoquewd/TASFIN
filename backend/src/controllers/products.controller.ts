import { badRequestHandler, serverErrorHandler } from "@/error";
import { productService } from "@/services";
import { UpdateProductInput } from "@/services/products.service";
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
  const isFeatured = formData.get("isFeatured") === "true";
  const isActive = formData.get("isActive") === "true";

  // Parse array fields
  const categories = JSON.parse(formData.get("categories") as string);
  const tags = JSON.parse(formData.get("tags") as string);

  // Parse description
  const description = JSON.parse(formData.get("description") as string);

  // Get main images
  const images = formData.getAll("images") as File[];

  // Process variants
  const variants = [];
  let variantIndex = 0;

  while (formData.get(`variants[${variantIndex}][size]`)) {
    const variant = {
      size: formData.get(`variants[${variantIndex}][size]`) as string,
      color: formData.get(`variants[${variantIndex}][color]`) as string,
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
  };

  // Call service
  const response = await productService.register({
    body,
    folder: "products",
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 201);
};

export const updateProduct = async (c: Context) => {
  try {
    const formData = await c.req.formData();
    const productId = c.req.param("productId");
    if (!productId) return c.json({ message: "Product ID is required" }, 400);

    // Extract simple fields
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
    const isFeatured = formData.get("isFeatured") === "true";
    const isActive = formData.get("isActive") === "true";

    // Parse arrays
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const description = JSON.parse(
      (formData.get("description") as string) || "{}"
    );

    // Main images
    const mainImages = formData.getAll("images") as File[];
    const deleteImageUrls = JSON.parse(
      (formData.get("deleteImageUrls") as string) || "[]"
    );

    // Variants
    const variants: any[] = [];
    const variantImages: Record<string, File[]> = {};
    const deleteVariantImageUrls: Record<string, string[]> = {};

    let index = 0;
    while (formData.get(`variants[${index}][size]`)) {
      const size = formData.get(`variants[${index}][size]`) as string;
      const color = formData.get(`variants[${index}][color]`) as string;
      const stock = parseInt(
        formData.get(`variants[${index}][stock]`) as string
      );
      const price = parseFloat(
        formData.get(`variants[${index}][price]`) as string
      );
      const variantId = formData.get(`variants[${index}][id]`) as string | null;

      variants.push({ id: variantId, size, color, stock, price });

      const vImages = formData.getAll(`variants[${index}][images]`) as File[];
      if (vImages.length) variantImages[variantId || `new-${index}`] = vImages;

      const vDeleteUrls = JSON.parse(
        (formData.get(`variants[${index}][deleteImages]`) as string) || "[]"
      );
      if (vDeleteUrls.length)
        deleteVariantImageUrls[variantId || `new-${index}`] = vDeleteUrls;

      index++;
    }

    const updateInput: UpdateProductInput = {
      productId,
      data: {
        title,
        slug,
        description,
        categories,
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
        variants,
      },
      mainImages,
      variantImages,
      deleteImageUrls,
      deleteVariantImageUrls,
    };

    const response = await productService.updateProduct(updateInput);

    if (response.error) return badRequestHandler(c, response.error);
    if (response.serverError)
      return serverErrorHandler(c, response.serverError);

    return c.json(response.success, 200);
  } catch (err: any) {
    return c.json({ message: err.message || "Something went wrong" }, 500);
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

// // Delete user
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

  const response = await productService.getProducts({
    page,
    limit,
    sortBy,
    sortType,

    search,

    isFeatured,
    isActive,
  });

  if (response.error) {
    return badRequestHandler(c, response.error);
  }

  if (response.serverError) {
    return serverErrorHandler(c, response.serverError);
  }

  return c.json(response.success, 200);
};
