import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MessageCircle, RotateCcw, Truck } from "lucide-react";
import { IOrder } from "@/interfaces/orders";
import { priceFormatting } from "@/lib/utils";
import useShare from "@/lib/use-share-in-wa";

export default function MyOrderCard({ order }: { order: IOrder }) {
  const { handleOrderIssueShareInWA } = useShare();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "unpaid":
        return "bg-blue-100 text-blue-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg max-w-[150px] lg:max-w-[250px] whitespace-normal break-words">
              {order.user.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2 flex-col lg:flex-row">
            <Badge
              className={
                getPaymentStatusColor(order.paymentStatus) + " uppercase"
              }
            >
              {order.paymentStatus}
            </Badge>
            <Badge className={getStatusColor(order.status) + " uppercase"}>
              {order.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Items</p>
              <p className="font-semibold">{order.products.length} item(s)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Cost</p>
              <p className="font-semibold">
                {order.shippingCost === 0
                  ? "FREE"
                  : priceFormatting(order.shippingCost)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-semibold">
                {priceFormatting(order.totalAmount)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Shipping Address</p>
            <p className="font-semibold text-sm text-wrap">
              {`${order.address.street}, ${
                order.address?.state ?? order.address.state + ","
              } ${order.address.city}`}
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Items:</h4>
            <div className="space-y-2">
              {order.products.map((item) => (
                <div
                  key={item.variantId}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>
                    {item.title.substring(0, 26)}: x {item.quantity}
                  </span>
                  <span>{priceFormatting(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleTrackOrder(order)}
              className="gap-2"
            >
              <Truck className="h-4 w-4" />
              Track Order
            </Button>
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleDownloadInvoice(order._id)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
            <Button
              size="sm"
              variant="outline"
              // onClick={() => handleReorder(order)}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reorder
            </Button>
            <Button
              variant="outline"
              size={"sm"}
              className="flex-1 gap-2 border-green-200 text-green-700 hover:text-green-700 hover:bg-green-50 cursor-pointer"
              onClick={() => handleOrderIssueShareInWA({ orderId: order._id })}
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
