import { productController } from "@/controllers";
import { authenticatedAdmin } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const productRoutes = new Hono();

productRoutes.post("/register", (c) => productController.register(c));

productRoutes.get("/", (c) => productController.getProducts(c));

productRoutes.get("/:productId", (c) => productController.getProduct(c));

productRoutes.patch("/:productId/general", (c) =>
  productController.updateGeneralInfo(c)
);

productRoutes.patch("/:productId/v/:variantId/info", (c) =>
  productController.updateVariantInfo(c)
);

productRoutes.patch("/:productId/main-images", (c) =>
  productController.updateMainImages(c)
);

productRoutes.patch("/:productId/v/:variantId/images", (c) =>
  productController.updateVImages(c)
);

productRoutes.patch("/:productId/v/:variantId", (c) =>
  productController.deleteVariant(c)
);

productRoutes.patch("/:productId/variant", (c) =>
  productController.createVariant(c)
);

productRoutes.delete("/:productId", (c) => productController.deleteProduct(c));

export default productRoutes;
