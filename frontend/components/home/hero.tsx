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

export function Hero({
  slides,
}: {
  slides: { url: string; alt: string; title?: string; description?: string }[];
}) {
  return (
    <div className="h-[300px] md:h-[400px] lg:h-[600px]">
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
            "inline-block h-1.5 md:h-2 rounded-full bg-secondary w-1.5 md:w-2 mx-0.5 md:mx-1 transition-all duration-300",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Image with overlay */}
            <div className="relative w-full h-full">
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="absolute w-full left-1/2 bottom-[20%] -translate-x-1/2 flex items-center justify-center text-center">
              <div className="container mx-auto px-4">
                <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-6 text-balance">
                  {slide?.title}
                </h1>
                <p className="text-sm md:text-xl text-white mb-4 md:mb-8">
                  {slide?.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-base">
                    <Link href="/products">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-base transition-colors duration-300 text-white hover:bg-white/20 bg-white/10"
                  >
                    <Link href="/about">Explore Collection</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <Button
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
        </Button>
      </Swiper>
    </div>
  );
}
