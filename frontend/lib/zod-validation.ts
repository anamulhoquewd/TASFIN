import z from "zod";

export const BDPhoneRegex = /^01[3-9]\d{8}$/;

export const addressZ = z.object({
  street: z.string().min(1, "Street is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z
    .string()
    .min(1, "Country is required")
    .trim()
    .default("Bangladesh"),
});

// Checkout Form Schema
export const CheckoutSchemaZ = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  address: addressZ,
  email: z.string().optional(),
  paymentMethod: z.enum(["cod"], {
    error: "Please select a payment method",
  }),
  shippingCost: z.coerce.number().nonnegative("Cost must be 0 or up"),
});

export type CheckoutFormValues = z.infer<typeof CheckoutSchemaZ>;

export const orderFormSchema = z.object({
  input: z
    .string()
    .refine(
      (value) =>
        /^\d{11}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Must be a valid email or 11-digit phone number",
      }
    ),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
