"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Leaf, Sprout, Award, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  COUNTERTOP_PRODUCTS,
  WALL_ORGANIZER_PRODUCTS,
  WOOD_FINISHES,
} from "@/lib/products";

const VALUES = [
  {
    icon: Sprout,
    title: "Rural Development",
    description: "Supporting artisan communities in rural India",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly materials and processes",
  },
  {
    icon: Award,
    title: "Heirloom Designs",
    description: "Made to last generations",
  },
  {
    icon: Heart,
    title: "Ethical Purchasing",
    description: "Fair wages, transparent supply chain",
  },
];

const STORY_CARDS = [
  {
    title: "Our Story",
    href: "/about",
    image:
      "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&q=80",
    description: "How a love for craft became a movement",
  },
  {
    title: "Materials in Use",
    href: "/materials",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description: "Responsibly sourced Pine Wood",
  },
  {
    title: "Hands Behind Our Products",
    href: "/artisans",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    description: "Meet the artisans who craft each piece",
  },
];

export default function HomePage() {
  const [selectedFinish, setSelectedFinish] = useState(WOOD_FINISHES[2]);

  const startOrganizing = COUNTERTOP_PRODUCTS.slice(0, 5);
  const rusticMountain = WALL_ORGANIZER_PRODUCTS.slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* ─── HERO SECTION ─── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85"
          alt="The Well Cottage - Handcrafted Wood"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2c1e10]/80 via-[#2c1e10]/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-lg animate-fade-in">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#d4b483] mb-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#d4b483]/30">
              Handcrafted in India
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Where
              <span className="block italic text-[#d4b483]">Wood</span>
              Meets Home.
            </h1>
            <p className="text-[#e8dfc8] text-base sm:text-lg mb-8 leading-relaxed max-w-sm">
              Beautifully crafted wooden essentials that bring warmth, function,
              and soul to every corner of your home.
            </p>
            <Link
              href="/category/countertops"
              className="inline-flex items-center gap-2 bg-[#8d8840] hover:bg-[#7a7535] text-white px-8 py-4 rounded-full font-medium transition-all hover:gap-3 text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ─── VALUE PROPOSITIONS ─── */}
      <section className="bg-[#4a5240] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="flex flex-col items-center text-center gap-3 group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#8d8840]/80 transition-colors">
                    <Icon size={24} className="text-[#d4b483]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-[#f0e8d0] mb-1">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#a0987a] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── OUR COLLECTION ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8d8840] font-medium">
            Curated For You
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mt-2 mb-4">
            Our Collection
          </h2>
          <p className="text-[#8a7060] max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Every piece is handcrafted with care — from sustainable pine wood, finished
            with non-toxic stains, and made to last a lifetime.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big card */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group h-80 sm:h-96 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=900&q=80"
              alt="Countertop Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#d4b483] text-xs uppercase tracking-widest mb-1">New Arrivals</p>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                Countertop Organizers
              </h3>
              <Link
                href="/category/countertops"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-[#8d8840] text-white text-sm px-5 py-2.5 rounded-full transition-all border border-white/30"
              >
                Explore <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          {/* Small card */}
          <div className="relative rounded-3xl overflow-hidden group h-80 sm:h-96 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
              alt="Wall Organizers"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#d4b483] text-xs uppercase tracking-widest mb-1">Featured</p>
              <h3 className="font-serif text-2xl text-white mb-3">
                Wall Organizers
              </h3>
              <Link
                href="/category/wall-organizers"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-[#8d8840] text-white text-sm px-5 py-2.5 rounded-full transition-all border border-white/30"
              >
                Explore <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ONE WOOD MANY MOODS ─── */}
      <section className="bg-[#f0e8d4] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8d8840] font-medium">
              Customisable
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mt-2 mb-3">
              One Wood, Many Moods
            </h2>
            <p className="text-[#8a7060] text-sm sm:text-base">
              Choose your perfect finish for every room
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Finish Selector */}
            <div className="flex-shrink-0 w-full lg:w-64">
              <div className="space-y-3">
                {WOOD_FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedFinish.id === finish.id
                        ? "border-[#8d8840] bg-white shadow-md"
                        : "border-transparent bg-white/50 hover:bg-white hover:border-[#c8b89a]"
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                      style={{ backgroundColor: finish.color }}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedFinish.id === finish.id
                          ? "text-[#4a3020]"
                          : "text-[#8a7060]"
                      }`}
                    >
                      {finish.name}
                    </span>
                    {selectedFinish.id === finish.id && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#8d8840]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Product Preview */}
            <div className="flex-1 relative rounded-3xl overflow-hidden h-72 sm:h-96 w-full">
              <img
                src={`https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=900&q=80`}
                alt={selectedFinish.name}
                className="w-full h-full object-cover"
                style={{
                  filter: `sepia(${
                    selectedFinish.id === "dark-walnut"
                      ? "0.7"
                      : selectedFinish.id === "walnut-brown"
                      ? "0.4"
                      : selectedFinish.id === "classic-grey"
                      ? "0"
                      : "0.1"
                  }) saturate(${
                    selectedFinish.id === "classic-grey" ? "0.1" : "1"
                  }) brightness(${
                    selectedFinish.id === "simply-white" ? "1.2" : "1"
                  })`,
                  transition: "filter 0.4s ease",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white bg-black/30 backdrop-blur-sm border border-white/20"
                >
                  {selectedFinish.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── START ORGANIZING SECTION ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#8d8840] font-medium">
              Countertops
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mt-2">
              Start Organizing
            </h2>
          </div>
          <Link
            href="/category/countertops"
            className="text-sm text-[#8d8840] hover:text-[#4a3020] font-medium flex items-center gap-1 transition-colors underline-offset-2 hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {startOrganizing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── RUSTIC MOUNTAIN COLLECTION ─── */}
      <section className="bg-[#eae6da] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#8d8840] font-medium">
                Wall Organizers
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mt-2">
                Rustic Mountain Collection
              </h2>
            </div>
            <Link
              href="/category/wall-organizers"
              className="text-sm text-[#8d8840] hover:text-[#4a3020] font-medium flex items-center gap-1 transition-colors underline-offset-2 hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {rusticMountain.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE WELL STYLED ─── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1400&q=85"
          alt="The Well Styled"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2c1e10]/60" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4b483] mb-4 inline-block">
            Inspiration
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            The Well Styled
          </h2>
          <p className="text-[#e8dfc8] text-lg sm:text-xl italic font-serif mb-8">
            &ldquo;Your looks, our styling secrets.&rdquo;
          </p>
          <p className="text-[#c8bfa0] text-sm sm:text-base leading-relaxed mb-8">
            Discover how our customers are creating beautiful, organized spaces
            using The Well Cottage&apos;s handcrafted pieces.
          </p>
          <Link
            href="/lookbook"
            className="inline-flex items-center gap-2 bg-[#8d8840] hover:bg-[#7a7535] text-white px-8 py-4 rounded-full font-medium transition-all text-sm sm:text-base"
          >
            View Lookbook <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ─── STORY CARDS ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8d8840] font-medium">
            Know Us Better
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#4a3020] mt-2">
            Our Story
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STORY_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-3xl overflow-hidden h-72 sm:h-80 block"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1e10]/80 via-[#2c1e10]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-xl sm:text-2xl text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-[#c8bfa0] text-sm">{card.description}</p>
                <span className="inline-flex items-center gap-1 text-[#d4b483] text-xs mt-3 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
