"use client";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ShoppingBag, Tag, Lock, Truck } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { CartProductI } from "@/types/cart.type";
import Image from "next/image";

export default function OrderSummary({
  cartCount,
  totalCartPrice,
  isCheckout,
  cartData,
  isSubmitting = false,
}: {
  cartCount: number;
  totalCartPrice: number;
  isCheckout: boolean;
  cartData: CartProductI[];
  isSubmitting?: boolean;
}) {
  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <Card className="gap-0 overflow-hidden rounded-2xl py-0 shadow-sm">
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="size-5" />
              Order Summary
            </h2>
            <p className="mt-1 text-sm">
              {isCheckout ? (
                <>
                  {cartCount} item{cartCount === 1 ? "" : "s"}
                </>
              ) : (
                <>
                  {cartCount} item{cartCount === 1 ? "" : "s"} in your cart
                </>
              )}
            </p>
          </div>
          {isCheckout ? (
            <>
              <CardContent className="p-5">
                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                  {cartData.map((item) => (
                    <div key={item._id}>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            className="w-full h-full object-contain"
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} x {item.price} EGP
                          </p>
                        </div>
                        <div className="text-sm font-bold text-gray-900 shrink-0">
                          {item.count * item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="border-gray-100 my-4" />
              </CardContent>
            </>
          ) : (
            <>
              <CardContent className="p-6 space-y-5">
                {totalCartPrice < 500 ? (
                  <>
                    <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="size-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Add more {500 - totalCartPrice} EGP for free shipping
                        </span>
                      </div>
                      <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, (totalCartPrice / 500) * 100),
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Truck className="size-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-700">
                          Free Shipping!
                        </p>
                        <p className="text-sm text-green-600">
                          You qualify for free shipping
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </>
          )}
          <div className="space-y-3 p-5">
            <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{totalCartPrice} EGP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span
              className={`font-medium ${totalCartPrice < 500 ? "text-gray-900" : "text-green-500"}`}
            >
              {totalCartPrice < 500 ? "50 EGP" : "Free"}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold">
              {totalCartPrice + (totalCartPrice < 500 ? 50 : 0)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                EGP
              </span>
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled
            className="h-12 w-full border-dashed"
            title="Promo codes are not currently available"
          >
            <Tag />
            Apply Promo Code
          </Button>
          {isCheckout ? (
            <>
              <Button
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-7 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
              >
                {" "}
                <ShoppingBag />
                Place Order
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                size="lg"
                className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-7 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
              >
                <Link className="flex items-center gap-2" href="/checkout">
                  {" "}
                  <Lock />
                  Secure Checkout
                </Link>
              </Button>
            </>
          )}
          </div>
        </Card>
      </div>
    </>
  );
}
