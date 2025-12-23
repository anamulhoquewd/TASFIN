import { Hono } from "hono";
import { couponController } from "../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";

const couponRoutes = new Hono();

couponRoutes.post("/register", authenticatedAdmin, (c) =>
  couponController.register(c)
);

couponRoutes.get("/", authenticatedAdmin, (c) =>
  couponController.getCoupons(c)
);

couponRoutes.get("/validate/:_id", (c) => couponController.validate(c));

couponRoutes.get("/:_id", authenticatedAdmin, (c) =>
  couponController.getCoupon(c)
);

couponRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  couponController.updateCoupon(c)
);

couponRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  couponController.deleteCoupon(c)
);

export default couponRoutes;
