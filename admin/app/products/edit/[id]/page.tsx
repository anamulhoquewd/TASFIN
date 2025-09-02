"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { IProduct } from "@/interfaces/products";
import type { ProductUpdateInput } from "@/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import useProducts from "../../_hook/useProducts";
import useCategory from "@/app/categories/_hook/useCategory";
import { EditProductForm } from "../../_components/edit-form";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { getProductById, onUpdate } = useProducts();
  const { categories } = useCategory();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const result = await getProductById(params.id as string);

        if (!result.success) {
          toast.error("Failed to fetch product");
          return;
        }
        setProduct(result.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit = async (data: ProductUpdateInput) => {
    if (!product) return;

    const success = await onUpdate(product._id, data);
    // if (success) {
    //   router.push("/admin");
    // }
  };

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist or has been deleted.
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => router.push("/products")}
          className="cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">
            Update "{product.title}" information
          </p>
        </div>
      </div>

      <EditProductForm
        product={product}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        categories={categories}
      />
    </div>
  );
}
