import "server-only";

import { getOurToken } from "@/lib/auth";
import { z } from "zod";

const orderSchema = z.object({
  _id: z.string(),
  id: z.number(),
  createdAt: z.string(),
  cartItems: z.array(z.object({
    _id: z.string(),
    count: z.number(),
    price: z.number(),
    product: z.object({
      title: z.string(),
      imageCover: z.string().optional(),
    }).nullable(),
  })),
  totalOrderPrice: z.number(),
  shippingPrice: z.number().optional(),
  taxPrice: z.number().optional(),
  isDelivered: z.boolean(),
  isPaid: z.boolean(),
  paymentMethodType: z.string(),
  shippingAddress: z.object({
    city: z.string().optional(),
    details: z.string().optional(),
    phone: z.string().optional(),
  }).nullish(),
});

export type Order = z.infer<typeof orderSchema>;

export async function getUserOrders(): Promise<Order[]> {
  const token = await getOurToken();
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Unable to identify the signed-in user");
  }

  const payload: unknown = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("id" in payload) ||
    typeof payload.id !== "string" ||
    !/^[a-f\d]{24}$/i.test(payload.id)
  ) {
    throw new Error("Unable to identify the signed-in user");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${payload.id}`,
    { headers: { token }, cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error(`Failed to load orders: HTTP ${response.status}`);
  }

  return z.array(orderSchema).parse(await response.json());
}
