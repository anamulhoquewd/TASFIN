"use client";

import { useState } from "react";
import OrderLookup from "./lookup";
import OrderStatus from "./status";
import { IOrder } from "@/interfaces/orders";
import z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useOrders from "@/hooks/orders/use-orders";

const formSchema = z.object({
  input: z
    .string()
    .refine(
      (value) =>
        /^\d{11}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Must be a valid email or 11-digit phone number",
      }
    ),
});

export default function OrderTracker() {
  const [currentPage, setCurrentPage] = useState<"lookup" | "status">("lookup");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [results, setResults] = useState<IOrder[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<IOrder["status"] | "all">(
    "all"
  );
  const [paymentFilter, setPaymentFilter] = useState<
    IOrder["paymentStatus"] | "all"
  >("all");

  const { getOrdersByPhoneOrEmail } = useOrders();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const fetched = await getOrdersByPhoneOrEmail(data.input);
      if (fetched.data.length > 0) {
        setResults(fetched.data);
        toast.success("See your orders");
      } else {
        toast.error("orders not found by phone or email");
        console.error("orders not found by phone or email:", fetched);
      }
    } catch (error) {
      toast.error("Failed to fetch orders by phone or email");
      console.error("Failed to fetch orders by phone or email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  // keep results if user navigates back; no auto-fetch on mount without input
  const last30DaysOrders = results.filter((o) => {
    const created = new Date(o.orderDate as string);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return created >= thirtyDaysAgo;
  });

  const filteredOrders = last30DaysOrders.filter((o) => {
    const statusOk = statusFilter === "all" || o.status === statusFilter;
    const paymentOk =
      paymentFilter === "all" || o.paymentStatus === paymentFilter;
    return statusOk && paymentOk;
  });

  const handleViewStatus = (order: IOrder) => {
    setSelectedOrder(order);
    setCurrentPage("status");
  };

  const handleBackToLookup = () => {
    setCurrentPage("lookup");
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === "lookup" ? (
        <OrderLookup
          form={form}
          onSubmit={onSubmit}
          orders={filteredOrders}
          isLoading={isLoading}
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          setStatusFilter={setStatusFilter}
          setPaymentFilter={setPaymentFilter}
          onViewStatus={handleViewStatus}
        />
      ) : (
        selectedOrder && (
          <OrderStatus order={selectedOrder} onBack={handleBackToLookup} />
        )
      )}
    </div>
  );
}
