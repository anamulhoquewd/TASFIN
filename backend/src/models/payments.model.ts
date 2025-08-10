import { IPayment } from "@/interfaces";
import mongoose from "mongoose";

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
    currency: { type: String, enum: ["BDT", "USD"], required: true },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
