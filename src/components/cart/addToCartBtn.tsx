"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { addProductToCart } from "@/actions/cart.actions";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useCartCount } from "@/context/CartCountContext";
import { calculateTotalProducts } from "@/lib/utils";
import { Zap } from "lucide-react";

export default function AddToCartBtn({
  productId,
  variant,
}: {
  productId: string;
  variant: "card" | "detail" | "icon" | "buy-now";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount } = useCartCount();

  async function addToCart() {
    setIsLoading(true);
    try {
      const response = await addProductToCart(productId);
      if (response.data && response.data.products) {
        const totalProducts = calculateTotalProducts(response);
        setCartCount(totalProducts);
      }

      toast.success(response.message);
      if (variant === "buy-now") {
        router.push("/checkout");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart",
      );
      if (error instanceof Error && error.message.toLowerCase().includes("login")) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {variant === "icon" ? (
        <Button
          aria-label="Add to cart"
          disabled={isLoading}
          onClick={() => addToCart()}
          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700"
        >
          {isLoading ? <Spinner /> : <ShoppingCart aria-hidden="true" />}
        </Button>
      ) : variant === "card" ? (
        <>
          <Button
            onClick={() => addToCart()}
            disabled={isLoading}
            className="h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="flex items-center">
                  <Spinner></Spinner>
                </span>
              </>
            ) : (
              <FaPlus />
            )}
          </Button>
        </>
      ) : (
        <Button
          onClick={() => addToCart()}
          disabled={isLoading}
          className={
            variant === "buy-now"
              ? "flex-1 bg-gray-900 text-white py-3.5 h-full px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center text-md justify-center gap-2"
              : "flex-1 text-white py-3.5 h-full px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600"
          }
        >
          {isLoading ? (
            <>
              <span className="flex items-center">
                <Spinner></Spinner>
              </span>
            </>
          ) : (
            <>
              {variant === "buy-now" ? (
                <>
                  <Zap className="size-5" fill="white" />
                  Buy Now
                </>
              ) : (
                <>
                  <ShoppingCart className="size-5" fill="white" />
                  Add to Cart
                </>
              )}
            </>
          )}
        </Button>
      )}
    </>
  );
}
