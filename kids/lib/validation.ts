import { z } from "zod";

export const inquirySchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  shopName: z.string().min(2, "Shop name is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.email("Invalid email address").trim().toLowerCase().optional(),
  ),
  interestedProductIds: z
    .array(z.string())
    .min(1, "Select at least one product"),
  estimatedQty: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const productImageSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  position: z.number().optional(),
});

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  images: z.array(productImageSchema),
  fabric: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  moq: z.number(),
  minPrice: z.number(),
  maxPrice: z.number(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
