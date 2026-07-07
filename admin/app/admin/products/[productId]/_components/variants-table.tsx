"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProductVariant } from "@/interfaces/products";

interface VariantsTableProps {
  variants: IProductVariant[];
}

export function VariantsTable({ variants }: VariantsTableProps) {
  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Product Variants</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {variants.length} variants • {totalStock} total units in stock
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">SKU</TableHead>
                <TableHead className="text-muted-foreground">Size</TableHead>
                <TableHead className="text-muted-foreground">Color</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Stock</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow
                  key={variant._id}
                  className="border-border hover:bg-secondary/50"
                >
                  <TableCell className="font-mono text-xs text-foreground">
                    {variant.sku}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {variant.size}
                  </TableCell>
                  <TableCell className="text-foreground">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full border border-border"
                        style={{
                          backgroundColor:
                            variant.color === "White"
                              ? "#ffffff"
                              : variant.color === "Navy Blue"
                              ? "#1e3a5f"
                              : "#888",
                        }}
                      />
                      {variant.color || "—"}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    ₹{variant.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {variant.stock}
                  </TableCell>
                  <TableCell>
                    {variant.stock === 0 ? (
                      <Badge variant="destructive" className="text-xs">
                        Out of Stock
                      </Badge>
                    ) : variant.stock < 15 ? (
                      <Badge className="bg-warning/20 text-warning border-warning/30 text-xs">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        In Stock
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
