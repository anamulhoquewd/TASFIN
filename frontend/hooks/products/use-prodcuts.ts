"use client";

import api from "@/axios/interceptor";
import type { IPagination } from "@/interfaces/global";
import type { IProduct } from "@/interfaces/products";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useProducts() {
  const [selectedItem, setSelectedItem] = useState<IProduct | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [variantImagePreviews, setVariantImagePreviews] = useState<{
    [key: number]: string[];
  }>({});

  // Function to fetch products
  const fetchProducts = async (pagination: IPagination) => {
    try {
      const response = await api.get("/products", { params: pagination });
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const getProductById = async (id: string): Promise<IProduct | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      toast.error("Failed to fetch product");
      return null;
    }
  };

  // Function to fetch product by slug
  const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    try {
      const response = await api.get(`/products/slug/${slug}`);
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch product by slug:", error);
      return null;
    }
  };

  return {
    selectedItem,
    setSelectedItem,
    isSubmitting,
    categoryOpen,
    setCategoryOpen,
    products,
    variantImagePreviews,
    setVariantImagePreviews,
    getProductById,
    getProductBySlug,
  };
}

export default useProducts;
