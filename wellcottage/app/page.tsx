"use client";

import Link from "next/link";
import { Trees, Leaf, Anchor, Scale } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { COUNTERTOP_PRODUCTS, WALL_ORGANIZER_PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const startOrganizing = COUNTERTOP_PRODUCTS.slice(0, 4);
  const rusticMountain = WALL_ORGANIZER_PRODUCTS.slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* ─── HERO & ICON ROW SECTION (Beige Background) ─── */}
      <section className="bg-[#EBE6D8] pt-6 pb-16 w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Hero Banner (4 slices) */}
          <div className="relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden flex shadow-sm border border-[#dcd7c8]/50">
            {/* Slice 1 */}
            <div className="flex-1 relative border-r border-[#dcd7c8]/30">
              <img src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80" alt="Indian Artistry" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white/90 font-serif text-sm md:text-xl tracking-widest px-2 drop-shadow-md">Celebrate Indian Artistry</p>
            </div>
            {/* Slice 2 */}
            <div className="flex-1 relative border-r border-[#dcd7c8]/30">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Earthy Tones" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <p className="absolute inset-x-0 bottom-24 text-center text-white/90 font-serif text-sm md:text-xl tracking-widest px-2 drop-shadow-md">Earthy Tones</p>
            </div>
            {/* Slice 3 */}
            <div className="flex-1 relative border-r border-[#dcd7c8]/30">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80" alt="Timeless Pieces" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10" />
              <p className="absolute inset-x-0 top-16 text-center text-[#2c2a25] font-serif text-sm md:text-xl tracking-widest px-2 drop-shadow-sm">Timeless Pieces</p>
            </div>
            {/* Slice 4 */}
            <div className="flex-1 relative">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" alt="Eco-Friendly Materials" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-white/90 font-serif text-sm md:text-xl tracking-widest px-2 drop-shadow-md">Eco-Friendly Materials</p>
            </div>

            {/* SHOP NOW Button */}
            <button className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full border border-white/80 text-white bg-white/10 backdrop-blur-sm text-[11px] md:text-[13px] tracking-[0.2em] hover:bg-white/20 transition-colors uppercase z-10 font-medium">
              SHOP NOW
            </button>
          </div>

          {/* Icon Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-20 max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center text-center gap-4">
              <Trees className="w-10 h-10 md:w-12 md:h-12 text-[#69715b]" strokeWidth={1.5} />
              <span className="text-[#3c3a32] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase">Rural Development</span>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Leaf className="w-10 h-10 md:w-12 md:h-12 text-[#69715b]" strokeWidth={1.5} />
              <span className="text-[#3c3a32] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase">Sustainable</span>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Anchor className="w-10 h-10 md:w-12 md:h-12 text-[#69715b]" strokeWidth={1.5} />
              <span className="text-[#3c3a32] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase">Heirloom Designs</span>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Scale className="w-10 h-10 md:w-12 md:h-12 text-[#69715b]" strokeWidth={1.5} />
              <span className="text-[#3c3a32] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase">Ethical Purchasing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR COLLECTION (Olive Background) ─── */}
      <section className="bg-[#69715b] pt-16 pb-24 w-full relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative h-[500px] md:h-[650px]">
          {/* Circular images scattered */}
          {/* Decor */}
          <div className="absolute top-[10%] left-[5%] md:left-[10%] group">
            <div className="w-32 md:w-48 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80" className="w-[80%] h-[80%] object-cover rounded-md" alt="Decor" />
            </div>
            <span className="absolute -top-4 right-0 text-white font-serif tracking-[0.1em] text-sm rotate-12 drop-shadow-sm uppercase">Decor</span>
          </div>

          {/* Wall Organizers */}
          <div className="absolute top-[20%] left-[35%] md:left-[30%] group">
            <div className="w-40 md:w-56 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80" className="w-[90%] h-[90%] object-cover rounded-md" alt="Wall Organizers" />
            </div>
            <span className="absolute -top-6 right-4 text-white font-serif tracking-[0.1em] text-sm rotate-[15deg] drop-shadow-sm uppercase">Wall Organizers</span>
          </div>

          {/* Kitchen */}
          <div className="absolute top-[15%] right-[25%] md:right-[30%] group">
            <div className="w-36 md:w-52 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" className="w-[85%] h-[85%] object-cover rounded-md" alt="Kitchen" />
            </div>
            <span className="absolute -top-4 right-4 text-white font-serif tracking-[0.1em] text-sm rotate-[20deg] drop-shadow-sm uppercase">Kitchen</span>
          </div>

          {/* Countertops */}
          <div className="absolute top-[30%] right-[2%] md:right-[5%] group">
            <div className="w-40 md:w-56 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" className="w-[85%] h-[85%] object-cover rounded-md" alt="Countertops" />
            </div>
            <span className="absolute top-2 -right-4 text-white font-serif tracking-[0.1em] text-sm rotate-[35deg] drop-shadow-sm uppercase">Countertops</span>
          </div>

          {/* Furniture */}
          <div className="absolute bottom-[10%] left-[20%] md:left-[22%] group">
            <div className="w-36 md:w-52 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80" className="w-[85%] h-[85%] object-cover rounded-sm" alt="Furniture" />
            </div>
            <span className="absolute -top-2 right-4 text-white font-serif tracking-[0.1em] text-sm rotate-12 drop-shadow-sm uppercase">Furniture</span>
          </div>

          {/* Lighting */}
          <div className="absolute bottom-[5%] right-[20%] md:right-[25%] group z-10">
             <div className="w-32 md:w-48 aspect-square rounded-full border-[6px] border-[#EBE6D8] overflow-hidden drop-shadow-xl relative bg-white flex items-center justify-center">
               <img src="https://images.unsplash.com/photo-1507641214041-e940428fa671?w=400&q=80" className="w-[75%] h-[75%] object-cover rounded-sm" alt="Lighting" />
             </div>
             <span className="absolute top-0 -right-6 text-white font-serif tracking-[0.1em] text-sm rotate-[30deg] drop-shadow-sm uppercase">Lighting</span>
          </div>

          {/* Title Bottom Center */}
          <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#ebd6b2] font-sans font-light text-3xl md:text-5xl tracking-[0.25em] uppercase whitespace-nowrap z-0 opacity-90 drop-shadow-sm">
            OUR COLLECTION
          </h2>
        </div>
      </section>

      {/* ─── ONE WOOD MANY MOODS (Beige Background) ─── */}
      <section className="bg-[#EBE6D8] py-20 w-full border-t border-[#dcd7c8]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Top Banner with 5 slices */}
          <div className="relative w-full h-[200px] md:h-[260px] rounded-[1.5rem] overflow-hidden flex shadow-[0_4px_16px_rgba(0,0,0,0.05)] mb-16 border border-[#c4bdac]/40">
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/5 mix-blend-multiply pointer-events-none" />
             
             {/* 5 wood texture slices */}
             <div className="flex-1 bg-[#d3bc9f]" />
             <div className="flex-1 bg-[#b89e82]" />
             <div className="flex-1 bg-[#a98e6c]" />
             <div className="flex-1 bg-[#856142] border-x border-black/10" />
             <div className="flex-1 bg-[#3c2a1e]" />

             <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center z-20 text-center drop-shadow-md pb-4">
                <h2 className="text-white/95 font-sans font-light text-2xl md:text-5xl tracking-[0.35em] uppercase mb-4 drop-shadow-sm">One Wood, Many Moods.</h2>
                <p className="text-[#3c2a1e] font-bold text-[10px] md:text-xs tracking-[0.35em] uppercase drop-shadow-sm mix-blend-overlay opacity-80">Shop by Stain</p>
             </div>
          </div>

          {/* 5 Circular wood objects */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 max-w-6xl mx-auto px-4 justify-items-center">
             {[
               {name: "Simply White", img1: "bg-[#e5dfc9]", img2: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&q=80"},
               {name: "Classic Grey", img1: "bg-[#8b8b8b]", img2: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&q=80"},
               {name: "Natural Pine", img1: "bg-[#ccae85]", img2: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&q=80"},
               {name: "Walnut Brown", img1: "bg-[#8b6340]", img2: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&q=80"},
               {name: "Dark Walnut", img1: "bg-[#3c2a1e]", img2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80"},
             ].map((item, idx) => (
                <div key={item.name} className="flex flex-col items-center gap-4 text-center">
                   <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-[#2c2a25]/20 overflow-hidden flex bg-white shadow-sm">
                      <div className="flex-1 h-full bg-cover bg-center border-r border-[#2c2a25]/10" style={{backgroundImage: `url(${item.img2})`, filter: 'brightness(1.1)'}} />
                      <div className={`flex-1 h-full ${item.img1} flex items-center justify-center overflow-hidden`}>
                        <div className="w-[120%] h-full opacity-40 mix-blend-multiply" style={{backgroundImage: `url("https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=200&q=80")`, backgroundSize: 'cover'}} />
                      </div>
                   </div>
                   <span className="text-[#3c3a32] text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase">{item.name}</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ─── START ORGANIZING SECTION (Olive Background) ─── */}
      <section className="bg-[#69715b] pt-16 pb-20 w-full border-t border-[#858e74]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Big Beige Banner inside Olive Section */}
          <div className="w-full bg-[#EBE6D8] rounded-[2rem] h-[220px] md:h-[280px] flex items-center justify-between px-8 md:px-24 shadow-md mb-12 overflow-hidden border border-[#dcd7c8]/60 relative">
             <div className="flex flex-col items-start gap-1 md:gap-2 z-10 w-full max-w-[400px] md:max-w-none">
               <h2 className="text-[#2c2a25] font-serif text-3xl md:text-[44px] tracking-[0.15em] mb-1 font-light uppercase">Start Organizing</h2>
               <p className="text-[#69715b] font-sans text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-4 md:mb-6">Wait Organisers</p>
               <button className="px-5 md:px-8 py-2 md:py-2.5 border-2 border-[#d5d0c0] rounded-full text-[9px] md:text-[11px] uppercase font-bold text-[#8a8578] tracking-[0.15em] hover:border-[#69715b] hover:text-[#69715b] transition-colors bg-white/40">SHOP NOW</button>
             </div>
             
             {/* Right Image element inside the banner */}
             <div className="absolute right-0 bottom-0 top-0 w-[45%] h-full hidden md:flex items-end justify-end pr-12 pb-4">
                <img src="https://images.unsplash.com/photo-1507641214041-e940428fa671?w=600&q=80" alt="Organizers" className="h-[90%] w-auto object-contain rounded-xl drop-shadow-xl" />
             </div>
          </div>

          {/* Product Grid - Desktop: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {startOrganizing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── RUSTIC MOUNTAIN COLLECTION (Beige Background) ─── */}
      <section className="bg-[#EBE6D8] pt-16 pb-20 w-full border-t border-[#dcd7c8]/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Big Beige Banner but completely flat looking */}
          <div className="w-full bg-[#f4ebd8] rounded-[2rem] py-16 md:py-20 flex flex-col items-center justify-center text-center shadow-sm mb-12 border border-[#dcd7c8]/20 relative overflow-hidden h-[240px] md:h-[300px]">
             {/* Abstract background shelf image overlay */}
             <div className="absolute left-[15%] bottom-0 top-0 w-[40%] hidden md:block opacity-90 mx-auto">
               <img src="https://images.unsplash.com/photo-1622372736561-12c5ba7be9b1?w=600&q=80" alt="Mountain Shelf" className="h-full w-full object-cover rounded-xl scale-125 translate-y-4" style={{maskImage: 'linear-gradient(to top, black, transparent 95%)'}} />
             </div>
             <div className="relative z-10 md:ml-[35%] w-full flex flex-col items-center text-center px-4">
               <h2 className="text-[#7c7160] font-sans font-light text-3xl md:text-[50px] tracking-[0.1em] md:tracking-[0.2em] mb-4 md:mb-6 uppercase leading-tight md:leading-[1.1] max-w-[600px] text-center">Rustic Mountain Collection</h2>
               <button className="px-6 md:px-8 py-2 md:py-2.5 border-2 border-white rounded-full text-[9px] md:text-[11px] uppercase font-bold text-white tracking-[0.15em] hover:bg-white hover:text-[#7c7160] transition-colors bg-[#dcbca8]/20 backdrop-blur-sm">SHOP NOW</button>
             </div>
          </div>

          {/* Product Grid - Desktop: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {rusticMountain.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE WELL STYLED (Olive Background) ─── */}
      <section className="bg-[#69715b] py-12 md:py-16 w-full border-t border-[#858e74]/50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Wide banner with sliced images */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden flex border border-[#858e74]/30 shadow-md">
             {/* 6 image columns next to each other */}
             <div className="flex-1 bg-cover bg-center brightness-90 saturate-50" style={{backgroundImage: `url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80)`}}/>
             <div className="flex-1 bg-cover bg-center brightness-75 saturate-50 hidden sm:block border-x border-white/10" style={{backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80)`}}/>
             <div className="flex-1 bg-cover bg-center brightness-90 saturate-50 border-r border-white/10" style={{backgroundImage: `url(https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80)`}}/>
             <div className="flex-1 bg-cover bg-center brightness-75 saturate-50 border-r border-white/10" style={{backgroundImage: `url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80)`}}/>
             <div className="flex-1 bg-cover bg-center brightness-90 saturate-50 border-r border-white/10 hidden sm:block" style={{backgroundImage: `url(https://images.unsplash.com/photo-1507641214041-e940428fa671?w=600&q=80)`}}/>
             <div className="flex-1 bg-cover bg-center brightness-75 saturate-50 hidden md:block" style={{backgroundImage: `url(https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80)`}}/>
             
             {/* Overlay Text */}
             <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/5 mix-blend-multiply pointer-events-none" />
             <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center z-20 text-center px-4">
               <h2 className="text-[#F9F6EE] font-sans font-light text-4xl sm:text-6xl md:text-[80px] tracking-[0.25em] md:tracking-[0.4em] mb-4 md:mb-6 uppercase leading-none drop-shadow-md">The Well Styled</h2>
               <p className="text-[#F9F6EE] font-serif italic text-sm md:text-2xl mt-0 md:mt-2 drop-shadow-md pb-8">Your looks, our styling secrets.</p>
               <button className="px-6 md:px-10 py-2.5 rounded-full border border-white/60 text-white tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-xs hover:bg-white/10 transition-colors uppercase backdrop-blur-md bg-white/5 font-semibold mt-4">
                 HAVE A LOOK
               </button>
             </div>
          </div>

          {/* Story Cards - 3 Columns below */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mt-4 w-full">
            {/* 1 */}
            <Link href="/story" className="relative group rounded-2xl md:rounded-[2rem] overflow-hidden h-[180px] md:h-[220px] block border border-[#858e74]/20">
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" alt="Our Story" className="absolute inset-0 w-full h-full object-cover  mix-blend-overlay opacity-50 bg-[#3a2f24] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-6 md:bottom-10 text-center flex flex-col items-center">
                <h3 className="text-white text-xs md:text-sm tracking-[0.2em] font-medium uppercase">Our Story</h3>
                <p className="text-white/80 text-[8px] md:text-[9px] font-bold tracking-[0.1em] uppercase mt-1">(Pic of the owner)</p>
              </div>
            </Link>
            {/* 2 */}
            <Link href="/materials" className="relative group rounded-2xl md:rounded-[2rem] overflow-hidden h-[180px] md:h-[220px] block border border-[#858e74]/20">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Materials In Use" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 bg-[#3a2f24] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-8 text-center px-4">
                <h3 className="text-[#f9f9f9] text-[13px] md:text-base tracking-[0.15em] md:tracking-[0.25em] font-light uppercase leading-snug">Materials<br/>In Use</h3>
              </div>
            </Link>
            {/* 3 */}
            <Link href="/artisans" className="relative group rounded-2xl md:rounded-[2rem] overflow-hidden h-[180px] md:h-[220px] block border border-[#858e74]/20">
              <img src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80" alt="Hands Behind Our Products" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 bg-[#3a2f24] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-8 text-center px-8">
                <h3 className="text-[#f9f9f9] text-[13px] md:text-base tracking-[0.15em] md:tracking-[0.25em] font-light uppercase leading-snug">Hands Behind<br/>Our<br/>Products</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
