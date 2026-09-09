// validation/admin.validation.ts
import { isValidDate } from "./../utils/index.js";
import mongoose from "mongoose";
import {  z } from "zod";

// Image validation (matches your ImageSchema)
export const imageZ = z.object({
  alt: z.string().min(1, "Image alt text required").trim(),
  url: z.string().url("Invalid image URL").trim(),
});

const imageFileSchema = z.object({
  file: z
    .file()
    .mime(["image/jpeg", "image/png", "image/webp"], {
      message: "Only jpeg, png, or webp images are allowed",
    })
    .max(5 * 1024 * 1024, { message: "Each image must be under 5MB" }),
  position: z.number().int().min(0, "Position must be a non-negative integer"),
  alt: z.string().min(1, "Image alt text required").trim(),
});

export const imagesSchema = z
  .array(imageFileSchema)
  .nonempty({ message: "At least one file is required" });

export const optionalImagesSchema = z
  .array(imageFileSchema)
  .optional()
  .default([]);

// Accept either a 24-char hex string or a real ObjectId instance
export const objectIdSchemaZ = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Expected a 24-char hex ObjectId string"),
  z.instanceof(mongoose.Types.ObjectId),
]);

export const keyValueSchemaZ = z.object({
  key: z.string().trim().min(1, "key is required"),
  value: z.string().trim().min(1, "value is required"),
});

// helper: array of {key,value} -> plain object, rejects duplicate keys
export const keyValueArrayToRecord = (
  arr: { key: string; value: string }[],
) => {
  const record: Record<string, string> = {};
  for (const { key, value } of arr) {
    if (record[key] !== undefined) {
      throw new Error(`Duplicate specification key: "${key}"`);
    }
    record[key] = value;
  }
  return record;
};

export const productVariantSchemaZ = z.object({
  sku: z.string().min(1, "sku is required").trim(),
  attributes: z
    .array(keyValueSchemaZ)
    .optional()
    .default([])
    .transform((arr, ctx) => {
      try {
        return keyValueArrayToRecord(arr);
      } catch (e: any) {
        ctx.addIssue({ code: "custom", message: e.message });
        return z.NEVER;
      }
    }),
  stock: z.coerce.number().int().min(0).default(0),
  price: z.coerce.number().min(0, "price must be non-negative"),
  images: optionalImagesSchema,
});

export const productSchemaZ = z.object({
  title: z.string().min(1, "title is required"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  description: z.string().max(1000).optional(),
  keyFeatures: z.array(z.string().min(1)).optional(),

  categories: z.array(objectIdSchemaZ).nonempty("At least 1 category is required"),

  images: imagesSchema,
  variants: z
    .array(productVariantSchemaZ)
    .nonempty("At least 1 variant is required")
    .refine(
      (variants) => new Set(variants.map((v) => v.sku)).size === variants.length,
      { message: "Variant SKUs must be unique within the product" }
    ),

  specifications: z
    .array(keyValueSchemaZ)
    .optional()
    .default([])
    .transform((arr, ctx) => {
      try {
        return keyValueArrayToRecord(arr);
      } catch (e: any) {
        ctx.addIssue({ code: "custom", message: e.message });
        return z.NEVER;
      }
    }),

  isFeatured: z.boolean().optional().default(false),
  isActive: z.boolean().default(true),
  tags: z.array(z.string().min(1).max(10)).optional(),

  discount: z
    .object({
      discountType: z.enum(["percentage", "fixed"]),
      value: z.number().min(0),
      startAt: z.coerce.date().optional(),
      endAt: z.coerce.date().optional(),
    })
    .optional()
    .refine((d) => !d?.startAt || !d?.endAt || d.startAt < d.endAt, {
      message: "startAt must be before endAt",
    }),
});


// If you want a separate update schema where fields can be optional:
export const productUpdateZ = productSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export const productVariantUpdateZ = productVariantSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

// Product creation accepts pre-transform key-value arrays and produces records.
export type ProductCreateInput = z.input<typeof productSchemaZ>;
export type ProductCreateOutput = z.output<typeof productSchemaZ>;
export type ProductVariantUpdateInput = z.infer<typeof productVariantUpdateZ>;

export type ProductUpdateInput = z.infer<typeof productUpdateZ>;

// Address validation (matches your AddressSchema fields)
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

// ৩. NID এবং Role ছাড়া আপডেট স্কিমা
export const adminUpdateLimitedZ = z.object(adminCreateZ.shape)
  .omit({ nid: true, role: true }) // প্রথমে ফিল্ড বাদ দিন
  .partial()                       // তারপর অপশনাল করুন
  .refine(                         // সবশেষে রিফাইনমেন্ট যোগ করুন
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided for update" }
  );

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
  occupation: z.string().optional(),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase().optional()
  ),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  address: addressZ.optional(),

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
    email: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().email("Invalid email address").trim().toLowerCase().optional()
    ),

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
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
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

