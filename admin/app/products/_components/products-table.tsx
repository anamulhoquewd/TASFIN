"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
} from "lucide-react";
import {
  KPICard,
  ProductAnalyticsModal,
  useProductAnalyticsModal,
} from "./product-analytics-modal";

// Mock data based on the product structure provided
const mockProducts = [
  {
    _id: "68acae001c4532f20c4df987",
    title: "Product number three",
    slug: "product-number-three",
    categories: ["68ac39357df68464d1e8dd10", "68ac38cc7df68464d1e8dcfc"],
    tags: ["one", "two"],
    images: [
      {
        alt: "Product number three",
        url: "https://tasfin-shop.s3.eu-north-1.amazonaws.com/tasfin/products/root/1756147176328-root-0-image (1).png",
      },
    ],
    variants: [
      {
        _id: "68acae001c4532f20c4df988",
        size: "S",
        color: "Orange",
        price: 4500,
        stock: 35,
      },
      {
        size: "S",
        color: "Sky",
        price: 4200,
        stock: 34,
      },
    ],
    isActive: true,
    isFeatured: true,
    fabric: "Cotton",
    createdAt: "2025-08-25T18:40:00.541Z",
    updatedAt: "2025-08-25T18:40:00.541Z",
  },
  // Add more mock products for demonstration
  {
    _id: "68acae001c4532f20c4df988",
    title: "Summer Collection Shirt",
    slug: "summer-collection-shirt",
    categories: ["68ac39357df68464d1e8dd10"],
    tags: ["summer", "casual"],
    images: [
      {
        alt: "Summer shirt",
        url: "/summer-shirt.png",
      },
    ],
    variants: [
      {
        _id: "68acae001c4532f20c4df989",
        size: "M",
        color: "Blue",
        price: 3500,
        stock: 20,
      },
      {
        size: "L",
        color: "White",
        price: 3500,
        stock: 15,
      },
    ],
    isActive: true,
    isFeatured: false,
    fabric: "Linen",
    createdAt: "2025-08-24T10:30:00.541Z",
    updatedAt: "2025-08-24T10:30:00.541Z",
  },
];

export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const { isOpen, selectedProductId, openModal, closeModal } =
    useProductAnalyticsModal();

  // Calculate analytics data
  const analytics = useMemo(() => {
    const totalProducts = mockProducts.length;
    const activeProducts = mockProducts.filter((p) => p.isActive).length;
    const featuredProducts = mockProducts.filter((p) => p.isFeatured).length;
    const totalStock = mockProducts.reduce(
      (acc, product) =>
        acc +
        product.variants.reduce((varAcc, variant) => varAcc + variant.stock, 0),
      0
    );
    const totalVariants = mockProducts.reduce(
      (acc, product) => acc + product.variants.length,
      0
    );
    const avgPrice =
      mockProducts.reduce((acc, product) => {
        const productAvgPrice =
          product.variants.reduce(
            (varAcc, variant) => varAcc + variant.price,
            0
          ) / product.variants.length;
        return acc + productAvgPrice;
      }, 0) / mockProducts.length;

    return {
      totalProducts,
      activeProducts,
      featuredProducts,
      totalStock,
      totalVariants,
      avgPrice: Math.round(avgPrice),
    };
  }, []);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.isActive) ||
        (statusFilter === "inactive" && !product.isActive);

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && product.isFeatured) ||
        (featuredFilter === "not-featured" && !product.isFeatured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [searchTerm, statusFilter, featuredFilter]);

  const formatPrice = (price: number) => `৳${price.toLocaleString()}`;
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <KPICard
          title="Total Products"
          value={analytics.totalProducts.toString()}
          icon={<ShoppingCart className="h-4 w-4" />}
        />

        <KPICard
          title="Active Products"
          value={analytics.activeProducts.toString()}
          icon={<Eye className="h-4 w-4" />}
        />

        <KPICard
          title="Featured Products"
          value={analytics.featuredProducts.toString()}
          icon={<Star className="h-4 w-4" />}
        />

        <KPICard
          title="Total Stock"
          value={analytics.totalStock.toString()}
          icon={<Package className="h-4 w-4" />}
        />

        <KPICard
          title="Total Variants"
          value={analytics.totalVariants.toString()}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
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
                  <TableHead>Price Range</TableHead>
                  <TableHead>Total Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const priceRange =
                    product.variants.length > 0
                      ? {
                          min: Math.min(
                            ...product.variants.map((v) => v.price)
                          ),
                          max: Math.max(
                            ...product.variants.map((v) => v.price)
                          ),
                        }
                      : { min: 0, max: 0 };

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
                          <div className="text-sm text-muted-foreground">
                            {product.slug}
                          </div>
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
                        {priceRange.min === priceRange.max
                          ? formatPrice(priceRange.min)
                          : `${formatPrice(priceRange.min)} - ${formatPrice(
                              priceRange.max
                            )}`}
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
                          {product.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>{formatDate(product.createdAt)}</TableCell>

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

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      <ProductAnalyticsModal
        product={mockProducts.find((p) => p._id === selectedProductId) || null}
        open={isOpen}
        onOpenChange={closeModal}
      />
    </div>
  );
}
