import api from "@/axios/interceptor";
import { Product } from "@/lib/validation";
import { useCallback, useEffect, useState } from "react";

export function useKidsCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/kids", {
        params: {
          isActive: true,
          limit: 50,
          sortBy: "createdAt",
          sortType: "desc",
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Failed to load products",
        );
      }

      setProducts(
        (response.data.data ?? []).map((product: Product) => ({
          ...product,
          _id: String(product._id),
        })),
      );
    } catch (error) {
      console.error("Failed to fetch kids products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
}
