import type { IProduct, IProductVariant } from "./../interfaces/index.js";
import { model, Schema } from "mongoose";
import { ImageSchema } from "./admins.model.js";

const ProductVariantSchema: Schema<IProductVariant> =
  new Schema<IProductVariant>({
    sku: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    images: [ImageSchema],
  });

// ---------- Product ----------
const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    keyFeatures: [String],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    images: [ImageSchema],
    variants: [ProductVariantSchema],
    isFeatured: { type: Boolean, default: false },
    isItNew: { type: Boolean, default: false },
    isCustom: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    tags: [String],
    details: {
      fabric: String,
      valueAddition: String,
      cutFit: String,
      collarNeck: String,
      sleeve: String,
      length: String,
      washCare: String,
      sideCut: String,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
