import { IDiscount } from "@/interfaces";
import mongoose from "mongoose";

const DiscountSchema: mongoose.Schema<IDiscount> = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    value: { type: Number, required: true, min: 0 },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Discount = mongoose.model<IDiscount>("Discount", DiscountSchema);
export default Discount;
