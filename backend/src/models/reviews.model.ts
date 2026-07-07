import { Schema, model } from "mongoose";
import type { IReview } from "./../interfaces/index.js";

const ReviewSchema: Schema<IReview> = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const Review = model<IReview>("Review", ReviewSchema);
export default Review;
