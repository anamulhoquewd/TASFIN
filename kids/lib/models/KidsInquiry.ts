import mongoose from 'mongoose'

const kidsInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    shopName: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    interestedProductIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KidsProduct' }],
    estimatedQty: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Follow-up', 'Converted', 'Closed'],
      default: 'New',
    },
    submissionDate: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'kids_inquiries' }
)

export const KidsInquiry =
  mongoose.models.KidsInquiry ||
  mongoose.model('KidsInquiry', kidsInquirySchema)
