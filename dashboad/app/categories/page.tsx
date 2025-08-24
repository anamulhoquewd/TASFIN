"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

// Dummy product data for frontend demonstration
const initialCategories = [
  {
    id: "1",
    name: "Acme Circles T-Shirt",
    slug: "acme-circles-t-shirt",
  },
  {
    id: "2",
    name: "Acme Drawstring Bag",
    slug: "acme-drawstring-bag",
  },
  {
    id: "3",
    name: "Acme Cup",
    slug: "acme-cup",
  },
  {
    id: "4",
    name: "Acme Hoodie",
    slug: "acme-hoodie",
  },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/dashboard/categories/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </Link>
      </div>

      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                className="border-gray-800 hover:bg-gray-900"
              >
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/categories/${category.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-400"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
