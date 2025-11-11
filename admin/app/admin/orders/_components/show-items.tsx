"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder, IOrderItem } from "@/interfaces/orders";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { copyToClipboard, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ShowItemsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: IOrder;
}

export default function ShowItems({
  open,
  onOpenChange,
  order,
}: ShowItemsProps) {
  const [products, setProducts] = useState<IOrderItem[]>([]);

  console.log("Products: ", products);
  useEffect(() => {
    setProducts(order?.products || []);
  }, [order]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>View Items</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <div>
              View items in order{" "}
              <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                {order?._id}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => copyToClipboard(order?._id)}
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy order ID</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy order ID</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              Product ID:{" "}
              <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                {products[0]?.productId}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => copyToClipboard(products[0]?.productId)}
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Products ID</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Products ID</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md">
          <ScrollArea className="w-full h-80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Ship cost</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No items in this order
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.variantId}>
                      <TableCell>
                        {product.image ? (
                          <Image
                            src={product.image.url || ""}
                            width={48}
                            height={48}
                            alt={product.image.alt || product.title}
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-muted-foreground">
                              No image
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] whitespace-normal break-words">
                        {product.title}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.shippingCost)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {product.quantity?.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(product.price * product.quantity)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
