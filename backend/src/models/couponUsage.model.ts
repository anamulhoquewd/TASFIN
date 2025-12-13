import type { ICoupon, ICouponUsage } from "./../interfaces/index.js";
import { Schema, model } from "mongoose";

// ---------- CouponUsage ----------
const CouponUsageSchema: Schema<ICouponUsage> = new Schema<ICouponUsage>(
  {
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    usedCount: { type: Number, default: 0 },
    lastUsedAt: Date,
  },
  { timestamps: true }
);

export const Coupon = model<ICouponUsage>("Coupon", CouponUsageSchema);
