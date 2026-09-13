import mongoose from "mongoose";

const OrderSequenceSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    sequence: { type: Number, required: true, default: 0, min: 0 },
  },
  { versionKey: false },
);

const OrderSequence = mongoose.model("OrderSequence", OrderSequenceSchema);
export default OrderSequence;