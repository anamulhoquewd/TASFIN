import { ICategory } from "@/interfaces";
import mongoose from "mongoose";
import { ImageSchema } from "./admins.model";

const CategorySchema: mongoose.Schema<ICategory> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    image: { type: ImageSchema },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
