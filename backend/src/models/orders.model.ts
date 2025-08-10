import mongoose from "mongoose";
import { AddressSchema, ImageSchema } from "./admins.model";
import { IDiscountApplied, IOrder, IOrderProduct } from "@/interfaces";

const DiscountAppliedSchema = new mongoose.Schema<IDiscountApplied>(
  {
    discountId: { type: String, required: true },
    value: { type: Number, required: true },
    type: { type: String, enum: ["percentage", "fixed"], required: true },
  },
  { _id: false }
);

const OrderProductSchema: mongoose.Schema<IOrderProduct> = new mongoose.Schema({
  _id: { type: String, required: true },
  variantId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: ImageSchema, required: true },
  priceAtPurchase: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  discountApplied: { type: DiscountAppliedSchema, required: false },
});

const OrderSchema: mongoose.Schema<IOrder> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: [OrderProductSchema], required: true },
    shippingAddress: { type: AddressSchema, required: true },
    billingAddress: { type: AddressSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      required: true,
    },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
