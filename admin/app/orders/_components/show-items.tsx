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
                      <div className="font-medium">{product.title}</div>

                      <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                        ID: {product.variantId}
                      </code>
                    </TableCell>
                    {/* <TableCell className="text-right font-medium">
                      ৳{product?.price?.toLocaleString() || "0.00"}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {product.quantity?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{product?.total?.toLocaleString() || "0.00"}
                    </TableCell> */}
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
