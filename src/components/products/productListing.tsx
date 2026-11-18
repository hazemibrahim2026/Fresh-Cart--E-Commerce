import React, { Suspense } from "react";
import AddToCartBtn from "@/components/cart/addToCartBtn";
import AddToWishlistBtn from "@/components/products/addToWishlistBtn";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, PackageOpen, Star } from "lucide-react";
import { FaFilter, FaTags, FaXmark } from "react-icons/fa6";
import ProductsLoader from "@/components/products/productsLoader";

import { ProductI } from "@/types/product.type";

export default function ProductListing({
  products,
  brandName,
  brandImage,
  subcategoryName,
}: {
  products: ProductI[];
  brandName?: string;
  brandImage?: string;
  subcategoryName?: string;
}) {
  const filterName = brandName ?? subcategoryName;

  

  return (
    <>
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            {brandName && (
              <>
                <Link className="hover:text-white transition-colors" href="/brands">
                  Brands
                </Link>
                <span className="text-white/40">/</span>
              </>
            )}
            <span className="text-white font-medium">{brandName ?? "All Products"}</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              {brandImage ? (
                <Image
                  src={brandImage}
                  alt={brandName ? `${brandName} logo` : ""}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <PackageOpen className="text-3xl" size={30} />
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {brandName ?? "All Products"}
              </h1>
              <p className="text-white/80 mt-1">
                {brandName
                  ? `Explore products from ${brandName}`
                  : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {filterName && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FaFilter aria-hidden="true" />
              Active Filters:
            </span>
            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
              href="/products"
              aria-label={`Remove ${filterName} filter`}
            >
              <FaTags className="text-xs" aria-hidden="true" />
              {filterName}
              <FaXmark className="text-xs" aria-hidden="true" />
            </Link>
            <Link className="text-sm text-gray-500 hover:text-gray-700 underline" href="/products">
              Clear all
            </Link>
          </div>
        )}
        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} products
        </div>
        {products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}
        <Suspense fallback={<ProductsLoader />}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-6">
            {products.map((product) => (
            <div key={product._id} className="flex">
              <Card
                className="relative w-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-none transition hover:shadow-lg hover:-translate-y-1.5"
                style={{
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="absolute z-30 aspect-video " />
                <Link href={`/products/${product._id}`}>
                  <div className="relative">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-60 object-contain bg-white"
                    />
                    {product.priceAfterDiscount ? (
                      <>
                        <div className="absolute top-0 left-3">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded"> -
                            {(() => {
                              const discount = Math.round(
                                ((product.price - product.priceAfterDiscount) /
                                  product.price) *
                                  100,
                              );
                              return discount;
                            })()}
                          %</span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </Link>
                  <div className="absolute top-3 right-3 z-40 flex flex-col space-y-2">
                    <AddToWishlistBtn productId={product._id} />
                    <Button
                      asChild
                      className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-green-600 hover:bg-transparent"
                    >
                      <Link
                        href={`/products/${product._id}`}
                        aria-label={`View ${product.title}`}
                      >
                        <Eye aria-hidden="true" size={16} />
                      </Link>
                    </Button>
                  </div>
                  <Link href={`/products/${product._id}`}>
                  <CardHeader className="grow">
                    <p className="text-xs text-gray-500 my-1">
                      {product.category.name}
                    </p>
                    <CardTitle className="font-medium mb-1 cursor-pointer line-clamp-2">
                      {product.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      {[0, 1, 2, 3, 4].map((star) => {
                        const filledStar =
                          star < Math.floor(product.ratingsAverage);
                        return (
                          <React.Fragment key={star}>
                            <Star
                              className={
                                filledStar
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-gray-300 fill-gray-300"
                              }
                              size={16}
                            />
                          </React.Fragment>
                        );
                      })}
                      <span className="text-sm md:text-base">
                        {product.ratingsAverage}
                      </span>
                      <span className="text-sm md:text-base">
                        ({product.ratingsQuantity})
                      </span>
                    </div>
                  </CardHeader>
                </Link>
                <CardFooter className="mt-auto">
                  <div className="flex w-full items-center justify-between">
                    {product.priceAfterDiscount ? <>
                    <span className="text-lg font-bold text-green-600">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">{product.price} EGP</span>
                    </>: <>
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.price} EGP
                    </h3>
                    </>}
                    <AddToCartBtn productId={product._id} variant="card" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
