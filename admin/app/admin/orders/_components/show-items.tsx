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

  useEffect(() => {
    setProducts(order?.products || []);
  }, [order]);

  console.log("order items:", products);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>View Items</DialogTitle>
          <DialogDescription>
            View items in order {order?._id}
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
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
                    <TableCell>
                      <div className="font-medium">{product.title}</div>

                      <div className="flex items-center gap-2 flex-1">
                        V-ID{" "}
                        <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                          {product.variantId.substring(0, 8)}...
                        </code>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 cursor-pointer"
                                onClick={() =>
                                  copyToClipboard(product.variantId)
                                }
                              >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Variant ID</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy Variant ID</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
