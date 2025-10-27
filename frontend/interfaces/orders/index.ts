import { IImage } from "../global";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  user: {
    name: string;
    phone: string;
    address: IAddress;
    email: string;
    _id: string;
  };
  totalAmount: number;
  paymentStatus: "unpaid" | "paid";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  address: IAddress;
  orderDate: string;
  createdAt: string;
  products: IOrderItem[];
}

export interface IOrderItem {
  productId: string;
  variantId: string;
  title: string;
  image: IImage;
  price: number;
  quantity: number;
}
