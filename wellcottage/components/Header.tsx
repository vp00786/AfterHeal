"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { NAV_ITEMS } from "@/lib/products";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useStore((s) => s.cartCount());
  const wishlist = useStore((s) => s.wishlist);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#EBE6D8] shadow-sm">
        {/* Top bar */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4 flex items-center justify-between gap-6">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-[#4a4a4a] hover:text-[#2c2a25] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex flex-col justify-center w-[200px]"
          >
            <div className="flex items-center gap-2">
               {/* Very simple leaf logo approximation */}
               <div className="w-8 h-8 rounded-full border border-[#8a917f] flex items-center justify-center -rotate-12">
                  <span className="text-[#8a917f] text-xs font-serif">W</span>
               </div>
               <span className="font-serif text-[28px] text-[#555a4c] tracking-tight leading-tight uppercase font-light">
                 The Well<br/>Cottage
               </span>
            </div>
            <span className="block text-[7px] tracking-[0.4em] text-[#5a604f] uppercase whitespace-nowrap mt-1 font-bold">
              Community Culture Care
            </span>
          </Link>

          {/* Search bar – desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-2 rounded-full border border-[#8f9682]/40 bg-[#dcd7c8]/30 font-sans text-sm text-[#2c2a25] outline-none hover:border-[#8f9682] focus:border-[#8f9682] focus:bg-white/50 transition-all placeholder:text-[#a09e98]"
              />
              <button className="absolute right-4 text-[#8f9682] hover:text-[#555a4c] transition-colors">
                <Search size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4 text-[#555a4c]">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1 hover:text-[#1a1c17] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={22} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="cart-badge bg-[#8f9682]">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
           <button
             className="relative p-1 hover:text-[#1a1c17] transition-colors"
             onClick={() => setCartOpen(true)}
             aria-label="Cart"
           >
             <ShoppingCart size={22} strokeWidth={1.5} />
             {cartCount > 0 && (
               <span className="cart-badge bg-[#8f9682]">{cartCount}</span>
             )}
           </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-1 hover:text-[#1a1c17] transition-colors"
              aria-label="Account"
            >
              <User size={22} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Navigation - Inline underneath */}
        <nav className="hidden lg:block w-full pb-6 pt-2">
          <div className="max-w-[1000px] mx-auto">
            <ul className="flex items-center justify-between w-full">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-[13px] font-bold text-[#555a4c] hover:text-[#2c2a25] tracking-[0.2em] uppercase transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#EBE6D8] border-t border-[#dcd7c8]">
            {/* Mobile search */}
            <div className="p-4 border-b border-[#dcd7c8]">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded border border-[#c4bdac] bg-white/50 text-sm text-[#4a4a4a] outline-none focus:border-[#69715b]"
                />
                <button className="absolute right-3 text-[#69715b]">
                  <Search size={16} strokeWidth={2.5}/>
                </button>
              </div>
            </div>
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-6 py-4 text-[11px] font-bold text-[#555a4c] hover:bg-[#dcd7c8] tracking-widest uppercase border-b border-[#dcd7c8]/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
