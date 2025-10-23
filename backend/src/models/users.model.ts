import { IUser } from "@/interfaces";
import mongoose from "mongoose";
import { AddressSchema, ImageSchema } from "@/models/admins.model";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;
