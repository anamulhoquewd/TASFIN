import { adminController } from "@/controllers";
import { authenticatedAdmin, authorize } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const adminRoutes = new Hono();

adminRoutes.get("/", authenticatedAdmin, (c) => adminController.getAdmins(c));

adminRoutes.post("/register", authenticatedAdmin, (c) =>
  adminController.register(c)
);

adminRoutes.post("/upload-avatar", authenticatedAdmin, (c) =>
  adminController.changeAvatar(c)
);

adminRoutes.patch("/change-password", authenticatedAdmin, (c) =>
  adminController.changePassword(c)
);

adminRoutes.patch("/reset-password/:resetToken", (c) =>
  adminController.resetPassword(c)
);

adminRoutes.post("/forgot-password", (c) => adminController.forgotPassword(c));

adminRoutes.post("/refresh", (c) => adminController.refreshToken(c));

adminRoutes.post("/log-in", (c) => adminController.login(c));

adminRoutes.post("/log-out", authenticatedAdmin, (c) =>
  adminController.logout(c)
);

adminRoutes.get("/me", authenticatedAdmin, (c) => adminController.getMe(c));

adminRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  adminController.updateMe(c)
);

adminRoutes.get("/:_id", authenticatedAdmin, (c) =>
  adminController.getAdmin(c)
);

adminRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  adminController.deleteAdmin(c)
);

export default adminRoutes;
