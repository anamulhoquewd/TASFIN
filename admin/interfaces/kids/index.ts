import { IImage } from "../global";

export interface IKidsProduct {
  _id: string;
  title: string;
  name: string;
  images: IImage[];
  fabric: string;
  sizes: string[];
  colors: string[];
  moq: number;
  minPrice: number;
  maxPrice: number;
  description: string;
  isActive: boolean;
  createdAt: Date;
}
