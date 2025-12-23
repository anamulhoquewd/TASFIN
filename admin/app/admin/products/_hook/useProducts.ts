"use client";

import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IProduct } from "@/interfaces/products";
import { productZ, TProduct } from "@/lib/schemas";
import {
  generateSlug,
  mapFeaturedToBoolean,
  mapIsCustomToBoolean,
  mapIsItNewToBoolean,
  mapStatusToBoolean,
} from "@/lib/utils";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  title: "",
  slug: "",
  description: "",
  keyFeatures: [],
  isCustom: false,
  categories: [],
  images: [],
  variants: [
    {
      size: "",
      color: "",
      stock: 0,
      price: 0,
      sku: "",
      images: [],
    },
  ],
  details: {
    fabric: "",
    valueAddition: "",
    cutFit: "",
    collarNeck: "",
    sleeve: "",
    length: "",
    washCare: "",
    sideCut: "",
  },
  isFeatured: false,
  isItNew: false,
  status: true,
  tags: [],
};

function useProducts() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [variantImagePreviews, setVariantImagePreviews] = useState<{
    [key: number]: string[];
  }>({});
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [isItNew, setIsItNew] = useState("all");
  const [custom, setCustom] = useState("all");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [productIdForDelete, setProductIdForDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const form = useForm<z.input<typeof productZ>>({
    resolver: zodResolver(productZ),
    defaultValues,
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // Handle title change and auto-generate slug
  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (value) {
      form.setValue("slug", generateSlug(value));
    }
  };

  // Handle variant image upload
  const handleVariantImageUpload = (
    variantIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Invalid file type", {
        description: "Please upload only JPEG, PNG, or WebP images.",
      });
      return;
    }

    // Get current variant images
    const currentVariant = form.getValues(`variants.${variantIndex}`);
    const currentImages: File[] = currentVariant.images || [];

    // Filter duplicates (check by name + size)
    const newFiles = files.filter(
      (file) =>
        !currentImages.some(
          (img: File) => img.name === file.name && img.size === file.size
        )
    );

    if (newFiles.length === 0) {
      toast.warning("Duplicate images ignored", {
        description: "You tried to upload images that already exist.",
      });
      return;
    }

    // Add new images to variant
    form.setValue(`variants.${variantIndex}.images`, [
      ...currentImages,
      ...newFiles,
    ]);

    // Create previews for variant images
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVariantImagePreviews((prev) => ({
          ...prev,
          [variantIndex]: [
            ...(prev[variantIndex] || []),
            e.target?.result as string,
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const currentImages =
      form.getValues(`variants.${variantIndex}.images`) || [];
    const updatedImages = currentImages.filter((_, i) => i !== imageIndex);
    form.setValue(`variants.${variantIndex}.images`, updatedImages);

    setVariantImagePreviews((prev) => ({
      ...prev,
      [variantIndex]: (prev[variantIndex] || []).filter(
        (_, i) => i !== imageIndex
      ),
    }));
  };

  const getProducts = async ({
    searchQuery,
    page = 1,
    category,
    isCustom,
    isFeatured,
    isItNew,
    status,
  }: {
    searchQuery: string;
    page: number;
    category: string;
    isCustom: boolean | undefined;
    isFeatured: boolean | undefined;
    isItNew: boolean | undefined;
    status: boolean | undefined;
  }) => {
    try {
      const response: {
        data: {
          success: boolean;
          data: IProduct[];
          message: string | null;
          error: any;
          pagination: IPagination;
        };
      } = await api.get(`/products`, {
        params: {
          ...(searchQuery && { search: searchQuery }),
          page,
          ...(category !== "all" && {
            category,
          }),
          ...(isCustom !== undefined && { isCustom }),
          ...(isFeatured !== undefined && { isFeatured }),
          ...(isItNew !== undefined && { isItNew }),
          ...(status !== undefined && { status }),
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setProducts(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));

      toast.success("Products fetched successfully");
    } catch (error: any) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (data: TProduct) => {
    try {
      const formData = new FormData();

      // Append simple fields
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("description", data.description ?? "");
      formData.append("keyFeatures", JSON.stringify(data.keyFeatures));

      formData.append("details[fabric]", data.details.fabric ?? "");
      formData.append(
        "details[valueAddition]",
        data.details.valueAddition ?? ""
      );
      formData.append("details[cutFit]", data.details.cutFit ?? "");
      formData.append("details[collarNeck]", data.details.collarNeck ?? "");
      formData.append("details[sleeve]", data.details.sleeve ?? "");
      formData.append("details[length]", data.details.length ?? "");
      formData.append("details[washCare]", data.details.washCare ?? "");
      formData.append("details[sideCut]", data.details.sideCut ?? "");

      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("isItNew", data.isItNew.toString());
      formData.append("status", data.status.toString());

      // Append arrays as JSON strings
      formData.append("categories", JSON.stringify(data.categories));
      formData.append("tags", JSON.stringify(data.tags));

      // Append main product images
      data.images.forEach((image) => {
        formData.append("images", image);
      });

      // Append variants
      data.variants.forEach((variant, index) => {
        formData.append(`variants[${index}][size]`, variant.size);
        formData.append(`variants[${index}][color]`, variant.color || "");
        formData.append(`variants[${index}][sku]`, variant.sku);
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
        formData.append(`variants[${index}][price]`, variant.price.toString());

        // Append variant images
        variant.images?.forEach((image) => {
          formData.append(`variants[${index}][images]`, image);
        });
      });

      // Send to backend
      const response = await api.post("/products/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        console.error("Failed to create product:", response.data.error);
        toast.error(response.data.error.message || "Failed to create product.");
      }

      toast.success(
        response.data.success.message || "Product created successfully."
      );

      // Reset form after successful submission
      form.reset(defaultValues);

      getProducts({
        searchQuery,
        page: pagination.page || 1,
        category,
        isCustom: mapIsCustomToBoolean(custom),
        isFeatured: mapFeaturedToBoolean(featured),
        isItNew: mapIsItNewToBoolean(isItNew),
        status: mapStatusToBoolean(status),
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error creating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    if (!productIdForDelete) {
      toast.error("Product ID is missing");
      return false;
    }

    try {
      const result = await api.delete(`/products/${productIdForDelete}`);

      if (!result.data.success) {
        toast.error("Failed to delete product");
      }

      toast.success("Product deleted successfully");

      // Refresh product list
      getProducts({
        searchQuery,
        page: pagination.page || 1,
        category,
        isCustom: mapIsCustomToBoolean(custom),
        isFeatured: mapFeaturedToBoolean(featured),
        isItNew: mapIsItNewToBoolean(isItNew),
        status: mapStatusToBoolean(status),
      });
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error on delete product: ", error);
      return false;
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    return null;
  };

  async function updateProduct(productId: string, updateData: any) {
    const formData = new FormData();

    // ----- Basic fields -----
    if (updateData.name) {
      formData.append("name", updateData.name);
    }
    if (updateData.description !== undefined) {
      formData.append("description", updateData.description || "");
    }
    if (updateData.price !== undefined) {
      formData.append("price", String(updateData.price));
    }

    // ----- Main Images -----
    // নতুন images
    updateData?.newImages?.forEach((file: File) => {
      if (file) formData.append("images", file);
    });

    // যেসব পুরোনো image delete হবে
    if (
      Array.isArray(updateData.deleteImageUrls) &&
      updateData.deleteImageUrls.length > 0
    ) {
      formData.append(
        "deleteImageUrls",
        JSON.stringify(updateData.deleteImageUrls)
      );
    }

    // ----- Variants -----
    updateData?.variants?.forEach((variant: any, index: number) => {
      if (variant.id) {
        formData.append(`variants[${index}][id]`, variant.id);
      }

      formData.append(`variants[${index}][size]`, variant.size || "");
      formData.append(`variants[${index}][stock]`, String(variant.stock ?? 0));
      formData.append(`variants[${index}][price]`, String(variant.price ?? 0));

      variant?.newImages?.forEach((image: File) => {
        if (image) formData.append(`variants[${index}][images]`, image);
      });

      if (
        Array.isArray(variant.deleteImageUrls) &&
        variant.deleteImageUrls.length > 0
      ) {
        formData.append(
          `variants[${index}][deleteImageUrls]`,
          JSON.stringify(variant.deleteImageUrls)
        );
      }
    });

    // ----- Categories -----
    updateData?.categories?.forEach((catId: string) => {
      if (catId) formData.append("categories", catId);
    });

    try {
      // ----- API Call -----
      const response = await api.put("/products/" + productId, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.success) {
        console.error("Failed to create product:", response.data.error);
        toast.error(response.data.error.message || "Failed to create product.");
      }

      toast.success(
        response.data.success.message || "Product updated successfully."
      );

      // Reset form after successful submission
      form.reset(defaultValues);

      getProducts({
        searchQuery,
        page: pagination.page || 1,
        category,
        isCustom: mapIsCustomToBoolean(custom),
        isFeatured: mapFeaturedToBoolean(featured),
        isItNew: mapIsItNewToBoolean(isItNew),
        status: mapStatusToBoolean(status),
      });

      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error creating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  }

  useEffect(() => {
    getProducts({
      searchQuery,
      page: pagination.page || 1,
      category,
      isCustom: mapIsCustomToBoolean(custom),
      isFeatured: mapFeaturedToBoolean(featured),
      isItNew: mapIsItNewToBoolean(isItNew),
      status: mapStatusToBoolean(status),
    });
  }, [
    status,
    featured,
    isItNew,
    custom,
    category,
    searchQuery,
    pagination.page,
  ]);

  return {
    form,
    getProductById,

    handleSubmit,
    handleDelete,
    updateProduct,
    handleTitleChange,
    categoryOpen,
    setCategoryOpen,
    append,
    prepend,
    fields,
    remove,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
    products,
    pagination,
    setPagination,
    search,
    setSearch,
    status,
    setStatus,
    featured,
    setFeatured,
    isItNew,
    setIsItNew,
    custom,
    setCustom,
    category,
    setCategory,
    isLoading,
    setIsLoading,
    productIdForDelete,
    setProductIdForDelete,
    setProducts,
  };
}

export type UseProductsReturn = ReturnType<typeof useProducts>;

export default useProducts;
