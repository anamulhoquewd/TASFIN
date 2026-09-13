import mongoose from "mongoose";
import type { IPayment } from "./../interfaces/index.js";

const PaymentSchema: mongoose.Schema<IPayment> = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    method: {
      type: String,
      enum: ["cod", "bkash", "nagad", "card"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      enum: ["BDT", "USD"],
      required: true,
      default: "BDT",
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    // Added: needed for the cancel/return flow discussed earlier —
    // without these there's no record of how much was actually refunded.
    refundedAmount: { type: Number, min: 0, default: 0 },
    refundedAt: { type: Date, required: false },

    // Added: store raw gateway response for a failed bkash/nagad/card
    // payment, so support can see exactly what the provider returned
    // instead of guessing.
    gatewayResponse: { type: mongoose.Schema.Types.Mixed, required: false },
  },
  { timestamps: true },
);

PaymentSchema.index({ orderId: 1 });
PaymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
