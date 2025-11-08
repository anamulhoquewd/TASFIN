import { settingsController } from "./../controllers/index.js";
import {
  authenticatedAdmin,
  authorize,
} from "./../middlewares/auth.middleware.js";
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
