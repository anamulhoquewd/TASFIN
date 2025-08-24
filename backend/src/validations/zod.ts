// validation/admin.validation.ts
import mongoose from "mongoose";
import { z } from "zod";

// Image validation (matches your ImageSchema)
export const imageZ = z.object({
  alt: z.string().min(1, "Image alt text required").trim(),
  url: z.string().url("Invalid image URL").trim(),
});

// Accept either a 24-char hex string or a real ObjectId instance
export const objectIdSchemaZ = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Expected a 24-char hex ObjectId string"),
  z.instanceof(mongoose.Types.ObjectId),
]);

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
  description: z
    .object({
      html: z.string().optional(),
      json: z.any().optional(),
    })
    .optional(),

  categories: z.array(objectIdSchemaZ),

  images: z.array(z.file()).nonempty("At least 1 image is required"),
  variants: z
    .array(productVariantSchemaZ)
    .nonempty("At least 1 variant is required"),

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

// Address validation (matches your AddressSchema fields)
export const addressZ = z.object({
  street: z.string().min(1, "Street is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  zipCode: z.string().min(1, "Zip code is required").trim(),
  country: z
    .string()
    .min(1, "Country is required")
    .trim()
    .default("Bangladesh"),
});

// Bangladesh phone regex (local format like 017xxxxxxxx)
export const BDPhoneRegex = /^01[3-9]\d{8}$/;

// Admin (Amdin) validation
export const adminCreateZ = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  nid: z
    .string()
    .refine((val) => /^\d{10}$|^\d{17}$/.test(val), {
      message: "NID must be either 10 or 17 digits",
    })
    .trim(),
  role: z.enum(["super_admin", "admin"]).default("admin"),
  address: addressZ.optional(),
  avatar: imageZ.optional(), // optional
});

// If you want a separate update schema where fields can be optional:
export const adminUpdateZ = adminCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Types (optional)
export type AdminCreateInput = z.infer<typeof adminCreateZ>;
export type AdminUpdateInput = z.infer<typeof adminUpdateZ>;

//  Validate the ID (MongoDB ObjectId format)
export const idSchemaZ = z.object({
  _id: z
    .any()
    .transform((val) =>
      val instanceof mongoose.Types.ObjectId ? val.toString() : val
    )
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB User ID format",
    }),
});

export const changePasswordZ = z
  .object({
    currentPassword: z.string().min(8).max(20),
    newPassword: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Admin (Amdin) validation
export const userCreateZ = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .optional(),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  shippingAddress: addressZ.optional(),
  billingAddress: addressZ.optional(),
  isActive: z.boolean().default(true),

  gender: z.enum(["male", "female"]).optional(),

  isBlocked: z.boolean().default(false),
  blockedAt: z.date().optional(),
  avatar: imageZ.optional(), // optional
});

// If you want a separate update schema where fields can be optional:
export const userUpdateZ = userCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Types (optional)
export type UserCreateInput = z.infer<typeof userCreateZ>;
export type UserUpdateInput = z.infer<typeof userUpdateZ>;

export const querySchemaZ = z.object({
  sortBy: z.enum(["createdAt", "updatedAt", "name", "email"]).optional(),
  sortType: z.enum(["asc", "desc"]).optional().default("asc"),
});

export const loginSchemeZ = z
  .object({
    email: z.string().email().optional(),
    phone: z
      .string()
      .length(11, "Phone number must be 11 characters long")
      .optional(),
    password: z.string().min(8).max(20),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"], // Can also use "phone" or leave empty
  });

export const avatarSchemaZ = z.object({
  avatar: z
    .instanceof(File, { message: "Invalid file format" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      {
        message: "Only JPEG, JPG, PNG and WEBP files are allowed",
      }
    ),
});

// Category create/update schema
export const categoryCreateZ = z.object({
  name: z.string().min(1, "Name is required").trim(),
  // slug: require kebab-case (lowercase letters, numbers, hyphens)
  slug: z
    .string()
    .min(1, "Slug is required")
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be kebab-case (e.g. my-category)"
    ),
  description: z.string().trim().optional().nullable(),
  image: imageZ.optional().nullable(),
  isFeatured: z.boolean().optional().default(false),
});

// If you want a separate update schema where fields can be optional:
export const categoryUpdateZ = categoryCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Input Type inferred from Zod
export type CategoryCreateInput = z.infer<typeof categoryCreateZ>;
export type CategoryUpdateInput = z.infer<typeof categoryUpdateZ>;
