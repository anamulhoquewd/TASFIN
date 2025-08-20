import api from "@/api/axios-init";
import { CategoryFormValues, categorySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ICategory {
  _id: string;
  name: string;
  // Other fields if necessary
}

interface IPagination {
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

const defaultPagination: IPagination = {
  page: 1,
  total: 0,
  totalPages: 0,
  nextPage: null,
  prevPage: null,
};

const useCategories = () => {
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<ICategory[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      slug: "",
      name: "",
    },
    // mode: "onChange",
  });

  const getCategories = useCallback(
    async ({
      page = 1,
      limit = 10,
      searchQuery = "",
    }: {
      page?: number;
      limit?: number;
      searchQuery?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await api.get("/categories", {
          params: {
            search: searchQuery,
            page,
            limit,
          },
        });

        if (!response.data.success) {
          throw new Error(
            response.data.error?.message || "Something went wrong!"
          );
        }

        setData(response.data.data);

        setPagination({
          page: response.data.pagination.page,
          total: response.data.pagination.total,
          totalPages: response.data.pagination.totalPages,
          nextPage: response.data.pagination.nextPage || null,
          prevPage: response.data.pagination.prevPage || null,
        });

        return { success: true, data: response.data.data };
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const onSubmit = useCallback(async (data: CategoryFormValues) => {
    setData(null);
    setIsLoading(true);

    try {
      const response = await api.post("/categories/register", data);

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      toast(response.data?.message || "Category has been created.");

      setData(response.data.data);

      form.reset({
        slug: "",
        name: "",
      });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getCategories({ page: pagination.page, searchQuery });
  }, [pagination.page, searchQuery]);

  return {
    data,
    isLoading,
    pagination,
    setSearch,
    search,
    setPagination,
    reload: () => getCategories({ page: pagination.page, searchQuery }), // for manual reload
    onSubmit,
    form,
  };
};

export default useCategories;
