export { cn } from "cn"
import type { CartDataI } from "@/types/cart.type"

export function calculateTotalProducts(cartData: CartDataI): number {
  return cartData.data.products.reduce((total, product) => total + product.count, 0)
}
