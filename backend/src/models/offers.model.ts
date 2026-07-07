import { model, Schema } from "mongoose";
import type { IOffer } from "../interfaces/index.js";
import { ImageSchema } from "./admins.model.js";

const OffersSchema: Schema<IOffer> = new Schema<IOffer>(
  {
    name: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    image: { type: ImageSchema, required: true },
    startAt: Date,
    endAt: Date,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Offers = model<IOffer>("Offers", OffersSchema);
export default Offers;
