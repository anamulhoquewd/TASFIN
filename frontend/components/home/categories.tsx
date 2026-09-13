"use client";

import useCategory from "@/hooks/categories/useCategory";
import { ICategory } from "@/interfaces/categories";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CategoriesSection() {
  const { categories } = useCategory();

  return (
    <section className="py-12 md:py-16 lg:py-20 container mx-auto px-4">
      <div className="text-center mb-12 font-cormorant">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Browse
        </p>
        <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-foreground">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: ICategory }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/shop?category=${category._id}`}
      className="group relative aspect-[3/4] overflow-hidden bg-muted"
    >
      (
      <Image
        src={
          imgError || !category?.image?.url
            ? "/product-placeholder.png"
            : category?.image?.url
        }
        alt={category?.image?.alt || category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        onError={() => setImgError(true)}
      />
      )
      <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-lg sm:text-xl tracking-[0.2em] uppercase text-background font-light text-center px-2">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
