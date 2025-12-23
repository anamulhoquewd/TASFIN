"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { IProduct } from "@/interfaces/products";
import { Edit, ExternalLink, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProductsTable({
  products,
  openEditModal,
  setProductIdForDelete,
  isLoading,
  setDeleteDialogOpen,
}: {
  products: IProduct[];
  openEditModal: (type: string, product: IProduct) => void;
  setProductIdForDelete: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Variants</TableHead>
          <TableHead>Total Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => {
          const totalStock = product.variants.reduce(
            (acc, variant) => acc + variant.stock,
            0
          );

          return (
            <TableRow key={product._id}>
              <TableCell>
                <Image
                  width={1000}
                  height={1000}
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </TableCell>

              <TableCell className="max-w-[150px] whitespace-normal break-words">
                <div className="font-medium ">{product.title}</div>
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_DOMAIN}/shop/${product.slug}`}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs"
                >
                  /{product.slug} <ExternalLink className="h-4 w-4" />
                </Link>
                {product.details.fabric && (
                  <div className="text-xs text-muted-foreground">
                    Fabric: {product.details.fabric}
                  </div>
                )}
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  {product.variants.slice(0, 2).map((variant, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{variant.size}</span>
                      <span className="text-muted-foreground ml-2">
                        ({variant.stock} in stock)
                      </span>
                    </div>
                  ))}
                  {product.variants.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      +{product.variants.length - 2} more variants
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`font-medium ${
                    totalStock < 10
                      ? "text-red-600"
                      : totalStock < 20
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {totalStock}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-1">
                  <Badge variant={product.status ? "default" : "secondary"}>
                    {product.status ? "Active" : "Inactive"}
                  </Badge>
                  {product.isFeatured && (
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-600"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {product.tags?.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags && product.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags?.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>

              <TableCell>{formatDate(product.createdAt.toString())}</TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* View Button */}
                  <Link
                    className="cursor-pointer"
                    href={`/admin/products/${product._id}`}
                    target="_blank"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Edit Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => openEditModal("activity", product)}
                      >
                        Activity
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditModal("general", product)}
                      >
                        General Info
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditModal("variantInfo", product)}
                      >
                        Variant Info
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditModal("images", product)}
                      >
                        Main Images
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditModal("createVariant", product)}
                      >
                        Create New Variant
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditModal("deleteVariant", product)}
                      >
                        Delete Variant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    disabled={isLoading}
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setProductIdForDelete(product._id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
