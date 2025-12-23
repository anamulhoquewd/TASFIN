"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductDetailsProps {
  details: any;
}

export function ProductDetails({ details }: ProductDetailsProps) {
  const detailItems = [
    { label: "Fabric", value: details.fabric },
    { label: "Value Addition", value: details.valueAddition },
    { label: "Cut & Fit", value: details.cutFit },
    { label: "Collar/Neck", value: details.collarNeck },
    { label: "Sleeve", value: details.sleeve },
    { label: "Length", value: details.length },
    { label: "Wash Care", value: details.washCare },
    { label: "Side Cut", value: details.sideCut },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {detailItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
