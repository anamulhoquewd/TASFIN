import { z } from "zod";

// Image validation (matches your ImageSchema)
export const imageZ = z.object({
  alt: z.string().min(1, "Image alt text required").trim(),
  url: z.string().url("Invalid image URL").trim(),
});

// Bangladesh phone regex (local format like 017xxxxxxxx)
export const BDPhoneRegex = /^01[3-9]\d{8}$/;

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be <= 5MB",
  })
  .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
    message: "Only JPEG, PNG, or WebP images are allowed",
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
  sizes: z
    .array(
      z.object({
        name: z.string().min(1, "Size is required"),
        inStock: z.boolean(),
        quantity: z.coerce.number().nonnegative("Quantity must be 0 or more"),
      })
    )
    .min(1, "At least one size is required"),

  category: z
    .string()
    .length(24, { message: "Invalid category ID" })
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid ObjectId format" }),
});

// IProductVariant schema
export const productVariantSchemaZ = z.object({
  // Kept optional only so legacy edit dialogs can render old records during migration.
  size: z.string().optional(),
  sku: z.string().trim().min(1, "SKU is required"),
  attributes: z
    .array(z.object({ key: z.string().trim().min(1, "Attribute name is required"), value: z.string().trim().min(1, "Attribute value is required") }))
    .optional()
    .refine((items) => !items || new Set(items.map((item) => item.key.toLowerCase())).size === items.length, "Attribute names must be unique"),
  stock: z.number().int().min(0, "stock must be >= 0"),
  price: z.number().nonnegative("price must be >= 0"),
  images: z.array(fileSchema).optional(),
  existingImages: z.array(z.string()).optional(),
  deleteImageUrls: z.array(z.string()).optional(),
  _id: z.string().optional(),
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
  description: z.string().max(1000).optional(),
  keyFeatures: z.array(z.string().min(1)).optional(),

  categories: z.array(z.string()),

  images: z.array(fileSchema).nonempty("At least 1 image is required"),
  variants: z.array(productVariantSchemaZ).nonempty("At least 1 variant is required")
    .refine((items) => new Set(items.map((item) => item.sku.toLowerCase())).size === items.length, "Variant SKUs must be unique"),

  specifications: z
    .array(z.object({ key: z.string().trim().min(1, "Specification name is required"), value: z.string().trim().min(1, "Specification value is required") }))
    .optional()
    .refine((items) => !items || new Set(items.map((item) => item.key.toLowerCase())).size === items.length, "Specification names must be unique"),

  // Legacy fields are read-only compatibility fields. New products use specifications.
  fabric: z.string().optional(),
  valueAddition: z.string().optional(),
  cutFit: z.string().optional(),
  collarNeck: z.string().optional(),
  sleeve: z.string().optional(),
  length: z.string().optional(),
  washCare: z.string().optional(),
  sideCut: z.string().optional(),

  isFeatured: z.boolean().default(false),
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

// Address schema
export const addressZ = z.object({
  street: z.string().min(1, "Street is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  zipCode: z.string().min(1, "Zip Code is required").trim(),
  country: z.string().min(1, "Country is required").trim(),
});

// Form schema
export const userFormSchemaZ = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  nid: z.string().refine((val) => /^\d{10}$|^\d{17}$/.test(val), {
    message: "NID must be either 10 or 17 digits",
  }),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  address: addressZ,
});

export type UserFormValues = z.infer<typeof userFormSchemaZ>;

// Category create/update schema
export const settingCreateZ = z.object({
  siteName: z.string().min(1, "Site Name is required").trim(),
  siteDescription: z.string().optional(),
  logo: imageZ.optional(),
  favicon: imageZ.optional(),
  contactEmail: z.string().email("Invalid email address").trim().optional(),
  contactPhone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  address: addressZ.optional(),
  socialLinks: z
    .object({
      facebook: z.string().trim().optional(),
      twitter: z.string().trim().optional(),
      instagram: z.string().trim().optional(),
      linkedin: z.string().trim().optional(),
    })
    .optional(),
});

// If you want a separate update schema where fields can be optional:
export const settingUpdateZ = settingCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Input Type inferred from Zod
export type SettingFromValue = z.infer<typeof settingCreateZ>;

export const resetPasswordFormSchemaZ = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(8).max(20),
    newPassword: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .refine(
      (value) =>
        /^\d{11}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Must be a valid email or 11-digit phone number",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type LoginFormValuse = z.infer<typeof loginFormSchema>;
