import { Hono } from "hono";
import { kidsController } from "../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";

const kidsRoutes = new Hono();

kidsRoutes.post("/register", authenticatedAdmin, (c) =>
  kidsController.register(c),
);
kidsRoutes.post("/inquiry", (c) => kidsController.inquiry(c));

kidsRoutes.get("/", (c) => kidsController.getKidsProducts(c));

kidsRoutes.get("/:_id", (c) => kidsController.getKidsProduct(c));

kidsRoutes.patch("/:_id/images", authenticatedAdmin, (c) =>
  kidsController.updateKidsImages(c),
);

kidsRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  kidsController.updateKidsProduct(c),
);

kidsRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  kidsController.deleteKidsProduct(c),
);

export default kidsRoutes;
