"use client";

import { addProductToWishlist } from "@/actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { toast } from "sonner";

export default function AddToWishlistBtn({
  productId,
  variant = "icon",
}: {
  productId: string;
  variant?: "icon" | "detail";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  async function addToWishlist(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    try {
      const response = await addProductToWishlist(productId);
      setIsAdded(true);
      toast.success(response.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add to wishlist");
      if (error instanceof Error && error.message.toLowerCase().includes("login")) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    variant === "detail" ? (
      <Button
        type="button"
        disabled={isLoading}
        onClick={(event) => void addToWishlist(event)}
        className={`flex-1 border-2 py-6 px-4 rounded-xl bg-transparent hover:bg-transparent font-medium transition flex items-center justify-center gap-2 border-gray-200 ${
          isAdded
            ? "text-red-500 hover:text-red-500"
            : "text-gray-700 hover:border-green-300 hover:text-green-600"
        }`}
      >
        {isLoading ? <Spinner /> : <Heart className={`size-5 ${isAdded ? "fill-red-500" : ""}`} />}
        {isAdded ? "Added to Wishlist" : "Add to Wishlist"}
      </Button>
    ) : (
      <Button
        type="button"
        aria-label={isAdded ? "Added to wishlist" : "Add to wishlist"}
        aria-pressed={isAdded}
        disabled={isLoading}
        onClick={(event) => void addToWishlist(event)}
        className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm hover:bg-transparent ${
          isAdded ? "text-red-500" : "text-gray-600 hover:text-red-500"
        }`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Heart
            aria-hidden="true"
            size={16}
            className={isAdded ? "fill-red-500" : ""}
          />
        )}
      </Button>
    )
  );
}
