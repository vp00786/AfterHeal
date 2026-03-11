"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { ALL_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();
  const wishlistProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <div className="bg-[#4a5240] py-14 text-center">
        <h1 className="font-serif text-5xl text-[#f0e8d0] flex items-center justify-center gap-3">
          <Heart size={36} className="fill-[#d4b483] text-[#d4b483]" />
          Wishlist
        </h1>
        <p className="text-[#a0987a] mt-3 text-sm">
          {wishlistProducts.length} saved {wishlistProducts.length === 1 ? "item" : "items"}
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <Heart size={60} className="mx-auto text-[#c8b89a] mb-6" />
            <h2 className="font-serif text-3xl text-[#4a3020] mb-3">No saved items yet</h2>
            <p className="text-[#8a7060] mb-8">
              Heart items you love to save them here.
            </p>
            <Link
              href="/category/countertops"
              className="inline-flex items-center gap-2 bg-[#4a5240] text-[#e8dfc8] px-8 py-3.5 rounded-full font-medium hover:bg-[#3a4230] transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
