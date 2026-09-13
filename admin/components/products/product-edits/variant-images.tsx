import { useState } from "react";
import { FormProps } from "../helper";
import { VariantSelect } from "./variant";
import ImageEditor from "./images";

export default function VariantImagesForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const variant = product.variants.find((item) => item._id === id);
  return (
    <div className="space-y-4">
      <VariantSelect variants={product.variants} value={id} onChange={setId} />
      {variant ? (
        <ImageEditor
          key={id}
          product={product}
          variant={variant}
          onClose={onClose}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Choose a variant to manage its images.
        </p>
      )}
    </div>
  );
}
