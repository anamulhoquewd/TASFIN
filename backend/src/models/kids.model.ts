import mongoose, { Schema } from "mongoose";
import type { IKidsProduct } from "../interfaces/index.js";

const kidsProductSchema = new Schema(
  {
    name: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
        position: { type: Number, required: true },
        alt: { type: String, required: true },
      },
    ],
    fabric: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    moq: { type: Number, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
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
