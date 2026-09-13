"use client";

import {
  ListIcon as Category,
  Copy,
  ImageIcon,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import NewCategory from "@/components/categorise/new-category";
import UpdateDialog from "@/components/categorise/update";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import Paginations from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UploadAvatar } from "@/components/upload-avatar";
import useCategory from "@/hooks/categorise/useCategory";
import { copyToClipboard } from "@/lib/utils";

export default function Categories() {
  const {
    pagination,
    setPagination,
    setSearch,
    search,
    categories,
    selectedItem,
    setSelectedItem,
    deleteDialogOpen,
    setDeleteDialogOpen,
    setUpdateDialogOpen,
    updateDialogOpen,
    handleDelete,
    newDialogOpen,
    setNewDialogOpen,
    handleSubmit,
    handleUpdate,
    form,
    isLoading,
    error,
    setError,
    uploadHandler,
    isAvatarOpen,
    setIsAvatarOpen,
    handleNameChange,
  } = useCategory();

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage your categories.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setNewDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories Management</CardTitle>
          <CardDescription>
            You have {pagination.total} categories in your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[180px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No categories found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Avatar>
                            <AvatarImage
                              src={category?.image?.url as string}
                              alt={category?.image?.alt || category?.name}
                              // className="object-cover"
                            />
                            <AvatarFallback>CI</AvatarFallback>
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-muted rounded text-xs font-mono truncate max-w-[180px]">
                          {category._id}
                        </code>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => copyToClipboard(category._id)}
                              >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Category ID</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Category ID</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="max-w-[200px] whitespace-normal break-words">
                        {category?.name}
                      </TableCell>
                      <TableCell className="max-w-[200px] whitespace-normal break-words">
                        {category?.slug}
                      </TableCell>
                      <TableCell className="max-w-[200px] whitespace-normal break-words">
                        {category?.description || "No description available"}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setIsAvatarOpen(true);
                              setSelectedItem(category);
                            }}
                          >
                            <ImageIcon className="h-3.5 w-3.5" />
                            <span className="sr-only">Edit General</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 cursor-pointer"
                              >
                                <MoreHorizontal className="h-3.5 w-3.5" />
                                <span className="sr-only">More Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedItem(category);
                                  setUpdateDialogOpen(true);
                                }}
                              >
                                <Category className="mr-2 h-4 w-4" />
                                Update Category
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedItem(category);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {categories.length !== 0 && (
          <CardFooter className="flex items-center justify-end">
            <Paginations
              pagination={pagination}
              setPagination={setPagination}
            />
          </CardFooter>
        )}
      </Card>

      <NewCategory
        open={newDialogOpen}
        changeOpen={setNewDialogOpen}
        onSubmit={handleSubmit}
        form={form}
        isLoading={isLoading}
        handleNameChange={handleNameChange}
      />

      <UploadAvatar
        collection={{
          name: selectedItem?.name ?? "Somthing new",
          avatar: selectedItem?.image?.url ?? "",
        }}
        setSelectedItem={setSelectedItem}
        error={error}
        setError={setError}
        uploadHandler={uploadHandler}
        isAvatarOpen={isAvatarOpen}
        setIsAvatarOpen={setIsAvatarOpen}
      />

      {/* Dialogs for updating different parts of the category */}
      {selectedItem && (
        <>
          <UpdateDialog
            form={form}
            onSubmit={handleUpdate}
            open={updateDialogOpen}
            changeOpen={setUpdateDialogOpen}
            isLoading={isLoading}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          <DeleteConfirmation
            onConfirm={() => onDelete(selectedItem._id)}
            open={deleteDialogOpen}
            changeOpen={setDeleteDialogOpen}
          />
        </>
      )}
    </div>
  );
}
