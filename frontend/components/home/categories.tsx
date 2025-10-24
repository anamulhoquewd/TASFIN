"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  title: string;
  image: string;
  slug: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
}

// Mock data for demonstration
const defaultCategories: Category[] = [
  {
    id: "1",
    title: "Kurti, Tunic & Tops",
    image: "/67dc35b5a0fc5-square.png",
    slug: "kurti-tunic-tops",
  },
  {
    id: "2",
    title: "Frock",
    image: "/67b459aeb0f13-square.jpg",
    slug: "frock",
  },
  {
    id: "3",
    title: "I-shirts and Shorts",
    image: "/67c4ecd090deb-square.jpg",
    slug: "tshirts-shorts",
  },
  {
    id: "4",
    title: "Panjabi",
    image: "/67dc35b5a0fc5-square.png",
    slug: "panjabi",
  },
];

export function CategoriesSection({
  categories = defaultCategories,
}: CategoriesSectionProps) {
  return (
    <section className="w-full bg-background py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-playfair">
            Shop by Category
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Explore our curated collection of elegant women's fashion
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <div className="group relative overflow-hidden rounded-lg bg-card cursor-pointer h-64 md:h-72 lg:h-80">
                {/* Category Image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-4 md:p-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white text-balance">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
