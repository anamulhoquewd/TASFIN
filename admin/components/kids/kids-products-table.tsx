"use client";

import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useKidsProducts from "@/hooks/kids-products/useKidsProducts";
import { IPagination } from "@/interfaces/global";
import { IKidsProduct } from "@/interfaces/kids";
import { defaultPagination } from "@/utils/details";
import {} from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { Edit, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { KidsProductEditDialogs } from "./kids-product-edit";

export function KidsProductsTable() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [kidsProducts, setKidsProducts] = useState<IKidsProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deletedProductId, setDeletedProductId] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [editModal, setEditModal] = useState<{
    open: boolean;
    type: string | null;
    product: IKidsProduct | null;
  }>({
    open: false,
    type: null,
    product: null,
  });

  const { getKidsProducts, onDelete } = useKidsProducts();

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
        const result = await getKidsProducts({
          page: pagination.page || 1,
          searchQuery,
          isActive: mapStatusToBoolean(statusFilter),
        });

        setKidsProducts(result.data);

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
    statusFilter,
    refreshTick,
  ]);

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

      // remove product locally
      setKidsProducts((prev) => prev.filter((p) => p._id !== deletedProductId));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (type: string, product: IKidsProduct) => {
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
    setRefreshTick((tick) => tick + 1);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Analytics Cards */}

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
                  placeholder="Search kidsProducts by title or tags..."
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
            </div>

            {/* Products Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>MOQ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {kidsProducts.map((product) => {
                    const firstPositionImage = product.images[0];

                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <Image
                            width={1000}
                            height={1000}
                            src={firstPositionImage?.url as string}
                            alt={firstPositionImage?.alt || product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </TableCell>

                        <TableCell className="max-w-[150px] whitespace-normal break-words">
                          {product.name}

                          {/* <div className="text-xs text-muted-foreground">
                            We can write somthing on there
                          </div> */}
                        </TableCell>
                        <TableCell>{product.moq}</TableCell>

                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge
                              variant={
                                product.isActive ? "default" : "secondary"
                              }
                            >
                              {product.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell>
                          {format(new Date(product.createdAt), "PP")}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {/* View Button */}
                            {/* <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openModal(product._id)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button> */}

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
                                  Images
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

            {kidsProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No kidsProducts found matching your criteria.
              </div>
            )}
          </CardContent>

          {kidsProducts.length !== 0 && (
            <CardFooter className="flex items-center justify-end">
              <Paginations
                pagination={pagination}
                setPagination={setPagination}
              />
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editModal.open} onOpenChange={closeEditModal}>
        <DialogContent className="w-[80vh] max-h-[90vh] overflow-y-auto">
          {/* Content Part (Dynamic Render) */}
          <div className="mt-4">
            {editModal.product && editModal.type !== null && (
              <KidsProductEditDialogs
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
              onClick={handleDelete}
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
