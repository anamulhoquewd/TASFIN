import api from "@/axios/interceptor";
import { useEffect, useState } from "react";
import { FormProps } from "../helper";
import { VariantSelect } from "./variant";
import ImageEditor from "./images";
import type { IProduct } from "@/interfaces/products";

export default function VariantImagesForm({ product, onClose }: FormProps) {
  const [id, setId] = useState("");
  const [currentProduct, setCurrentProduct] = useState<IProduct>(product);

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      try {
        const response = await api.get(`/products/${product._id}`);
        if (active && response.data.success) {
          setCurrentProduct(response.data.data);
        }
      } catch {
        // Keep the product already supplied by the parent as a fallback.
      }
    };

    loadProduct();
    return () => {
      active = false;
    };
  }, [product._id]);

  const variant = currentProduct.variants.find((item) => item._id === id);
  return (
    <div className="space-y-4">
      <VariantSelect
        variants={currentProduct.variants}
        value={id}
        onChange={setId}
      />
      {variant ? (
        <ImageEditor
          key={id}
          product={currentProduct}
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
