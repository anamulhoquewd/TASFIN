import { model, Schema } from "mongoose";
import type { ICategory } from "./../interfaces/index.js";
import { ImageSchema } from "./admins.model.js";

const CategorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: ImageSchema,
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", CategorySchema);
export default Category;
