import { z } from "zod";

// Accept either a 24-char hex string or a real ObjectId instance
export const objectIdZ = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Expected a 24-char hex ObjectId string");

export type TObjectId = z.infer<typeof objectIdZ>;

// Image validation (matches your Image)
export const imageZ = z.object({
  alt: z.string().min(1, "Image alt text required").trim(),
  url: z.string().url("Invalid image URL").trim(),
  publicId: z.string().optional(),
});

export type TImage = z.infer<typeof imageZ>;

// Bangladesh phone regex (local format like 017xxxxxxxx)
export const BDPhoneRegex = /^01[3-9]\d{8}$/;

const fileZ = z
  .instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "File size must be <= 10MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "Only JPEG/PNG allowed",
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

// IProductVariant
export const productVariantZ = z.object({
  size: z.string().min(1),
  color: z.string().optional(),
  sku: z.string().min(6),
  price: z.number().nonnegative("price must be >= 0"),
  stock: z.number().nonnegative("stock must be >= 0"),
  images: z.array(fileZ).optional(),
});

export type TVariant = z.infer<typeof productVariantZ>;

// If you want a separate update  where fields can be optional:
export const productVariantUpdateZ = productVariantZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateVariant = z.infer<typeof productVariantUpdateZ>;

// IProduct
export const productZ = z.object({
  title: z.string().min(1, "title is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  description: z.string().max(2000).optional(),
  keyFeatures: z.array(z.string().min(1).max(1000)).optional(),

  categories: z.array(objectIdZ),
  tags: z.array(z.string().min(1).max(50)).optional(),

  images: z.array(fileZ).nonempty("At least 1 image is required"),

  variants: z.array(productVariantZ).nonempty("At least 1 variant is required"),

  details: z.object({
    fabric: z.string().optional(),
    valueAddition: z.string().optional(),
    cutFit: z.string().optional(),
    collarNeck: z.string().optional(),
    sleeve: z.string().optional(),
    length: z.string().optional(),
    washCare: z.string().optional(),
    sideCut: z.string().optional(),
  }),

  isCustom: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isItNew: z.boolean().default(false),
  status: z.boolean().default(true),
});

export type TProduct = z.infer<typeof productZ>;

// If you want a separate update  where fields can be optional:
export const productUpdateZ = productZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateProduct = z.infer<typeof productUpdateZ>;

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
