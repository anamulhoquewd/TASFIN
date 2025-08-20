import { ICoupon } from "@/interfaces";
import { Schema, model } from "mongoose";

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      index: true,
    },
    discountType: { type: String, enum: ["percent", "fixed"], required: true },
    amount: { type: Number, required: true }, // percent (0-100) or fixed taka
    minSubtotal: { type: Number, default: 0 },
    maxDiscount: { type: Number }, // optional cap for percent
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    usageLimitTotal: { type: Number, default: 0 }, // 0 = unlimited
    usageLimitPerUser: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    applicableProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

export const Coupon = model<ICoupon>("Coupon", CouponSchema);
