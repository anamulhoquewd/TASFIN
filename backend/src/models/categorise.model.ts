import type { ICategory } from "./../interfaces/index.js";
import mongoose from "mongoose";
import { ImageSchema } from "./admins.model.js";

const CategorySchema: mongoose.Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    image: { type: ImageSchema },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
