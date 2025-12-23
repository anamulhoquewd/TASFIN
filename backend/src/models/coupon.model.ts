import { Schema, model } from "mongoose";
import type { ICoupon } from "./../interfaces/index.js";

const CouponSchema: Schema<ICoupon> = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true },
    maxValue: { type: Number, required: true },
    minSubtotal: { type: Number, default: 0 },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    perUserUsageLimit: { type: Number, default: 1 },
    totalUsageLimit: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
