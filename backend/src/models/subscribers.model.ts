import mongoose, { Schema } from "mongoose";
import type { ISubscriber } from "../interfaces/index.js";

const SubscriberSchema: Schema<ISubscriber> = new Schema<ISubscriber>(
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
      default: "website",
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
  { timestamps: true }
);

const Subscriber = mongoose.model<ISubscriber>("Subscribe", SubscriberSchema);
export default Subscriber;
