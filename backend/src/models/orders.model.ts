import mongoose from "mongoose";
import type { IOrder, IOrderProduct } from "./../interfaces/index.js";
import { AddressSchema, ImageSchema } from "./../models/admins.model.js";

const OrderProductSchema: mongoose.Schema<IOrderProduct> = new mongoose.Schema(
  {
    // FIXED: was `type: String` — should be ObjectId to actually
    // reference the Product document. As a plain String it can't be
    // populated, and it silently breaks any $match/$lookup query that
    // expects an ObjectId (e.g. "find all orders containing product X").
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // FIXED: same issue — was String, now ObjectId (matches variant _id
    // on the Product's variants subdocument array).
    variantId: { type: mongoose.Schema.Types.ObjectId, required: true },

    sku: { type: String, required: true }, // Added — needed for support/logistics
    title: { type: String, required: true },
    image: { type: ImageSchema, required: true },
    // size: { type: String, required: true }, // Added — was missing entirely; no way to show size without re-querying Product
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
); // no _id for subdocument — not needed, and avoids confusion with variantId

import { Schema } from "mongoose";

const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
        "archived",
      ],
      required: true,
    },
    note: { type: String },
    at: { type: Date, default: Date.now },
  },
  { _id: false },
);

const OrderSchema: mongoose.Schema<IOrder> = new mongoose.Schema(
  {
    // Added — Mongo _id is unfriendly for customer support calls/SMS.
    // Generate this in your service layer (e.g. TSF-20260802-0001).
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: [OrderProductSchema], required: true },
    address: { type: AddressSchema, required: true },

    // --- Pricing breakdown ---
    // Added: previously only totalAmount + shippingCost existed, with
    // zero record of subtotal or any discount applied. That meant no
    // way to show "you saved $X" on an invoice, and no audit trail once
    // the discount/coupon feature ships.
    subtotal: { type: Number, required: true, min: 0 },
    discountTotal: { type: Number, default: 0, min: 0 },
    couponCode: { type: String, trim: true, required: false },
    couponDiscount: { type: Number, default: 0, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    // -------------------------

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"], // Added "refunded" — needed for cancel/return
      default: "unpaid",
      required: true,
    },
    paymentMethod: {
      type: String,
      // FIXED: was enum: ["cod"] only. This meant a bkash/nagad/card
      // order could never be saved correctly, even though your separate
      // Payment model already supports all four methods.
      enum: ["cod", "bkash", "nagad", "card"],
      required: true,
    },

    status: {
      type: String,
      // FIXED: added "confirmed" (admin has acknowledged the order,
      // before it moves to processing/shipping) and "returned" — the
      // original enum had no way to represent a returned order at all.
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "returned",
        "archived",
      ],
      default: "pending",
    },

    // Added — audit trail. Without this, there was no record of *when*
    // or *why* an order moved between statuses — important for support
    // ("customer says they cancelled 2 days ago, did we confirm that?").
    statusHistory: [statusHistorySchema],

    // REMOVED: `orderDate`. It duplicated `createdAt` (already provided
    // by `timestamps: true`) with no distinct purpose. If you later need
    // a genuinely different date (e.g. a scheduled/pre-order delivery
    // date), add it back under a clearer name like `scheduledFor`.
  },
  { timestamps: true },
);

OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
// Adjust the field path below to match your actual AddressSchema shape
// (e.g. "address.phone") — useful for admin support lookups by phone.
OrderSchema.index({ "address.phone": 1 });

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
