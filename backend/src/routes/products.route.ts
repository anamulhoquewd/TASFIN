import { productController } from "@/controllers";
import { authenticatedAdmin } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const productRoutes = new Hono();

productRoutes.post("/register", (c) => productController.createProduct(c));

// productRoutes.get("/", (c) => productController.getProducts(c));

// productRoutes.get("/:_id", (c) => productController.getProduct(c));

// productRoutes.patch("/:_id", authenticatedAdmin, (c) =>
//   productController.updateProduct(c)
// );

// productRoutes.delete("/:_id", authenticatedAdmin, (c) =>
//   productController.deleteProduct(c)
// );

export default productRoutes;
