import { IImage } from "../global";
import { IProductVariant } from "../products";

export interface ICartItem {
  productId: string;
  variantId: string;
  title: string;
  slug: string;
  image: IImage;
  price: number;
  originalPrice?: number;
  discountAmount?: number;
  discountLabel?: string;
  quantity: number;
  maxStock: number;
  // Include variant details for display
  attributes: Record<string, string>;
}

export interface IWishlistItem {
  productId: string;
  title: string;
  image: IImage;
  slug: string;
  variants: IProductVariant[];
  discount?: {
    discountType: "percentage" | "fixed";
    value: number;
    startAt?: Date;
    endAt?: Date;
  };
}
