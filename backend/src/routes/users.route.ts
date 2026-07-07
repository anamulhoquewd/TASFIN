import { Hono } from "hono";
import { userController } from "./../controllers/index.js";
import {
  authenticatedAdmin,
  authenticatedUser,
} from "./../middlewares/auth.middleware.js";

const userRoutes = new Hono();

userRoutes.post("/register", (c) => userController.register(c));

userRoutes.post("/upload-avatar", authenticatedAdmin, (c) =>
  userController.changeAvatar(c)
);

userRoutes.get("/", authenticatedAdmin, (c) => userController.getUsers(c));

userRoutes.patch("/by-admin/:_id", authenticatedAdmin, (c) =>
  userController.updateUser(c)
);

userRoutes.get("/me", authenticatedUser, (c) => userController.getMe(c));

userRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  userController.deleteUser(c)
);

userRoutes.patch("/:_id", authenticatedUser, (c) => userController.updateMe(c));

userRoutes.get("/:_id", authenticatedAdmin, (c) => userController.getUser(c));

export default userRoutes;
