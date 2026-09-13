import { IProductVariant } from "@/interfaces/products";

export type VariantAttributes = Record<string, string>;

export function getVariantAttributes(
  attributes: IProductVariant["attributes"]
): VariantAttributes {
  if (attributes instanceof Map) return Object.fromEntries(attributes.entries());
  return attributes || {};
}

export function getVariantAttributeGroups(variants: IProductVariant[]) {
  const groups = new Map<string, Set<string>>();

  variants.forEach((variant) => {
    Object.entries(getVariantAttributes(variant.attributes)).forEach(
      ([key, value]) => {
        if (!groups.has(key)) groups.set(key, new Set());
        groups.get(key)?.add(value);
      }
    );
  });

  return Array.from(groups, ([key, values]) => ({
    key,
    values: Array.from(values),
  }));
}