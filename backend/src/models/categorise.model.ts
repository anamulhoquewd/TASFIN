import type { ICategory } from "./../interfaces/index.js";
import mongoose from "mongoose";
import { ImageSchema } from "./admins.model.js";

const categorySchema: mongoose.Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    image: { type: ImageSchema },

    // Added: lets admin control display order in nav menus, instead of
    // relying on insertion order / _id order.
    sortOrder: { type: Number, default: 0 },

    // Added: same reasoning as Product.isActive — categories that have
    // been used in past orders/products shouldn't be hard-deleted.
    // Hide from storefront by flipping this instead.
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

categorySchema.index({ isActive: 1 });

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;