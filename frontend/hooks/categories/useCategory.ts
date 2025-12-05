import { useState, useEffect, useCallback } from "react";
import api from "@/axios/interceptor";
import { ICategory } from "@/interfaces/categories";

function useCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []); // no dependency → stable reference

  useEffect(() => {
    fetchCategories();
  }, []); // safe dependency

  return { categories, loading, fetchCategories };
}

export default useCategory;
