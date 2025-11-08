"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  message: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

// Mock data for demonstration
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    image: "/tasfin-logo-text-black-bg-white.png",
    message:
      "Amazing quality and fantastic customer service! The products exceeded my expectations. I've already recommended this store to all my friends.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Style Blogger",
    image: "/woman-avatar-2.png",
    message:
      "The collection is absolutely stunning! Every piece is carefully designed and the fit is perfect. Best shopping experience ever!",
    rating: 5,
  },
  {
    id: "3",
    name: "Ananya Patel",
    role: "Professional",
    image: "/woman-avatar-3.png",
    message:
      "I love the variety and quality of products. The delivery was quick and the packaging was excellent. Highly recommended!",
    rating: 5,
  },
  {
    id: "4",
    name: "Neha Gupta",
    role: "Student",
    image: "/woman-avatar-4.jpg",
    message:
      "Great prices and amazing designs! The website is easy to navigate and the checkout process is smooth. Will definitely shop again!",
    rating: 5,
  },
  {
    id: "5",
    name: "Meera Singh",
    role: "Homemaker",
    image: "/woman-avatar-5.jpg",
    message:
      "Excellent quality and beautiful designs. The customer support team was very helpful. I'm very satisfied with my purchase!",
    rating: 5,
  },
];

export function TestimonialsSection({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
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

  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of happy customers
          </p>
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
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-3 lg:px-4"
                >
                  {/* Testimonial Card */}
                  <div className="bg-card rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        )
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 flex-grow">
                      "{testimonial.message}"
                    </p>

                    {/* User Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-semibold text-foreground text-sm md:text-base">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {testimonial?.role}
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
              size="icon"
              onClick={handlePrevious}
              className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-transparent cursor-pointer"
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
              size="icon"
              onClick={handleNext}
              className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-transparent cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
