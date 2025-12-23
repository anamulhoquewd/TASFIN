"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IImage } from "@/interfaces/global";
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  images: IImage[];
}

export function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Product Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={images[selectedImage]?.url || "/placeholder.svg"}
              alt={"Product image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={image.publicId || index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md bg-secondary transition-all ${
                  selectedImage === index
                    ? "ring-2 ring-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
