"use client";

import { useState } from "react";
import type { IProductVariant } from "@/interfaces/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductVariantSelectorProps {
  variants: IProductVariant[];
  onVariantSelect: (variant: IProductVariant) => void;
}

export function ProductVariantSelector({
  variants,
  onVariantSelect,
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] =
    useState<IProductVariant | null>(variants.length > 0 ? variants[0] : null);

  const sizes = Array.from(new Set(variants.map((v) => v.size)));
  const colors = Array.from(new Set(variants.map((v) => v.color)));

  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const handleVariantChange = (size: string, color: string) => {
    const variant = variants.find((v) => v.size === size && v.color === color);
    if (variant) {
      setSelectedVariant(variant);
      onVariantSelect(variant);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    handleVariantChange(size, selectedColor);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    handleVariantChange(selectedSize, color);
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
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
      <div>
        <h3 className="text-sm font-semibold mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color}
              variant={"secondary"}
              size={"sm"}
              onClick={() => handleColorChange(color)}
              className={`px-4 py-2 cursor-pointer rounded-md border-2 duration-300 transition-colors ${
                selectedColor === color
                  ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border hover:bg-accent/10"
              }`}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

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
        className="w-full"
        disabled={!selectedVariant || selectedVariant.stock === 0}
      >
        {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
