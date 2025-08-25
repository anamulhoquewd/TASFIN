export interface IImage {
  alt: string;
  url: string;
}

export interface IProductVariant {
  _id: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  images?: IImage[];
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: {
    html: { type: string };
    json: { type: object };
  };
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

export interface IMedia {
  alt: string;
  url: string;
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
