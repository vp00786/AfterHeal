"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, cartTotal } = useStore();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#faf7f0] z-50 shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0d5c0]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#4a3020]" />
            <h2 className="font-serif text-xl text-[#4a3020]">
              Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#e8dfc8] rounded-full transition-colors"
          >
            <X size={20} className="text-[#4a3020]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={48} className="text-[#c8b89a] mb-4" />
              <p className="font-serif text-xl text-[#4a3020] mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-[#8a7060] mb-6">
                Discover our handcrafted collection
              </p>
              <Link
                href="/category/countertops"
                onClick={onClose}
                className="px-6 py-3 bg-[#4a5240] text-[#e8dfc8] text-sm font-medium rounded-full hover:bg-[#3a4230] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#f0e8d0]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base text-[#4a3020] font-medium">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-[#8a7060] mt-0.5">
                    {item.selectedFinish}
                  </p>
                  <p className="text-sm font-semibold text-[#8d8840] mt-1">
                    ₹{item.product.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-[#c8b89a] rounded-full px-2 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-5 h-5 flex items-center justify-center hover:text-[#8d8840] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium text-[#4a3020] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-5 h-5 flex items-center justify-center hover:text-[#8d8840] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 hover:text-red-500 text-[#a0896a] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e0d5c0] px-6 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm text-[#8a7060]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#4a3020] text-base">
                ₹{cartTotal().toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#a0896a]">
              Shipping & taxes calculated at checkout
            </p>
            <button className="w-full py-3.5 bg-[#4a5240] text-[#e8dfc8] font-medium rounded-full hover:bg-[#3a4230] transition-colors text-sm">
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#c8b89a] text-[#4a3020] font-medium rounded-full hover:bg-[#f0e8d0] transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
