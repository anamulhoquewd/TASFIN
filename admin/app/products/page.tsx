"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  ListIcon as Category,
  EyeIcon,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UnitDialog } from "./_components/unit-dialog";
import { GeneralDialog } from "./_components/general-dialog";
import { CategoryDialog } from "./_components/category-dialog";
import { VisibilityDialog } from "./_components/visibility-dialog";
import { MediaDialog } from "./_components/media-dialog";
import { Progress } from "@/components/ui/progress";
import Paginations from "@/components/pagination";
import { IProduct } from "@/interfaces/products";
import useProduct from "./_hook/useProduct";
import useCategory from "../admin/categories/_hook/useCategory";
import { DeleteDialog } from "../admin/_components/delete-dialong";
import useProducts from "./_hook/useProducts";

export default function ProductsPage() {
  const { categories } = useCategory();
  const {
    products,
    pagination,
    setPagination,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    deleteOpen,
    setDeleteOpen,
    handleDelete,
    selectedItem,
  } = useProducts();

  console.log("Products : ", products);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory, prices, and categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            You have {pagination.total} products in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: { name: string; _id: string }) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No products found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product: IProduct) => {
                    // Image
                    const mediaUrl =
                      product.images[0]?.url ||
                      "https://placehold.jp/250x250.png?text=Media";

                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="relative h-10 w-10 overflow-hidden rounded-md">
                            <Image
                              src={mediaUrl}
                              alt={product?.images[0]?.alt || product?.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <div>{product.title}</div>
                            <Link
                              target="_blank"
                              href={`/products/${product.slug}`}
                            >
                              <div className="text-xs text-muted-foreground inline">
                                {product.slug}
                              </div>
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>{product?.categories[0]}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {products.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>

      {/* Dialogs for updating different parts of the product */}
      {selectedItem && (
        <DeleteDialog
          onConfirm={() => handleDelete(selectedItem._id)}
          open={deleteOpen}
          changeOpen={setDeleteOpen}
        />
      )}
    </div>
  );
}
