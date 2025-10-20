import { IAddress } from "../orders";

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  address: IAddress;
  role: "super_admin" | "admin";
  avatar?: {
    alt: string;
    url: string;
  };
}

export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  address: string;
}
