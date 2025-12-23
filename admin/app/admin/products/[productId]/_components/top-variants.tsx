"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopVariantsProps {
  data: Array<{ sku: string; size: string; color: string; sales: number }>
}

export function TopVariants({ data }: TopVariantsProps) {
  const maxSales = Math.max(...data.map((d) => d.sales))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Selling Variants</CardTitle>
        <p className="text-sm text-muted-foreground">Best performers by units sold</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((variant, index) => (
          <div key={variant.sku} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">#{index + 1}</span>
                <span className="font-medium text-foreground">
                  {variant.color} - {variant.size}
                </span>
              </div>
              <span className="text-foreground font-semibold">{variant.sales}</span>
            </div>
            <Progress value={(variant.sales / maxSales) * 100} className="h-2 bg-secondary" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
