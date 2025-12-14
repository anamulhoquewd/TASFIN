import { couponUsageController } from "../controllers/index.js";
import { authenticatedAdmin } from "./../middlewares/auth.middleware.js";
import { Hono } from "hono";

const couponUsageRoutes = new Hono();

couponUsageRoutes.get("/", authenticatedAdmin, (c) =>
  couponUsageController.getCouponUsages(c)
);

couponUsageRoutes.get("/:_id", authenticatedAdmin, (c) =>
  couponUsageController.getCouponUsage(c)
);

couponUsageRoutes.patch("/:_id", authenticatedAdmin, (c) =>
  couponUsageController.updateCouponUsage(c)
);

couponUsageRoutes.delete("/:_id", authenticatedAdmin, (c) =>
  couponUsageController.deleteCouponUsage(c)
);

export default couponUsageRoutes;
