import { createCookie, getCookie } from "@/app/actions";
import api from "@/axios/interceptor";
import { IPagination } from "@/interfaces/global";
import { IFetchOrder, IFilter, IOrder } from "@/interfaces/orders";
import { useCartAndWishlist } from "@/lib/cart-context";
import { defaultPagination } from "@/lib/utils";
import { CheckoutFormValues, CheckoutSchemaZ } from "@/lib/zod-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useOrders = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<"success" | "faild" | null>("success");
  const { items, clearCart } = useCartAndWishlist();
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [order, setOrder] = useState<{ message: string; data: IOrder } | null>(
    null
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterBy.status !== "all") count++;
    if (filterBy.paymentStatus !== "all") count++;
    if (filterBy.dateRange?.from && filterBy.dateRange?.to) count++;
    if (filterBy.singleDate) count++;

    return count;
  };

  const [filterBy, setFilterBy] = useState<IFilter>({
    status: "all",
    paymentStatus: "all",
    dateRange: undefined as
      | { from: Date | undefined; to: Date | undefined }
      | undefined,
    singleDate: undefined as Date | undefined,
  });

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutSchemaZ) as any,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Bangladesh",
      },
      paymentMethod: "cod",
    },
  });

  const handleSubmit = useCallback(async (values: CheckoutFormValues) => {
    setIsProcessing(true);
    try {
      const data = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: values.email,
        products: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        shippingCost: values.shippingCost,
      };

      const response = await api.post("/orders/register", data);

      if (response.data.success) {
        toast.success(response.data.message || "Order created successfully!");
        console.log(response.data.message || "Order created successfully!");

        // set cookie - user phone number
        createCookie({
          name: "X-User-ID",
          value: response.data?.data?.user,
          maxAgeAsSeconds: 60 * 60 * 24 * 365, // 1y
        });

        // Clear cart and redirect to confirmation
        setOrder(response.data);
        setStatus("success");
        clearCart();
      }
    } catch (error: any) {
      toast.error("Failed to create order");
      console.error("Error create order:", error);
      setStatus("faild");
      setOrder(null);

      if (error.response.data.success === false) {
        error.response.data.fields.forEach((field: any) => {
          form.setError(field.name, {
            message: field.message,
          });
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // fetch orders by user phone or email
  const getOrdersByPhoneOrEmail = useCallback(async (input: string) => {
    try {
      const response = await api.get(`/orders`, {
        params: {
          ...(input.includes("@") ? { email: input } : { phone: input }),
          limit: 100,
        },
      });
      if (response.data.success) {
        return response.data;
      }

      return null;
    } catch (error) {
      toast.error("Failed to fetch orders by phone or email");
      console.error("Failed to fetch orders by phone or email:", error);
      return null;
    }
  }, []);

  // fetch orders by userId
  const getOrdersByUserId = useCallback(
    async ({ filters, page, userId, limit = 10 }: IFetchOrder) => {
      const phone = (await getCookie("X-User-ID")) as string;
      try {
        const response = await api.get(`/orders`, {
          params: {
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
            userId: userId || undefined,
            page: page === 1 ? undefined : page,
            limit,
          },
          headers: { Authorization: phone },
        });

        if (!response.data.success || !Array.isArray(response.data.data)) {
          throw new Error("Invalid response data format");
        }

        if (response.data.success) {
          setPagination(() => ({
            page: response.data.pagination.page,
            total: response.data.pagination.total,
            totalPages: response.data.pagination.totalPages,
            nextPage: response.data.pagination.nextPage || null,
            prevPage: response.data.pagination.prevPage || null,
          }));
          return response.data;
        } else {
          toast("Order not found");
        }
        return null;
      } catch (error) {
        toast.error("Failed to fetch orders by phone or email");
        console.error("Failed to fetch orders by phone or email:", error);
        return null;
      }
    },
    []
  );

  // fetch single order by ID
  const getOrderById = useCallback(
    async (id: string): Promise<IOrder | null> => {
      // Prevent duplicate requests
      try {
        const response = await api.get(`/orders/${id}`);
        console.log("Response: ", response);
        if (response.data.success) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        toast.error("Failed to fetch order by ID");
        console.error("Failed to fetch order by ID:", error);
        return null;
      }
    },
    []
  );

  const clearAllFilters = () => {
    setFilterBy({
      status: "all",
      paymentStatus: "all",
      dateRange: { from: undefined, to: undefined },
      singleDate: undefined,
    });
  };

  return {
    form,
    handleSubmit,
    isProcessing,
    getOrderById,
    setIsProcessing,
    getOrdersByPhoneOrEmail,
    status,
    order,
    setStatus,
    getOrdersByUserId,
    setShowAdvancedFilters,
    statusOpen,
    setStatusOpen,
    showAdvancedFilters,
    pagination,
    setPagination,
    filterBy,
    setFilterBy,
    getActiveFiltersCount,
    clearAllFilters,
  };
};

export default useOrders;
