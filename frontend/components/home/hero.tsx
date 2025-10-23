"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function Hero({
  slides,
}: {
  slides: { url: string; alt: string; title?: string; description?: string }[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeRef = useRef<NodeJS.Timeout | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto slideshow
  useEffect(() => {
    if (!isManual) {
      startAutoSlide();
    }

    return () => {
      stopAutoSlide();
      clearResumeTimeout();
    };
  }, [isManual]);

  const startAutoSlide = () => {
    stopAutoSlide(); // ensure no duplicate intervals
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const clearResumeTimeout = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
  };

  const handleManualAction = (action: () => void) => {
    stopAutoSlide();
    clearResumeTimeout();
    setIsManual(true);
    action();
    resumeRef.current = setTimeout(() => {
      setIsManual(false);
    }, 1000); // 1s পর আবার auto slide শুরু হবে
  };

  const nextSlide = () =>
    handleManualAction(() =>
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    );

  const prevSlide = () =>
    handleManualAction(() =>
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    );

  // Touch events (swipe detection)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      // swipe distance threshold
      if (diff > 0) nextSlide(); // swipe left → next
      else prevSlide(); // swipe right → previous
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <Image
              src={slide.url}
              alt={slide.alt}
              width={1000}
              height={1000}
              className="object-cover h-full md:h-full w-full"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="absolute w-full left-1/2 bottom-[20%] -translate-x-1/2  flex items-center justify-center text-center">
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
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        size="icon"
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-colors duration-300 text-white hover:bg-white/20 bg-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-colors duration-300 text-white hover:bg-white/20 bg-white/10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-2 md:bottom-6 left-0 right-0 flex justify-center gap-1 md:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualAction(() => setCurrentSlide(index))}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-4 md:w-8 bg-primary"
                : "w-1.5 md:w-2 bg-secondary"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
