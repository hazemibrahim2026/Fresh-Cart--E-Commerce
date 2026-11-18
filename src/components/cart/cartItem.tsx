"use client";
import { deleteProductfromCart, updateCartProductQty } from "@/actions/cart.actions";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check, Minus, Plus, Trash2, X } from "lucide-react";
import { CartProductI } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useCartCount } from "@/context/CartCountContext";
import { calculateTotalProducts } from "@/lib/utils";

export default function CartItem({
  product,
  setProducts,
}: {
  product: CartProductI;
  setProducts: (products : CartProductI[]) => void;
}) {
  const { setCartCount } = useCartCount();
  
  const quantityButtonDisabledStyles =
    "disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:hover:bg-muted disabled:hover:text-muted-foreground";

  async function deleteFromCart(id: string) {
    try {
      const response = await deleteProductfromCart(id);
      toast.success(response.message);
      setProducts(response.data.products);
      if (response.data && response.data.products) {
        const totalProducts = calculateTotalProducts(response);
        setCartCount(totalProducts);
      }
    } catch {
      toast.error("Failed to delete product");
    }
  }

  async function updateQty(id: string, count: number) {    
    try {
      const response = await updateCartProductQty(id, count);
      toast.success(response.message);
      setProducts(response.data.products);
      if (response.data && response.data.products) {
        const totalProducts = calculateTotalProducts(response);
        setCartCount(totalProducts);
      }
    } catch {
      toast.error("Failed to update quantity");
    }
  }

  return (
    <>
      <Card className="rounded-2xl py-0 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row">
          <div className="flex flex-col items-end gap-2">
            <Link href={`/products/${product.product.id}`}>
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                <Image
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                  src={product.product.imageCover}
                  alt={product.product.title}
                  width={200}
                  height={200}
                />
              </div>
            </Link>
            {product.product.quantity > 0 ? <>
            <span className="bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 "><Check size={12} /> In Stock</span>
            </> : <>
            <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"><X size={12} /> Out of Stock</span>
            </>}
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-lg font-semibold">{product.product.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                  {product.product.category.name}
                </span>
              </div>
            </div>

            <p className="text-green-600 font-bold text-lg">
              {product.price} EGP
              <span className="text-sm font-normal ml-2 text-muted-foreground">
                per unit
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-input p-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Decrease quantity"
                  className={quantityButtonDisabledStyles}
                  disabled={product.count === 1}
                  onClick={() => updateQty(product.product.id, product.count - 1)}
                >
                  <Minus />
                </Button>
                <span className="min-w-6 text-center font-medium">
                  {product.count}
                </span>
                <Button
                  size="icon-sm"
                  aria-label="Increase quantity"
                  className={quantityButtonDisabledStyles}
                  onClick={() => updateQty(product.product.id, product.count + 1)}
                >
                  <Plus />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">
                    {product.count * product.price}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      EGP
                    </span>
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon-lg"
                  aria-label={`Remove ${product.product.title} from cart`}
                  onClick={() => deleteFromCart(product.product.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
