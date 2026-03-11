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
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Product Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-[#8d8840] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all"
        aria-label="Add to wishlist"
      >
        <Heart
          size={16}
          className={inWishlist ? "fill-red-500 text-red-500" : "text-[#8a7060]"}
        />
      </button>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-56 sm:h-64 overflow-hidden bg-[#f5ede0]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-4 pb-3">
          <h3 className="font-serif text-lg text-[#4a3020] font-medium leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-[#8a7060] mt-1">{product.woodFinish}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold text-[#4a3020]">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#a0896a] line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            addedToCart
              ? "bg-green-600 text-white"
              : "bg-[#4a5240] text-[#e8dfc8] hover:bg-[#3a4230]"
          }`}
        >
          <ShoppingCart size={14} />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
