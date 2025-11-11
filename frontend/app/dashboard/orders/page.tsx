"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import useOrders from "@/hooks/orders/use-orders";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/user-dashboard/date-range-picker";
import { format } from "date-fns";
import { IOrder } from "@/interfaces/orders";
import useUsers from "@/hooks/users/use-users";
import { Card, CardContent } from "@/components/ui/card";
import { OrderTrackingModal } from "@/components/user-dashboard/order-tracking-modal";
import Paginations from "@/components/user-dashboard/pagination";
import Link from "next/link";
import MyOrderCard from "@/components/user-dashboard/my-order-card";

function MyOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrder] = useState<IOrder | null>(null);
  const [trackingOpen, setTrackingOpen] = useState(false);

  const {
    setShowAdvancedFilters,
    showAdvancedFilters,
    pagination,
    setPagination,
    filterBy,
    setFilterBy,
    getActiveFiltersCount,
    clearAllFilters,
    getOrdersByUserId,
  } = useOrders();

  const { getProfile } = useUsers();

  useEffect(() => {
    const fetched = async () => {
      try {
        getProfile().then(async (data) => {
          const response = await getOrdersByUserId({
            filters: filterBy,
            page: pagination.page,
            userId: data.data._id,
            limit: 2,
          });

          setOrders(response.data);
        });
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetched();
  }, [
    filterBy.status,
    filterBy.paymentStatus,
    filterBy.dateRange,
    filterBy.singleDate,
    pagination.page,
  ]);

  return (
    <>
      {/* Search and Basic Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Select
            value={filterBy.status}
            onValueChange={(value) =>
              setFilterBy((prev) => ({
                ...prev,
                status: value as
                  | "all"
                  | "pending"
                  | "processing"
                  | "shipped"
                  | "delivered"
                  | "cancelled",
              }))
            }
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterBy.paymentStatus}
            onValueChange={(value) =>
              setFilterBy((prev) => ({
                ...prev,
                paymentStatus: value as "all" | "paid" | "unpaid",
              }))
            }
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Pay Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pay Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={
              getActiveFiltersCount() > 0
                ? "border-primary"
                : "" + "cursor-pointer"
            }
          >
            <Filter className="h-4 w-4" />
            {getActiveFiltersCount() > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </div>

        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="cursor-pointer"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mb-6 p-4 border rounded-lg bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date Range</Label>
              <DateRangePicker
                initialDateFrom={filterBy.dateRange?.from}
                initialDateTo={filterBy.dateRange?.to}
                onUpdate={(values) =>
                  setFilterBy((prev) => ({
                    ...prev,
                    dateRange: values.range,
                  }))
                }
              />
            </div>

            {/* Single Date Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Single Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal cursor-pointer"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {filterBy.singleDate
                      ? format(filterBy.singleDate, "MMM dd, yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={filterBy.singleDate}
                    onSelect={(date) =>
                      setFilterBy((prev) => ({ ...prev, singleDate: date }))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Your Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => <MyOrderCard key={order._id} order={order} />)
        ) : (
          <Card>
            <CardContent className="py-8 flex flex-col gap-2 items-center justify-center">
              <p className="text-muted-foreground">
                Looks like your order list is empty. Time to treat yourself!
              </p>

              <Link href="/products">
                <Button
                  className="cursor-pointer"
                  variant={"outline"}
                  size={"sm"}
                >
                  Go Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {orders.length !== 0 && (
        <Paginations pagination={pagination} setPagination={setPagination} />
      )}

      <OrderTrackingModal
        order={selectedOrder}
        open={trackingOpen}
        onOpenChange={setTrackingOpen}
      />
    </>
  );
}

export default MyOrders;
