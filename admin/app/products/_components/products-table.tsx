"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  ShoppingCart,
  Star,
  Package,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import {
  KPICard,
  ProductAnalyticsModal,
  useProductAnalyticsModal,
} from "./product-analytics-modal";
import useProducts from "../_hook/useProducts";
import Paginations from "@/components/pagination";
import Link from "next/link";

export function ProductsTable() {
  const { isOpen, selectedProductId, openModal, closeModal } =
    useProductAnalyticsModal();

  const {
    products,
    pagination,
    setPagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    featuredFilter,
    setFeaturedFilter,
  } = useProducts();

  console.log("Products:", products);

  // Calculate analytics data
  const analytics = useMemo(() => {
    const activeProducts = products.filter((p) => p.isActive).length;
    const featuredProducts = products.filter((p) => p.isFeatured).length;
    const totalStock = products.reduce(
      (acc, product) =>
        acc +
        product.variants.reduce((varAcc, variant) => varAcc + variant.stock, 0),
      0
    );
    const totalVariants = products.reduce(
      (acc, product) => acc + product.variants.length,
      0
    );

    return {
      activeProducts,
      featuredProducts,
      totalStock,
      totalVariants,
    };
  }, [products]);

  const formatPrice = (price: number) => `BDT${price.toLocaleString()}`;
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard
          title="Total Products"
          value={pagination.total.toString()}
          icon={<ShoppingCart className="h-4 w-4" />}
          description="Total product on our system"
        />

        <KPICard
          title="Active Products"
          value={analytics.activeProducts.toString()}
          icon={<Eye className="h-4 w-4" />}
          description="Only on this page"
        />

        <KPICard
          title="Featured Products"
          value={analytics.featuredProducts.toString()}
          icon={<Star className="h-4 w-4" />}
          description="Only on this page"
        />

        <KPICard
          title="Total Stock"
          value={analytics.totalStock.toString()}
          description="Only on this page"
          icon={<Package className="h-4 w-4" />}
        />

        <KPICard
          title="Total Variants"
          value={analytics.totalVariants.toString()}
          description="Only on this page"
          icon={<Package className="h-4 w-4" />}
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Products Management</CardTitle>
          <CardDescription>
            View and manage your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products by title or tags..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="not-featured">Not Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Table */}
          <div className="rounded-md border overflow-x-auto">
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
                        <img
                          src={
                            product.images[0]?.url ||
                            "/placeholder.svg?height=50&width=50&query=product"
                          }
                          alt={product.images[0]?.alt || product.title}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>

                      <TableCell>
                        <div>
                          <div className="font-medium">{product.title}</div>
                          {/* <div className="text-sm text-muted-foreground">
                            {product.slug}
                          </div> */}
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs"
                          >
                            /{product.slug} <ExternalLink className="h-4 w-4" />
                          </Link>
                          {product.fabric && (
                            <div className="text-xs text-muted-foreground">
                              Fabric: {product.fabric}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          {product.variants
                            .slice(0, 2)
                            .map((variant, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">
                                  {variant.size}
                                </span>{" "}
                                - {variant.color}
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
                          <Badge
                            variant={product.isActive ? "default" : "secondary"}
                          >
                            {product.isActive ? "Active" : "Inactive"}
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
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
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

                      <TableCell>
                        {formatDate(product.createdAt.toString())}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openModal(product._id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
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
          </div>

          {products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your criteria.
            </div>
          )}
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

      <ProductAnalyticsModal
        product={products.find((p) => p._id === selectedProductId) || null}
        open={isOpen}
        onOpenChange={closeModal}
      />
    </div>
  );
}
