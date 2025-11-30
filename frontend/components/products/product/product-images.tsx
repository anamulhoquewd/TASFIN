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
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductImageGalleryProps {
  images: IImage[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="flex p-4 text-center h-full items-center text-muted-foreground justify-center">
        Oops! Product image missing right now
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      {/* MAIN IMAGE SWIPER */}
      <Swiper
        modules={[Pagination, Thumbs]}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        loop={true}
        onSwiper={setMainSwiper}
        className="w-full bg-muted rounded-lg overflow-hidden aspect-[3/4]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => {
                // Main image click → slide next
                if (mainSwiper) mainSwiper.slideNext();
              }}
            >
              {image?.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex p-4 text-center h-full items-center text-muted-foreground justify-center">
                  Oops! Product image missing right now
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAIL SWIPER */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={3}
          spaceBetween={6}
          breakpoints={{
            640: { slidesPerView: 5 },
          }}
          loop={true}
          className="thumbs-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative cursor-pointer w-20 h-20 rounded-lg overflow-hidden">
                {image.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt || `${title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Oops!
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
