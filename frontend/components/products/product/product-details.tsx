"use client";

import type { IProduct } from "@/interfaces/products";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductDetailsDisplayProps {
  product: IProduct;
}

export function ProductDetailsDisplay({ product }: ProductDetailsDisplayProps) {
  const details = [
    { label: "Fabric", value: product.fabric },
    { label: "Sleeve", value: product.sleeve },
    { label: "Collar/Neck", value: product.collarNeck },
    { label: "Cut/Fit", value: product.cutFit },
    { label: "Side Cut", value: product.sideCut },
    { label: "Length", value: product.length },
    { label: "Wash Care", value: product.washCare },
  ].filter((detail) => detail.value);

  return (
    <div className="space-y-6">
      {/* Product Title and Status */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">{product.slug}</p>
          </div>
          <div className="flex gap-2">
            {product.isFeatured && <Badge>Featured</Badge>}
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Key benefits */}
      {product.keyFeatures && product.keyFeatures.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Key Benefits</h2>
          <ul className="space-y-2">
            {product.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Product Details */}
      {details.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {details.map((detail, index) => (
                <div key={index}>
                  <p className="text-sm text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="font-medium">{detail.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
