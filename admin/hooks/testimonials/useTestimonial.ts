import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { ITestimonial } from "@/interfaces/testimonials";
import { defaultPagination } from "@/utils/details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const testimonialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  message: z.string().min(1, "Message is required"),
  rating: z.coerce.number().min(0).max(5),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

function useTestimonials() {
  const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [testimonials, setTestimonilas] = useState<ITestimonial[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ITestimonial | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: { name: "", location: "", message: "", rating: 0 },
  });

  const loadTestimonial = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/testimonials", {
        params: {
          page: pagination.page,
          limit: 10,
          search: debouncedSearch || undefined,
          sortBy: "createdAt",
          sortType: "desc",
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Failed to load testimonials",
        );
      }

      setTestimonilas(response.data.data ?? []);
      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error("Failed to load testimonials:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to load testimonials",
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, pagination.page]);

  const handleUpdate = async (data: Partial<ITestimonial>) => {
    if (!selectedItem) return;

    try {
      const response = await api.patch(
        `/testimonials/${selectedItem._id}`,
        data,
      );
      if (!response.data.success)
        throw new Error("Failed to update testimonial");
      toast.success(
        response.data.message || "testimonial updated successfully",
      );
      setSelectedItem(null);
      await loadTestimonial();
    } catch (error: any) {
      console.error("Failed to update testimonial:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to update testimonial",
      );
    }
  };

  const handleSubmit = async (data: TestimonialFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/testimonials/register", data);
      if (!response.data.success) throw new Error("Failed to create testimonial");
      toast.success(response.data.message || "Testimonial created successfully");
      form.reset();
      await loadTestimonial();
      return true;
    } catch (error: any) {
      toast.error(
        error.response?.data?.error?.message || "Failed to create testimonial",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/testimonials/${id}`);
      if (!response.data.success)
        throw new Error("Failed to delete testimonial");
      toast.success(
        response.data.message || "testimonial deleted successfully",
      );
      setSelectedItem(null);
      if (testimonials.length === 1 && pagination.page > 1) {
        setPagination((current) => ({ ...current, page: current.page - 1 }));
      } else {
        await loadTestimonial();
      }
    } catch (error: any) {
      console.error("Failed to delete testimonial:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to delete testimonial",
      );
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

    try {
      const response = await api.post(
        `/testimonials/${selectedItem?._id}/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (!response.data.success) {
        throw new Error(response.data.error.message);
      }

      toast(response.data.message || "Avatar change successfully!");

      setIsAvatarOpen(false);
      loadTestimonial();
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPagination((current) => ({ ...current, page: 1 }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    loadTestimonial();
  }, [loadTestimonial]);

  return {
    testimonials,
    pagination,
    setPagination,
    search,
    setSearch,
    selectedItem,
    setSelectedItem,
    isLoading,
    handleUpdate,
    handleSubmit,
    form,
    handleDelete,
    clearFilters,
    uploadHandler,
    isAvatarOpen,
    error,
    setError,
    setIsAvatarOpen,
  };
}

export default useTestimonials;
