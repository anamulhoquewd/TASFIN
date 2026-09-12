"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/interfaces/orders";
import { format } from "date-fns";
import { getStatusBadge, getStatusIcon } from "./status-dialog";

export interface ShowHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: IOrder;
}

export default function ShowHistory({
  open,
  onOpenChange,
  order,
}: ShowHistoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>View Items</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            we can write somthing.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md">
          <ScrollArea className="w-full h-80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.statusHistory?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No status history in this order
                    </TableCell>
                  </TableRow>
                ) : (
                  order?.statusHistory?.map((status) => (
                    <TableRow key={new Date(status.at).toLocaleString()}>
                      {/* <TableCell>{status.status}</TableCell> */}
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status.status)}
                        {getStatusBadge(status.status)}
                      </div>
                      <TableCell className="max-w-[200px] whitespace-normal break-words">
                        {format(new Date(status.at), "MMM dd, yyyy")}
                      </TableCell>

                      <TableCell className="text-center font-medium">
                        {status.note ? status.note : "_"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
