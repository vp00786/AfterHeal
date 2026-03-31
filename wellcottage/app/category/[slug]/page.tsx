"use client";

import { useState, use } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { COUNTERTOP_PRODUCTS, WALL_ORGANIZER_PRODUCTS, ALL_PRODUCTS } from "@/lib/products";

const CATEGORY_CONFIG: Record<string, {
  title: string;
  description: string;
  products: typeof COUNTERTOP_PRODUCTS;
}> = {
  countertops: {
    title: "COUNTERTOPS",
    description:
      "Beautifully crafted and effortlessly useful, these wooden baskets add warmth and function to your counters — perfect for storing fruits, jars, or everyday essentials.",
    products: COUNTERTOP_PRODUCTS,
  },
  "wall-organizers": {
    title: "WALL ORGANIZERS",
    description:
      "Transform your blank walls into functional display spaces. Our handcrafted wall units blend rustic charm with practical storage.",
    products: WALL_ORGANIZER_PRODUCTS,
  },
  kitchen: {
    title: "KITCHEN",
    description:
      "Bring warmth and craftsmanship to the heart of your home. Our kitchen collection combines beauty with everyday function.",
    products: [...COUNTERTOP_PRODUCTS, ...WALL_ORGANIZER_PRODUCTS],
  },
  decor: {
    title: "DECOR",
    description:
      "Handcrafted wood decor pieces that tell a story. Each piece is made with care to add character and soul to your living spaces.",
    products: ALL_PRODUCTS.slice(0, 8),
  },
  furniture: {
    title: "FURNITURE",
    description:
      "Solid wood furniture crafted to last generations. Honest materials, honest craftsmanship, honest prices.",
    products: ALL_PRODUCTS.slice(0, 6),
  },
  lighting: {
    title: "LIGHTING",
    description:
      "Warm, ambient wooden lighting pieces that create the perfect atmosphere in any room.",
    products: ALL_PRODUCTS.slice(0, 4),
  },
};

const SORT_OPTIONS = [
  "Best Selling",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Alphabetically A–Z",
];

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const [sortBy, setSortBy] = useState("Best Selling");
  const [sortOpen, setSortOpen] = useState(false);

  const config = CATEGORY_CONFIG[slug] || CATEGORY_CONFIG.countertops;

  const sortedProducts = [...config.products].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Alphabetically A–Z") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#EBE6D8]">
      {/* Hero Banner - Olive Green */}
      <div className="bg-[#5A624A] py-14 sm:py-20 text-center border-t border-[#8f9682]/40">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-[80px] text-[#EBE6D8] mb-6 tracking-[0.15em] uppercase font-light drop-shadow-sm">
            {config.title}
          </h1>
          <p className="text-[#c8cabd] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans tracking-wide">
            {config.description}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 border-b border-[#dcd7c8] pb-4">
          <p className="text-[11px] font-bold tracking-[0.1em] text-[#7a7872] uppercase">
            {sortedProducts.length} products
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#555a4c] hover:text-[#2c2a25] transition-colors border border-[#c4bdac] rounded-full px-4 py-2 bg-white/50">
              <SlidersHorizontal size={14} />
              Filter
            </button>
            {/* Sort dropdown */}
            <div className="relative z-20">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#555a4c] border border-[#c4bdac] rounded-full px-4 py-2 bg-white/60 hover:bg-white transition-colors"
              >
                Sort by: {sortBy}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-[#dcd7c8] min-w-[200px] overflow-hidden py-2">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-[11px] font-bold tracking-[0.05em] uppercase transition-colors ${
                        sortBy === option
                          ? "bg-[#EBE6D8] text-[#555a4c]"
                          : "text-[#7a7872] hover:bg-[#f4ebd8]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid - Exactly 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-start">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
