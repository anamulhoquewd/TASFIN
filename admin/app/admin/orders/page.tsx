"use client";

import { DateRangePicker } from "@/components/date-range-picker";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IOrder } from "@/interfaces/orders";
import { copyToClipboard, priceFormatting } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar,
  Copy,
  Filter,
  MoreHorizontal,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react";
import ShowItems from "./_components/show-items";
import StatusDialog, {
  getPaymentStatusBadge,
  getStatusBadge,
  getStatusIcon,
} from "./_components/status-dialog";
import useOrder from "./_hook/useOrder";

export default function OrdersPage() {
  const {
    setShowAdvancedFilters,
    statusOpen,
    setStatusOpen,
    setDeleteOpen,
    deleteOpen,
    showAdvancedFilters,
    selectedItem,
    setSelectedItem,
    setShowItemsOpen,
    showItemsOpen,
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

  const openDialog = (order: IOrder, dialogType: "update" | "delete") => {
    setSelectedItem(order);
    switch (dialogType) {
      case "update":
        setStatusOpen(true);
        break;
      case "delete":
        setDeleteOpen(true);
        break;
      default:
        console.error("Unknown dialog type:", dialogType);
    }
  };

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
                  placeholder="Search by Order ID..."
                  className="pl-8"
                  value={search.orderId}
                  onChange={(e) =>
                    setSearch({ ...search, orderId: e.target.value })
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

                {/* User ID Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">User ID</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter user ID"
                      className="pl-8"
                      type="search"
                      value={search.userId}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          userId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Variant ID Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Variant ID</Label>
                  <div className="relative">
                    <ShoppingCart className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter Variant ID"
                      className="pl-8"
                      type="search"
                      value={search.variantId}
                      onChange={(e) =>
                        setSearch((prev) => ({
                          ...prev,
                          variantId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-18">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2 flex-1">
                          <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                            {order._id.substring(0, 6)}...
                          </code>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 cursor-pointer"
                                  onClick={() => copyToClipboard(order._id)}
                                >
                                  <Copy className="h-3 w-3" />
                                  <span className="sr-only">Copy User ID</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copy ID</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => {
                            setShowItemsOpen(true);
                            setSelectedItem(order);
                          }}
                          className="cursor-pointer"
                        >
                          Show Products
                          <span className="sr-only">Show Products</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {order.user?.name?.toUpperCase().charAt(0) || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {order.user?.name || "Unknown User"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {order.user?.phone || "N/A"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        {priceFormatting(order.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "update")}
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDialog(order, "delete")}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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
