export interface IPagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IImage {
  alt: string;
  url: string;
}

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
