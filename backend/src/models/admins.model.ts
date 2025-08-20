import { IAddress, IAdmin, IImage } from "@/interfaces";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const AddressSchema: mongoose.Schema<IAddress> = new mongoose.Schema(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
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
      minLength: 8,
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

    refresh: { type: String, required: false },
    resetPasswordToken: { type: String },
    resetPasswordExpireDate: { type: Date },
  },
  { timestamps: true }
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

const Admin = mongoose.model<IAdmin>("Admin", amdinSchema);
export default Admin;
