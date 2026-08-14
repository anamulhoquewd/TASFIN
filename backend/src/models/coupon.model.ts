import { Schema, model } from "mongoose";
import type { ICoupon } from "./../interfaces/index.js";

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      index: true,
    },
    type: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true }, // percent (0-100) or fixed taka
    minSubtotal: { type: Number, default: 0 },
    // Cap for percentage discounts, e.g. "20% off, max ৳500"
    maxValue: { type: Number }, // optional cap for percent
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    usageLimitTotal: { type: Number, default: 0 }, // 0 = unlimited
    usageLimitPerUser: { type: Number, default: 1 },
    usedCount: { type: Number, default: 0 },
    applicableProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    applicableCategoryIds: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    excludedProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    active: { type: Boolean, default: true },
  },
  { versionKey: false },
);

couponSchema.index({ code: 1 });

const Coupon = model<ICoupon>("Coupon", couponSchema);
export default Coupon;
