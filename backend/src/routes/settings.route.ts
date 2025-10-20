import { settingsController } from "@/controllers";
import { authenticatedAdmin, authorize } from "@/middlewares/auth.middleware";
import { Hono } from "hono";

const settingsRoutes = new Hono();

settingsRoutes.get("/", authenticatedAdmin, authorize, (c) =>
  settingsController.getSettings(c)
);

settingsRoutes.patch("/", authenticatedAdmin, authorize, (c) =>
  settingsController.updateSettings(c)
);

settingsRoutes.post("/upload-logo", authenticatedAdmin, authorize, (c) =>
  settingsController.changeLogo(c)
);

export default settingsRoutes;
