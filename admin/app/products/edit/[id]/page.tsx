"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { IProduct } from "@/interfaces/products";
import { productUpdateZ, type ProductUpdateInput } from "@/lib/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import useProducts from "../../_hook/useProducts";
import { EditProductForm } from "../../_components/edit-form";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { getProductById, updateProduct } = useProducts();

  const {
    handleTitleChange,
    setCategoryOpen,
    categoryOpen,
    prepend,
    remove,
    fields,
    variantImagePreviews,
    handleVariantImageUpload,
    removeVariantImage,
  } = useProducts();

  const form = useForm({
    resolver: zodResolver(productUpdateZ),
    defaultValues: {
      title: product?.title || "",
      slug: product?.slug || "",
      description: {
        json: (product?.description as any)?.json || null,
        html: (product?.description as any)?.html || "",
      },
      categories:
        product?.categories?.map((cat) =>
          typeof cat === "string" ? cat : (cat as any)._id
        ) || [],
      images: [], // Will be handled separately for existing images
      variants: product?.variants?.map((variant) => ({
        size: variant.size || "",
        color: variant.color || "",
        stock: variant.stock || 0,
        price: variant.price || 0,
        images: [], // Will be handled separately for existing images
      })) || [{ size: "", color: "", stock: 0, price: 0, images: [] }],
      fabric: product?.fabric || "",
      valueAddition: product?.valueAddition || "",
      cutFit: product?.cutFit || "",
      collarNeck: product?.collarNeck || "",
      sleeve: product?.sleeve || "",
      length: product?.length || "",
      washCare: product?.washCare || "",
      sideCut: product?.sideCut || "",
      isFeatured: product?.isFeatured || false,
      isActive: product?.isActive !== undefined ? product?.isActive : true,
      tags: product?.tags || [],
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const result = await getProductById(params.id as string);

        console.log("Fetched product:", result.data);

        setProduct(result.data);
        form.reset({
          title: result.data.title || "",
          slug: result.data.slug || "",
          description: {
            json: (result.data.description as any)?.json || null,
            html: (result.data.description as any)?.html || "",
          },
          categories: result.data.categories || [],
          images: [], // Will be handled separately for existing images
          variants: result.data.variants?.map((variant: any) => ({
            size: variant.size || "",
            color: variant.color || "",
            stock: variant.stock || 0,
            price: variant.price || 0,
            images: [], // Will be handled separately for existing images
          })) || [{ size: "", color: "", stock: 0, price: 0, images: [] }],
          fabric: result.data.fabric || "",
          valueAddition: result.data.valueAddition || "",
          cutFit: result.data.cutFit || "",
          collarNeck: result.data.collarNeck || "",
          sleeve: result.data.sleeve || "",
          length: result.data.length || "",
          washCare: result.data.washCare || "",
          sideCut: result.data.sideCut || "",
          isFeatured: result.data.isFeatured || false,
          isActive:
            result.data.isActive !== undefined ? result.data.isActive : true,
          tags: result.data.tags || [],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit = async (data: ProductUpdateInput) => {
    try {
      setIsLoading(true);
      const result = await updateProduct(params.id as string, data);

      if (result.success) {
        // Optionally redirect to products list or refresh the page
        router.push("/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
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
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">
            Update on "{product.title}" information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/products")}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </div>

      <EditProductForm
        form={form}
        product={product}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        handleTitleChange={handleTitleChange}
        setCategoryOpen={setCategoryOpen}
        categoryOpen={categoryOpen}
        prepend={prepend}
        remove={remove}
        fields={fields}
        variantImagePreviews={fields.map(
          (_, index) => variantImagePreviews[index] || []
        )}
        handleVariantImageUpload={handleVariantImageUpload}
        removeVariantImage={removeVariantImage}
      />
    </div>
  );

  return <div className="container mx-auto py-8"></div>;
}
