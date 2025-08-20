"use client";

import { CategoryForm } from "../_components/form";

export default function CreateCategoryPage() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
      <CategoryForm />
    </div>
  );
}
