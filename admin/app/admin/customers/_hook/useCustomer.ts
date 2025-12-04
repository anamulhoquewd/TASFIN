import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { ICustomer } from "@/interfaces/users";
import { addressZ } from "@/lib/schemas";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const customerFormSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  phone: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must start with 01 and be exactly 11 digits"
    )
    .optional(),
  address: addressZ,
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .optional(),
});

export type FormValues = z.infer<typeof customerFormSchema>;

function useCustomer() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ICustomer | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const defaultValues = {
    name: "",
    phone: "",
    email: "",
    address: {
      city: "",
      country: "Bangladesh",
      state: "",
      street: "",
      zipCode: "1000",
    },
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues,
  });

  const loadCustomers = async ({
    page = 1,
    search,
  }: {
    page: number;
    search: string;
  }) => {
    try {
      const response = await api.get("/users", {
        params: {
          page,
          search,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      setCustomers(response.data.data);

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

  const handleUpdate = async (data: FormValues) => {
    if (!selectedItem) return;

    setIsLoading(true);

    try {
      const response = await api.patch(
        `/users/by-admin/${selectedItem._id}`,
        data,
        {}
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      form.reset(defaultValues);

      setSelectedItem(null);
      loadCustomers({ page: pagination.page, search: searchQuery });

      toast.success(response.data.message || "Customer updated successfully!");
    } catch (error: any) {
      console.error("Error updating customer:", error);

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

  const handleDelete = async (data: string) => {
    try {
      const response = await api.delete(`/users/${data}`, {});

      if (!response.data.success) {
        throw new Error(response.data.error.message || "Somthing went wrong!");
      }

      loadCustomers({ page: pagination.page, search: searchQuery });

      toast.success(response.data.message || "Customer deleted successfully!");
    } catch (error: any) {
      console.log("Error: ", error);

      if (error.response.data.error.message)
        toast.error(error.response.data.error.message);
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
    loadCustomers({ page: pagination.page, search: searchQuery });
  }, [pagination.page, searchQuery]);

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        name: selectedItem.name ?? "",
        phone: selectedItem.phone ?? "",
        address: selectedItem.address,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [selectedItem]);

  return {
    search,
    setSearch,
    customers,
    pagination,
    setPagination,
    isLoading,
    selectedItem,
    setSelectedItem,
    setDeleteOpen,
    deleteOpen,
    handleDelete,
    updateOpen,
    setUpdateOpen,
    handleUpdate,
    form,
  };
}

export default useCustomer;
