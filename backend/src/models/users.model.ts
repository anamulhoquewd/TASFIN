import { IUser } from "@/interfaces";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { AddressSchema, ImageSchema } from "@/models/admins.model";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true, unique: true, trim: true },
    shippingAddress: { type: AddressSchema, required: false },
    billingAddress: { type: AddressSchema, required: false },
    avatar: { type: ImageSchema, required: false },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    blockedAt: { type: Date, required: false },

    refresh: { type: String, required: false },
    resetPasswordToken: { type: String },
    resetPasswordExpireDate: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.generateResetPasswordToken = function (expMinutes = 30) {
  let resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token and save it in the database
  resetToken = this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expiration
  this.resetPasswordExpireDate = Date.now() + expMinutes * 60 * 1000; // default 30 minutes

  return resetToken;
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // If password is not modified, skip hashing
    next();
  }

  if (!this.password) {
    return next(new Error("Password is required"));
  }

  // Use bcrypt to hash the password
  const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
