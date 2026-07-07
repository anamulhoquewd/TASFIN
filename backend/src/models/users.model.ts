import { model, Schema } from "mongoose";
import type { IUser } from "./../interfaces/index.js";
import { AddressSchema, ImageSchema } from "./../models/admins.model.js";

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    occupation: { type: String },
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

    status: { type: Boolean, default: true },
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

const User = model<IUser>("User", userSchema);
export default User;
