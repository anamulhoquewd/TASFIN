"use client";

import { useState } from "react";
import type { IProduct, IProductVariant } from "@/interfaces/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductVariantSelectorProps {
  variants: IProductVariant[];
  onVariantSelect: (variant: IProductVariant) => void;
  product: IProduct;
}

export function ProductVariantSelector({
  variants,
  onVariantSelect,
  product,
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(variants.length > 0 ? variants[0] : null);

  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");

  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (selectedVariant) {
      toast.success("Event has been created", {
        action: {
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
      // When adding a product variant to cart
      addItem({
        productId: product._id,
        variantId: selectedVariant._id,
        title: product.title,
        image: selectedVariant.images?.[0] || product.images[0],
        price: selectedVariant.price,
        maxStock: selectedVariant.stock,
        size: selectedVariant.size,
        quantity: 1, // optional, defaults to 1
        slug: product.slug,
      });
    }
  };

  const handleVariantChange = (size: string) => {
    const variant = variants.find((v) => v.size === size);
    if (variant) {
      setSelectedVariant(variant);
      onVariantSelect(variant);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    handleVariantChange(size);
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {/* Size Buttons */}
          {sizes.map((size) => (
            <Button
              key={size}
              size={"sm"}
              variant={"secondary"}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-md border-2 cursor-pointer duration-300 transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border hover:bg-accent/10"
              }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Selection */}

      {/* Variant Details */}
      {selectedVariant && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-2xl font-bold">
                {formatPrice(selectedVariant.price)}
              </p>
            </div>
            <Badge
              variant={selectedVariant.stock > 0 ? "default" : "destructive"}
            >
              {selectedVariant.stock > 0
                ? `${selectedVariant.stock} in stock`
                : "Out of stock"}
            </Badge>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="w-full cursor-pointer"
        onClick={handleAddToCart}
        disabled={!selectedVariant || selectedVariant.stock === 0}
      >
        {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
