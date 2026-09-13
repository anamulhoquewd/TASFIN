import mongoose from "mongoose";
import type { CustomerSessionT } from "./../interfaces/index.js";

const customerSessionSchema: mongoose.Schema<CustomerSessionT> =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      tokenHash: {
        type: String,
        required: true,
        unique: true,
      },

      expiresAt: {
        type: Date,
        required: true,
        index: true,
      },
    },
    { timestamps: true },
  );

const CustomerSession = mongoose.model<CustomerSessionT>(
  "CustomerSession",
  customerSessionSchema,
);
export default CustomerSession;
