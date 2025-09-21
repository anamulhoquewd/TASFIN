import { orderController } from "@/controllers";
import { Hono } from "hono";

const orderRoutes = new Hono();

orderRoutes.get("/", (c) => orderController.getOrders(c));

orderRoutes.post("/register", (c) => orderController.register(c));

orderRoutes.patch("/:_id", (c) => orderController.updateOrder(c));

orderRoutes.delete("/:orderId", (c) => orderController.deleteOrder(c));

export default orderRoutes;
