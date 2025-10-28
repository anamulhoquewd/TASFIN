import { Clock, Package, Truck, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { OrderStatus } from "@/app/track-order/page";

interface StatusTimelineProps {
  currentStatus: OrderStatus;
}

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Order Placed",
    color: "hsl(var(--status-pending))",
  },
  processing: {
    icon: Package,
    label: "Processing",
    color: "hsl(var(--status-processing))",
  },
  shipped: {
    icon: Truck,
    label: "Shipped",
    color: "hsl(var(--status-shipped))",
  },
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "hsl(var(--status-delivered))",
  },
  cancelled: {
    icon: XCircle,
    label: "Cancelled",
    color: "hsl(var(--status-cancelled))",
  },
};

export const StatusTimeline = ({ currentStatus }: StatusTimelineProps) => {
  // Handle cancelled status separately
  if (currentStatus === "cancelled") {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8">
            <div
              className="p-4 rounded-full mb-4"
              style={{ backgroundColor: `hsl(var(--status-cancelled) / 0.1)` }}
            >
              <XCircle
                className="h-12 w-12"
                style={{ color: statusConfig.cancelled.color }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Order Cancelled</h3>
            <p className="text-muted-foreground">
              This order has been cancelled and will not be processed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-muted hidden md:block">
            <div
              className="h-full bg-gradient-to-r from-[hsl(var(--status-processing))] to-[hsl(var(--status-shipped))] transition-all duration-500"
              style={{
                width: `${(currentIndex / (statuses.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Status Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
            {statuses.map((status, index) => {
              const StatusIcon = statusConfig[status].icon;
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={status}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Icon Circle */}
                  <div
                    className={`
                      relative z-10 p-4 rounded-full transition-all duration-300
                      ${
                        isCompleted
                          ? "scale-110 shadow-lg"
                          : "scale-100 bg-muted"
                      }
                      ${isCurrent ? "animate-pulse" : ""}
                    `}
                    style={
                      isCompleted
                        ? {
                            backgroundColor: statusConfig[status].color,
                            boxShadow: `0 8px 24px ${statusConfig[status].color}40`,
                          }
                        : {}
                    }
                  >
                    <StatusIcon
                      className="h-6 w-6"
                      style={
                        isCompleted
                          ? { color: "white" }
                          : { color: "hsl(var(--muted-foreground))" }
                      }
                    />
                  </div>

                  {/* Label */}
                  <div className="mt-3 space-y-1">
                    <p
                      className={`font-semibold transition-colors ${
                        isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {statusConfig[status].label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-muted-foreground">
                        Current Status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
