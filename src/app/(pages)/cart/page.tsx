"use client";
import { CartDataI, CartProductI } from "@/types/cart.type";
import Link from "next/link";
import { getLoggedUserCart, clearUserCart } from "@/actions/cart.actions";
import {
  ArrowLeft,
  ArrowRight,
  PackageOpen,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/cart/cartItem";
import OrderSummary from "@/components/cart/orderSummary";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useCartCount } from "@/context/CartCountContext";
import { calculateTotalProducts } from "@/lib/utils";

export default function CartPage() {
  const [products, setProducts] = useState<CartProductI[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cartCount, setCartCount } = useCartCount();
  const totalCartPrice = products.reduce(
    (total, product) => total + product.price * product.count,
    0,
  );

  useEffect(() => {
    let isActive = true;

    async function getCart() {
      try {
        const response: CartDataI = await getLoggedUserCart();
        if (isActive) {
          setProducts(response.data.products);
          setCartCount(calculateTotalProducts(response));
        }
      } catch (error) {
        if (isActive) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load cart",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void getCart();
    return () => {
      isActive = false;
    };
  }, [setCartCount]);

  async function clearCart() {
    try {
      const response = await clearUserCart();
      setProducts([]);
      setCartCount(0);
      toast.success(response.message);
    } catch {
      toast.error("Failed to clear cart");
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-4 h-screen justify-center items-center">
          <h2 className="text-xl md:text-2xl lg:text-5xl text-green-600 font-black">
            Loading...
          </h2>
          <Spinner className="size-7 text-green-600" />
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
                <PackageOpen size={48} className="text-gray-300" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Looks like you haven&apos;t added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-linear-to-r from-green-600 to-green-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  href="/categories"
                  className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                >
                  Electronics
                </Link>
                <Link
                  href="/categories"
                  className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                >
                  Fashion
                </Link>
                <Link
                  href="/categories"
                  className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className="px-4 py-2 bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-600 rounded-full text-sm font-medium transition-colors  "
                >
                  Beauty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto my-6 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-6">
        <div className="flex items-center gap-3">
          <span className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
            <ShoppingCart className="size-6" />
          </span>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Shopping Cart
          </h1>
        </div>
        <p className="text-gray-500 mt-2">
          You have{" "}
          <span className="font-semibold text-green-600">
            {cartCount} item{cartCount === 1 ? "" : "s"}
          </span>{" "}
          in your cart
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Cart items */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          {products.map((product) => (
            <CartItem
              key={product._id}
              setProducts={setProducts}
              product={product}
            />
          ))}
          <Separator />

          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="size-4" />
              Continue Shopping
            </Link>
            <Button onClick={clearCart} variant="ghost" className="text-muted-foreground">
              <Trash2 />
              Clear all items
            </Button>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary isCheckout={false} cartCount={cartCount} totalCartPrice={totalCartPrice} cartData={products} />
      </div>
    </div>
  );
}
