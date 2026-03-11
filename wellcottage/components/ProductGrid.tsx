"use client";

import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  className = "",
}: ProductGridProps) {
  return (
    <section className={`py-12 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4a3020] mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-[#8a7060] max-w-xl mx-auto text-sm leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
