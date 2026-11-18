"use client";

import { getLoggedUserCart } from "@/actions/cart.actions";
import type { CartDataI } from "@/types/cart.type";
import { calculateTotalProducts } from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useSession } from "next-auth/react";

interface CartCountContextValue {
  cartCount: number;
  setCartCount: (count: number) => void;
}

const CartCountContext = createContext<CartCountContextValue | null>(null);

export function CartCountProvider({ children }: { children: ReactNode }) {
  const [storedCartCount, setStoredCartCount] = useState(0);
  const cartCountVersion = useRef(0);
  const { status } = useSession();
  const setCartCount = useCallback((count: number) => {
    cartCountVersion.current += 1;
    setStoredCartCount(count);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      cartCountVersion.current += 1;
      return;
    }

    if (status !== "authenticated") {
      return;
    }

    let isActive = true;
    const requestVersion = cartCountVersion.current;

    async function loadCartCount() {
      try {
        const response: CartDataI = await getLoggedUserCart();
        if (!response.data || !response.data.products) {
          throw new Error(response.message || "Cart data is missing");
        }

        const totalProducts = calculateTotalProducts(response);

        if (isActive && requestVersion === cartCountVersion.current) {
          setStoredCartCount(totalProducts);
        }
      } catch (error) {
        console.error("Failed to load cart count", error);
      }
    }

    void loadCartCount();

    return () => {
      isActive = false;
    };
  }, [status]);

  const cartCount = status === "authenticated" ? storedCartCount : 0;

  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error("useCartCount must be used within a CartCountProvider");
  }

  return context;
}
