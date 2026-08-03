import mongoose from "mongoose";
import type { IReview } from "./../interfaces/index.js";
import Product from "./products.model.js";

const ReviewSchema: mongoose.Schema<IReview> = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Added: BUG FIX — original schema had no constraint stopping the same
// user from submitting unlimited reviews on the same product.
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });
ReviewSchema.index({ productId: 1 });

/**
 * Added: this was completely missing. Product.avgRating / reviewCount
 * (denormalized fields from Phase 1) were never being updated anywhere —
 * they'd sit at 0 forever. This keeps them in sync whenever a review is
 * created, edited, or deleted.
 */
async function recalculateProductRating(productId: mongoose.Types.ObjectId) {
  const stats = await mongoose.model("Review").aggregate([
    { $match: { productId, isApproved: true } },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const { avgRating = 0, count = 0 } = stats[0] || {};
  await Product.findByIdAndUpdate(productId, {
    avgRating: Math.round(avgRating * 10) / 10,
    reviewCount: count,
  });
}

ReviewSchema.post("save", async function (doc) {
  await recalculateProductRating(doc.productId);
});
ReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await recalculateProductRating(doc.productId);
});

const Review = mongoose.model<IReview>("Review", ReviewSchema);
export default Review;
