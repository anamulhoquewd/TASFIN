"use client";

import type React from "react";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Minus,
  Plus,
  Star,
  ZoomIn,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const reviewsData: Record<string, any[]> = {
  "1": [
    {
      id: 1,
      author: "Fatima Rahman",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love this 2-piece set! The fabric quality is excellent and the fit is perfect. Highly recommend!",
      verified: true,
    },
    {
      id: 2,
      author: "Nusrat Jahan",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Beautiful design and very comfortable. Got so many compliments wearing this!",
      verified: true,
    },
    {
      id: 3,
      author: "Ayesha Khan",
      rating: 4,
      date: "2024-01-05",
      comment:
        "Great quality but I wish there were more color options. Overall very satisfied with my purchase.",
      verified: true,
    },
    {
      id: 4,
      author: "Sadia Ahmed",
      rating: 5,
      date: "2023-12-28",
      comment:
        "Perfect for both casual and formal occasions. The stitching is impeccable!",
      verified: true,
    },
  ],
};

// Mock product data with variants
const productData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Elegant Rose 2-Piece Set",
    category: "2-piece",
    description:
      "Experience elegance with our premium 2-piece set. Crafted from high-quality fabric with intricate detailing, this outfit is perfect for any occasion. The comfortable fit and beautiful design make it a must-have in your wardrobe.",
    specifications: {
      Material: "Premium Cotton Blend (70% Cotton, 30% Polyester)",
      Pattern: "Solid with Embroidered Details",
      Sleeve: "Full Sleeve",
      Neckline: "Round Neck",
      Fit: "Regular Fit",
      Occasion: "Casual, Formal, Party",
      Care: "Machine wash cold, Do not bleach, Tumble dry low",
      Origin: "Made in Bangladesh",
    },
    features: [
      "Premium quality fabric",
      "Comfortable and breathable",
      "Easy to maintain",
      "Perfect for all occasions",
      "Available in multiple colors",
    ],
    images: [
      "/product-2-piece-rose.jpg",
      "/product-2-piece-rose-alt1.jpg",
      "/product-2-piece-rose-alt2.jpg",
    ],
    variants: [
      { color: "Rose", size: "S", price: 2500, stock: 5 },
      { color: "Rose", size: "M", price: 2500, stock: 8 },
      { color: "Rose", size: "L", price: 2500, stock: 3 },
      { color: "Rose", size: "XL", price: 2500, stock: 0 },
      { color: "Cream", size: "S", price: 2500, stock: 4 },
      { color: "Cream", size: "M", price: 2500, stock: 6 },
      { color: "Cream", size: "L", price: 2500, stock: 7 },
      { color: "Cream", size: "XL", price: 2500, stock: 2 },
    ],
    relatedProducts: [2, 7, 3],
    averageRating: 4.8,
    totalReviews: 24,
  },
};