// Category create/update schema
export const settingCreateZ = z.object({
  siteName: z.string().min(1, "Site Name is required").trim(),
  siteDescription: z.string().optional(),
  logo: imageZ.optional(),
  favicon: imageZ.optional(),
  contactEmail: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase().optional()
  ),

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
export type SettingCreateInput = z.infer<typeof settingCreateZ>;
export type SettingUpdateInput = z.infer<typeof settingUpdateZ>;

/** OrderProduct schema */
export const orderProductSchemaZ = z.object({
  productId: objectIdSchemaZ,
  variantId: objectIdSchemaZ,
  quantity: z.number().int().min(1),
});

/** Payment status and order status enums */
export const paymentStatusEnumZ = z.enum(["unpaid", "paid"]);
export const orderStatusEnumZ = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

/** Main Order schema */
export const orderSchemaZ = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  products: z
    .array(orderProductSchemaZ)
    .min(1, "Order must contain at least one product"),

  address: addressZ,

  paymentStatus: paymentStatusEnumZ.default("unpaid"),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase().optional()
  ),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),

  status: orderStatusEnumZ.default("pending"),

  paymentMethod: z.enum(["cod"]).default("cod"),
  shippingCost: z.number().nonnegative("price must be >= 0").default(0),

  orderDate: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
});

// If you want a separate update schema where fields can be optional:
export const orderUpdateZ = orderSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

/** TypeScript types inferred from schemas */
export type OrderProductInput = z.infer<typeof orderProductSchemaZ>;
export type OrderInput = z.infer<typeof orderSchemaZ>;
export type OrderUpdateInput = z.infer<typeof orderUpdateZ>;

export const orderFetchQuerySchema = z.object({
  sortBy: z.string().optional().default("createdAt"),
  sortType: z.enum(["asc", "desc"]).optional().default("desc"),

  dateRange: z
    .object({
      from: z
        .string()
        .optional()
        .refine((val) => val === undefined || isValidDate(val), {
          message: "Invalid from date",
        }),
      to: z
        .string()
        .optional()
        .refine((val) => val === undefined || isValidDate(val), {
          message: "Invalid to date",
        }),
    })
    .optional(),
  date: z
    .string()
    .refine((val) => isValidDate(val), { message: "Invalid date" })
    .optional(),

  userId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB User ID format",
    })
    .optional(),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase().optional()
  ),
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim()
    .optional(),

  variantId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB Variant ID format",
    })
    .optional(),

  status: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .optional(),

  search: z.string().optional(),

  paymentStatus: z.enum(["paid", "unpaid"]).optional(),
});

export const subscriberSchemaZ = z.object({
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase()
  ),
  status: z.enum(["subscribed", "unsubscribed"]).default("subscribed"),

  verified: z.boolean().default(false),
  isBlocked: z.boolean().default(false),
  blockedAt: z.date().optional(),

  source: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

// If you want a separate update schema where fields can be optional:
export const subscriberUpdateZ = subscriberSchemaZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export const subscriberQueryZ = z.object({
  sortBy: z.enum(["createdAt", "updatedAt", "email"]).default("email"),
  sortType: z.enum(["asc", "desc"]).default("asc"),
  verified: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    ),
  isBlocked: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    ),
  search: z.string().optional(),
});

/** TypeScript types inferred from schemas */
export type SubscribeInput = z.infer<typeof subscriberSchemaZ>;
export type SubscribeUpdateInput = z.infer<typeof subscriberUpdateZ>;
