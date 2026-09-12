import { IImage } from "../global";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"
  | "archived";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface IStatusHistoryEntry {
  status: OrderStatus;
  note?: string;
  at: Date;
}

export interface IOrderUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user: IOrderUser;
  products: IOrderItem[];
  address: IAddress;

  subtotal: number;
  productDiscountTotal: number;
  couponDiscount: number;
  shippingCost: number;
  totalAmount: number;

  paymentStatus: PaymentStatus;
  paymentMethod: "cod" | "card" | "bkash" | "nagad"; // adjust to your actual enum

  status: OrderStatus;
  statusHistory: IStatusHistoryEntry[];

  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IOrderItem {
  productId: string;
  variantId: string;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
}
