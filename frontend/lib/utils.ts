import { IProduct } from "@/interfaces/products";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number = 0) =>
  `BDT ${price.toLocaleString()}`;

// Function to copy the access key to clipboard
export const copyToClipboard = (text: string) => {
  toast.success("Copied");
  navigator.clipboard.writeText(text);
};

export const defaultPagination = {
  page: 1,
  total: 0,
  totalPages: 0,
  nextPage: null,
  prevPage: null,
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=new-arrivals", label: "New Arrivals" },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, NY",
    text: "The quality is exceptional. Every piece feels luxurious and the fit is always perfect. Tasfin has become my go-to for special occasions.",
    rating: 5,
    avatar: {
      url: "https://randomuser.me/api/portraits/women/2.jpg",
      alt: "Sarah Mitchell",
    },
  },
  {
    id: 2,
    name: "Emma Thompson",
    location: "Los Angeles, CA",
    text: "I've never received so many compliments on my outfits. The attention to detail in each garment is remarkable.",
    rating: 2,
    avatar: {
      url: "https://randomuser.me/api/portraits/women/3.jpg",
      alt: "Emma Thompson",
    },
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Chicago, IL",
    text: "Beautiful designs that transition seamlessly from day to evening. The customer service is equally impressive.",
    rating: 5,
    avatar: {
      url: "https://randomuser.me/api/portraits/women/4.jpg",
      alt: "Priya Sharma",
    },
  },
  {
    id: 4,
    name: "Jessica Chen",
    location: "San Francisco, CA",
    text: "Finally found a brand that understands modern elegance. The fabrics are divine and the styles are timeless.",
    rating: 5,
    avatar: {
      url: "https://randomuser.me/api/portraits/women/5.jpg",
      alt: "Jessica Chen",
    },
  },
];

// Centralized product data for the entire app
export const product: IProduct = {
  _id: "1",
  title: "Silk Midi Dress in Ivory",
  images: [
    { url: "/product-placeholder.png", alt: "Silk Midi Dress in Ivory" },
  ],
  categories: ["2-piece"],
  description:
    "A luxurious silk midi dress with a flattering silhouette. Perfect for special occasions or elevated everyday wear.",
  variants: [
    {
      size: "S",
      price: 295,
      _id: "variant1",
      stock: 5,
    },
    {
      size: "M",
      price: 295,
      _id: "variant2",
      stock: 7,
    },
    {
      size: "L",
      _id: "variant3",
      price: 295,
      stock: 3,
    },
  ],
  isFeatured: true,
  isActive: true,
  slug: "silk-midi-dress-in-ivory",
  updatedAt: new Date(),
  createdAt: new Date(),
};
