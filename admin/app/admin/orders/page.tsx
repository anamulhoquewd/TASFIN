"use client";

import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import OrderAdvanceFilter from "../../../components/orders/order-advance-filter";
import OrderTable from "../../../components/orders/order-table";
import ShowItems from "../../../components/orders/show-items";
import StatusDialog, {
  getPaymentStatusBadge,
  getStatusBadge,
  getStatusIcon,
} from "../../../components/orders/status-dialog";
import useOrder from "../../../hooks/orders/useOrder";
import ShowHistory from "@/components/orders/show-status-history";

export default function OrdersPage() {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showItemsOpen, setShowItemsOpen] = useState<boolean>(false);
  const [showHistoryOpen, setShowHistoryOpen] = useState<boolean>(false);
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const {
    selectedItem,
    setSelectedItem,
    pagination,
    setPagination,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    getActiveFiltersCount,
    clearAllFilters,
    orders,
    handleDelete,
    handleUpdate,
  } = useOrder();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Order Management
          </h1>
          <p className="text-muted-foreground">
            You have {pagination.total} total orders.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Search and filter orders with various criteria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Basic Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order number or id..."
                  className="pl-8"
                  value={search.global}
                  onChange={(e) =>
                    setSearch({ ...search, global: e.target.value })
                  }
                />
              </div>

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
                  <SelectItem value="pending">confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="cancelled">returned</SelectItem>
                  <SelectItem value="cancelled">archived</SelectItem>
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
                  <SelectItem value="refunded">refunded</SelectItem>
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
            <OrderAdvanceFilter
              search={search}
              setSearch={setSearch}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          )}

          {/* Results Table */}
          <OrderTable
            setSelectedItem={setSelectedItem}
            setShowHistoryOpen={setShowHistoryOpen}
            setStatusOpen={setStatusOpen}
            setDeleteOpen={setDeleteOpen}
            orders={orders}
            setShowItemsOpen={setShowItemsOpen}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
          />
        </CardContent>

        {orders.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>

      {selectedItem && (
        <>
          <ShowItems
            open={showItemsOpen}
            onOpenChange={setShowItemsOpen}
            order={selectedItem}
          />
          <ShowHistory
            open={showHistoryOpen}
            onOpenChange={setShowHistoryOpen}
            order={selectedItem}
          />

          <StatusDialog
            open={statusOpen}
            onOpenChange={setStatusOpen}
            order={selectedItem}
            onUpdate={(data) => handleUpdate(data)}
          />

          <DeleteConfirmation
            onConfirm={() => handleDelete(selectedItem._id)}
            open={deleteOpen}
            changeOpen={setDeleteOpen}
          />
        </>
      )}
    </div>
  );
}
