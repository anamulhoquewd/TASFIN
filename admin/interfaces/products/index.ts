import { IImage } from "../global";

export interface IProductVariant {
  _id: string;
  size: string;
  stock: number;
  price: number;
  color?: string;
  sku: string;
  images?: IImage[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  keyFeatures: string[];
  categories: string[];

  images: IImage[];
  variants: IProductVariant[];

  isCustom: boolean;
  isFeatured: boolean;
  isItNew: boolean;
  status: boolean;

  tags: string[];

  details: {
    fabric: string;
    valueAddition: string;
    cutFit: string;
    collarNeck: string;
    sleeve: string;
    length: string;
    washCare: string;
    sideCut: string;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IImageOperation {
  add?: File[];
  remove?: string[];
  replace?: { oldUrl: string; newFile: File };
}

export interface IVariantImageOperation {
  variantId: string;
  operations: IImageOperation;
}

export interface ICategoryOperation {
  added: string[];
  removed: string[];
}

export interface IUpdateProductResult {
  success: boolean;
  data?: IProduct;
  error?: string;
}

export interface ICartItem {
  _id: string;
  name: string;
  media: { url: string; alt: string };
  title: string;
  unit: {
    price: number;
    stockQuantity: number;
    unitType: "kg" | "piece";
  };
  quantity: number;
}
