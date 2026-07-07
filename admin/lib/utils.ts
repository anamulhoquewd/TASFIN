import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to decode payload. used for decode to public data. not for verification
export function decodeJwtPayload(token: string) {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, "base64").toString("utf-8")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
}

// Function to copy the access key to clipboard
export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast("Copied!");
};

export const priceFormatting = (price: number = 0) =>
  `BDT ${price.toLocaleString()}`;

type GenerateSKUProps = {
  size: string;
  color: string;
  brand?: string; // default TF
};

export function generateSKU({ size, color, brand = "TF" }: GenerateSKUProps) {
  if (!size || !color) return "";

  const normalize = (value: string) =>
    value
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // spaces → dash
      .replace(/-+/g, "-"); // multiple dash → single

  const safeColor = normalize(color);
  const safeSize = normalize(size);
  const safeBrand = normalize(brand);

  return `${safeBrand}-${safeColor}-${safeSize}`;
}

// Generate slug from title
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// mapping helper
export const mapStatusToBoolean = (state: string): boolean | undefined => {
  if (state === "active") return true;
  if (state === "inactive") return false;
  return undefined; // "all"
};
export const mapIsItNewToBoolean = (state: string): boolean | undefined => {
  if (state === "newest") return true;
  if (state === "oldest") return false;
  return undefined; // "all"
};
export const mapIsCustomToBoolean = (state: string): boolean | undefined => {
  if (state === "custom") return true;
  if (state === "not-custom") return false;
  return undefined; // "all"
};
export const mapFeaturedToBoolean = (state: string): boolean | undefined => {
  if (state === "featured") return true;
  if (state === "not-featured") return false;
  return undefined; // "all"
};
