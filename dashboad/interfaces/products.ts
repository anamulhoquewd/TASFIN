export interface IProduct {
  _id: string;
  slug: string;
  name: string;
  images: { alt: string; url: string }[];
  keys: string[];
  price: number;
  description: string;
  colors: {
    name: string;
    inStock: boolean;
    sizes: {
      name: string;
      inStock: boolean;
      quantity: number;
    }[];
  }[];
  category: string;
}
