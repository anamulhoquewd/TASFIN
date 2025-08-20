import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultPagination = {
  page: 1,
  total: 0,
  totalPages: 0,
  nextPage: null,
  prevPage: null,
};
