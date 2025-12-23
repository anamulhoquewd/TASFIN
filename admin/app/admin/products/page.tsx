"use client";

import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
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
import { IProduct } from "@/interfaces/products";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Filters from "./_components/filters";
import { ProductEditDialogs } from "./_components/product-edit-dialogs";
import { ProductsTable } from "./_components/products-table";
import useProducts from "./_hook/useProducts";

export default function AdminDashboardProducts() {
  const {
    products,
    pagination,
    setPagination,
    isLoading,
    setProductIdForDelete,
    status,
    setStatus,
    custom,
    setCustom,
    featured,
    setFeatured,
    isItNew,
    setIsItNew,
    category,
    setCategory,
    search,
    setSearch,
    handleDelete,
    setProducts,
  } = useProducts();

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState<{
    open: boolean;
    type: string | null;
    product: IProduct | null;
  }>({
    open: false,
    type: null,
    product: null,
  });

  const openEditModal = (type: string, product: IProduct) => {
    setOpenModal({
      open: true,
      type,
      product,
    });
  };
  const closeEditModal = () => {
    setOpenModal({
      open: false,
      type: null,
      product: null,
    });
  };

  return (
    <div className="min-h-screen bg-background space-y-6">
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

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Products Management</CardTitle>
            <CardDescription>
              View and manage your product inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Filters
              search={search}
              setSearch={setSearch}
              isItNew={isItNew}
              setIsItNew={setIsItNew}
              status={status}
              setStatus={setStatus}
              featured={featured}
              setFeatured={setFeatured}
              category={category}
              setCategory={setCategory}
              custom={custom}
              setCustom={setCustom}
            />
            {/* Products Table */}
            <div className="rounded-md border overflow-x-auto">
              <ProductsTable
                products={products}
                setDeleteDialogOpen={setDeleteOpen}
                isLoading={isLoading}
                setProductIdForDelete={setProductIdForDelete}
                openEditModal={openEditModal}
              />
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

        {/* Edit Dialog */}
        <Dialog open={openModal.open} onOpenChange={closeEditModal}>
          <DialogTitle className="sr-only"></DialogTitle>
          <DialogContent className="w-[80vh] max-h-[90vh] overflow-y-auto">
            <div className="mt-4">
              {openModal.product && openModal.type !== null && (
                <ProductEditDialogs
                  type={openModal.type}
                  product={openModal.product}
                  onClose={closeEditModal}
                  setProducts={setProducts}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmation
          open={deleteOpen}
          changeOpen={setDeleteOpen}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
