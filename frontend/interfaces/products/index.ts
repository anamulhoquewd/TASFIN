import { IImage } from "../global";

export interface IProductVariant {
  _id: string;
  size: string;
  stock: number;
  price: number;
  images?: IImage[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  keyFeatures?: string[];
  categories: string[];

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

// Update operation interfaces
export interface IProductUpdateData {
  title?: string;
  slug?: string;
  description?: {
    html: string;
    json: any;
  };
  categories?: string[];
  images?: File[];
  variants?: IProductVariantUpdate[];
  fabric?: string;
  valueAddition?: string;
  cutFit?: string;
  collarNeck?: string;
  sleeve?: string;
  length?: string;
  washCare?: string;
  sideCut?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export interface IProductVariantUpdate {
  _id?: string; // Optional for new variants
  size: string;
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
