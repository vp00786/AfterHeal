"use client";

import { create } from "zustand";
import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish: string;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, finish?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: () => number;
  cartTotal: () => number;
}

export const useStore = create<CartStore>((set, get) => ({
  items: [],
  wishlist: [],

  addToCart: (product, quantity = 1, finish) => {
    const existingIndex = get().items.findIndex(
      (item) => item.product.id === product.id
    );
    if (existingIndex >= 0) {
      const newItems = [...get().items];
      newItems[existingIndex].quantity += quantity;
      set({ items: newItems });
    } else {
      set({
        items: [
          ...get().items,
          {
            product,
            quantity,
            selectedFinish: finish || product.woodFinish,
          },
        ],
      });
    }
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const newItems = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
  },

  clearCart: () => set({ items: [] }),

  toggleWishlist: (productId) => {
    const wishlist = get().wishlist;
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },

  isInWishlist: (productId) => get().wishlist.includes(productId),

  cartCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  cartTotal: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
}));
