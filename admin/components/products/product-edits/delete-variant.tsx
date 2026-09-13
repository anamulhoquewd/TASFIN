import api from "@/axios/interceptor";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FormProps, reportError, toKeyValues } from "../helper";
import { VariantSelect } from "./variant";

export default function DeleteVariantForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = product.variants.find((variant) => variant._id === id);
  const remove = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const response = await api.patch(`/products/${product._id}/v/${id}`);
      if (!response.data.success) throw new Error(response.data.error?.message);
      toast.success("Variant deleted successfully");
      onClose();
    } catch (error) {
      reportError(error, "Could not delete variant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          This permanently removes the selected SKU and its images.
        </AlertDescription>
      </Alert>
      <VariantSelect variants={product.variants} value={id} onChange={setId} />
      {selected && (
        <Card>
          <CardContent className="space-y-2 pt-6">
            <p>
              <strong>SKU:</strong> {selected.sku}
            </p>
            <p>
              <strong>Attributes:</strong>{" "}
              {toKeyValues(selected.attributes)
                .map(({ key, value }) => `${key}: ${value}`)
                .join(", ") || "None"}
            </p>
            <p>
              <strong>Images:</strong> {selected.images?.length ?? 0}
            </p>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={!selected || loading}
            >
              {loading ? "Deleting..." : "Delete variant"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this variant?</AlertDialogTitle>
              <AlertDialogDescription>
                {selected
                  ? `SKU ${selected.sku} and all of its images will be permanently removed.`
                  : ""}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive" onClick={remove}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}
