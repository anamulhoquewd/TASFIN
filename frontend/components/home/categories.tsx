"use client";

import { ICategory } from "@/interfaces/categories";
import { Squirrel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CategoriesSectionProps {
  categories: ICategory[];
}

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore our categories
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Explore our curated collection of elegant women&apos;s fashion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/products?categories=${category._id}`}
              >
                <div className="group relative overflow-hidden rounded-lg bg-card cursor-pointer aspect-[3/4]">
                  {category.image ? (
                    <Image
                      src={category.image?.url}
                      alt={category.image?.alt || category.name}
                      fill
                      className="object-cover w-full h-auto group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 flex items-end justify-start p-4 md:p-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white text-balance">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Squirrel className="w-28 h-28" />

              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                There are no categories right now.
              </h3>
              <p className="text-sm md:text-base text-muted-foreground text-center max-w-sm">
                Sorry, we couldn&apos;d any categories here. Try coming back
                later or explore our products.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
