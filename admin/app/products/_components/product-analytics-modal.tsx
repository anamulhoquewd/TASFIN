"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  X,
  RefreshCw,
  Download,
  Printer,
  Share2,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Calendar,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { IProduct } from "@/interfaces/products";

// Types

interface Analytics {
  period: { from: string; to: string; preset: "7d" | "30d" | "90d" | "custom" };
  kpis: {
    revenue: number;
    orders: number;
    unitsSold: number;
    views: number;
    conversionRate: number;
    refundRate: number;
    avgOrderValue: number;
  };
  timeseries: Array<{
    date: string;
    revenue: number;
    orders: number;
    views: number;
  }>;
  channels: Array<{
    name: "Facebook" | "Website" | "Marketplace" | "Offline";
    revenue: number;
    orders: number;
  }>;
  inventory: { totalStock: number; lowStock: number; outOfStock: number };
  priceHistory: Array<{ date: string; price: number }>;
  variantPerformance: Array<{
    variantId: string;
    variantName: string;
    unitsSold: number;
    revenue: number;
    conversion: number;
    stock: number;
  }>;
  topCustomers: Array<{
    name: string;
    avatarUrl?: string;
    orders: number;
    spend: number;
    lastOrderDate: string;
  }>;
  recentOrders: Array<{
    id: string;
    date: string;
    qty: number;
    total: number;
    channel: string;
    status: "paid" | "pending" | "refunded";
  }>;
}

