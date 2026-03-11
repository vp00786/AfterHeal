"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
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
      className={`group flex flex-col bg-[#F5EFE6] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(74,48,32,0.08)] hover:shadow-[0_6px_24px_rgba(74,48,32,0.15)] transition-all duration-300 ${className}`}
    >
      {/* Image Area */}
      <Link href={`/product/${product.slug}`} className="block relative">
        {/* Rounded image with fixed aspect ratio */}
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "1/1" }}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-[#4a5240] text-white text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}

          {/* Wishlist Button — top-right of image */}
          <button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Toggle wishlist"
          >
            <Heart
              size={14}
              className={inWishlist ? "fill-red-500 text-red-500" : "text-[#7a6250]"}
            />
          </button>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 px-3 pt-3 pb-3 gap-1">
        {/* Product Name — uppercase, tracking */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#2c1e10] leading-snug hover:text-[#6b5a3a] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Category / Wood Type */}
        <p className="text-[10px] tracking-[0.06em] text-[#a0896a] uppercase">
          {product.woodFinish}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-[#2c1e10] tracking-tight">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#b09070] line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart — full width, olive green, rounded */}
        <button
          onClick={handleAddToCart}
          className={`mt-2 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
            addedToCart
              ? "bg-[#5a7a40] text-white scale-[0.98]"
              : "bg-[#4a5240] text-white hover:bg-[#3c4434] hover:shadow-md active:scale-[0.97]"
          }`}
        >
          <ShoppingCart size={12} strokeWidth={2.5} />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
