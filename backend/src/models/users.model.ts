import type { IUser } from "./../interfaces/index.js";
import mongoose from "mongoose";
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
    address: { type: AddressSchema, required: false },
    avatar: { type: ImageSchema, required: false },

    dob: { type: Date, required: false },
    gender: { type: String, enum: ["male", "female"] },

    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    blockedAt: { type: Date, required: false },
  },
  { timestamps: true }
);

// ✅ Create a partial unique index (only applies when email exists)
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $exists: true, $ne: null } },
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
