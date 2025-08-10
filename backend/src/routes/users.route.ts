import { userController } from "@/controllers";
import {
  authenticatedAdmin,
  authenticatedUser,
} from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const userRoutes = new Hono();

userRoutes.post("/register", (c) => userController.register(c));

userRoutes.post("/upload-avatar", authenticatedUser, (c) =>
  userController.changeAvatar(c)
);

userRoutes.get("/", authenticatedAdmin, (c) => userController.getUsers(c));

userRoutes.patch("/by-admin/:_id", authenticatedAdmin, (c) =>
  userController.updateUser(c)
);

userRoutes.get("/me", authenticatedUser, (c) => userController.getMe(c));

userRoutes.patch("/change-password", authenticatedUser, (c) =>
  userController.changePassword(c)
);

userRoutes.patch("/reset-password/:resetToken", (c) =>
  userController.resetPassword(c)
);

userRoutes.post("/forgot-password", (c) => userController.forgotPassword(c));

userRoutes.post("/log-in", (c) => userController.login(c));

userRoutes.post("/log-out", authenticatedUser, (c) => userController.logout(c));

userRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  userController.deleteUser(c)
);

userRoutes.patch("/:_id", authenticatedUser, (c) => userController.updateMe(c));

userRoutes.get("/:_id", authenticatedAdmin, (c) => userController.getUser(c));

export default userRoutes;
