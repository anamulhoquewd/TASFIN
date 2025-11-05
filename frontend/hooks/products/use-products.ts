"use client";

import api from "@/axios/interceptor";
import type { IProduct } from "@/interfaces/products";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UseProductsOptions {
  initialLimit?: number;
  sortBy?: "title" | "createdAt";
  sortType?: "asc" | "desc";
  categories?: string[];
  priceRange?: { minPrice: number; maxPrice: number };
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    initialLimit = 12,
    sortBy = "createdAt",
    sortType = "desc",
    categories = [],
    priceRange,
  } = options;

  const [infinityProducts, setInfinityProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ sortBy, sortType });
  const [filters, setFilters] = useState({ categories, priceRange });
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Add a ref to track if we're currently fetching
  const isFetchingRef = useRef(false);

  const fetchInfinityProducts = useCallback(
    async (pageNum: number, reset = false) => {
      // Prevent duplicate requests
      if (isFetchingRef.current) {
        console.log("Already fetching, skipping...");
        return;
      }

      // Don't fetch if we know there's no more data (unless it's a reset)
      if (!reset && !hasMore) {
        console.log("No more data, skipping...");
        return;
      }

      isFetchingRef.current = true;
      setIsLoading(true);

      try {
        const params: any = {
          page: pageNum,
          limit: initialLimit,
          sortBy: sortConfig.sortBy,
          sortType: sortConfig.sortType,
          ...(filters.categories.length > 0 && {
            categories: filters.categories.join(","),
          }),
          ...(filters.priceRange && {
            minPrice: filters.priceRange.minPrice,
            maxPrice: filters.priceRange.maxPrice,
          }),
        };

        console.log("Fetching page:", pageNum, params);
        const response = await api.get("/products", { params });

        if (response.data.success && Array.isArray(response.data.data)) {
          const newProducts = response.data.data;
          const totalPagesFromAPI = response.data.pagination.totalPages;
          console.log("totalPagesFromAPI: ", totalPagesFromAPI);

          // Store total pages
          if (totalPagesFromAPI) {
            setTotalPages(totalPagesFromAPI);
          }

          if (reset) {
            setInfinityProducts(newProducts);
          } else {
            setInfinityProducts((prev) => [...prev, ...newProducts]);
          }

          // Check if we've reached the end using totalPage
          if (totalPagesFromAPI) {
            if (pageNum >= totalPagesFromAPI) {
              console.log(`Reached last page: ${pageNum}/${totalPagesFromAPI}`);
              setHasMore(false);
            }
          } else {
            // Fallback: check by data length if totalPage not provided
            if (newProducts.length < initialLimit) {
              console.log("Reached end of products (fallback check)");
              setHasMore(false);
            }
          }
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [initialLimit, sortConfig, filters, hasMore]
  );

  const fetchProducts = useCallback(
    async ({
      limit = 8,
      isFeatured = true,
      isActive = true,
      sortType = "desc",
      sortBy = "updatedAt",
    }) => {
      setIsLoading(true);

      try {
        const response = await api.get("/products", {
          params: { limit, isFeatured, isActive, sortType, sortBy },
        });

        if (response.data.success && Array.isArray(response.data.data)) {
          return response.data;
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [initialLimit, sortConfig, filters, hasMore]
  );

  const getProductBySlug = useCallback(
    async (slug: string): Promise<IProduct | null> => {
      // Prevent duplicate requests
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data.success) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        toast.error("Failed to fetch product by slug");
        console.error("Failed to fetch product by slug:", error);
        return null;
      }
    },
    []
  );

  const handleSort = useCallback(
    (newSortBy: "title" | "createdAt", newsortType: "asc" | "desc") => {
      if (sortBy === newSortBy && sortType === newsortType) return; // No change
      console.log("Sort changed:", newSortBy, newsortType);
      setSortConfig({ sortBy: newSortBy, sortType: newsortType });
      setPage(1);
      setHasMore(true);
      setTotalPages(null);
      setInfinityProducts([]);
    },
    []
  );

  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
    setHasMore(true);
    setTotalPages(null);
    setInfinityProducts([]);
  }, []);

  // Intersection Observer Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !isFetchingRef.current
        ) {
          console.log("Observer triggered, loading next page");
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchInfinityProducts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [hasMore, isLoading, fetchInfinityProducts]);

  // Initial load and filter/sort changes
  useEffect(() => {
    console.log("Filters or sort changed, resetting...");
    fetchInfinityProducts(1, true);
  }, [sortConfig, filters]);

  return {
    infinityProducts,
    isLoading,
    hasMore,
    observerTarget,
    sortConfig,
    handleSort,
    filters,
    handleFilterChange,
    totalPages,
    currentPage: page,
    getProductBySlug,
    fetchProducts,
  };
}
