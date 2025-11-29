"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { testimonials } from "@/lib/utils";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // Swiped left
      handleNext();
    }
    if (touchEnd - touchStart > 50) {
      // Swiped right
      handlePrevious();
    }
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(getVisibleCount());
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (testimonials.length !== 0) {
    return (
      <section className="font-cormorant container mx-auto px-4 md:px-6 lg:px-8 sm:px-6 py-16 sm:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground mb-8">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="font-cormorant text-center mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground">
          What Our Customers Say
        </h2>
      </div>

      {/* Testimonials Slider */}
      <div className="relative">
        {/* Slider Container */}
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                {/* New UI Card */}
                <div className="bg-background p-6 sm:p-8 border border-border h-full font-cormorant tracking-[0.04em] flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-foreground text-foreground"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* User */}
                  <div className="flex gap-4 items-center border-t border-border pt-4 mt-auto">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={testimonial.avatar.url}
                        alt={testimonial.avatar.alt}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8 md:mt-10">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="bg-transparent hover:bg-transparent cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-2">
            {Array.from({
              length: Math.ceil(testimonials.length / visibleCount),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "bg-foreground w-8"
                    : "bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            className="bg-transparent hover:bg-transparent cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
