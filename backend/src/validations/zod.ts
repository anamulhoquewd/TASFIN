// validation/admin.validation.ts
import { isValidDate } from "./../utils/index.js";
import mongoose from "mongoose";
import { number, z } from "zod";

// Image validation (matches your Image)
export const imageZ = z.object({
  alt: z.string().min(1),
  url: z.string().url(),
  publicId: z.string().optional(),
});

export type TImage = z.infer<typeof imageZ>;

// Accept either a 24-char hex string or a real ObjectId instance
export const objectIdZ = z.union([
  z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Expected a 24-char hex ObjectId string"),
  z.instanceof(mongoose.Types.ObjectId),
]);

export type TObjectId = z.infer<typeof objectIdZ>;

// IProductVariant
export const productVariantZ = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  sku: z.string().min(6),
  stock: z.number().int().min(0, "stock must be >= 0"),
  price: z.number().nonnegative("price must be >= 0"),
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        position: z.number().int().min(0),
      })
    )
    .nonempty("At least 1 image is required"),
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
  description: z.string().min(1).max(2000).optional(),
  keyFeatures: z.array(z.string().min(1).max(1000)).optional(),

  categories: z.array(objectIdZ),
  tags: z.array(z.string().min(1).max(50)).optional(),

  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        position: z.number().int().min(0),
      })
    )
    .nonempty("At least 1 image is required"),

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

  isFeatured: z.boolean().optional(),
  isItNew: z.boolean().optional(),
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

// Address validation (matches your Address fields)
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

export type TAddress = z.infer<typeof addressZ>;

// Bangladesh phone regex (local format like 017xxxxxxxx)
export const BDPhoneRegex = /^01[3-9]\d{8}$/;

export type TBDPhone = z.infer<typeof BDPhoneRegex>;

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

export type Tdmin = z.infer<typeof adminCreateZ>;

// If you want a separate update  where fields can be optional:
export const adminUpdateZ = adminCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateAdmin = z.infer<typeof adminUpdateZ>;

//  Validate the ID (MongoDB ObjectId format)
export const mongoIdZ = z.object({
  _id: z
    .any()
    .transform((val) =>
      val instanceof mongoose.Types.ObjectId ? val.toString() : val
    )
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid MongoDB User ID format",
    }),
});

export type TMongoId = z.infer<typeof mongoIdZ>;

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

export type TChangePassword = z.infer<typeof changePasswordZ>;

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

  status: z.boolean().default(true),

  gender: z.enum(["male", "female"]).optional(),

  isBlocked: z.boolean().default(false),
  blockedAt: z.date().optional(),
  avatar: imageZ.optional(), // optional
});

export type TUser = z.infer<typeof userCreateZ>;

// If you want a separate update  where fields can be optional:
export const userUpdateZ = userCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateUser = z.infer<typeof userUpdateZ>;

export const queryZ = z.object({
  sortBy: z.enum(["createdAt", "updatedAt", "name", "email"]).optional(),
  sortType: z.enum(["asc", "desc"]).optional().default("asc"),
});

export type TQuery = z.infer<typeof queryZ>;

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

export type TLogin = z.infer<typeof loginSchemeZ>;

export const avatarZ = z.object({
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

export type TAvatar = z.infer<typeof avatarZ>;

// Category create/update
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
});

export type TCategory = z.infer<typeof categoryCreateZ>;

// If you want a separate update  where fields can be optional:
export const categoryUpdateZ = categoryCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateCategory = z.infer<typeof categoryUpdateZ>;

// Category create/update
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
  whatsApp: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim()
    .optional(),
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

export type TSettings = z.infer<typeof settingCreateZ>;

// If you want a separate update  where fields can be optional:
export const settingUpdateZ = settingCreateZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateSetting = z.infer<typeof settingUpdateZ>;

// OrderProduct
export const orderedItemsZ = z.object({
  productId: objectIdZ,
  variantId: objectIdZ,
  quantity: z.number().int().min(1),
});

export type TOrderdProduct = z.infer<typeof orderFetchQueryZ>;

// Product fetch query
export const productFetchQueryZ = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(["createdAt", "updatedAt", "title"]).default("updatedAt"),
  sortType: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.instanceof(mongoose.Types.ObjectId).optional(),
  isFeatured: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    ),
  isItNew: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    ),
  status: z
    .string()
    .optional()
    .transform((val) =>
      val === "true" ? true : val === "false" ? false : undefined
    ),
  priceRange: z
    .object({
      min: z.number().min(0).default(0),
      max: z.number().min(0).default(10000),
    })
    .optional(),
  categories: z.array(z.string()).optional(),
});

