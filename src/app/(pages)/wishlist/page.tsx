"use client";
import {
  deleteProductfromWishlist,
  getLoggedUserWishlist,
} from "@/actions/wishlist.actions";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { ProductI } from "@/types/product.type";
import AddToCartBtn from "@/components/cart/addToCartBtn";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

export default function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<ProductI[]>([]);
  const [removingProductId, setRemovingProductId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let isActive = true;

    async function getWishlist() {
      try {
        const response = await getLoggedUserWishlist();
        if (isActive) {
          setWishlist(response.data);
        }
      } catch (error) {
        if (isActive) {
          console.error(error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void getWishlist();
    return () => {
      isActive = false;
    };
  }, []);

  async function removeFromWishlist(productId: string) {
    setRemovingProductId(productId);
    try {
      const response = await deleteProductfromWishlist(productId);
      setWishlist((currentWishlist) =>
        currentWishlist.filter((item) => item._id !== productId),
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove product from wishlist",
      );
    } finally {
      setRemovingProductId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-screen justify-center items-center">
        <h2 className="text-xl md:text-2xl lg:text-5xl text-green-600 font-black">
          Loading...
        </h2>
        <Spinner className="size-7 text-green-600" />
      </div>
    );
  }

  if (wishlist.length > 0) {
    return (
      <>
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="hover:text-green-600 transition-colors"
                    href="/"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 font-medium">
                    Wishlist
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <FaHeart className="text-red-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Wishlist
                  </h1>
                  <p className="text-gray-500 text-sm">
                    {wishlist.length} items saved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Action</div>
            </div>
            <div className="divide-y divide-gray-100">
              {wishlist.map((item) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                  key={item._id}
                >
                  <div className="md:col-span-6 flex items-center gap-4">
                    <Link
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                      href={`/products/${item._id}`}
                    >
                      <Image
                        src={item.imageCover}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain p-2"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/products/${item._id}`}
                        className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.category.name}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                    <span className="md:hidden text-sm text-gray-500">
                      Price: {item.price} EGP
                    </span>
                    <div className="text-right md:text-center">
                      {item.priceAfterDiscount ? (
                        <>
                          <div className="font-semibold text-gray-900">
                            {item.priceAfterDiscount} EGP
                          </div>
                          <div className="text-sm text-gray-400 line-through">
                            {item.price} EGP
                          </div>
                        </>
                      ) : (
                        <div className="font-semibold text-gray-900">
                          {item.price} EGP
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2 flex md:justify-center">
                    <span className="md:hidden text-sm text-gray-500 mr-2">
                      Status:
                    </span>
                    {item.quantity > 0 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                    <AddToCartBtn productId={item._id} variant="icon" />
                    <Button
                      type="button"
                      variant="ghost"
                      aria-label={`Remove ${item.title} from wishlist`}
                      onClick={() => void removeFromWishlist(item._id)}
                      disabled={removingProductId === item._id}
                      className="w-10 h-10 rounded-lg border border-gray-200 bg-transparent flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                    >
                      {removingProductId === item._id ? (
                        <Spinner className="size-4" />
                      ) : (
                        <FaTrash aria-hidden="true" className="text-sm" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>            
          </div>
          <div className="mt-8 flex items-center justify-between">
                <Link href="/products" className="flex items-center gap-1 text-gray-500 hover:text-green-600 text-sm font-medium transition-colors">
                  <FaArrowLeftLong className="text-sm" /> Continue Shopping
                </Link>
            </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-3xl text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Browse products and save your favorites here. Sign in to sync your
            wishlist across devices.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Products <FaArrowRightLong className="text-sm" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
