import React from "react";
import { getProductDetails } from "@/services/product.services";
import { ProductDetailsI } from "@/types/productDetails.type";
import ProductSlider from "@/components/products/productSlider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  House,
  Share2,
  Shield,
  Star,
  Truck,
  Undo2,
} from "lucide-react";
import Link from "next/link";
import QuantitySelector from "@/components/products/quantity-selector";
import { Button } from "@/components/ui/button";
import AddToCartBtn from "@/components/cart/addToCartBtn";
import AddToWishlistBtn from "@/components/products/addToWishlistBtn";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProductDetails(id);
  const product: ProductDetailsI = response.data;
  const currentPrice = product.priceAfterDiscount ?? product.price;

  return (
    <>
      <div className="breadcrumb py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-2 ml-4" href="/">
                <House size={16} /> Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">
                {product.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              {/* sider */}
              <ProductSlider images={product.images} />
            </div>
            <div className="lg:w-3/4">
              {/* product details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    className="bg-green/50 text-green-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary/20 transition"
                    href="/categories"
                  >
                    {product.category.name}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {product.brand.name}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3 mb-4">
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
                        />
                      </React.Fragment>
                    );
                  })}
                  <span className="text-sm text-gray-600">
                    {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {currentPrice} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {product.price} EGP
                      </span>
                      <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                        Save %
                        {Math.round(
                          ((product.price - product.priceAfterDiscount) /
                            product.price) *
                            100,
                        )}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {product.quantity > 2
                      ? "In Stock"
                      : `Only ${product.quantity} items left in stock`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <QuantitySelector max={product.quantity} />
                    <div className="text-sm text-gray-500">
                      {product.quantity} available
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {currentPrice.toFixed(2)} EGP
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <AddToCartBtn productId={product._id} variant="detail"/>                   
                  <AddToCartBtn productId={product._id} variant="buy-now" />
                </div>
                <div className="flex gap-3 mb-6">
                  <AddToWishlistBtn productId={product._id} variant="detail" />
                  <Button className="border-2 border-gray-200 text-gray-700 py-6 px-4 rounded-xl bg-transparent hover:bg-transparent hover:border-green-300 hover:text-green-600 transition">
                    <Share2 className="size-5" />
                  </Button>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <Truck className="size-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <Undo2 className="size-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                        <Shield className="size-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
