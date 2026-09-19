"use client";

import { KidsCreateForm } from "@/components/kids/kids-create-form";
import useKidsProducts from "@/hooks/kids-products/useKidsProducts";
import { KidsInput } from "@/lib/schemas";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NewKidsProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { form, onSubmit } = useKidsProducts();

  const handleSubmit = async (data: KidsInput) => {
    setIsLoading(true);
    try {
      const result = await onSubmit(data);
      if (result) router.push("/admin/kids");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Kids Product</h1>
          <p className="text-muted-foreground">Create a complete kids product listing.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/kids")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Kids Products
          </Button>
          <Button type="button" disabled={isLoading} onClick={form.handleSubmit(handleSubmit)}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <KidsCreateForm form={form} onSubmit={handleSubmit} />
    </div>
  );
}
