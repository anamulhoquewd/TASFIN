import mongoose from "mongoose";
import type { IUser } from "./../interfaces/index.js";
import { AddressSchema, ImageSchema } from "./../models/admins.model.js";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, unique: true, trim: true },
    addresses: [AddressSchema],
    avatar: { type: ImageSchema, required: false },

    dob: Date,
    gender: { type: String, enum: ["male", "female"] },

    isActive: { type: Boolean, default: true },
    isBlocked: Boolean,
    blockedAt:  Date,
    blockedReason: String,
    lastOrderAt: Date,
  },
  { timestamps: true },
);

// Partial unique index — only enforced when email actually exists,
// since not every login method guarantees one.
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $ne: null } },
  },
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
