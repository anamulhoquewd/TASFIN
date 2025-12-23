import { Hono } from "hono";
import { categoryController } from "./../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";

const categoryRoutes = new Hono();

categoryRoutes.post("/register", authenticatedAdmin, (c) =>
  categoryController.register(c)
);

categoryRoutes.get("/", (c) => categoryController.getCategories(c));

categoryRoutes.get("/:_id", (c) => categoryController.getCategory(c));

categoryRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  categoryController.updateCategory(c)
);

categoryRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  categoryController.deleteCategory(c)
);

categoryRoutes.post("/:_id/upload-avatar", authenticatedAdmin, (c) =>
  categoryController.changeAvatar(c)
);

export default categoryRoutes;
