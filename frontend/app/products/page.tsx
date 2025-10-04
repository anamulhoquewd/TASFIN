"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "Elegant Rose 2-Piece Set",
    category: "2-piece",
    price: 2500,
    image: "/product-2-piece-rose.jpg",
    colors: ["Rose", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
  },
  {
    id: 2,
    name: "Classic Navy 3-Piece Suit",
    category: "3-piece",
    price: 3200,
    image: "/product-3-piece-navy.jpg",
    colors: ["Navy", "Black"],
    sizes: ["M", "L", "XL"],
    inStock: true,
    isNew: false,
  },
  {
    id: 3,
    name: "Floral Print Top",
    category: "tops",
    price: 1200,
    image: "/product-top-floral.jpg",
    colors: ["Pink", "White", "Blue"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isNew: true,
  },
  {
    id: 4,
    name: "Traditional Salwar Kameez",
    category: "salwar",
    price: 2800,
    image: "/product-salwar-traditional.jpg",
    colors: ["Red", "Green", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: false,
  },
  {
    id: 5,
    name: "Silk Night Dress",
    category: "night-dresses",
    price: 1800,
    image: "/product-night-dress-silk.jpg",
    colors: ["Lavender", "Peach"],
    sizes: ["S", "M", "L"],
    inStock: false,
    isNew: false,
  },
  {
    id: 6,
    name: "Cotton Casual T-Shirt",
    category: "t-shirts",
    price: 800,
    image: "/product-tshirt-cotton.jpg",
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    name: "Embroidered 2-Piece",
    category: "2-piece",
    price: 2900,
    image: "/product-2-piece-embroidered.jpg",
    colors: ["Cream", "Gold"],
    sizes: ["M", "L", "XL"],
    inStock: true,
    isNew: false,
  },
  {
    id: 8,
    name: "Designer 3-Piece Collection",
    category: "3-piece",
    price: 3500,
    image: "/product-3-piece-designer.jpg",
    colors: ["Maroon", "Black"],
    sizes: ["S", "M", "L"],
    inStock: true,
    isNew: true,
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<number[]>([0, 4000])
  const [sortBy, setSortBy] = useState<string>("featured")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: "all", label: "All Products" },
    { value: "2-piece", label: "2-Piece" },
    { value: "3-piece", label: "3-Piece" },
    { value: "tops", label: "Tops" },
    { value: "salwar", label: "Salwar" },
    { value: "night-dresses", label: "Night Dresses" },
    { value: "t-shirts", label: "T-Shirts" },
  ]

  // Filter products
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of elegant women's fashion</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="w-full lg:hidden mb-4 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    min={0}
                    max={4000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 4000])
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Sort & Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">New</Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">{product.category.replace("-", " ")}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-foreground">৳{product.price.toLocaleString()}</p>
                          <div className="flex gap-1">
                            {product.colors.slice(0, 3).map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: color.toLowerCase() }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 4000])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
