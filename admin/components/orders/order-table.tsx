import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { copyToClipboard, formatPrice } from "@/lib/utils";
import { Copy, MoreHorizontal, Trash2, Truck } from "lucide-react";
import { Dispatch, ReactElement, SetStateAction } from "react";

interface OrderProps {
  orders: IOrder[];
  setSelectedItem: (order: any) => void;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setStatusOpen: Dispatch<SetStateAction<boolean>>;
  setShowItemsOpen: (showItemOpen: boolean) => void;
  setShowHistoryOpen: (showItemOpen: boolean) => void;
  getStatusBadge: (status: string) => ReactElement | null;
  getStatusIcon: (status: string) => ReactElement | null;
  getPaymentStatusBadge: (status: string) => ReactElement | null;
}

function OrderTable({
  setSelectedItem,
  setStatusOpen,
  setDeleteOpen,
  orders,
  setShowItemsOpen,
  getStatusIcon,
  getStatusBadge,
  getPaymentStatusBadge,setShowHistoryOpen
}: OrderProps) {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order No</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>History</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
            <TableHead className="text-right">Discount</TableHead>
            <TableHead className="text-right">Total</TableHead>
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
            orders.map((order: IOrder) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2 flex-1">
                    <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                      ...{order.orderNumber.split("-")[3]}
                    </code>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => copyToClipboard(order.orderNumber)}
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
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    {getStatusBadge(order.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => {
                      setShowHistoryOpen(true);
                      setSelectedItem(order);
                    }}
                    className="cursor-pointer"
                  >
                    Show History
                    <span className="sr-only">Show History</span>
                  </Button>
                </TableCell>
                <TableCell>
                  {getPaymentStatusBadge(order.paymentStatus)}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.subtotal)}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.discountTotal)}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.totalAmount)}
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
  );
}

export default OrderTable;
