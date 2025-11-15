"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct, IProductVariant } from "@/interfaces/products";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImageGallery } from "@/components/products/product/product-images";
import { ProductDetailsDisplay } from "@/components/products/product/product-details";
import { ProductVariantSelector } from "@/components/products/product/variant-selector";
import { useProducts } from "@/hooks/products/use-products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getProductBySlug } = useProducts();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const fetchedProduct = await getProductBySlug(slug);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        if (fetchedProduct.variants.length > 0) {
          setSelectedVariant(fetchedProduct.variants[0]);
        }
      }
      setIsLoading(false);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg bg-accent-foreground" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4 bg-accent-foreground" />
            <Skeleton className="h-20 w-full bg-accent-foreground" />
            <Skeleton className="h-40 w-full bg-accent-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-4 pb-8">
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div>
          <ProductImageGallery images={product.images} title={product.title} />
        </div>

        {/* Right Column - Details and Variants */}
        <div className="space-y-6">
          {/* Variant Selector */}

          <ProductDetailsDisplay product={product}>
            {product.variants.length > 0 && (
              <ProductVariantSelector
                variants={product.variants}
                product={product}
                onVariantSelect={setSelectedVariant}
              />
            )}
          </ProductDetailsDisplay>
        </div>
      </div>

      {/* Variant Images Section */}
      {selectedVariant?.images && selectedVariant.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{selectedVariant.size}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedVariant.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted"
              >
                {image.url ? (
                  <Image
                    width={200}
                    height={200}
                    src={image.url || "/placeholder.svg"}
                    alt={
                      image.alt || `${selectedVariant.size} view ${index + 1}`
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
