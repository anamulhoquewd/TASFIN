import mongoose from "mongoose";
import type { ITestimonial } from "./../interfaces/index.js";
import { ImageSchema } from "./admins.model.js";

const testimonialSchema: mongoose.Schema<ITestimonial> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    avatar: { type: ImageSchema },
  },
  { timestamps: true },
);

testimonialSchema.index({ rating: 1 });

const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema,
);
export default Testimonial;
