import { getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IOrder } from "@/interfaces/orders";
import { defaultPagination } from "@/utils/details";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface IFilter {
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "all";
  paymentStatus: "paid" | "unpaid" | "all";
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  singleDate: Date | undefined;
}
interface ILoadOrder {
  search: {
    orderId: string;
    userId: string;
    variantId: string;
  };
  filters: IFilter;
  page: number;
}
interface ISearch {
  orderId: string;
  userId: string;
  variantId: string;
}

function useOrder() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  // Dialogs
  const [selectedItem, setSelectedItem] = useState<IOrder | null>(null);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [showItemsOpen, setShowItemsOpen] = useState<boolean>(false);

  // Search
  const [search, setSearch] = useState<ISearch>({
    orderId: "",
    userId: "",
    variantId: "",
  });
  const [debouncedOrderId, setDebouncedOrderId] = useState<string>("");
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
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.get("/orders", {
        params: {
          search: search?.orderId || undefined,
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
        headers: { Authorization: `Bearer ${token}` },
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
    const token = (await getCookie("accessToken")) as string;

    try {
      const response = await api.patch(`/orders/${selectedItem._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        throw new Error("Failed to update order");
      }

      // Update the local state with the new order data
      loadOrders({
        search: {
          orderId: debouncedOrderId,
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
    const token = (await getCookie("accessToken")) as string;
    try {
      const response = await api.delete(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        throw new Error("Failed to delete order");
      }

      // Reload orders after deletion
      loadOrders({
        search: {
          orderId: debouncedOrderId,
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
      orderId: "",
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
    if (debouncedOrderId) count++;
    if (debouncedUserId) count++;
    if (debouncedVariantId) count++;

    return count;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedOrderId(search.orderId);
      setdebouncedUserId(search.userId);
      setdebouncedVariantId(search.variantId);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search.userId, search.orderId, search.variantId]);

  // Fetch orders on initial load
  useEffect(() => {
    loadOrders({
      search: {
        orderId: debouncedOrderId,
        userId: debouncedUserId,
        variantId: debouncedVariantId,
      },
      filters: filterBy,
      page: pagination.page,
    });
  }, [
    debouncedOrderId,
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
    showAdvancedFilters,
    setShowAdvancedFilters,
    orders,
    pagination,
    setPagination,
    statusOpen,
    setStatusOpen,
    showItemsOpen,
    setShowItemsOpen,
    deleteOpen,
    setDeleteOpen,
    selectedItem,
    setSelectedItem,
    search,
    setSearch,
    filterBy,
    setFilterBy,
  };
}

export default useOrder;
