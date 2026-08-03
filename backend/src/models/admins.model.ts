import type { IAddress, IAdmin, IImage } from "./../interfaces/index.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const AddressSchema: mongoose.Schema<IAddress> = new mongoose.Schema(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: false, trim: true },
    zipCode: { type: String, required: false, trim: true },
    country: { type: String, required: true, trim: true },
  },
  { _id: false }
);

export const ImageSchema: mongoose.Schema<IImage> = new mongoose.Schema(
  {
    alt: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const amdinSchema: mongoose.Schema<IAdmin> = new mongoose.Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // FIXED: was "minLength" (capital L) — Mongoose doesn't
      // recognize that option and silently ignored it, so the 8-character
      // minimum was never actually enforced.
      select: false,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      required: true,
    },
    address: { type: AddressSchema },
    avatar: { type: ImageSchema, required: false },

    refresh: { type: String, required: false, select: false },
    resetPasswordToken: { type: String },
    resetPasswordExpireDate: { type: Date },
    // Added: brute-force protection. Admin accounts control the entire
    // store — worth locking out after repeated failed logins.
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, required: false },
  },
  { timestamps: true },
);

amdinSchema.methods.generateResetPasswordToken = function (expMinutes = 30) {
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
amdinSchema.methods.matchPassword = async function (assword: string) {
  return bcrypt.compare(assword, this.password);
};

// Hash password
amdinSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // FIXED: was missing `return` here. Without it, execution fell
    // through to the code below and re-hashed an already-hashed
    // password on every unrelated update (name, phone, address, etc.),
    // silently corrupting the admin's password and calling next()
    // a second time.
    return next();
  }

  if (!this.password) {
    return next(new Error("Password is required"));
  }

  // Use bcrypt to hash the password
  const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model<IAdmin>("Admin", amdinSchema);
export default Admin;
