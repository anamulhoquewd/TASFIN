import mongoose from "mongoose";
import type { IProduct, IProductVariant } from "./../interfaces/index.js";
import { ImageSchema } from "./admins.model.js";

const ProductVariantSchema: mongoose.Schema<IProductVariant> =
  new mongoose.Schema(
    {
      sku: { type: String, required: true, trim: true, unique: true },
      size: { type: String, required: true, trim: true },
      stock: { type: Number, required: true, min: 0, default: 0 },
      price: { type: Number, required: true, min: 0 },
      images: [{ type: ImageSchema, required: false }],
    },
    { _id: true }, // keep _id — still useful for cart line-item references
  );

const ProductSchema: mongoose.Schema<IProduct> = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: false, trim: true },
    keyFeatures: [{ type: String, trim: true }],

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],

    images: [{ type: ImageSchema, required: true }],
    variants: { type: [ProductVariantSchema], required: true },

    // Flexible attributes — replaces fabric/cutFit/collarNeck/sleeve/etc.
    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    // --- Denormalized fields (auto-computed, do not set manually) ---
    minPrice: { type: Number, required: true, min: 0, index: true },
    maxPrice: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true, default: false, index: true },
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    // ------------------------------------------------------------------

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    tags: [{ type: String, trim: true }],

    discount: {
      discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: false,
      },
      value: { type: Number, min: 0, required: false }, // 7 means 7% or ৳7 depending on type
      startAt: { type: Date, required: false },
      endAt: { type: Date, required: false },
    },
  },
  { timestamps: true },
);

// --- Virtual: computed effective price (not stored, always fresh) ---
ProductSchema.virtual("effectiveMinPrice").get(function (this: any) {
  return computeDiscountedPrice(this.minPrice, this.discount);
});
ProductSchema.virtual("effectiveMaxPrice").get(function (this: any) {
  return computeDiscountedPrice(this.maxPrice, this.discount);
});

function computeDiscountedPrice(
  price: number,
  discount?: {
    discountType?: string; // FIXED: was "type", now matches schema field name
    value?: number;
    startAt?: Date;
    endAt?: Date;
  },
): number {
  if (!discount?.discountType || !discount.value) return price;
  const now = new Date();
  if (discount.startAt && now < discount.startAt) return price;
  if (discount.endAt && now > discount.endAt) return price;
  if (discount.discountType === "percentage")
    return Math.round(price * (1 - discount.value / 100));
  return Math.max(0, price - discount.value); // fixed amount off
}

// Make sure virtuals show up in API responses:
ProductSchema.set("toJSON", { virtuals: true });

// FIXED: pre("validate") instead of pre("save").
// Mongoose runs required-field validation BEFORE pre("save") hooks fire.
// minPrice/maxPrice are required:true, so if we only set them in
// pre("save"), a brand-new product would fail validation first
// ("minPrice is required") before this hook ever gets a chance to run.
// pre("validate") runs earlier in the chain, so the fields exist by the
// time Mongoose checks `required`.
ProductSchema.pre("validate", function (next) {
  if (this.isModified("variants") && this.variants.length > 0) {
    const prices = this.variants.map((v) => v.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.inStock = this.variants.some((v) => v.stock > 0);
  }
  next();
});

// --- Indexes for actual query patterns (this is what fixes slow listing) ---
ProductSchema.index({ isActive: 1, categories: 1, createdAt: -1 });
ProductSchema.index({ isActive: 1, isFeatured: 1 });
ProductSchema.index({ isActive: 1, minPrice: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ title: "text", description: "text", tags: "text" });
// ------------------------------------------------------------------------

const Product = mongoose.model("Product", ProductSchema);
export default Product;
