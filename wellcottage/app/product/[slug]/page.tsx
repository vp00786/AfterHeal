"use client";

import { useState, use } from "react";
import { Minus, Plus, Heart, ShoppingCart, ArrowLeft, Star, Package, Weight } from "lucide-react";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EBE6D8]">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#2c2a25] mb-4">Product not found</h2>
          <Link href="/category/countertops" className="text-[#8f9682] hover:underline uppercase text-[11px] font-bold tracking-widest">
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

  const categorySlug = product.category.toLowerCase().replace(" ", "-");

  return (
    <div className="min-h-screen bg-[#EBE6D8]">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <nav className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-[0.1em] text-[#7a7872] uppercase">
          <Link href="/" className="hover:text-[#2c2a25] transition-colors">Home</Link>
          <span className="text-[#c4bdac]">/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-[#2c2a25] transition-colors">
            {product.category}
          </Link>
          <span className="text-[#c4bdac]">/</span>
          <span className="text-[#2c2a25]">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="flex gap-4 md:gap-6">
            {/* Thumbnails (vertical) */}
            <div className="hidden sm:flex flex-col gap-4 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${
                    selectedImage === i
                      ? "border-[#69715b] opacity-100 p-1"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 rounded-[2rem] overflow-hidden bg-white aspect-square shadow-sm border border-[#c4bdac]/40">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col pt-4">
            <Link
              href={`/category/${categorySlug}`}
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-[#8f9682] hover:text-[#2c2a25] transition-colors mb-6 group uppercase w-fit"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
              Back to {product.category}
            </Link>

            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8f9682] mb-3 inline-block">
              {product.subcategory}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[56px] text-[#2c2a25] mb-2 font-light uppercase tracking-[0.1em] leading-none">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 mt-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="fill-[#dcbca8] text-[#dcbca8]" />
                ))}
              </div>
              <span className="text-[11px] font-bold tracking-[0.1em] text-[#7a7872] uppercase">(24 reviews)</span>
            </div>

            {/* Product Type & Wood Stain */}
            <div className="flex items-center gap-4 mb-6 border-y border-[#dcd7c8] py-4">
               <div>
                 <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a09e98] mb-1">Product Type</p>
                 <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#555a4c]">{product.category}</p>
               </div>
               <div className="w-px h-8 bg-[#dcd7c8]" />
               <div>
                 <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a09e98] mb-1">Wood Stain</p>
                 <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#555a4c] flex items-center gap-2">
                   <span className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-sm" style={{
                      backgroundColor: product.woodFinish === "Simply White" ? "#e5dfc9" : product.woodFinish === "Classic Grey" ? "#8b8b8b" : product.woodFinish === "Natural Pine" ? "#ccae85" : product.woodFinish === "Walnut Brown" ? "#8b6340" : "#3c2a1e"
                   }} />
                   {product.woodFinish}
                 </p>
               </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-[#2c2a25] font-sans tracking-tight">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg font-bold text-[#a09e98] line-through mb-1">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-[#555a4c] text-sm md:text-[15px] leading-relaxed mb-8 flex-1 font-sans">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2c2a25]">Quantity</span>
              <div className="flex items-center gap-4 border border-[#c4bdac] rounded-full px-5 py-2.5 bg-white/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-5 h-5 flex items-center justify-center hover:text-[#69715b] transition-colors"
                >
                  <Minus size={14} strokeWidth={3} />
                </button>
                <span className="w-6 text-center text-[13px] font-bold text-[#2c2a25]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-5 h-5 flex items-center justify-center hover:text-[#69715b] transition-colors"
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mb-8 w-full max-w-[400px]">
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-colors border border-transparent shadow-sm ${
                    addedToCart
                      ? "bg-[#4a5041] text-white"
                      : "bg-[#69715b] text-white hover:bg-[#575e4b]"
                  }`}
                >
                  <ShoppingCart size={15} strokeWidth={2.5} />
                  {addedToCart ? "ADDED TO CART!" : "ADD TO CART"}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm bg-white hover:bg-[#f4ebd8] ${
                    inWishlist ? "border-[#dcbca8]" : "border-[#dcd7c8]"
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={20}
                    strokeWidth={inWishlist ? 2.5 : 1.5}
                    className={inWishlist ? "fill-[#dcbca8] text-[#dcbca8]" : "text-[#7a7872]"}
                  />
                </button>
              </div>
              <button className="w-full py-4 rounded-full bg-white border border-[#2c2a25] text-[#2c2a25] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#2c2a25] hover:text-white transition-colors shadow-sm">
                BUY NOW
              </button>
            </div>

            {/* Product Details accordion approx */}
            <div className="border-t border-[#dcd7c8] pt-8 space-y-4">
              <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c2a25] mb-6">Product Details</h3>
              {[
                { icon: Package, label: "Material", value: product.material },
                { icon: Weight, label: "Weight", value: product.weight },
                { icon: Package, label: "Dimensions", value: product.dimensions },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#dcd7c8] flex items-center justify-center text-[#8f9682]">
                     <Icon size={14} strokeWidth={2.5} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a09e98] w-28">{label}</span>
                  <span className="text-[13px] font-bold text-[#555a4c]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="bg-[#5A624A] py-20 border-t border-[#8f9682]/30">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-[#EBE6D8] font-light uppercase tracking-[0.15em] mb-12 text-center drop-shadow-sm">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
