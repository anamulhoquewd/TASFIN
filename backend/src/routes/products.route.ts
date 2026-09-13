import { Hono } from "hono";
import { authenticatedAdmin } from "../middlewares/auth.middleware.js";
import { productController } from "./../controllers/index.js";

const productRoutes = new Hono();

productRoutes.post("/register", authenticatedAdmin, (c) =>
  productController.register(c),
);

productRoutes.get("/", (c) => productController.getProducts(c));

productRoutes.get("/:productId", (c) => productController.getProduct(c));

productRoutes.get("/slug/:slug", (c) => productController.getProductBySlug(c));

productRoutes.patch("/:productId/discount", authenticatedAdmin, (c) =>
  productController.updateDiscount(c),
);
productRoutes.patch("/:productId/general", authenticatedAdmin, (c) =>
  productController.updateGeneralInfo(c),
);

productRoutes.patch("/:productId/v/:variantId/info", authenticatedAdmin, (c) =>
  productController.updateVariantInfo(c),
);

productRoutes.patch("/:productId/main-images", authenticatedAdmin, (c) =>
  productController.updateMainImages(c),
);

productRoutes.patch(
  "/:productId/v/:variantId/images",
  authenticatedAdmin,
  (c) => productController.updateVImages(c),
);

productRoutes.patch("/:productId/v/:variantId", authenticatedAdmin, (c) =>
  productController.deleteVariant(c),
);

productRoutes.patch("/:productId/variant", authenticatedAdmin, (c) =>
  productController.createVariant(c),
);

productRoutes.delete("/:productId", authenticatedAdmin, (c) =>
  productController.deleteProduct(c),
);

export default productRoutes;
