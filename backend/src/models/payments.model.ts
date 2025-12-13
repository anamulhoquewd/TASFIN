import type { IPayment } from "./../interfaces/index.js";
import { model, Schema } from "mongoose";

const PaymentSchema: Schema<IPayment> = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
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
      enum: ["pending", "success", "failed"],
      required: true,
    },

    gatewayResponse: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Payment = model<IPayment>("Payment", PaymentSchema);
export default Payment;
