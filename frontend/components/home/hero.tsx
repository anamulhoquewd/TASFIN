"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.css";

export function Hero() {
  // Sample images for the slideshow
  const slides = [
    { id: 2, url: "/slides/banner-1.jpg", alt: "banner" },
    { id: 3, url: "/slides/banner.jpg", alt: "banner" },
    { id: 4, url: "/slides/banner-2.jpg", alt: "banner" },
    { id: 5, url: "/slides/banner-3.jpg", alt: "banner" },
    { id: 6, url: "/slides/banner-4.jpg", alt: "banner" },
  ];

  return (
    <section className="relative max-h-screen overflow-hidden">
      {/* Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative cursor-grab w-full h-full aspect-[2/1] hoverflow-hidden">
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />

              {/* Gradient / Overlay */}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* TEXT BLOCK (Always Visible Now) */}
      <div className="absolute inset-0 flex items-center z-20 pointer-events-none justify-center">
        <div className="font-cormorant text-center text-foreground max-w-2xl pointer-events-auto">
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm text-foreground/70 mb-2 md:mb-4">
            New Collection 2025
          </p>

          <h1 className="hidden md:block text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6">
            Timeless Elegance
          </h1>

          <p className="hidden md:block text-base sm:text-lg text-foreground/70 leading-relaxed mb-10 max-w-md">
            Premium designs crafted for women who appreciate sophistication,
            subtle beauty and modern minimalism.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/shop">
              <Button className="rounded-none h-9 px-4 py-2 md:px-6 md:h-10 cursor-pointer text-xs tracking-[0.2em] uppercase">
                Shop Collection
              </Button>
            </Link>
            <Link href="/make-custom">
              <Button className="rounded-none h-9 px-4 py-2 md:px-6 md:h-10 bg-transparent border border-foreground text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 cursor-pointer text-xs tracking-[0.2em] uppercase">
                Make Custom
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
