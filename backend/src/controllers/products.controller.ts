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

    // Parse array fields
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]"
    );
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    // Parse description (TipTap JSON)
    const description = JSON.parse(
      (formData.get("description") as string) || "{}"
    );

    // New main images
    const mainImages = formData.getAll("images") as File[];

    // Images to delete (URLs sent from frontend)
    const deleteImageUrls = JSON.parse(
      (formData.get("deleteImageUrls") as string) || "[]"
    );

    // Variant updates
    const variants: any[] = [];
    const variantImages: Record<number, File[]> = {};
    const deleteVariantImageUrls: Record<number, string[]> = {};

    let variantIndex = 0;
    while (formData.get(`variants[${variantIndex}][size]`)) {
      const size = formData.get(`variants[${variantIndex}][size]`) as string;
      const color = formData.get(`variants[${variantIndex}][color]`) as string;
      const stock = parseInt(
        formData.get(`variants[${variantIndex}][stock]`) as string
      );
      const price = parseFloat(
        formData.get(`variants[${variantIndex}][price]`) as string
      );
      const variantId = formData.get(`variants[${variantIndex}][id]`) as
        | string
        | null;

      // Push variant data
      variants.push({ id: variantId, size, color, stock, price });

      // New images for this variant
      const vImages = formData.getAll(
        `variants[${variantIndex}][images]`
      ) as File[];
      if (vImages.length > 0) variantImages[variantIndex] = vImages;

      // Images to delete for this variant
      const vDeleteUrls = JSON.parse(
        (formData.get(`variants[${variantIndex}][deleteImages]`) as string) ||
          "[]"
      );
      if (vDeleteUrls.length > 0)
        deleteVariantImageUrls[variantIndex] = vDeleteUrls;

      variantIndex++;
    }

    // Prepare update input
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
        variants, // variant fields only, images handled separately
      },
      mainImages,
      variantImages,
      deleteImageUrls,
      deleteVariantImageUrls,
    };

    // Call update service
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
// export const deleteProduct = async (c: Context) => {
//   const _id = c.req.param("_id");

//   const response = await productService.deleteUsers(_id);

//   if (response.error) {
//     return badRequestHandler(c, response.error);
//   }

//   if (response.serverError) {
//     return serverErrorHandler(c, response.serverError);
//   }

//   return c.json(response.success, 200);
// };

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
