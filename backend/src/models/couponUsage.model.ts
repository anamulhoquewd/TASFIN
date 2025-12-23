import { Schema, model } from "mongoose";
import type { ICouponUsage } from "./../interfaces/index.js";

// ---------- CouponUsage ----------
const CouponUsageSchema: Schema<ICouponUsage> = new Schema<ICouponUsage>(
  {
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon", required: true },
    phone: {
      type: String,
      trim: true,
    },
    usedCount: { type: Number, default: 0 },
    lastUsedAt: { type: Date },
  },
  { timestamps: true }
);

// Compound unique index: one phone can use a coupon multiple times, but tracked per coupon
CouponUsageSchema.index({ couponId: 1, phone: 1 }, { unique: true });

export const CouponUsage = model<ICouponUsage>(
  "CouponUsage",
  CouponUsageSchema
);
