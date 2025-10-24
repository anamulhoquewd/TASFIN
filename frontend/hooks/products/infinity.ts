"use client";

import api from "@/axios/interceptor";
import type { IProduct } from "@/interfaces/products";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UseInfiniteProductsOptions {
  initialLimit?: number;
  sortBy?: "price" | "name" | "newest";
  sortOrder?: "asc" | "desc";
  categories?: string[];
  priceRange?: { min: number; max: number };
}

export function useInfiniteProducts(options: UseInfiniteProductsOptions = {}) {
  const {
    initialLimit = 12,
    sortBy = "newest",
    sortOrder = "desc",
    categories = [],
    priceRange,
  } = options;

  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ sortBy, sortOrder });
  const [filters, setFilters] = useState({ categories, priceRange });
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(
    async (pageNum: number, reset = false) => {
      setIsLoading((prevLoading) => {
        if (prevLoading) return prevLoading;
        (async () => {
          try {
            const params: any = {
              page: pageNum,
              limit: initialLimit,
              sort: sortConfig.sortBy,
              order: sortConfig.sortOrder,
              ...(filters.categories.length > 0 && {
                categories: filters.categories.join(","),
              }),
              ...(filters.priceRange && {
                minPrice: filters.priceRange.min,
                maxPrice: filters.priceRange.max,
              }),
            };

            const response = await api.get("/products", { params });

            if (response.data && Array.isArray(response.data.data)) {
              if (reset) {
                setProducts(response.data.data);
              } else {
                setProducts((prev) => [...prev, ...response.data.data]);
              }

              if (response.data.data.length < initialLimit) {
                setHasMore(false);
              }
            }
          } catch (error) {
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
          } finally {
            setIsLoading(false);
          }
        })();

        return true;
      });
    },
    [initialLimit, sortConfig, filters]
  );

  const handleSort = useCallback(
    (newSortBy: "price" | "name" | "newest", newSortOrder: "asc" | "desc") => {
      setSortConfig({ sortBy: newSortBy, sortOrder: newSortOrder });
      setPage(1);
      setHasMore(true);
      setProducts([]);
    },
    []
  );

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
    setHasMore(true);
    setProducts([]);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchProducts(nextPage);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, fetchProducts]);

  useEffect(() => {
    fetchProducts(1, true);
  }, [sortConfig, filters]);

  return {
    products,
    isLoading,
    hasMore,
    observerTarget,
    sortConfig,
    handleSort,
    filters,
    handleFilterChange,
  };
}
