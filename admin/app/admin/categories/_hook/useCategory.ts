import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { ICategory } from "@/interfaces/categories";
import { IPagination } from "@/interfaces/global";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categoryFormSchema = z.object({
  slug: z.string().min(3).max(100),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(200).optional(),
});

export type FormValues = z.infer<typeof categoryFormSchema>;

function useCategory() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [newDialogOpen, setNewDialogOpen] = useState<boolean>(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ICategory | null>(null);
  const [categories, setCategories] = useState<ICategory[] | []>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const getCategories = async ({
    searchQuery,
    page = 1,
  }: {
    searchQuery: string;
    page: number;
  }) => {
    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.get("/categories", {
        params: {
          search: searchQuery,
          page,
        },
      });
      if (!response.data.success) {
        throw new Error(response.data.error.message || "Something with wrong!");
      }

      setCategories(response.data.data);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true);
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.post("/categories/register", data, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        name: "",
        slug: "",
        description: "",
      });

      toast(response.data.message || "Category created successfully!");
      setNewDialogOpen(false);

      getCategories({ page: pagination.page, searchQuery });
    } catch (error: any) {
      console.error("Error updating category:", error);

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
  };

  const handleUpdate = async (data: FormValues) => {
    if (!selectedItem) return;
    const token = (await getCookie("accessToken")) as string;
    setIsLoading(true);

    try {
      const response = await api.patch(
        `/categories/${selectedItem._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        name: "",
        slug: "",
        description: "",
      });

      setSelectedItem(null);
      getCategories({ page: pagination.page, searchQuery });

      toast(response.data.message || "Category updated successfully!");
    } catch (error: any) {
      console.error("Error updating category:", error);

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
  };

  const handleDelete = async (id: string) => {
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.delete(`/categories/${id}`, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      getCategories({ page: pagination.page, searchQuery });

      toast(response.data.message || "Category deleted successfully!");

      setSelectedItem(null);
    } catch (error: any) {
      console.error("Error :", error);
      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    }
  };

  const uploadHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedItem) return;

    const files = event.target.files;
    if (!files || !files[0]) {
      return;
    }

    const file = files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      setError("File size is too large. Maximum size is 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.post(
        `/categories/${selectedItem?._id}/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message || "Avatar change successfully!");

      setIsAvatarOpen(false);
      getCategories({ page: pagination.page, searchQuery });
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Handle name change and auto-generate slug
  const handleNameChange = (value: string) => {
    form.setValue("name", value);
    if (value) {
      form.setValue("slug", generateSlug(value));
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
    getCategories({ page: pagination.page, searchQuery });
  }, [pagination.page, searchQuery]);

  useEffect(() => {
    if (selectedItem) {
      form.reset(selectedItem);
    } else {
      form.reset({
        name: "",
        slug: "",
        description: "",
      });
    }
  }, [selectedItem]);

  return {
    handleSubmit,
    handleUpdate,
    handleDelete,
    form,
    setSearch,
    search,
    isLoading,
    updateDialogOpen,
    setUpdateDialogOpen,
    selectedItem,
    setSelectedItem,
    newDialogOpen,
    setNewDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    pagination,
    setPagination,
    categories,
    error,
    setError,
    isAvatarOpen,
    setIsAvatarOpen,
    uploadHandler,
    handleNameChange,
  };
}

export default useCategory;
