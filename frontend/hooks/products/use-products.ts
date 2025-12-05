import api from "@/axios/interceptor";
import { IProduct } from "@/interfaces/products";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UseProductsOptions {
  categories?: string[];
  priceRange?: { minPrice: number; maxPrice: number };
}

export function useProducts(options: UseProductsOptions = {}) {
  const { categories = [], priceRange = { minPrice: 0, maxPrice: 10000 } } =
    options;

  const initialLimit = 12;

  const [infinityProducts, setInfinityProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortType: "desc",
  });
  const [filters, setFilters] = useState({ categories, priceRange });
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const isFetchingRef = useRef(false);

  const fetchInfinityProducts = useCallback(
    async (pageNum: number, reset = false) => {
      if (isFetchingRef.current) return;

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

        const response = await api.get("/products", { params });

        if (response.data.success && Array.isArray(response.data.data)) {
          const newProducts = response.data.data;
          console.debug(
            "fetchInfinityProducts - page:",
            pageNum,
            "fetched ids:",
            newProducts.map((p: IProduct) => p._id)
          );

          const totalPagesFromAPI = response.data.pagination.totalPages || 0;

          if (totalPagesFromAPI) {
            setTotalPages(totalPagesFromAPI);
          }

          if (reset) {
            setInfinityProducts(newProducts);
          } else {
            setInfinityProducts((prev) => {
              // merge and dedupe by _id to avoid duplicate entries
              const merged = [...prev, ...newProducts];
              const seen = new Set<string>();
              const deduped: IProduct[] = [];
              for (const item of merged) {
                if (!seen.has(item._id)) {
                  seen.add(item._id);
                  deduped.push(item);
                }
              }
              return deduped;
            });
          }

          if (totalPagesFromAPI) {
            if (pageNum >= totalPagesFromAPI) {
              setHasMore(false);
            }
          } else {
            if (newProducts.length < initialLimit) {
              setHasMore(false);
            }
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [initialLimit, sortConfig, filters]
  );

  const fetchProducts = useCallback(
    async ({
      limit = 8,
      isActive = true,
      sortType = "desc",
      sortBy = "updatedAt",
    }) => {
      setIsLoading(true);

      try {
        const response = await api.get("/products", {
          params: { limit, isActive, sortType, sortBy },
        });

        if (response.data.success && Array.isArray(response.data.data)) {
          return response.data;
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getProductBySlug = useCallback(
    async (slug: string): Promise<IProduct | null> => {
      try {
        const response = await api.get(`/products/slug/${slug}`);
        if (response.data.success) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        // toast.error("Failed to fetch product by slug");
        console.error("Failed to fetch product by slug:", error);
        return null;
      }
    },
    []
  );

  const handleSort = useCallback(
    (newSortBy: "title" | "createdAt", newSortType: "asc" | "desc") => {
      setSortConfig({ sortBy: newSortBy, sortType: newSortType });
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !isFetchingRef.current
        ) {
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

  useEffect(() => {
    fetchInfinityProducts(1, true);
  }, [sortConfig, filters, fetchInfinityProducts]);

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
