import {
  authenticatedAdmin,
  authenticatedAnyUser,
} from "../middlewares/auth.middleware.js";
import { orderController } from "./../controllers/index.js";
import { Hono } from "hono";

const orderRoutes = new Hono();

orderRoutes.get("/", (c) => orderController.getOrders(c));

orderRoutes.get("/:_id", authenticatedAnyUser, (c) =>
  orderController.getOrder(c)
);

orderRoutes.post("/register", (c) => orderController.register(c));

orderRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  orderController.updateOrder(c)
);

orderRoutes.delete("/:orderId", authenticatedAdmin, (c) =>
  orderController.deleteOrder(c)
);

export default orderRoutes;
