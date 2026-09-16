import mongoose from 'mongoose'

const kidsProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [{ type: String }],
    fabric: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    moq: { type: Number, required: true },
    priceMin: { type: Number, required: true },
    priceMax: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'kids_products' }
)

export const KidsProduct =
  mongoose.models.KidsProduct ||
  mongoose.model('KidsProduct', kidsProductSchema)
