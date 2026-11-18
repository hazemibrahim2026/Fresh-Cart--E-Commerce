import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";
import { getUserOrders, type Order } from "@/services/orders.services";
import { connection } from "next/server";

const money = (amount: number) => `${amount.toLocaleString("en-US")} EGP`;

function OrderCard({ order, open }: { order: Order; open: boolean }) {
  const items = order.cartItems;
  const itemCount = items.reduce((total, item) => total + item.count, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.count, 0);
  const date = new Date(order.createdAt);
  const address = order.shippingAddress;

  return (
    <details open={open} className="group rounded-2xl border border-gray-100 bg-white shadow-sm open:border-green-200 open:shadow-md">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          {items[0]?.product?.imageCover ? (
            <Image src={items[0].product.imageCover} alt="" width={64} height={64} className="size-full object-contain p-1" />
          ) : (
            <Package className="size-7 text-gray-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
          <p className="mt-1 font-bold text-gray-900"># {order.id}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><CalendarDays className="size-3" />{Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
            <span className="flex items-center gap-1"><ShoppingBag className="size-3" />{itemCount} item{itemCount === 1 ? "" : "s"}</span>
            {address?.city && <span className="flex items-center gap-1"><MapPin className="size-3" />{address.city}</span>}
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
          <span className="text-lg font-bold text-gray-900">{money(order.totalOrderPrice)}</span>
          <span className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 group-open:bg-green-600 group-open:text-white">
            <span className="group-open:hidden">Details</span>
            <span className="hidden group-open:inline">Hide details</span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </span>
        </div>
      </summary>

      <div className="space-y-4 border-t border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900">Order Items</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white">
                {item.product?.imageCover ? (
                  <Image src={item.product.imageCover} alt="" width={48} height={48} className="size-full object-contain p-1" />
                ) : <Package className="size-5 text-gray-400" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900">{item.product?.title ?? "Product unavailable"}</p>
                <p className="text-xs text-gray-500">{item.count} x {money(item.price)}</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">{money(item.price * item.count)}</span>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900"><MapPin className="size-4 text-blue-600" />Delivery Address</h3>
            {address && (address.city || address.details || address.phone) ? (
              <div className="space-y-1 text-sm text-gray-600">
                {address.city && <p className="font-medium text-gray-900">{address.city}</p>}
                {address.details && <p>{address.details}</p>}
                {address.phone && <p className="flex items-center gap-2"><Phone className="size-3" />{address.phone}</p>}
              </div>
            ) : <p className="text-sm text-gray-500">Address unavailable</p>}
          </div>
          <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900"><ReceiptText className="size-4 text-amber-600" />Order Summary</h3>
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            {typeof order.shippingPrice === "number" && <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{money(order.shippingPrice)}</span></div>}
            {typeof order.taxPrice === "number" && order.taxPrice > 0 && <div className="flex justify-between text-gray-600"><span>Tax</span><span>{money(order.taxPrice)}</span></div>}
            <div className="flex justify-between border-t border-amber-200 pt-2 font-bold text-gray-900"><span>Total</span><span>{money(order.totalOrderPrice)}</span></div>
            <p className="text-xs text-gray-600">{order.isPaid ? "Paid" : "Payment pending"}{order.paymentMethodType ? ` · ${order.paymentMethodType === "cash" ? "Cash on delivery" : order.paymentMethodType}` : ""}</p>
          </div>
        </div>
      </div>
    </details>
  );
}

export default async function AllOrders() {
  await connection();
  let orders: Order[];
  try {
    orders = await getUserOrders();
  } catch (error) {
    console.error("Failed to load orders", error);
    return (
      <div className="container mx-auto min-h-[50vh] px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Unable to load your orders</h1>
        <p className="mt-2 text-gray-500">Please try again.</p>
        <a href="/allorders" className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white">Try Again</a>
      </div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <main className="container mx-auto min-h-[60vh] px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-white"><ShoppingBag className="size-6" /></span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="mt-1 text-sm text-gray-500">Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}</p>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"><ArrowLeft className="size-4" />Continue Shopping</Link>
      </div>
      {sortedOrders.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
          <Package className="mx-auto size-12 text-gray-300" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">No orders yet</h2>
          <p className="mt-2 text-gray-500">Your orders will appear here once you place one.</p>
          <Link href="/products" className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order, index) => <OrderCard key={order._id} order={order} open={index === 0} />)}
        </div>
      )}
    </main>
  );
}
