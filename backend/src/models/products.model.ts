import { IProduct, IProductVariant } from "@/interfaces";
import mongoose from "mongoose";
import { ImageSchema } from "./admins.model";

const ProductVariantSchema: mongoose.Schema<IProductVariant> =
  new mongoose.Schema({
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: ImageSchema }],
  });

const ProductSchema: mongoose.Schema<IProduct> = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    images: [{ type: ImageSchema, required: true }],
    variants: { type: [ProductVariantSchema], required: true },

    fabric: { type: String, trim: true },
    valueAddition: { type: String, trim: true },
    cutFit: { type: String, trim: true },
    collarNeck: { type: String, trim: true },
    sleeve: { type: String, trim: true },
    length: { type: String, trim: true },
    washCare: { type: String, trim: true },
    sideCut: { type: String, trim: true },

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
