"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { NAV_ITEMS } from "@/lib/products";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartCount = useStore((s) => s.cartCount());
  const wishlist = useStore((s) => s.wishlist);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f5f1ea] border-b border-[#e0d5c0] shadow-sm">
        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-[#4a3020] hover:text-[#8d8840] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 text-center lg:text-left"
          >
            <span className="font-serif text-2xl sm:text-3xl text-[#4a3020] tracking-tight leading-none">
              The Well Cottage
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-[#8d8840] uppercase mt-0.5">
              Handcrafted Wood
            </span>
          </Link>

          {/* Search bar – desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#c8b89a] bg-white/70 text-sm text-[#4a3020] placeholder-[#a0896a] focus:outline-none focus:ring-2 focus:ring-[#8d8840]/40 focus:border-[#8d8840] transition-all"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0896a]"
              />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search – mobile */}
            <button
              className="lg:hidden p-2 text-[#4a3020] hover:text-[#8d8840] transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-[#4a3020] hover:text-[#8d8840] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="cart-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Cart */}
            <button
              className="relative p-2 text-[#4a3020] hover:text-[#8d8840] transition-colors"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-[#4a3020] hover:text-[#8d8840] transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#c8b89a] bg-white/70 text-sm text-[#4a3020] placeholder-[#a0896a] focus:outline-none focus:ring-2 focus:ring-[#8d8840]/40 transition-all"
                autoFocus
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0896a]"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="hidden lg:block border-t border-[#e0d5c0] bg-[#4a5240]">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-5 py-3 text-sm font-medium text-[#e8dfc8] hover:text-white hover:bg-white/10 tracking-wider uppercase transition-all"
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
          <div className="lg:hidden bg-[#4a5240] border-t border-[#5a6250]">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-6 py-4 text-sm font-medium text-[#e8dfc8] hover:bg-white/10 tracking-wider uppercase border-b border-[#5a6250]/50"
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
