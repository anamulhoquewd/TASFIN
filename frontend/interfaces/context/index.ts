import { IImage } from "../global";
import { IProductVariant } from "../products";

export interface ICartItem {
  productId: string;
  variantId: string;
  title: string;
  slug: string;
  image: IImage;
  price: number;
  quantity: number;
  maxStock: number;
  // Include variant details for display
  size: string;
}

export interface IWishlistItem {
  productId: string;
  title: string;
  image: IImage;
  slug: string;
  variants: IProductVariant[];
}
