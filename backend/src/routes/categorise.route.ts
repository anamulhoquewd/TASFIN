import { categoryController } from "@/controllers";
import { authenticatedAdmin } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const categoryRoutes = new Hono();

categoryRoutes.post("/register", (c) => categoryController.register(c));

categoryRoutes.get("/", (c) => categoryController.getCategories(c));

categoryRoutes.get("/:_id", (c) => categoryController.getCategory(c));

categoryRoutes.patch("/:_id", (c) => categoryController.updateCategory(c));

categoryRoutes.delete("/:_id", (c) => categoryController.deleteCategory(c));

categoryRoutes.post("/:_id/upload-avatar", (c) =>
  categoryController.changeAvatar(c)
);

export default categoryRoutes;
