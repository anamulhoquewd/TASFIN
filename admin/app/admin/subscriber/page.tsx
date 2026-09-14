"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Search, Trash2, X } from "lucide-react";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISubscriber } from "@/interfaces/subscribers";
import useSubscriber from "@/hooks/subscribers/useSubscriber";
import type { SubscriberFilters } from "@/hooks/subscribers/useSubscriber";

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function SubscribersPage() {
  const {
    subscribers,
    pagination,
    setPagination,
    search,
    setSearch,
    filters,
    setFilters,
    selectedItem,
    setSelectedItem,
    isLoading,
    handleUpdate,
    handleDelete,
    clearFilters,
  } = useSubscriber();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const hasFilters = Boolean(search || filters.verified !== "all" || filters.isBlocked !== "all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
        <p className="text-muted-foreground">
          Manage {pagination.total} newsletter subscribers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscriber Management</CardTitle>
          <CardDescription>
            Search subscribers and manage their subscription status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search email or source..."
                  className="pl-8"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPagination((current) => ({ ...current, page: 1 }));
                  }}
                />
              </div>
              <FilterSelect
                label="Verified"
                value={filters.verified}
                options={["all", "true", "false"]}
                onChange={(value) => {
                  setFilters((current) => ({ ...current, verified: value as SubscriberFilters["verified"] }));
                  setPagination((current) => ({ ...current, page: 1 }));
                }}
              />
              <FilterSelect
                label="Blocked"
                value={filters.isBlocked}
                options={["all", "true", "false"]}
                onChange={(value) => {
                  setFilters((current) => ({ ...current, isBlocked: value as SubscriberFilters["isBlocked"] }));
                  setPagination((current) => ({ ...current, page: 1 }));
                }}
              />
            </div>
            {hasFilters && (
              <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
                <X /> Clear filters
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Blocked</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[110px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={7} className="py-10 text-center">Loading subscribers...</TableCell></TableRow>
                ) : subscribers.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No subscribers found.</TableCell></TableRow>
                ) : (
                  subscribers.map((subscriber) => (
                    <SubscriberRow
                      key={subscriber._id}
                      subscriber={subscriber}
                      onEdit={() => { setSelectedItem(subscriber); setEditOpen(true); }}
                      onDelete={() => { setSelectedItem(subscriber); setDeleteOpen(true); }}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {subscribers.length > 0 && (
          <CardFooter className="justify-end">
            <Paginations pagination={pagination} setPagination={setPagination} />
          </CardFooter>
        )}
      </Card>

      <EditSubscriberDialog
        subscriber={selectedItem}
        open={editOpen}
        onOpenChange={(open) => { setEditOpen(open); if (!open) setSelectedItem(null); }}
        onSave={handleUpdate}
      />
      <DeleteConfirmation
        open={deleteOpen}
        changeOpen={(open) => { setDeleteOpen(open); if (!open) setSelectedItem(null); }}
        onConfirm={() => { if (selectedItem) handleDelete(selectedItem._id); setDeleteOpen(false); }}
      />
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-32"><SelectValue placeholder={label} /></SelectTrigger>
      <SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option === "all" ? `All ${label}` : option === "true" ? `Yes: ${label}` : `No: ${label}`}</SelectItem>)}</SelectContent>
    </Select>
  );
}

function SubscriberRow({ subscriber, onEdit, onDelete }: { subscriber: ISubscriber; onEdit: () => void; onDelete: () => void }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{subscriber.email}</TableCell>
      <TableCell><Badge variant="outline">{subscriber.source || "website"}</Badge></TableCell>
      <TableCell><Badge variant={subscriber.status === "subscribed" ? "default" : "secondary"}>{subscriber.status}</Badge></TableCell>
      <TableCell>{subscriber.verified ? <Check className="h-4 w-4 text-green-600" /> : "No"}</TableCell>
      <TableCell>{subscriber.isBlocked ? <Badge variant="destructive">Blocked</Badge> : "No"}</TableCell>
      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{formatDate(subscriber.createdAt)}</TableCell>
      <TableCell><div className="flex justify-end gap-1"><Button type="button" variant="ghost" size="icon" onClick={onEdit} aria-label="Edit subscriber"><Pencil /></Button><Button type="button" variant="ghost" size="icon" onClick={onDelete} aria-label="Delete subscriber"><Trash2 /></Button></div></TableCell>
    </TableRow>
  );
}

function EditSubscriberDialog({ subscriber, open, onOpenChange, onSave }: { subscriber: ISubscriber | null; open: boolean; onOpenChange: (open: boolean) => void; onSave: (data: Partial<ISubscriber>) => Promise<void> }) {
  const [status, setStatus] = useState<ISubscriber["status"]>("subscribed");
  const [verified, setVerified] = useState("false");
  const [isBlocked, setIsBlocked] = useState("false");

  useEffect(() => {
    if (subscriber) {
      setStatus(subscriber.status);
      setVerified(String(subscriber.verified));
      setIsBlocked(String(subscriber.isBlocked));
    }
  }, [subscriber]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit subscriber</DialogTitle><DialogDescription>{subscriber?.email}</DialogDescription></DialogHeader>
        <div className="space-y-4">
          <FilterSelect label="Status" value={status} options={["subscribed", "unsubscribed"]} onChange={(value) => setStatus(value as ISubscriber["status"])} />
          <FilterSelect label="Verified" value={verified} options={["true", "false"]} onChange={setVerified} />
          <FilterSelect label="Blocked" value={isBlocked} options={["true", "false"]} onChange={setIsBlocked} />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="button" onClick={() => onSave({ status, verified: verified === "true", isBlocked: isBlocked === "true" })}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
