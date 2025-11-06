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

const defaultPagination = {
  page: 1,
  total: 0,
  totalPages: 0,
  nextPage: null,
  prevPage: null,
};

export { defaultPagination };
