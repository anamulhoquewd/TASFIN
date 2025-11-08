import type { IOffers } from "./../interfaces/index.js";
import mongoose from "mongoose";
import { ImageSchema } from "./admins.model.js";

const OffersSchema: mongoose.Schema<IOffers> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    image: { type: ImageSchema, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Offers = mongoose.model<IOffers>("Offers", OffersSchema);
export default Offers;
