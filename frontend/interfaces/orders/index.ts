import { IImage } from "../global";

export interface IAddress {
  _id?: string;
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
  orderNumber: string;

  _id: string;
  user: IOrderUser;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  address: IAddress;
  orderDate: string | Date;
  createdAt: string;
  products: IOrderItem[];
  shippingCost: number;
  statusHistory: IStatusHistoryEntry;
}

export interface IFetchOrder {
  filters?: IFilter;
  page?: number;
  userId: string;
  limit?: number;
}

export interface IFilter {
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "all";
  paymentStatus: "paid" | "unpaid" | "all";
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  singleDate: Date | undefined;
}

export interface IOrderItem {
  productId: string;
  variantId: string;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
}
