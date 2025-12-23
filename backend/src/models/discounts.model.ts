import { model, Schema } from "mongoose";
import type { IDiscount } from "./../interfaces/index.js";

const DiscountSchema: Schema<IDiscount> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: { type: Number, required: true, min: 0 },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },

    applicableCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    applicableTags: [String],
    applicableProductIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],

    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Discount = model<IDiscount>("Discount", DiscountSchema);
export default Discount;
