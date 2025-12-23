import { IAddress } from "./orders";

export interface IPagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IImage {
  url: string;
  publicId: string;
  position: number;
  isPrimary?: boolean;
}

export interface ISettings {
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
