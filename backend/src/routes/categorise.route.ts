import { categoryController } from "@/controllers";
import { authenticatedAdmin } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

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
