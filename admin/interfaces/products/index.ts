export interface IImage {
  alt: string;
  url: string;
  position?: number;
  key: string;
}

export interface IProductVariant {
  _id: string;
  sku: string;
  attributes: Map<string, string>; // flexible attributes
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
  specifications?: Map<string, string>;
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
  categories?: string[];
  images?: File[];
  variants?: IProductVariantUpdate[];
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
