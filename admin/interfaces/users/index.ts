import { IAddress } from "../orders";

export interface IImage {
  alt: string;
  url: string;
}

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  address: IAddress;
  role: "super_admin" | "admin";
  avatar?: IImage;
}

export interface ICustomer {
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
