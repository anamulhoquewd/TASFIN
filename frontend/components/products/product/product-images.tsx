"use client";

import { useState } from "react";
import Image from "next/image";
import type { IImage } from "@/interfaces/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./product-images.css";

interface ProductImageGalleryProps {
  images: IImage[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center aspect-square">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Swiper */}
      <Swiper
        modules={[Pagination, Thumbs]}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        loop={true}
        className="w-full bg-muted rounded-lg overflow-hidden aspect-square"
      >
        {images.map((image) => (
          <SwiperSlide key={image.url}>
            <div className="relative w-full h-full cursor-pointer">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || title}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={3}
          spaceBetween={4}
          loop={true}
          className="thumbs-swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image.url}>
              <div className="relative cursor-pointer w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || `${title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
