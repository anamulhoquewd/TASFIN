"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { Spinner } from "../ui/spinner";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Orders",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Orders",

      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Delivered Orders",

      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Cancelled Orders",

      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Total Spend",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">
                {stat.value}
              </div> */}
              <p className="text-sm flex gap-2 items-center">
                <span>Comming soon</span> <Spinner />
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
