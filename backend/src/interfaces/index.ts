import mongoose from "mongoose";

export interface IImage {
  url: string;
  publicId: string;
  position: number;
  isPrimary?: boolean;
}

export interface IAdmin extends mongoose.Document {
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
}

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  occupation: string;
  email: string;
  phone: string;
  address?: IAddress;
  status: boolean;
  isBlocked?: boolean;
  blockedAt?: Date;

  avatar: IImage;

  dob: Date;
  gender: "male" | "female";
}

export interface IProductVariant {
  _id: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  images?: IImage[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  keyFeatures?: string[];
  categories: mongoose.Types.ObjectId[];

  images: IImage[];
  variants: IProductVariant[];

  isCustom?: boolean;
  isFeatured?: boolean;
  isItNew?: boolean;
  status: boolean;

  tags?: string[];

  details: {
    fabric?: string;
    valueAddition?: string;
    cutFit?: string;
    collarNeck?: string;
    sleeve?: string;
    length?: string;
    washCare?: string;
    sideCut?: string;
  };
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ISubscriber {
  email: string;
  status: "subscribed" | "unsubscribed";
  source: string;
  verified: boolean;
  ipAddress: string | null;
  userAgent: string | null;
  isBlocked?: boolean;
  blockedAt?: Date;
}

export interface IOrderProduct {
  productId: string;
  variantId: string;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
}

export interface IOrderHistry {
  date: Date;
  note: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export interface IOrder {
  _id: string;
  paymentId?: mongoose.Types.ObjectId;
  name: string;
  user: mongoose.Types.ObjectId;
  address: IAddress;

  items: IOrderProduct[];

  discount: number;
  shippingCost: number;
  subtotal: number;
  total: number;

  statusHistory: IOrderHistry[];
  paymentStatus: "unpaid" | "paid";
  paymentMethod: "cod";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;

  // Custom Order Fields
  isCustom: boolean;
  customOrder?: {
    isCustom: boolean;
    measurements?: {
      top?: {
        bust?: string;
        waist?: string;
        hip?: string;
        shoulder?: string;
        sleeveLength?: string;
        fullLength?: string;
        neck?: string;
        armhole?: string;
      };
      bottom?: {
        waist?: string;
        hip?: string;
        length?: string;
        inseam?: string;
        bottomOpening?: string;
      };
    };
    referenceImages?: IImage[];
    note?: string;
  };

  coupon: {
    code: string;
    discountType: "percent" | "fixed";
    value: number;
    discountAmount: number;
  };
}

export interface IPayment {
  _id: string;
  orderId: mongoose.Types.ObjectId;
  method: "cod" | "bkash" | "nagad" | "bank";
  amount: number;
  currency: "BDT" | "USD";
  transactionId?: string;
  status: "pending" | "success" | "failed";
  gatewayResponse?: any;
}

export interface IReview {
  _id: string;
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

export interface IOffer {
  name: string;
  message: string;
  image: IImage;
  startAt: Date;
  endAt: Date;
  status: boolean;
}

export interface IDiscount {
  title: string;
  discountType: "percentage" | "fixed";
  value: number;

  startAt: Date;
  endAt: Date;

  applicableCategories?: mongoose.Types.ObjectId[];
  applicableTags?: string[];

  applicableProductIds?: mongoose.Types.ObjectId[];

  status: boolean;
}

export interface ICoupon {
  code: string;
  discountType: "percent" | "fixed";
  value: number;
  maxValue: number;
  minSubtotal: number;

  startAt: Date;
  endAt: Date;

  totalUsageLimit: number;
  perUserUsageLimit: number;
  usedCount: number;

  status: boolean;
}

export interface ICouponUsage {
  couponId: mongoose.Types.ObjectId;

  phone: string;

  usedCount: number;
  lastUsedAt: Date;
}

export interface ISettings {
  siteName: string;
  siteDescription: string;
  logo: IImage;
  favicon?: IImage;
  contactEmail: string;
  contactPhone?: string;
  whatsApp?: string;
  address?: IAddress;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  nextPage?: number;
  prevPage?: number;
}