// Mock related product data
const relatedProductsData: Record<number, any> = {
  2: {
    id: 2,
    name: "Classic Blue Shirt",
    price: 1500,
    image: "/product-shirt-blue.jpg",
  },
  7: {
    id: 7,
    name: "Stylish Black Pants",
    price: 2000,
    image: "/product-pants-black.jpg",
  },
  3: {
    id: 3,
    name: "Modern White Dress",
    price: 3000,
    image: "/product-dress-white.jpg",
  },
};

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const product = productData[params.id as string];
  const reviews = reviewsData[params.id as string] || [];
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    product?.variants[0]?.color || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.variants[0]?.size || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  // Declare variables
  const currentVariant = product?.variants.find(
    (variant) =>
      variant.color === selectedColor && variant.size === selectedSize
  );
  const isInStock = currentVariant ? currentVariant.stock > 0 : false;
  const availableColors = Array.from(
    new Set(product?.variants.map((variant) => variant.color))
  );
  const availableSizes = Array.from(
    new Set(product?.variants.map((variant) => variant.size))
  );
  const maxQuantity = currentVariant ? currentVariant.stock : 0;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  const handleAddToCart = () => {
    if (currentVariant && isInStock) {
      addItem({
        id: product.id,
        name: product.name,
        price: currentVariant.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        maxStock: currentVariant.stock,
      });
      alert(`Added ${quantity} item(s) to cart!`);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your review! It will be published after verification."
    );
    setReviewForm({ name: "", rating: 5, comment: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border group cursor-zoom-in"
                aria-label="Click to zoom image"
              >
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} - Zoomed view ${selectedImage + 1}`}
                className="w-full h-auto"
              />
            </DialogContent>
          </Dialog>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                  selectedImage === index
                    ? "border-primary"
                    : "border-border hover:border-muted-foreground"
                )}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-3">
              {product.category.replace("-", " ").toUpperCase()}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-3">
              <StarRating
                rating={Math.round(product.averageRating)}
                size="md"
              />
              <span className="text-sm text-muted-foreground">
                {product.averageRating} ({product.totalReviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold text-primary">
              ৳{currentVariant?.price.toLocaleString()}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Color:{" "}
              <span className="font-normal text-muted-foreground">
                {selectedColor}
              </span>
            </label>
            <div className="flex gap-3">
              {availableColors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    // Reset size selection when color changes
                    const firstAvailableSize = product.variants.find(
                      (v: any) => v.color === color
                    )?.size;
                    setSelectedSize(firstAvailableSize);
                  }}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 transition-all",
                    selectedColor === color
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border hover:border-primary"
                  )}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Size:{" "}
              <span className="font-normal text-muted-foreground">
                {selectedSize}
              </span>
            </label>
            <div className="flex gap-3">
              {availableSizes.map((size: string) => {
                const variant = product.variants.find(
                  (v: any) => v.color === selectedColor && v.size === size
                );
                const sizeInStock = variant && variant.stock > 0;

                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!sizeInStock}
                    className={cn(
                      "w-14 h-14 rounded-md border-2 font-semibold transition-all",
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : sizeInStock
                        ? "border-border hover:border-primary"
                        : "border-border opacity-50 cursor-not-allowed line-through"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {isInStock ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  In Stock ({currentVariant.stock} available)
                </span>
              </>
            ) : (
              <span className="text-sm text-destructive font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          {isInStock && (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(maxQuantity, quantity + 1))
                  }
                  disabled={quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-xs text-muted-foreground">
                Free Shipping
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xs text-muted-foreground">
                Secure Payment
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              <span className="text-xs text-muted-foreground">
                Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-3">
                Product Description
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value], index) => (
                      <tr
                        key={key}
                        className={index % 2 === 0 ? "bg-muted/50" : ""}
                      >
                        <td className="px-6 py-4 font-semibold text-foreground w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {value as string}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold text-foreground mb-2">
                    {product.averageRating}
                  </div>
                  <StarRating
                    rating={Math.round(product.averageRating)}
                    size="lg"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on {product.totalReviews} reviews
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-12">
                      {rating} star
                    </span>
                    <Progress value={percentage} className="flex-1" />
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-foreground">
                Customer Reviews
              </h3>
              {reviews.map((review) => (
                <Card key={review.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {review.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">
                                {review.author}
                              </h4>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Review Form */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground">
                Write a Review
              </h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="review-name">Your Name</Label>
                  <Input
                    id="review-name"
                    placeholder="Enter your name"
                    value={reviewForm.name}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewForm({ ...reviewForm, rating: star })
                        }
                        className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            star <= reviewForm.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted hover:text-yellow-400"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-comment">Your Review</Label>
                  <Textarea
                    id="review-comment"
                    placeholder="Share your experience with this product..."
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" size="lg">
                  Submit Review
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Free Shipping
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Enjoy free shipping on all orders within Dhaka. For orders
                    outside Dhaka, a nominal shipping fee of ৳100 applies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Delivery Time
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Orders are typically delivered within 3-5 business days
                    inside Dhaka and 5-7 business days outside Dhaka.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RefreshCw className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Easy Returns
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Not satisfied with your purchase? We offer hassle-free
                    returns within 7 days of delivery. Items must be unused and
                    in original packaging.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      <section>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedId: number) => {
            const relatedProduct = relatedProductsData[relatedId];
            return (
              <Link key={relatedId} href={`/products/${relatedId}`}>
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground">
                        ৳{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
