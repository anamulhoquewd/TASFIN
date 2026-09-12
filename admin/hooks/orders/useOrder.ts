import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IOrder } from "@/interfaces/orders";
import { defaultPagination } from "@/utils/details";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface IFilter {
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned"
    | "archived"
    | "all";
  paymentStatus: "paid" | "unpaid" | "all";
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  singleDate: Date | undefined;
}
interface ILoadOrder {
  search: {
    global: string;
    userId: string;
    variantId: string;
  };
  filters: IFilter;
  page: number;
}
export interface ISearch {
  global: string;
  userId: string;
  variantId: string;
}

function useOrder() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  // Dialogs
  const [selectedItem, setSelectedItem] = useState<IOrder | null>(null);

  // Search
  const [search, setSearch] = useState<ISearch>({
    global: "",
    userId: "",
    variantId: "",
  });
  const [debouncedGlobal, setDebouncedGlobal] = useState<string>("");
  const [debouncedUserId, setdebouncedUserId] = useState<string>("");
  const [debouncedVariantId, setdebouncedVariantId] = useState<string>("");
  const [debouncedAmountRange] = useState<[number, number]>([0, 10000]);

  const [filterBy, setFilterBy] = useState<IFilter>({
    status: "all",
    paymentStatus: "all",
    dateRange: undefined as
      | { from: Date | undefined; to: Date | undefined }
      | undefined,
    singleDate: undefined as Date | undefined,
  });

  const loadOrders = async ({ search, filters, page }: ILoadOrder) => {
    try {
      const response = await api.get("/orders", {
        params: {
          search: search?.global || undefined,
          status: filters?.status === "all" ? undefined : filters?.status,
          paymentStatus:
            filters?.paymentStatus === "all"
              ? undefined
              : filters?.paymentStatus,
          fromDate: filters?.dateRange?.from
            ? format(filters.dateRange.from, "yyyy-MM-dd")
            : undefined,
          toDate: filters?.dateRange?.to
            ? format(filters.dateRange.to, "yyyy-MM-dd")
            : undefined,
          date: filters?.singleDate
            ? format(filters.singleDate, "yyyy-MM-dd")
            : undefined,
          userId: search?.userId || undefined,
          variantId: search?.variantId || undefined,
          page: page === 1 ? undefined : page,
        },
      });

      if (!response.data.success || !Array.isArray(response.data.data)) {
        throw new Error("Invalid response data format");
      }

      setOrders(response.data.data || []);

      setPagination(() => ({
        page: response.data.pagination.page,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
        nextPage: response.data.pagination.nextPage || null,
        prevPage: response.data.pagination.prevPage || null,
      }));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedItem) return;

    try {
      const response = await api.patch(`/orders/${selectedItem._id}`, data);

      if (!response.data.success) {
        throw new Error("Failed to update order");
      }

      // Update the local state with the new order data
      loadOrders({
        search: {
          global: debouncedGlobal,
          userId: debouncedUserId,
          variantId: debouncedVariantId,
        },
        filters: filterBy,
        page: pagination.page,
      });

      setSelectedItem(null);

      toast(response.data.message || "Category updated successfully!");
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setSelectedItem(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/orders/${id}`);

      if (!response.data.success) {
        throw new Error("Failed to delete order");
      }

      // Reload orders after deletion
      loadOrders({
        search: {
          global: debouncedGlobal,
          userId: debouncedUserId,
          variantId: debouncedVariantId,
        },
        filters: filterBy,
        page: pagination.page,
      });

      setSelectedItem(null);

      toast(response.data.message || "Order deleted successfully!");
    } catch (error: any) {
      console.error("Failed to delete order:", error);
      if (error.response.data.error.message)
        toast(error.response.data.error.message);
    }
  };

  const clearAllFilters = () => {
    setFilterBy({
      status: "all",
      paymentStatus: "all",
      dateRange: { from: undefined, to: undefined },
      singleDate: undefined,
    });
    setSearch({
      global: "",
      userId: "",
      variantId: "",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterBy.status !== "all") count++;
    if (filterBy.paymentStatus !== "all") count++;
    if (filterBy.dateRange?.from && filterBy.dateRange?.to) count++;
    if (filterBy.singleDate) count++;
    if (debouncedGlobal) count++;
    if (debouncedUserId) count++;
    if (debouncedVariantId) count++;

    return count;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedGlobal(search.global);
      setdebouncedUserId(search.userId);
      setdebouncedVariantId(search.variantId);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search.userId, search.global, search.variantId]);

  // Fetch orders on initial load
  useEffect(() => {
    loadOrders({
      search: {
        global: debouncedGlobal,
        userId: debouncedUserId,
        variantId: debouncedVariantId,
      },
      filters: filterBy,
      page: pagination.page,
    });
  }, [
    debouncedGlobal,
    debouncedUserId,
    debouncedVariantId,
    filterBy.status,
    filterBy.paymentStatus,
    filterBy.dateRange,
    filterBy.singleDate,
    debouncedAmountRange,
    pagination.page,
    filterBy,
  ]);

  return {
    clearAllFilters,
    getActiveFiltersCount,
    handleDelete,
    handleUpdate,
    orders,
    pagination,
    setPagination,
    selectedItem,
    setSelectedItem,
    search,
    setSearch,
    filterBy,
    setFilterBy,
  };
}

export default useOrder;
