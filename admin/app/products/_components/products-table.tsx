"use client";

import { useState, useMemo, useEffect } from "react";
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
import { IProduct } from "@/interfaces/products";
import { defaultPagination } from "@/utils/details";
import { IPagination } from "@/interfaces/global";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductEditDialogs } from "./product-edit-dialogs";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ProductsTable() {
  const { isOpen, selectedProductId, openModal, closeModal } =
    useProductAnalyticsModal();
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deletedProductId, setDeletedProductId] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<{
    open: boolean;
    type: string | null;
    product: IProduct | null;
  }>({
    open: false,
    type: null,
    product: null,
  });

  const { getProducts, onDelete } = useProducts();

  // mapping helper
  const mapStatusToBoolean = (status: string): boolean | undefined => {
    if (status === "active") return true;
    if (status === "inactive") return false;
    return undefined; // "all"
  };

  const mapFeaturedToBoolean = (featured: string): boolean | undefined => {
    if (featured === "featured") return true;
    if (featured === "not-featured") return false;
    return undefined; // "all"
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const result = await getProducts({
          page: pagination.page || 1,
          searchQuery,
          categoryFilter,
          isActive: mapStatusToBoolean(statusFilter),
          isFeatured: mapFeaturedToBoolean(featuredFilter),
        });

        setProducts(result.data);
        console.log("Fetched products:", result.data);

        setPagination(() => ({
          page: result.pagination.page,
          total: result.pagination.total,
          totalPages: result.pagination.totalPages,
          nextPage: result.pagination.nextPage || null,
          prevPage: result.pagination.prevPage || null,
        }));
      } catch (error: any) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [
    pagination.page,
    searchQuery,
    categoryFilter,
    statusFilter,
    featuredFilter,
  ]);

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

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      if (!deletedProductId) return;
      await onDelete(deletedProductId);
      setDeletedProductId(null);

      // ✅ remove product locally
      setProducts((prev) => prev.filter((p) => p._id !== deletedProductId));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (type: string, product: IProduct) => {
    setEditModal({
      open: true,
      type,
      product,
    });
  };

  const closeEditModal = () => {
    setEditModal({
      open: false,
      type: null,
      product: null,
    });
  };

  const handleDeleteProduct = async () => {
    if (!deletedProductId) return;

    try {
      const response = await fetch(`/api/products/${deletedProductId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter((p) => p._id !== deletedProductId));
        toast.success("Product deleted successfully");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeleteOpen(false);
      setDeletedProductId(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Analytics Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <KPICard
            title="Total Products"
            value={pagination.total.toString()}
            icon={<ShoppingCart className="h-4 w-4" />}
            description="Total product based on filters"
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
        </div> */}

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
                              /{product.slug}{" "}
                              <ExternalLink className="h-4 w-4" />
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
                              variant={
                                product.isActive ? "default" : "secondary"
                              }
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
                            {/* View Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openModal(product._id)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

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
                                  onClick={() =>
                                    openEditModal("general", product)
                                  }
                                >
                                  General Info
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEditModal("images", product)
                                  }
                                >
                                  Main Images
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEditModal("variantInfo", product)
                                  }
                                >
                                  Variant Info
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEditModal("variantImages", product)
                                  }
                                >
                                  Variant Images
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEditModal("createVariant", product)
                                  }
                                >
                                  Create New Variant
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    openEditModal("deleteVariant", product)
                                  }
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
                                setDeleteOpen(true);
                                setDeletedProductId(product._id);
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
      </div>

      <ProductAnalyticsModal
        product={products.find((p) => p._id === selectedProductId) || null}
        open={isOpen}
        onOpenChange={closeModal}
      />

      {/* Edit Dialog */}
      <Dialog open={editModal.open} onOpenChange={closeEditModal}>
        <DialogTitle>Edit the general info</DialogTitle>
        <DialogContent className="w-[80vh] max-h-[90vh] overflow-y-auto">
          {/* Content Part (Dynamic Render) */}
          <div className="mt-4">
            {editModal.product && editModal.type !== null && (
              <ProductEditDialogs
                type={editModal.type}
                product={editModal.product}
                onClose={closeEditModal}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and all of its variants from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DeleteConfirmation
        open={deleteOpen}
        changeOpen={setDeleteOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
