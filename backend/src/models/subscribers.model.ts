import mongoose, { Schema } from "mongoose";
import type { ISubscriber } from "../interfaces/index.js";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // prevent duplicates
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["subscribed", "unsubscribed"],
      default: "subscribed",
    },
    source: {
      type: String,
      default: "website", // homepage, popup, footer, campaign, etc
    },

    verified: { type: Boolean, default: false }, // verified by admin
    isBlocked: { type: Boolean, default: false },
    blockedAt: { type: Date, required: false },

    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Subscriber = mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
export default Subscriber;
