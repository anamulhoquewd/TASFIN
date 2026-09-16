import { Hono } from "hono";
import { kidsController } from "../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";

const kidsRoutes = new Hono();

kidsRoutes.post("/register", (c) => kidsController.register(c));

kidsRoutes.get("/", authenticatedAdmin, (c) =>
  kidsController.getSubscribers(c),
);

kidsRoutes.get("/:_id", authenticatedAdmin, (c) =>
  kidsController.getSubscriber(c),
);

kidsRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  kidsController.updateSubscriber(c),
);

kidsRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  kidsController.deleteSubscriber(c),
);

export default kidsRoutes;
