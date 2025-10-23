import { settingsController } from "@/controllers";
import { authenticatedAdmin, authorize } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const settingsRoutes = new Hono();

settingsRoutes.get("/", authenticatedAdmin, (c) =>
  settingsController.getSettings(c)
);

settingsRoutes.patch("/", authenticatedAdmin, (c) =>
  settingsController.updateSettings(c)
);

settingsRoutes.post("/upload-logo", authenticatedAdmin, (c) =>
  settingsController.changeLogo(c)
);

export default settingsRoutes;
