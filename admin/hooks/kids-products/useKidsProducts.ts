import api from "@/axios/interceptor";
import { KidsInput, kidsSchemaZ } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function useKidsProducts() {
  const form = useForm({
    resolver: zodResolver(kidsSchemaZ),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      isActive: true,
      fabric: "",
      sizes: [],
      colors: [],
      moq: 0,
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const getKidsProducts = async ({
    searchQuery,
    page = 1,
    isActive,
  }: {
    searchQuery: string;
    page: number;
    isActive: boolean | undefined;
  }) => {
    try {
      const response = await api.get("/kids", {
        params: {
          search: searchQuery,
          page,
          ...(isActive !== undefined && { isActive }),
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Something went wrong!");
      }

      return response.data;
    } catch (error: any) {
      console.error("Error fetching kids products:", error);
      throw error;
    }
  };

  const onSubmit = async (data: KidsInput) => {
    try {
      const payload = new FormData();
      payload.append("name", data.name);
      payload.append("description", data.description ?? "");
      payload.append("fabric", data.fabric ?? "");
      payload.append("sizes", JSON.stringify(data.sizes ?? []));
      payload.append("colors", JSON.stringify(data.colors ?? []));
      payload.append("moq", String(Number(data.moq ?? 0)));
      payload.append("minPrice", String(Number(data.minPrice ?? 0)));
      payload.append(
        "maxPrice",
        String(Number(data.maxPrice ?? data.minPrice ?? 0)),
      );
      payload.append("isActive", String(Boolean(data.isActive)));
      (data.images ?? []).forEach((file, index) => {
        payload.append("images", file);
        payload.append(`images[${index}][position]`, String(index));
        payload.append(`images[${index}][alt]`, data.name);
      });

      const response = await api.post("/kids/register", payload);

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Failed to create product.");
      }

      toast.success(
        response.data.success.message || "Product created successfully.",
      );

      form.reset({
        name: "",
        description: "",
        isActive: true,
        colors: [],
        sizes: [],
        images: [],
        fabric: "",
        moq: 0,
        minPrice: 0,
        maxPrice: 0,
      });

      await getKidsProducts({
        searchQuery: "",
        page: 1,
        isActive: true,
      });

      return response.data;
    } catch (error: any) {
      console.error("Error creating product:", error);
      if (error.response?.data?.success === false) {
        error.response.data.fields?.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
      toast.error("Error creating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
      return null;
    }
  };

  const onDelete = async (productId: string) => {
    try {
      const result = await api.delete(`/kids/${productId}`);

      if (!result.data.success) {
        throw new Error(result.data.error?.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully");

      await getKidsProducts({
        searchQuery: "",
        page: 1,
        isActive: undefined,
      });

      return result.data;
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
      return false;
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await api.get(`/kids/${id}`);

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Something went wrong!");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  };

  async function updateProduct(productId: string, updateData: any) {
    const payload = {
      ...(updateData.name !== undefined && { name: updateData.name }),
      ...(updateData.description !== undefined && {
        description: updateData.description || "",
      }),
      ...(updateData.fabric !== undefined && { fabric: updateData.fabric }),
      ...(updateData.sizes !== undefined && { sizes: updateData.sizes }),
      ...(updateData.colors !== undefined && { colors: updateData.colors }),
      ...(updateData.moq !== undefined && { moq: Number(updateData.moq) }),
      ...(updateData.minPrice !== undefined && {
        minPrice: Number(updateData.minPrice),
      }),
      ...(updateData.maxPrice !== undefined && {
        maxPrice: Number(updateData.maxPrice),
      }),
      ...(updateData.isActive !== undefined && {
        isActive: Boolean(updateData.isActive),
      }),
    };

    try {
      const response = await api.patch(`/kids/${productId}`, payload);

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Failed to update product.");
      }

      toast.success(
        response.data.success.message || "Product updated successfully.",
      );

      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error("Error updating product", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
      return null;
    }
  }

  return {
    form,
    getProductById,
    onSubmit,
    updateProduct,
    onDelete,
    getKidsProducts,
  };
}

export type UseProductsReturn = ReturnType<typeof useKidsProducts>;

export default useKidsProducts;
