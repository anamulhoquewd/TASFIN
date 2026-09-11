import mongoose from "mongoose";

export interface CustomerSessionT  {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImage {
  alt: string;
  url: string;
  position: number;
  key: string;
}

export interface IProductVariant  {
  _id: string;
  sku: string;
  attributes: Map<string, string>; // flexible attributes
  stock: number;
  price: number;
  images?: IImage[];
}

export interface IProduct  {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  keyFeatures?: string[];
  categories: mongoose.Types.ObjectId[];
  images: IImage[];
  variants: IProductVariant[];
  specifications?: Map<string, string>;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  avgRating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isActive: boolean;
  tags?: string[];
  discount?: {
    discountType: "percentage" | "fixed";
    value: number;
    startAt: Date;
    endAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory  {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
  sortOrder?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IAdmin  {
  _id: string;
  name: string;
  email: string;
  nid: string;
  password: string;
  phone: string;
  address: IAddress;
  avatar: IImage;

  role: "super_admin" | "admin";

  matchPassword: (password: string) => Promise<boolean>;
  generateAuthToken: () => Promise<string>;
  generateResetPasswordToken: (expMinutes?: number) => string;

  refresh?: string;
  resetPasswordToken: string | null;
  resetPasswordExpireDate: Date | null;
  failedLoginAttempts: number;
  lockUntil?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUser  {
  _id: string;
  name: string;
  email: string;
  phone: string;
  addresses?: IAddress[];
  isActive: boolean;
  isBlocked?: boolean;
  blockedAt: Date;
  blockedReason: string; // Added — admin note for why a user was blocked
  avatar: IImage;
  dob: Date;
  gender: "male" | "female";
  lastOrderAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriber {
  email: string;
  status: "subscribed" | "unsubscribed";
  source: string;
  verified: boolean;
  isBlocked?: boolean;
  blockedAt: Date;
  blockedReason: string; // Added — admin note for why a user was blocked
}

export interface ICoupon  {
  code: string;
  type: "percent" | "fixed";
  value: number;
  maxValue: number;
  minSubtotal: number;

  startAt: Date;
  endAt: Date;

  usageLimitTotal: number;
  usageLimitPerUser: number;
  usedCount: number;
  applicableProductIds: mongoose.Types.ObjectId[];
  applicableCategoryIds: mongoose.Types.ObjectId[];
  excludedProductIds: mongoose.Types.ObjectId[];

  active: boolean;
}

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  variantId: mongoose.Types.ObjectId;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
  sku: string; // Added — needed for support/logistics
  // size: string; // Added — was missing entirely; no way to show size without re-querying Product
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  address: IAddress;
  paymentStatus: "unpaid" | "paid" | "refunded";
  paymentMethod: "cod" | "bkash" | "nagad" | "card";
  totalAmount: number;
  shippingCost: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"
    | "archived";
  subtotal: number;
  productDiscountTotal: number;
  couponCode?: string;
  couponDiscount: number;
  statusHistory: {
    note?: string;
    status: IOrder["status"];
    at?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment  {
  _id: string;
  orderId: mongoose.Types.ObjectId;
  method: "cod" | "bkash" | "nagad" | "card";
  amount: number;
  currency: "BDT" | "USD";
  transactionId?: string;
  status: "pending" | "success" | "failed" | "refunded";
  refundedAmount: number;
  refundedAt?: Date;
  gatewayResponse?: any; // Store raw gateway response for failed payments
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview  {
  _id: string;
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  isApproved: boolean;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOffers  {
  name: string;
  message: string;
  image: IImage;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface IDiscount  {
  _id: string;
  title: string;
  description?: string;

  discountType: "percentage" | "fixed";
  value: number;

  startAt: Date;
  endAt: Date;

  productIds: mongoose.Types.ObjectId[];

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ISettings  {
  siteName: string;
  siteDescription: string;
  logo: IImage;
  favicon?: IImage;
  contactEmail: string;
  contactPhone: string;
  address: IAddress;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
