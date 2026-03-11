"use client";

import { useState } from "react";
import { Minus, Plus, Heart, ShoppingCart, ArrowLeft, Star, Package, Weight } from "lucide-react";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f1ea]">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#4a3020] mb-4">Product not found</h2>
          <Link href="/category/countertops" className="text-[#8d8840] hover:underline">
            ← Back to collection
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-xs text-[#8a7060]">
          <Link href="/" className="hover:text-[#4a3020] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category.toLowerCase().replace(" ", "-")}`} className="hover:text-[#4a3020] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#4a3020] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails (vertical) */}
            <div className="hidden sm:flex flex-col gap-3 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-[#8d8840] shadow-md"
                      : "border-transparent hover:border-[#c8b89a]"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 rounded-3xl overflow-hidden bg-[#f0e8d0] aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <Link
              href={`/category/${product.category.toLowerCase().replace(" ", "-")}`}
              className="flex items-center gap-1.5 text-sm text-[#8d8840] hover:text-[#4a3020] transition-colors mb-4 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to {product.category}
            </Link>

            <span className="text-xs uppercase tracking-widest text-[#8d8840] font-medium mb-2">
              {product.subcategory}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-[#8d8840] text-[#8d8840]" />
                ))}
              </div>
              <span className="text-xs text-[#8a7060]">(24 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl font-semibold text-[#4a3020]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#a0896a] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-[#8a7060] text-sm sm:text-base leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Wood Stain */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#4a3020] mb-2">
                Wood stain:{" "}
                <span className="font-normal text-[#8a7060]">{product.woodFinish}</span>
              </p>
              <div className="flex gap-2">
                <span
                  className="w-8 h-8 rounded-full border-2 border-[#8d8840] shadow-md"
                  style={{
                    backgroundColor:
                      product.woodFinish === "Simply White"
                        ? "#f5f0e4"
                        : product.woodFinish === "Classic Grey"
                        ? "#9ea399"
                        : product.woodFinish === "Natural Pine"
                        ? "#c4a46e"
                        : product.woodFinish === "Walnut Brown"
                        ? "#8b6340"
                        : "#4a3020",
                  }}
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-sm font-medium text-[#4a3020]">Quantity</span>
              <div className="flex items-center gap-3 border border-[#c8b89a] rounded-full px-4 py-2 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:text-[#8d8840] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium text-[#4a3020]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center hover:text-[#8d8840] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-medium text-sm transition-all ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-[#4a5240] text-[#e8dfc8] hover:bg-[#3a4230]"
                }`}
              >
                <ShoppingCart size={16} />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                  inWishlist
                    ? "border-red-400 bg-red-50"
                    : "border-[#c8b89a] hover:border-[#8d8840]"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  className={inWishlist ? "fill-red-500 text-red-500" : "text-[#8a7060]"}
                />
              </button>
            </div>

            <button className="w-full py-3.5 rounded-full bg-[#8d8840] text-white font-medium text-sm hover:bg-[#7a7535] transition-colors mb-8">
              Buy Now
            </button>

            {/* Product Details */}
            <div className="border-t border-[#e0d5c0] pt-6 space-y-3">
              <h3 className="font-serif text-lg text-[#4a3020] mb-4">Product Details</h3>
              {[
                { icon: Package, label: "Material", value: product.material },
                { icon: Weight, label: "Weight", value: product.weight },
                { icon: Package, label: "Dimensions", value: product.dimensions },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon size={15} className="text-[#8d8840] flex-shrink-0" />
                  <span className="text-[#8a7060] w-24">{label}</span>
                  <span className="text-[#4a3020] font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="bg-[#f0e8d4] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4a3020] mb-10 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
