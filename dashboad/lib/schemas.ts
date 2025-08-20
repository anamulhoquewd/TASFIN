import { z } from "zod";

// Zod schema for ICategory
export const categorySchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase, alphanumeric, and hyphen-separated"
    )
    .trim(),
  name: z.string().min(1, "Name is required").trim(),
});

// Zod schema for IProduct
export const productSchema = z.object({
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only (no spaces or special characters)."
    ),
  name: z.string().min(1, "Name is required"),
  images: z.array(
    z.object({
      alt: z.string().min(1, "Image alt is required"),
      url: z.string().url("Must be a valid URL"),
    })
  ),
  keywords: z
    .array(
      z.object({
        value: z.string().optional(),
      })
    )
    .optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().optional(),
  colors: z
    .array(
      z.object({
        name: z.string().min(1, "Color name is required"),
        inStock: z.boolean(),
        sizes: z.array(
          z.object({
            name: z.string().min(1, "Size name is required"),
            inStock: z.boolean(),
            quantity: z.coerce
              .number()
              .nonnegative("Quantity must be 0 or more"),
          })
        ),
      })
    )
    .min(1, "At least one color is required"),

  category: z
    .string()
    .length(24, { message: "Invalid category ID" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format" }),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
