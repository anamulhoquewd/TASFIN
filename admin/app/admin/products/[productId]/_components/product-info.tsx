"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface ProductInfoProps {
  product: any;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Product Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Description
          </h4>
          <p className="text-sm text-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        <Separator className="bg-border" />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Key Features
          </h4>
          <ul className="space-y-1">
            {product.keyFeatures.map((feature: string, index: number) => (
              <li
                key={index}
                className="text-sm text-foreground flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-border" />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.categories?.map((category: string) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Created At</span>
          <span className="text-foreground">
            {format(new Date(product.createdAt), "MMM dd, yyyy HH:mm")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
