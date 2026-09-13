import { IImage } from "../global";

export interface IProductVariant {
  _id: string;
  sku: string;
  attributes: Record<string, string> | Map<string, string>; // flexible attributes
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
  categories: string[];
  images: IImage[];
  variants: IProductVariant[];
  specifications?: Array<{ label: string; value: string }>;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  avgRating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isActive: boolean;
  tags?: string[];
  discount?: {
    discountType: "percentage" | "fixed";
    value: number;
    startAt: Date;
    endAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Update operation interfaces
export interface IProductUpdateData {
  title?: string;
  slug?: string;
  description?: string;
  categories?: string[];
  images?: File[];
  variants?: IProductVariantUpdate[];
  valueAddition?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export interface IProductVariantUpdate {
  _id?: string; // Optional for new variants
  attributes: Record<string, string>;
  stock: number;
  price: number;
  images?: File[];
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
