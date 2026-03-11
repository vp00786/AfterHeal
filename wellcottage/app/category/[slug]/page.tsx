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
    <div className="min-h-screen bg-[#f5f1ea]">
      {/* Hero Banner */}
      <div className="bg-[#4a5240] py-14 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-5xl sm:text-6xl text-[#f0e8d0] mb-5 tracking-wide">
            {config.title}
          </h1>
          <p className="text-[#a0987a] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {config.description}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-[#8a7060]">
            {sortedProducts.length} products
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-[#4a3020] hover:text-[#8d8840] transition-colors border border-[#c8b89a] rounded-full px-4 py-2">
              <SlidersHorizontal size={14} />
              Filter
            </button>
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm text-[#4a3020] border border-[#c8b89a] rounded-full px-4 py-2 bg-white hover:border-[#8d8840] transition-colors"
              >
                Sort by: {sortBy}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-[#e0d5c0] z-20 min-w-48 overflow-hidden">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                        sortBy === option
                          ? "bg-[#f0e8d0] text-[#8d8840] font-medium"
                          : "text-[#4a3020] hover:bg-[#f5f1ea]"
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-start">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
