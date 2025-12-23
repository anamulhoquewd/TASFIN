import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Search, Loader2 } from "lucide-react";
import { IOrder } from "@/interfaces/orders";
import { format } from "date-fns";
import { priceFormatting } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { OrderFormValues } from "@/lib/zod-validation";

interface OrderLookupProps {
  onViewStatus: (order: IOrder) => void;
  form: UseFormReturn<OrderFormValues>;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  orders: IOrder[];
  statusFilter: string;
  paymentFilter: string;
  setPaymentFilter: (v: "all" | "unpaid" | "paid") => void;
  setStatusFilter: (
    v: "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  ) => void;
}

export default function OrderLookup({
  onViewStatus,
  form,
  onSubmit,
  isLoading,
  statusFilter,
  paymentFilter,
  setStatusFilter,
  setPaymentFilter,
  orders,
}: OrderLookupProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (status: string) => {
    return status === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Track Your Order
          </h1>
          <p className="text-muted-foreground">
            Enter your phone or email to view your orders
          </p>
        </div>

        {/* Search + Filters */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Find your orders</CardTitle>
            <CardDescription>Search by phone or email</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2 w-full justify-between items-start"
              >
                <FormField
                  control={form.control}
                  name="input"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., 01XXXXXXXXX or name@example.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your phone or email to view your orders
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Order status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={paymentFilter}
                onValueChange={(v) => setPaymentFilter(v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {orders.length === 0 ? (
          <Card className="border-2">
            <CardContent className="p-8 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mx-auto">
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold">No orders found</p>
              <p className="text-sm text-muted-foreground">
                We couldn&apos;t find orders in the last 30 days. Try a
                different phone/email or adjust the filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <Card key={o._id} className="border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`uppercase ${getStatusColor(o.status)}`}
                      >
                        {o.status}
                      </Badge>
                      <Badge
                        variant={
                          o.paymentStatus === "paid" ? "default" : "outline"
                        }
                        className={`uppercase ${getPaymentColor(
                          o.paymentStatus
                        )}`}
                      >
                        {o.paymentStatus}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(o.orderDate as string), "dd MMM, yyyy")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-semibold text-foreground">
                        {o.user.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total
                      </p>
                      <p className="font-bold text-xl">
                        {priceFormatting(o.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button onClick={() => onViewStatus(o)} size={"sm"}>
                      View Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
