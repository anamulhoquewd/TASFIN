import type { ISettings } from "./../interfaces/index.js";
import mongoose from "mongoose";
import { AddressSchema, ImageSchema } from "./admins.model.js";

const settingsSchema: mongoose.Schema<ISettings> = new mongoose.Schema(
  {
    // FIXED: fixed, known _id instead of letting Mongo auto-generate one.
    // This makes "only one settings document" an atomic guarantee from
    // MongoDB's own _id uniqueness — no race-condition-prone count check
    // needed. Always fetch/update via this exact _id.
    _id: { type: String, default: "global" },

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

// REMOVED: the countDocuments() pre-save check — it had a race condition
// (two concurrent creates could both read count=0 before either commits,
// resulting in two documents). The fixed _id above makes this impossible
// at the database level instead.

const Settings = mongoose.model<ISettings>("Settings", settingsSchema);
export default Settings;

// Usage in your service/controller layer — always use findOneAndUpdate
// with upsert, so there's never a "create" step to race against:
//
// await Settings.findOneAndUpdate(
//   { _id: "global" },
//   { $set: updatedFields },
//   { upsert: true, new: true, runValidators: true }
// );