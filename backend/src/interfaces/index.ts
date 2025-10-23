import mongoose from "mongoose";

export interface IImage {
  alt: string;
  url: string;
}

export interface IProductVariant extends mongoose.Document {
  _id: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  images?: IImage[];
}

export interface IProduct extends mongoose.Document {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  keyFeatures?: string[];
  categories: mongoose.Types.ObjectId[];

  images: IImage[];
  variants: IProductVariant[];

  fabric?: string;
  valueAddition?: string;
  cutFit?: string;
  collarNeck?: string;
  sleeve?: string;
  length?: string;
  washCare?: string;
  sideCut?: string;

  isFeatured?: boolean;

  isActive: boolean;

  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory extends mongoose.Document {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: IImage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
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

  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address?: IAddress;
  isActive: boolean;
  isBlocked?: boolean;
  blockedAt: Date;
  avatar: IImage;

  dob: Date;
  gender: "male" | "female";

  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon extends mongoose.Document {
  code: string;
  discountType: "percent" | "fixed";
  value: number;
  maxDiscount: number;
  minSubtotal: number;

  startAt: Date;
  endAt: Date;

  usageLimitTotal: number;
  usageLimitPerUser: number;
  usedCount: number;
  applicableProductIds: mongoose.Types.ObjectId;

  active: boolean;
}

export interface IOrderProduct extends mongoose.Document {
  productId: string;
  variantId: string;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
}

export interface IOrder extends mongoose.Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  products: IOrderProduct[];
  address: IAddress;
  paymentStatus: "unpaid" | "paid";
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
}

export interface IPayment extends mongoose.Document {
  _id: string;
  orderId: mongoose.Types.ObjectId;
  method: "cod" | "bkash" | "nagad" | "card";
  amount: number;
  currency: "BDT" | "USD";
  transactionId?: string;
  status: "pending" | "success" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends mongoose.Document {
  _id: string;
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOffers extends mongoose.Document {
  name: string;
  message: string;
  image: IImage;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface IDiscount extends mongoose.Document {
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

export interface ISettings extends mongoose.Document {
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
