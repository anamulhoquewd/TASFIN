"use client";

import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
import TestimonialForm from "@/components/testimonials/testimonial-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadAvatar } from "@/components/upload-avatar";
import useTestimonials from "@/hooks/testimonials/useTestimonial";
import { ITestimonial } from "@/interfaces/testimonials";
import { ImageIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function TestimonialsPage() {
  const {
    testimonials,
    pagination,
    setPagination,
    search,
    setSearch,
    selectedItem,
    setSelectedItem,
    isLoading,
    handleUpdate,
    handleSubmit,
    handleDelete,
    form,
    uploadHandler,
    isAvatarOpen,
    setIsAvatarOpen,
    error,
    setError,
  } = useTestimonials();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const closeForm = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setSelectedItem(null);
      form.reset({
        name: "",
        location: "",
        message: "",
        rating: 0,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage {pagination.total} testimonial messages.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedItem(null);
            form.reset();
            setFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Testimonials Management</CardTitle>
          <CardDescription>
            Search and manage customer testimonials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search name or location..."
              className="pl-8"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPagination((current) => ({ ...current, page: 1 }));
              }}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[110px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center">
                      Loading testimonials...
                    </TableCell>
                  </TableRow>
                ) : testimonials.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No testimonials found.
                    </TableCell>
                  </TableRow>
                ) : (
                  testimonials.map((testimonial) => (
                    <TestimonialRow
                      key={testimonial._id}
                      testimonial={testimonial}
                      onAvatar={() => {
                        setSelectedItem(testimonial);
                        setIsAvatarOpen(true);
                      }}
                      onEdit={() => {
                        setSelectedItem(testimonial);
                        form.reset({
                          name: testimonial.name,
                          location: testimonial.location,
                          message: testimonial.message,
                          rating: testimonial.rating,
                        });
                        setFormOpen(true);
                      }}
                      onDelete={() => {
                        setSelectedItem(testimonial);
                        setDeleteOpen(true);
                      }}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {testimonials.length > 0 && (
          <CardFooter className="justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>
      <TestimonialForm
        form={form}
        open={formOpen}
        changeOpen={closeForm}
        isLoading={isLoading}
        isEditing={Boolean(selectedItem)}
        onSubmit={async (data) => {
          if (selectedItem) {
            await handleUpdate(data);
            closeForm(false);
          } else if (await handleSubmit(data)) closeForm(false);
        }}
      />
      <UploadAvatar
        collection={{
          name: selectedItem?.name ?? "Testimonial",
          avatar: selectedItem?.avatar?.url ?? "",
        }}
        error={error}
        setError={setError}
        uploadHandler={uploadHandler}
        isAvatarOpen={isAvatarOpen}
        setIsAvatarOpen={setIsAvatarOpen}
      />
      <DeleteConfirmation
        open={deleteOpen}
        changeOpen={(open) => {
          setDeleteOpen(open);
          if (!open) setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) handleDelete(selectedItem._id);
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}

function TestimonialRow({
  testimonial,
  onAvatar,
  onEdit,
  onDelete,
}: {
  testimonial: ITestimonial;
  onAvatar: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage
            src={testimonial.avatar?.url}
            className="object-cover"
            alt={testimonial.avatar?.alt || testimonial.name}
          />
          <AvatarFallback>TF</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{testimonial.name}</TableCell>
      <TableCell>{testimonial.location}</TableCell>
      <TableCell className="max-w-[280px] whitespace-normal break-words">
        {testimonial.message}
      </TableCell>
      <TableCell>
        <Badge>{testimonial.rating}</Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDate(testimonial.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onAvatar}
            aria-label="Change avatar"
          >
            <ImageIcon className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            aria-label="Edit testimonial"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="Delete testimonial"
          >
            <Trash2 />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
