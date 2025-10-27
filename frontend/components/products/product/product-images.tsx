"use client";

import { useState } from "react";
import Image from "next/image";
import type { IImage } from "@/interfaces/products";
import { ProductImageZoomModal } from "./image-zoom";

interface ProductImageGalleryProps {
  images: IImage[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center aspect-square">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const currentImage = images[selectedImageIndex];

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative w-full bg-muted rounded-lg overflow-hidden aspect-square cursor-zoom-in hover:opacity-90 transition-opacity"
          onClick={() => setIsZoomOpen(true)}
        >
          <Image
            src={currentImage.url || "/placeholder.svg"}
            alt={currentImage.alt || title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
            <span className="text-white text-sm font-medium">
              Click to zoom
            </span>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative cursor-pointer w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors duration-300 ${
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || `${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <ProductImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        imageUrl={currentImage.url}
        imageAlt={currentImage.alt || title}
      />
    </>
  );
}
