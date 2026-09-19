"use client";

import { KidsProductsTable } from "@/components/kids/kids-products-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KidsProducts() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col mb-8 gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kids Products</h1>
          <p className="text-muted-foreground">
            Manage your kids product inventory, prices, and others.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/admin/kids/new")}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div id="products-table">
        <KidsProductsTable />
      </div>
    </div>
  );
}
