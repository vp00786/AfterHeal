"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [addedToCart, setAddedToCart] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={`group flex flex-col bg-[#EBE6D8] rounded-2xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Image Area with padding so the image sits inside the beige card */}
      <div className="p-3 pb-0 relative">
        <Link href={`/product/${product.slug}`} className="block relative aspect-square w-full rounded-xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 bg-[#69715b] text-white text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button — inside top-right of image */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Toggle wishlist"
          >
            <Heart
              size={13}
              className={inWishlist ? "fill-[#69715b] text-[#69715b]" : "text-[#4a4a4a]"}
            />
          </button>
        </Link>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 px-4 py-3 gap-1">
        {/* Product Name — uppercase, minimalist */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-sans text-[13px] font-semibold uppercase tracking-[0.1em] text-[#2c2a25] leading-tight hover:text-[#69715b] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Category / Wood Type */}
        <p className="font-sans text-[9px] font-bold tracking-[0.15em] text-[#7a7872] uppercase">
          {product.category} - {product.woodFinish}
        </p>

        <div className="flex-1" />

        {/* Horizontal bar: Price (left), Add to Cart (right) */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#d8d3c5]">
          <div className="flex items-baseline gap-1.5">
             <span className="text-[14px] font-bold text-[#2c2a25]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-[#9a958b] line-through hidden sm:inline-block">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] transition-colors border border-transparent ${
              addedToCart
                ? "bg-[#4a5041] text-white"
                : "bg-[#69715b] text-white hover:bg-[#575e4b]"
            }`}
          >
            {addedToCart ? "ADDED!" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}