// Mock analytics data generator
const generateMockAnalytics = (product: IProduct): Analytics => {
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const avgPrice =
    product.variants.reduce((acc, v) => acc + v.price, 0) /
    product.variants.length;

  return {
    period: { from: "2025-01-20", to: "2025-01-27", preset: "7d" },
    kpis: {
      revenue: Math.floor(Math.random() * 500000) + 100000,
      orders: Math.floor(Math.random() * 200) + 50,
      unitsSold: Math.floor(Math.random() * 300) + 100,
      views: Math.floor(Math.random() * 5000) + 1000,
      conversionRate: Math.random() * 10 + 2,
      refundRate: Math.random() * 5,
      avgOrderValue: avgPrice * (Math.random() * 2 + 1),
    },
    timeseries: Array.from({ length: 7 }, (_, i) => ({
      date: `2025-01-${21 + i}`,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 30) + 5,
      views: Math.floor(Math.random() * 800) + 200,
    })),
    channels: [
      {
        name: "Facebook",
        revenue: Math.floor(Math.random() * 200000) + 50000,
        orders: Math.floor(Math.random() * 80) + 20,
      },
      {
        name: "Website",
        revenue: Math.floor(Math.random() * 150000) + 30000,
        orders: Math.floor(Math.random() * 60) + 15,
      },
      {
        name: "Marketplace",
        revenue: Math.floor(Math.random() * 100000) + 20000,
        orders: Math.floor(Math.random() * 40) + 10,
      },
      {
        name: "Offline",
        revenue: Math.floor(Math.random() * 80000) + 10000,
        orders: Math.floor(Math.random() * 20) + 5,
      },
    ],
    inventory: {
      totalStock: product.variants.reduce((acc, v) => acc + v.stock, 0),
      lowStock: product.variants.filter((v) => v.stock < 10).length,
      outOfStock: product.variants.filter((v) => v.stock === 0).length,
    },
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-12-${i + 1}`,
      price: avgPrice + (Math.random() - 0.5) * 1000,
    })),
    variantPerformance: product.variants.map((variant, i) => ({
      variantId: variant._id || `variant-${i}`,
      variantName: `${variant.size} - ${variant.color}`,
      unitsSold: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 100000) + 20000,
      conversion: Math.random() * 15 + 2,
      stock: variant.stock,
    })),
    topCustomers: Array.from({ length: 5 }, (_, i) => ({
      name: `Customer ${i + 1}`,
      orders: Math.floor(Math.random() * 10) + 1,
      spend: Math.floor(Math.random() * 50000) + 10000,
      lastOrderDate: `2025-01-${Math.floor(Math.random() * 27) + 1}`,
    })),
    recentOrders: Array.from({ length: 10 }, (_, i) => ({
      id: `ORD-${1000 + i}`,
      date: `2025-01-${Math.floor(Math.random() * 27) + 1}`,
      qty: Math.floor(Math.random() * 5) + 1,
      total: Math.floor(Math.random() * 20000) + 5000,
      channel: ["Facebook", "Website", "Marketplace", "Offline"][
        Math.floor(Math.random() * 4)
      ],
      status: ["paid", "pending", "refunded"][Math.floor(Math.random() * 3)] as
        | "paid"
        | "pending"
        | "refunded",
    })),
  };
};

// Utility functions
const formatCurrency = (amount: number) => `৳${amount.toLocaleString()}`;
const formatPercent = (value: number) => `${value.toFixed(1)}%`;
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("bn-BD");

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  description?: string;
}

export function KPICard({
  title,
  value,
  trend,
  icon,
  description,
}: KPICardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
        {trend !== undefined && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
              {Math.abs(trend).toFixed(1)}%
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Main Modal Component
interface ProductAnalyticsModalProps {
  product: IProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductAnalyticsModal({
  product,
  open,
  onOpenChange,
}: ProductAnalyticsModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  // Generate analytics data when product changes
  useEffect(() => {
    if (product) {
      setAnalytics(generateMockAnalytics(product));
    }
  }, [product]);

  // Handle URL sync
  useEffect(() => {
    const productId = searchParams.get("product");
    const view = searchParams.get("view");

    if (productId && view === "analytics" && !open) {
      onOpenChange(true);
    }
  }, [searchParams, open, onOpenChange]);

  const handleClose = () => {
    onOpenChange(false);
    // Remove URL params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    params.delete("view");
    router.replace(`?${params.toString()}`);
  };

  const handleExport = () => {
    // Mock CSV export
    const csvData =
      "data:text/csv;charset=utf-8,Product,Revenue,Orders,Units\n" +
      `${product?.title},${analytics?.kpis.revenue},${analytics?.kpis.orders},${analytics?.kpis.unitsSold}`;

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvData));
    link.setAttribute("download", `${product?.slug}-analytics.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?product=${product?._id}&view=analytics`;
    try {
      await navigator.clipboard.writeText(url);
      // You would show a toast here
      toast.success("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  if (!product || !analytics) return null;

  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
  const lowStockVariants = product.variants.filter((v) => v.stock < 10);

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="overflow-hidden lg:max-w-7xl max-h-[95vh] p-0 bg-background">
          {/* Header */}
          <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={
                    product.images[0]?.url ||
                    "/placeholder.svg?height=60&width=60&query=product"
                  }
                  alt={product.title}
                  className="w-15 h-15 object-cover rounded-lg"
                />
                <div>
                  <DialogTitle className="text-xl font-semibold">
                    {product.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">SKU: {product.slug}</Badge>
                    {product.fabric && (
                      <Badge variant="default">{product.fabric}</Badge>
                    )}
                    <Badge variant={product.isActive ? "default" : "secondary"}>
                      {product.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {product.isFeatured && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    )}
                    <Badge
                      variant={
                        totalStock > 20
                          ? "default"
                          : totalStock > 0
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {totalStock > 0
                        ? `${totalStock} in stock`
                        : "Out of stock"}
                    </Badge>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                    >
                      /{product.slug} <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() =>
                        setAnalytics(generateMockAnalytics(product))
                      }
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleExport}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => window.print()}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Body */}
          <ScrollArea className="flex-1 px-6 py-2 w-full h-[72vh]">
            <div className="space-y-6">
              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                  title="Total Sales - Mock"
                  value={formatCurrency(analytics.kpis.revenue)}
                  trend={Math.random() * 20 - 10}
                  icon={
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  }
                />
                <KPICard
                  title="Total Orders - Mock"
                  value={analytics.kpis.orders.toString()}
                  trend={Math.random() * 15 - 5}
                  icon={
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  }
                />
                <KPICard
                  title="Total Units Sold - Mock"
                  value={analytics.kpis.unitsSold.toString()}
                  trend={Math.random() * 25 - 10}
                  icon={<Package className="h-4 w-4 text-muted-foreground" />}
                />
              </div>

              {/* Inventory & Price History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Total Stock - Mock</span>
                        <span>{analytics.inventory.totalStock}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Low Stock</span>
                        <span className="text-yellow-600">
                          {analytics.inventory.lowStock}
                        </span>
                      </div>
                      <Progress
                        value={
                          (analytics.inventory.lowStock /
                            analytics.inventory.totalStock) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Out of Stock</span>
                        <span className="text-red-600">
                          {analytics.inventory.outOfStock}
                        </span>
                      </div>
                      <Progress
                        value={
                          (analytics.inventory.outOfStock /
                            analytics.inventory.totalStock) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                    {lowStockVariants.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">
                          Low Stock Variants:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {lowStockVariants.map((variant, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-yellow-600 border-yellow-600"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {variant.size}-{variant.color} ({variant.stock})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Color</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Fabric</TableHead>
                          <TableHead>Sleeve</TableHead>
                          <TableHead>Collar/Neck</TableHead>
                          <TableHead>Cut/Fit</TableHead>
                          <TableHead>Value Addition</TableHead>
                          <TableHead>Wash Care</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.variants.map((variant) => (
                          <TableRow key={variant._id}>
                            <TableCell className="font-medium">
                              {variant.color}
                            </TableCell>
                            <TableCell className="font-medium">
                              {variant.size}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.fabric}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.sleeve}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.collarNeck}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.cutFit}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.valueAddition}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.washCare}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="variants" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>

                <TabsContent value="variants">
                  <Card>
                    <CardHeader>
                      <CardTitle>Variants performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Variants</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Units Sold - Mock</TableHead>
                            <TableHead>Revenue - Mock</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {product.variants.map((variant) => (
                            <TableRow key={variant._id}>
                              <TableCell className="font-medium">
                                {variant.color + " - " + variant.size}
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatCurrency(
                                  product.variants.find(
                                    (v) => v._id === variant._id
                                  )?.price || 0
                                )}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={
                                    variant.stock < 10
                                      ? "text-red-600"
                                      : variant.stock < 20
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                  }
                                >
                                  {variant.stock}
                                </span>
                              </TableCell>
                              <TableCell>{20}</TableCell>
                              <TableCell>{formatCurrency(20)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>সাম্প্রতিক অর্ডার - Mock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>অর্ডার ID</TableHead>
                            <TableHead>তারিখ</TableHead>
                            <TableHead>পরিমাণ</TableHead>
                            <TableHead>মোট</TableHead>
                            <TableHead>স্ট্যাটাস</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analytics.recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">
                                {order.id}
                              </TableCell>
                              <TableCell>{formatDate(order.date)}</TableCell>
                              <TableCell>{order.qty}</TableCell>
                              <TableCell>
                                {formatCurrency(order.total)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    order.status === "paid"
                                      ? "default"
                                      : order.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {order.status === "paid"
                                    ? "পেইড"
                                    : order.status === "pending"
                                    ? "পেন্ডিং"
                                    : "রিফান্ড"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="customers">
                  <Card>
                    <CardHeader>
                      <CardTitle>টপ কাস্টমার - Mock</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analytics.topCustomers.map((customer, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  +880 1975 024262
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Dhaka.
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                শেষ অর্ডার: {formatDate(customer.lastOrderDate)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {formatCurrency(customer.spend)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {customer.orders} অর্ডার
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

// Hook for URL sync
export function useProductAnalyticsModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const openModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsOpen(true);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", productId);
    params.set("view", "analytics");
    router.push(`?${params.toString()}`);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProductId(null);

    // Remove URL params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("product");
    params.delete("view");
    router.replace(`?${params.toString()}`);
  };

  return {
    isOpen,
    selectedProductId,
    openModal,
    closeModal,
  };
}
