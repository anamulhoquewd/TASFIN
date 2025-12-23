import mongoose, { model, Schema } from "mongoose";
import type { IOrder, IOrderProduct } from "./../interfaces/index.js";
import { AddressSchema, ImageSchema } from "./../models/admins.model.js";

const OrderStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
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
    },
    paymentMethod: {
      type: String,
      enum: ["cod"],
    },
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number },
    shippingCost: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },

    statusHistory: {
      type: [OrderStatusSchema],
      default: [
        {
          status: "pending",
          note: "Order placed",
          date: new Date(),
        },
      ],
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    orderDate: { type: Date, default: Date.now },

    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },

    // Custom Order Fields
    isCustom: { type: Boolean, default: false },
    customOrder: {
      type: {
        isCustom: { type: Boolean, default: false },
        measurements: {
          type: Schema.Types.Mixed,
        },
        referenceImages: [ImageSchema],
        note: { type: String },
      },
      required: false,
    },

    // Coupon Fields
    coupon: {
      code: { type: String },
      discountType: { type: String, enum: ["percent", "fixed"] },
      value: { type: Number },
      discountAmount: { type: Number },
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", OrderSchema);
export default Order;
