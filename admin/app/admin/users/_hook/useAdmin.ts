import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IAdmin } from "@/interfaces/users";
import { userFormSchemaZ, UserFormValues } from "@/lib/schemas";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function useAdmin() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IAdmin | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [admins, setAdmins] = useState<IAdmin[] | []>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const router = useRouter();

  // Initialize form with default values
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchemaZ),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nid: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Bangladesh",
      },
    },
  });

  // Form submission
  const handleSubmit = async (data: UserFormValues) => {
    setIsLoading(true);

    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.post("/admins/register", data, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset({
        name: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "Bangladesh",
        },
      });

      toast(response.data.message || "Category created successfully!");

      // Navigate back to users list
      router.push("/admin/users");
    } catch (error: any) {
      console.error("Error creating user:", error);

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

  const loadAdmins = async ({
    page = 1,
    search,
  }: {
    page: number;
    search: string;
  }) => {
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.get("/admins", {
        params: {
          page,
          search,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      setAdmins(response.data.data);
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

  const handleDelete = async (data: string) => {
    console.log(data);
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.delete(`/admins/${data},`, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      loadAdmins({ page: pagination.page, search: searchQuery });

      toast(response.data.message || "Admin deleted successfully!");
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    } finally {
      setSelectedItem(null);
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
    loadAdmins({ page: pagination.page, search: searchQuery });
  }, [pagination.page, searchQuery]);

  return {
    handleDelete,
    admins,
    pagination,
    setPagination,
    search,
    setSearch,
    isLoading,
    selectedItem,
    setSelectedItem,
    deleteOpen,
    setDeleteOpen,
    form,
    handleSubmit,
  };
}

export default useAdmin;
