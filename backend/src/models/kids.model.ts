import mongoose, { Schema } from "mongoose";
import type { IKidsProduct } from "../interfaces/index.js";

const kidsProductSchema = new Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String }],
    fabric: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    moq: { type: Number, required: true },
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "kids_products" },
);

const KidsProduct = mongoose.model<IKidsProduct>(
  "KidsProduct",
  kidsProductSchema,
);
export default KidsProduct;
