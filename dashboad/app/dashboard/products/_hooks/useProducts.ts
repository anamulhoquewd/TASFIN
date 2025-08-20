import api from "@/api/axios-init";
import { ICategory } from "@/interfaces/category";
import { IPagination } from "@/interfaces/global";
import { IProduct } from "@/interfaces/products";
import { ProductFormValues, productSchema } from "@/lib/schemas";
import { defaultPagination } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filterByCategory, setFilterByCategory] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [data, setData] = useState<IProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      slug: "",
      name: "",
      images: [{ alt: "", url: "" }],
      keywords: [{ value: "" }],
      description: "",
      price: 0,
      colors: [
        {
          name: "",
          inStock: true,
          sizes: [{ name: "", inStock: true, quantity: 0 }],
        },
      ],
      category: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(async (data: ProductFormValues) => {
    setData(null);
    setIsLoading(true);

    console.log("Data: ", data);

    try {
      const response = await api.post("/products/register", data, {
        params: {},
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      toast(response.data?.message || "Product has been created.");
      setData(response.data.data);

      form.reset({
        slug: "",
        name: "",
        images: [{ alt: "", url: "" }],
        keywords: [{ value: "" }],
        description: "",
        price: 0,
        colors: [
          {
            name: "",
            inStock: true,
            sizes: [{ name: "", inStock: true, quantity: 0 }],
          },
        ],
        category: "",
      });

      router.push("/dashboard/products");

      return { success: true, data: response.data.data };
    } catch (error: any) {
      console.log(error);
      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword,
  } = useFieldArray({
    control: form.control,
    name: "keywords",
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control: form.control,
    name: "colors",
  });

  const getProducts = async ({
    page = 1,
    limit = 10,
    searchQuery = "",
    category,
  }: {
    page: number;
    limit: number;
    searchQuery: string;
    category: string;
  }) => {
    try {
      const response = await api.get("/products", {
        headers: {},
        params: { page, limit, search: searchQuery, category },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setData(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    getProducts({
      page: pagination.page,
      searchQuery,
      limit: 10,
      category: filterByCategory,
    });
  }, [pagination.page, searchQuery]);

  return {
    form,
    pagination,
    imageFields,
    keywordFields,
    colorFields,
    appendImage,
    removeImage,
    appendColor,
    removeColor,
    appendKeyword,
    removeKeyword,
    setFilterByCategory,
    data,
    isLoading,
    onSubmit,
  };
};

export default useProducts;
