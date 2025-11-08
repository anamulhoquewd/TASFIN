import type { ISettings } from "./../interfaces/index.js";
import mongoose from "mongoose";
import { AddressSchema, ImageSchema } from "./admins.model.js";

const SettingsSchema: mongoose.Schema<ISettings> = new mongoose.Schema(
  {
    siteName: { type: String, required: true, trim: true },
    siteDescription: { type: String, required: true, trim: true },
    logo: { type: ImageSchema, required: false },
    favicon: { type: ImageSchema, required: false },
    contactEmail: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    address: { type: AddressSchema },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

// 🔒 Prevent multiple settings documents
SettingsSchema.pre("save", async function (next) {
  const count = await mongoose.models.Settings.countDocuments();
  if (count > 0 && this.isNew) {
    const error = new Error("Only one settings document is allowed.");
    return next(error);
  }
  next();
});

const Settings = mongoose.model<ISettings>("Settings", SettingsSchema);
export default Settings;
