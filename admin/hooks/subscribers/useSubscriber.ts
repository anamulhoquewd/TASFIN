import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { ISubscriber } from "@/interfaces/subscribers";
import { defaultPagination } from "@/utils/details";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface SubscriberFilters {
  verified: "all" | "true" | "false";
  isBlocked: "all" | "true" | "false";
}

function useSubscriber() {
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<SubscriberFilters>({
    verified: "all",
    isBlocked: "all",
  });
  const [selectedItem, setSelectedItem] = useState<ISubscriber | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSubscribers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/subscribers", {
        params: {
          page: pagination.page,
          limit: 10,
          search: debouncedSearch || undefined,
          verified: filters.verified === "all" ? undefined : filters.verified,
          isBlocked:
            filters.isBlocked === "all" ? undefined : filters.isBlocked,
          sortBy: "createdAt",
          sortType: "desc",
        },
      });

      if (!response.data.success) {
        throw new Error(
          response.data.error?.message || "Failed to load subscribers",
        );
      }

      setSubscribers(response.data.data ?? []);
      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error("Failed to load subscribers:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to load subscribers",
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, filters, pagination.page]);

  const handleUpdate = async (data: Partial<ISubscriber>) => {
    if (!selectedItem) return;

    try {
      const response = await api.patch(
        `/subscribers/${selectedItem._id}`,
        data,
      );
      if (!response.data.success)
        throw new Error("Failed to update subscriber");
      toast.success(response.data.message || "Subscriber updated successfully");
      setSelectedItem(null);
      await loadSubscribers();
    } catch (error: any) {
      console.error("Failed to update subscriber:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to update subscriber",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/subscribers/${id}`);
      if (!response.data.success)
        throw new Error("Failed to delete subscriber");
      toast.success(response.data.message || "Subscriber deleted successfully");
      setSelectedItem(null);
      if (subscribers.length === 1 && pagination.page > 1) {
        setPagination((current) => ({ ...current, page: current.page - 1 }));
      } else {
        await loadSubscribers();
      }
    } catch (error: any) {
      console.error("Failed to delete subscriber:", error);
      toast.error(
        error.response?.data?.error?.message || "Failed to delete subscriber",
      );
    }
  };

  const clearFilters = () => {
    setSearch("");
    setFilters({ verified: "all", isBlocked: "all" });
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
    loadSubscribers();
  }, [loadSubscribers]);

  return {
    subscribers,
    pagination,
    setPagination,
    search,
    setSearch,
    filters,
    setFilters,
    selectedItem,
    setSelectedItem,
    isLoading,
    handleUpdate,
    handleDelete,
    clearFilters,
  };
}

export default useSubscriber;
