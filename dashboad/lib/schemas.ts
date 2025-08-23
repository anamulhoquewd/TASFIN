import { z } from "zod";

// Image validation (matches your ImageSchema)
export const imageZ = z.object({
  alt: z.string().min(1, "Image alt text required").trim(),
  url: z.string().url("Invalid image URL").trim(),
});

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

// IProductVariant schema
export const productVariantSchemaZ = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  stock: z.number().int().min(0, "stock must be >= 0"),
  price: z.number().nonnegative("price must be >= 0"),
  images: z.array(z.file()).optional(),
});

// If you want a separate update schema where fields can be optional:
export const productVariantUpdateZ = productVariantSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// IProduct schema
export const productSchemaZ = z.object({
  title: z.string().min(1, "title is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  description: z.string().optional(),

  categories: z.array(z.string()),

  images: z.array(z.file()),
  variants: z.array(productVariantSchemaZ),

  fabric: z.string().optional(),
  valueAddition: z.string().optional(),
  cutFit: z.string().optional(),
  collarNeck: z.string().optional(),
  sleeve: z.string().optional(),
  length: z.string().optional(),
  washCare: z.string().optional(),
  sideCut: z.string().optional(),

  isFeatured: z.boolean().optional(),
  isActive: z.boolean().default(true),
  tags: z.array(z.string().min(1)).optional(),
});

// If you want a separate update schema where fields can be optional:
export const productUpdateZ = productSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Types + helpers
export type ProductCreateInput = z.infer<typeof productSchemaZ>;
export type ProductVariantUpdateInput = z.infer<typeof productVariantUpdateZ>;

export type ProductUpdateInput = z.infer<typeof productUpdateZ>;

export type ProductFormValues = z.infer<typeof productSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
