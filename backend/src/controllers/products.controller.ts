import { badRequestHandler, serverErrorHandler } from "@/error";
import { productService } from "@/services";
import { Context } from "hono";

// export const register = async (c: Context) => {
//   const body = await c.req.json();

//   const response = await productService.register(body);

//   if (response.error) {
//     return badRequestHandler(c, response.error);
//   }

//   if (response.serverError) {
//     return serverErrorHandler(c, response.serverError);
//   }

//   return c.json(response.success, 201);
// };

// Create product endpoint
export const register = async (c: Context) => {
  const formData = await c.req.formData();

  // Extract all fields from form data
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
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

// // Get all products
// export const getProducts = async (c: Context) => {
//   const page = parseInt(c.req.query("page") as string, 10) || 1;
//   const limit = parseInt(c.req.query("limit") as string, 10) || 10;
//   const sortBy = c.req.query("sortBy") as string;
//   const sortType = c.req.query("sortType") as string;
//   const search = c.req.query("search") as string;
//   const isFeatured = c.req.query("isFeatured") as string;
//   const isActive = c.req.query("isActive") as string;

//   const response = await productService.getProducts({
//     page,
//     limit,
//     sortBy,
//     sortType,

//     search,

//     isFeatured,
//     isActive,
//   });

//   if (response.error) {
//     return badRequestHandler(c, response.error);
//   }

//   if (response.serverError) {
//     return serverErrorHandler(c, response.serverError);
//   }

//   return c.json(response.success, 200);
// };

// export const getProduct = async (c: Context) => {
//   const _id = c.req.param("_id");

//   const response = await adminService.getProduct(_id);

//   if (response.error) {
//     return badRequestHandler(c, response.error);
//   }

//   if (response.serverError) {
//     return serverErrorHandler(c, response.serverError);
//   }

//   return c.json(response.success, 201);
// };

// // Update user
// export const updateProduct = async (c: Context) => {
//   const body = await c.req.json();
//   const _id = c.req.param("_id");

//   const response = await productService.updateUser({ body, _id });

//   if (response.error) {
//     return badRequestHandler(c, response.error);
//   }

//   if (response.serverError) {
//     return serverErrorHandler(c, response.serverError);
//   }

//   return c.json(response.success, 200);
// };

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
