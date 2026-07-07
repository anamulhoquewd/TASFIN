"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

interface AnalyticsCardsProps {
  totalSales: number;
  totalRevenue: number;
  avgOrderValue: number;
  conversionRate: number;
}

export function AnalyticsCards({
  totalSales,
  totalRevenue,
  avgOrderValue,
  conversionRate,
}: AnalyticsCardsProps) {
  const cards = [
    {
      title: "Total Sales",
      value: totalSales.toLocaleString(),
      icon: ShoppingCart,
      change: "+12.5%",
      changeType: "positive" as const,
    },
    {
      title: "Total Revenue",
      value: `₹${(totalRevenue / 100000).toFixed(2)}L`,
      icon: DollarSign,
      change: "+18.2%",
      changeType: "positive" as const,
    },
    {
      title: "Avg. Order Value",
      value: `₹${avgOrderValue.toLocaleString()}`,
      icon: BarChart3,
      change: "+5.4%",
      changeType: "positive" as const,
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      change: "+0.8%",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {card.value}
            </div>
            <p className="text-xs text-success mt-1">
              {card.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
