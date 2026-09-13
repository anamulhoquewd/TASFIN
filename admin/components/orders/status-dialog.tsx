"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Archive,
  CheckCircle2,
  Clock,
  PackageCheck,
  RefreshCw,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * STATE MACHINE — allowed transitions only.
 * Prevents illegal jumps like delivered -> pending, or cancelling
 * something that's already shipped.
 */
const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  pending: ["confirmed", "processing", "cancelled"],
  confirmed: ["processing", "shipped", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"], // "returned" here = delivery refused/failed, not post-delivery return
  delivered: ["returned"], // post-delivery return/exchange window
  cancelled: [], // terminal
  returned: [], // terminal
  archived: [], // terminal; retained for audit, hidden only by an archive filter
};

/**
 * SINGLE SOURCE OF TRUTH — icon, color, label per status.
 * Both getStatusIcon/getStatusBadge and the dropdown read from here,
 * so they can never drift out of sync again.
 */
type StatusConfig = {
  label: string;
  icon: React.ElementType;
  colorClass: string; // text color for icon
  badgeClass: string; // bg/text/border for badge
  badgeVariant?: "default" | "outline" | "destructive";
};

const STATUS_CONFIG: Record<string, StatusConfig> = {
  pending: {
    label: "Pending",
    icon: Clock,
    colorClass: "text-orange-500",
    badgeVariant: "outline",
    badgeClass: "text-orange-500 border-orange-500",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    colorClass: "text-blue-500",
    badgeVariant: "outline",
    badgeClass: "text-blue-500 border-blue-500",
  },
  processing: {
    label: "Processing",
    icon: RefreshCw,
    colorClass: "text-yellow-500",
    badgeVariant: "outline",
    badgeClass: "text-yellow-500 border-yellow-500",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    colorClass: "text-blue-500",
    badgeVariant: "default",
    badgeClass: "bg-blue-500",
  },
  delivered: {
    label: "Delivered",
    icon: PackageCheck,
    colorClass: "text-green-500",
    badgeVariant: "default",
    badgeClass: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    colorClass: "text-red-500",
    badgeVariant: "destructive",
    badgeClass: "",
  },
  returned: {
    label: "Returned",
    icon: RotateCcw,
    colorClass: "text-red-500",
    badgeVariant: "outline",
    badgeClass: "text-red-500 border-red-500",
  },
  archived: {
    label: "Archived",
    icon: Archive,
    colorClass: "text-gray-500",
    badgeVariant: "outline",
    badgeClass: "text-gray-500 border-gray-500",
  },
};

export const getStatusIcon = (status: string) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  const Icon = config.icon;
  return <Icon className={`h-4 w-4 ${config.colorClass}`} />;
};

export const getStatusBadge = (status: string) => {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  return (
    <Badge variant={config.badgeVariant} className={config.badgeClass}>
      {config.label}
    </Badge>
  );
};

export const getPaymentStatusBadge = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "paid":
      return (
        <Badge variant="default" className="bg-green-500">
          Paid
        </Badge>
      );
    case "unpaid":
      return (
        <Badge variant="outline" className="text-orange-500 border-orange-500">
          Unpaid
        </Badge>
      );
    case "refunded":
      return (
        <Badge variant="outline" className="text-orange-500 border-orange-500">
          Refunded
        </Badge>
      );
    default:
      return null;
  }
};

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: { _id: string; status: string; paymentStatus: string };
  onUpdate: (data: any) => void;
}

export default function StatusDialog({
  open,
  onOpenChange,
  order,
  onUpdate,
}: StatusDialogProps) {
  const [status, setStatus] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentStatus = order?.status || "";
  // Only statuses reachable from the current one, per the state machine.
  // If current status is terminal (or unknown), this is empty.
  const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus] || [];
  const isTerminal = allowedNextStatuses.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      onUpdate({
        status,
        paymentStatus,
        note
      });
      onOpenChange(false);
      setNote("");
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStatus(order?.status || "");
    setPaymentStatus(order.paymentStatus || "");
  }, [order]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Update the status and payment status for order {order?._id}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-status">Current Status</Label>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                {getStatusIcon(currentStatus)}
                {getStatusBadge(currentStatus)}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-payment">Current Payment Status</Label>
              <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50 uppercase">
                {getPaymentStatusBadge(order?.paymentStatus)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1">
              <Label htmlFor="status">New Order Status</Label>
              <Select
                value={status}
                onValueChange={setStatus}
                disabled={isTerminal}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      isTerminal
                        ? "No further transitions allowed"
                        : "Select order status"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {/* Current status stays selectable so the user can re-submit
                      without changing it (e.g. to just update notes) */}
                  {currentStatus && (
                    <SelectItem value={currentStatus}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(currentStatus)}
                        {STATUS_CONFIG[currentStatus]?.label || currentStatus}
                        <span className="text-xs text-muted-foreground">
                          (current)
                        </span>
                      </div>
                    </SelectItem>
                  )}
                  {allowedNextStatuses.map((nextStatus) => {
                    const config = STATUS_CONFIG[nextStatus];
                    if (!config) return null;
                    const Icon = config.icon;
                    return (
                      <SelectItem key={nextStatus} value={nextStatus}>
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${config.colorClass}`} />
                          {config.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {isTerminal && (
                <p className="text-xs text-muted-foreground">
                  This order is in a terminal state and cannot be moved to
                  another status.
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-1">
              <Label htmlFor="payment-status">Payment Status</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Update Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this status update..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isTerminal}
              className="cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
