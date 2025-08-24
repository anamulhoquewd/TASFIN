import { productController } from "@/controllers";
import { authenticatedAdmin } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const productRoutes = new Hono();

productRoutes.post("/register", (c) => productController.register(c));

// productRoutes.get("/", (c) => productController.getProducts(c));

productRoutes.get("/:productId", (c) => productController.getProduct(c));

productRoutes.put("/:productId", (c) => productController.updateProduct(c));

// productRoutes.delete("/:productId", authenticatedAdmin, (c) =>
//   productController.deleteProduct(c)
// );

export default productRoutes;
