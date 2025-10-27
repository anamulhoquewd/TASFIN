import mongoose from "mongoose";
import { AddressSchema, ImageSchema } from "@/models/admins.model";
import { IOrder, IOrderProduct } from "@/interfaces";

const OrderProductSchema: mongoose.Schema<IOrderProduct> = new mongoose.Schema({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: ImageSchema, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema: mongoose.Schema<IOrder> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: [OrderProductSchema], required: true },
    address: { type: AddressSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod"],
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
