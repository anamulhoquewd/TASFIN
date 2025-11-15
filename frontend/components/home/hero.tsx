"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.css";

export function Hero() {
  const featureBoxes = [
    {
      id: 101,
      name: "CURATED COLLECTION",
      value: "100+",
      description: "Designer pieces",
    },
    {
      id: 102,
      name: "QUALITY ASSURED",
      value: "Premium",
      description: "Traditional crafted",
    },
    {
      id: 103,
      name: "FAST DELIVERY",
      value: "3-5 Days",
      description: "Across the country",
    },
    {
      name: " CUSTOMER LOVED",
      value: "4.9★",
      description: "5000+ reviews",
      id: 104,
    },
  ];

  // Sample images for the slideshow
  const slides = [
    { id: 0, url: "/slides/slide (1).webp", alt: "Three" },
    { id: 1, url: "/slides/slide (2).webp", alt: "Four" },
    { id: 2, url: "/slides/slide (3).webp", alt: "Five" },
  ];

  return (
    <div className="max-h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          enabled: true,
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "bg-primary w-4 md:w-8",
          bulletClass:
            "inline-block h-1.5 md:h-2 rounded-full bg-secondary w-1.5 md:w-2 mx-0.5 md:mx-1 transition-all duration-700",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {/* Image with overlay */}
            <div className="relative w-full aspect-[2/1] hoverflow-hidden bg-muted">
              {slide.url ? (
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  // width={1200}
                  // height={600}
                  fill
                  priority={index === 0}
                  className="w-full h-auto object-cover" // Changed from object-cover to object-contain
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-0 lg:translate-y-0 lg:left-20 lg:bottom-10 z-10">
          {/* Content Layout */}
          <div className="flex flex-col gap-6">
            {/* Text Content */}
            <Link href={"/products"} className="flex justify-end">
              <Button
                size="lg"
                className="rounded-full cursor-pointer transition-colors duration-500 border border-primary/60"
              >
                Shop Now →
              </Button>
            </Link>

            {/* Additional Features - Optional */}
            <div className="grid-cols-2 gap-4 hidden lg:grid">
              {featureBoxes.map((box) => (
                <div
                  key={box.id}
                  className="px-6 py-3 rounded-lg bg-primary/15 border border-primary/60"
                >
                  <p className="text-xs font-semibold text-muted mb-2">
                    {box.name}
                  </p>
                  <p className="text-xl font-bold text-white">{box.value}</p>
                  <p className="text-xs text-muted mt-1">{box.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Navigation */}
        {/* <Button
          size="icon"
          className="custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer transition-colors duration-300 text-white hover:bg-white/20 bg-white/10"
          aria-label="Previous slide"
        >
          <ArrowRight className="h-6 w-6 rotate-180" />
        </Button>
        <Button
          size="icon"
          className="custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full cursor-pointer transition-colors duration-300 text-white hover:bg-white/20 bg-white/10"
          aria-label="Next slide"
        >
          <ArrowRight className="h-6 w-6" />
        </Button> */}
      </Swiper>
    </div>
  );
}
