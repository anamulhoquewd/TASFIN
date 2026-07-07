"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ViewsChartProps {
  data: Array<{ day: string; views: number }>
}

export function ViewsChart({ data }: ViewsChartProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Daily Views</CardTitle>
        <p className="text-sm text-muted-foreground">Product page visits this week</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
              />
              <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} name="Views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
