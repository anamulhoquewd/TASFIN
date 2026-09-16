import { z } from 'zod'

export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  shopName: z.string().min(2, 'Shop name is required'),
  city: z.string().min(2, 'City is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  interestedProductIds: z.array(z.string()).min(1, 'Select at least one product'),
  estimatedQty: z.string().optional(),
  message: z.string().optional(),
})

export type InquiryFormData = z.infer<typeof inquirySchema>

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  images: z.array(z.string()),
  fabric: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  moq: z.number(),
  priceMin: z.number(),
  priceMax: z.number(),
  description: z.string().optional(),
  isActive: z.boolean(),
})

export type Product = z.infer<typeof productSchema>