export type TOrderFetchQuery = z.infer<typeof productFetchQueryZ>;

// Payment status and order status enums
export const paymentStatusEnumZ = z.enum(["unpaid", "paid"]);
export type TPaymentStatus = z.infer<typeof paymentStatusEnumZ>;
export const orderStatusEnumZ = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export type TOrderStatus = z.infer<typeof orderStatusEnumZ>;

export const toPmeasurementZ = z.object({
  bust: z.string().optional(),
  waist: z.string().optional(),
  hip: z.string().optional(),
  shoulder: z.string().optional(),
  sleeveLength: z.string().optional(),
  fullLength: z.string().optional(),
  neck: z.string().optional(),
  armhole: z.string().optional(),
});

export type TTopMeasurement = z.infer<typeof toPmeasurementZ>;

export const bottonMeasurementZ = z.object({
  waist: z.string().optional(),
  hip: z.string().optional(),
  length: z.string().optional(),
  inseam: z.string().optional(),
  bottomOpening: z.string().optional(),
});

export type TBottonMeasurement = z.infer<typeof bottonMeasurementZ>;

export const customOrderZ = z.object({
  isCustom: z.literal(true),
  measurements: z.object({ toPmeasurementZ, bottonMeasurementZ }),
  referenceImages: z
    .array(
      z.object({
        file: z.instanceof(File),
        position: z.number().int().min(0),
      })
    )
    .optional(),
  note: z.string().max(500).optional(),
});

export const normalOrderZ = z.object({
  isCustom: z.literal(false),
});

// Main Order
export const orderZ = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  items: z
    .array(orderedItemsZ)
    .min(1, "Order must contain at least one product"),

  address: addressZ,

  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email("Invalid email address").trim().toLowerCase().optional()
  ),

  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),

  paymentMethod: z.enum(["cod"]).default("cod"),

  shippingCost: z.number().nonnegative().default(0),

  couponCode: z.string().trim().optional(),
  // Custom / Normal Order Handling
  customOrder: z.union([customOrderZ, normalOrderZ]),
});

export type TOrder = z.infer<typeof orderZ>;

// If you want a separate update  where fields can be optional:
export const orderUpdateZ = orderZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateOrder = z.infer<typeof orderUpdateZ>;

export const orderFetchQueryZ = z.object({
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

export type TOrderQuery = z.infer<typeof orderFetchQueryZ>;

export const subscriberZ = z.object({
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

export type TSubscribe = z.infer<typeof subscriberZ>;

export const subscriberUpdateZ = subscriberZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateSubscribe = z.infer<typeof subscriberUpdateZ>;

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

export type TQuerySubscribe = z.infer<typeof subscriberQueryZ>;

export const couponZ = z
  .object({
    code: z
      .string()
      .min(1)
      .max(8, "Code must be less than 8 characters")
      .toUpperCase(),

    discountType: z.enum(["percent", "fixed"]),

    value: z.number().positive(),

    maxValue: z.number().positive(),

    minSubtotal: z.number().nonnegative(),

    startAt: z.coerce.date(),
    endAt: z.coerce.date(),

    totalUsageLimit: z.number().int().positive(),
    perUserUsageLimit: z.number().int().positive(),

    usedCount: z.number().int().nonnegative().default(0),

    status: z.boolean().default(true),
  })
  .refine((data) => data.endAt > data.startAt, {
    message: "End date must be after start date",
    path: ["endAt"],
  });

export type TCoupon = z.infer<typeof couponZ>;

export const updateCouponZ = couponZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateCoupon = z.infer<typeof updateCouponZ>;

export const couponUsageZ = z.object({
  couponId: objectIdZ,
  phone: z
    .string()
    .regex(BDPhoneRegex, "Invalid BD phone number (e.g. 019XXXXXXXX)")
    .trim(),
  usedCount: z.number().int().nonnegative().default(0),
  lastUsedAt: z.coerce.date().optional(),
});

export type TCouponUsage = z.infer<typeof couponUsageZ>;

export const updateCouponUsageZ = couponUsageZ.partial().refine(
  (data) => {
    // ensure at least one field present on update
    return Object.keys(data).length > 0;
  },
  { message: "At least one field must be provided for update" }
);

export type TUpdateCouponUsage = z.infer<typeof updateCouponUsageZ>;
