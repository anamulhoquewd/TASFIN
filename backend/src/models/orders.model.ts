import mongoose, { model, Schema } from "mongoose";
import { AddressSchema, ImageSchema } from "./../models/admins.model.js";
import type { IOrder, IOrderProduct } from "./../interfaces/index.js";
import { required } from "zod/mini";

const OrderProductSchema: Schema<IOrderProduct> = new Schema<IOrderProduct>({
  productId: { type: String, required: true },
  variantId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: ImageSchema, required: true },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: { type: [OrderProductSchema], required: true },
    address: { type: AddressSchema, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cod"],
    },
    subtotal: { type: Number, min: 0 },
    discount: { type: Number },
    shippingCost: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    orderDate: { type: Date, default: Date.now },

    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", OrderSchema);
export default Order;
