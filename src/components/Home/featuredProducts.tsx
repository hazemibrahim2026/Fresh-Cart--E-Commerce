import { ProductI } from "@/types/product.type";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Eye, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import AddToCartBtn from "../cart/addToCartBtn";
import AddToWishlistBtn from "../products/addToWishlistBtn";
import { getAllProducts } from "@/services/product.services";

export default async function featuredProducts() {
  const response = await getAllProducts();
  const products: ProductI[] = response.data;

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800">
              Featured <span className="text-emerald-600">Products</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                      {product.priceAfterDiscount && (
                        <>
                          <div className="absolute top-0 left-3">
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                              {" "}
                              -
                              {(() => {
                                const discount = Math.round(
                                  ((product.price -
                                    product.priceAfterDiscount) /
                                    product.price) *
                                    100,
                                );
                                return discount;
                              })()}
                              %
                            </span>
                          </div>
                        </>
                      )}
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
                      {product.priceAfterDiscount ? (
                        <>
                          <span className="text-lg font-bold text-green-600">
                            {product.priceAfterDiscount} EGP
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {product.price} EGP
                          </span>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-bold text-gray-800">
                            {product.price} EGP
                          </h3>
                        </>
                      )}
                      <AddToCartBtn productId={product._id} variant="card" />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
