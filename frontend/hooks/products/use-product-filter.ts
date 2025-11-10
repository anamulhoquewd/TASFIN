// hooks/useProductFilters.ts
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export type ProductFilters = {
  categories: string[];
  priceRange: { minPrice: number; maxPrice: number };
};

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  priceRange: { minPrice: 0, maxPrice: 10000 },
};

export function useProductFilters(initial: ProductFilters = DEFAULT_FILTERS) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --------------------------------------------------------------------
  // 1. Parse URL → internal state (once on mount + on navigation)
  // --------------------------------------------------------------------
  const parseUrl = useCallback((): ProductFilters => {
    const cats = searchParams.get("categories")
      ? searchParams.get("categories")!.split(",")
      : [];
    const min = Number(searchParams.get("minPrice")) || 0;
    const max = Number(searchParams.get("maxPrice")) || 10_000;

    return {
      categories: cats,
      priceRange: { minPrice: min, maxPrice: max },
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<ProductFilters>(() => ({
    ...DEFAULT_FILTERS,
    ...initial,
    ...parseUrl(),
  }));

  // --------------------------------------------------------------------
  // 2. Keep UI in sync when the user navigates (back/forward)
  // --------------------------------------------------------------------
  useEffect(() => {
    setFilters((prev) => {
      const fromUrl = parseUrl();
      // Only update if something really changed (prevents infinite loop)
      if (
        prev.categories.join() !== fromUrl.categories.join() ||
        prev.priceRange.minPrice !== fromUrl.priceRange.minPrice ||
        prev.priceRange.maxPrice !== fromUrl.priceRange.maxPrice
      ) {
        return fromUrl;
      }
      return prev;
    });
  }, [parseUrl]);

  // --------------------------------------------------------------------
  // 3. Helper – push new query string without page reload
  // --------------------------------------------------------------------
  const pushUrl = useCallback(
    (newFilters: ProductFilters) => {
      const sp = new URLSearchParams();

      if (newFilters.categories.length)
        sp.set("categories", newFilters.categories.join(","));

      if (newFilters.priceRange.minPrice > 0)
        sp.set("minPrice", String(newFilters.priceRange.minPrice));

      if (newFilters.priceRange.maxPrice < 10_000)
        sp.set("maxPrice", String(newFilters.priceRange.maxPrice));

      const qs = sp.toString();
      router.push(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router]
  );

  // --------------------------------------------------------------------
  // 4. Public API
  // --------------------------------------------------------------------
  const setCategories = (cats: string[]) => {
    const next = { ...filters, categories: cats };
    setFilters(next);
    pushUrl(next);
  };

  const setPriceRange = (range: [number, number]) => {
    const next = {
      ...filters,
      priceRange: { minPrice: range[0], maxPrice: range[1] },
    };
    setFilters(next);
    // price is not pushed instantly – caller decides (instant or apply)
    return next;
  };

  const applyPrice = () => pushUrl(filters);

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    router.push("?", { scroll: false });
  };

  return {
    filters,
    setCategories,
    setPriceRange,
    applyPrice,
    reset,
  };
}
