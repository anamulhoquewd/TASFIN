import type { ICoupon } from "./../interfaces/index.js";
import { Schema, model } from "mongoose";

const CouponSchema: Schema<ICoupon> = new Schema<ICoupon>(
  {
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    minSubtotal: { type: Number, default: 0 },
    maxValue: { type: Number }, // optional cap for percent
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    perUserUsageLimit: { type: Number, default: 1 },
    totalUsageLimit: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
