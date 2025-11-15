import { subscribersController } from "../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";
import { Hono } from "hono";

const subscriberRoutes = new Hono();

subscriberRoutes.post("/register", (c) => subscribersController.register(c));

subscriberRoutes.get("/", authenticatedAdmin, (c) =>
  subscribersController.getSubscribers(c)
);

subscriberRoutes.get("/:_id", authenticatedAdmin, (c) =>
  subscribersController.getSubscriber(c)
);

subscriberRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  subscribersController.updateSubscriber(c)
);

subscriberRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  subscribersController.deleteSubscriber(c)
);

export default subscriberRoutes;
