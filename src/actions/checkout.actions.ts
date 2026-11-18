"use server";
import { getOurToken } from "@/lib/auth";
import type { CheckoutSchemaType } from "@/lib/schemas/checkout.schema";
import { headers } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function handleFetchError(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `HTTP ${response.status}`;
    throw new Error(errorMessage);
  }
  return response;
}

export async function onlinePayment(cartId: string, formData: CheckoutSchemaType) {
  const token = await getOurToken();
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const origin =
    requestHeaders.get("origin") ||
    process.env.NEXTAUTH_URL ||
    (forwardedHost ? `https://${forwardedHost}` : undefined) ||
    "http://localhost:3000";
  const response = await fetch(
    `${baseURL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(origin)}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress: formData }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  await handleFetchError(response);
  const data = await response.json();
  return data;
}

export async function cashPayment(cartId: string, formData: CheckoutSchemaType) {
  const token = await getOurToken();
  const response = await fetch(
    `${baseURL}/api/v1/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress: formData }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );
  await handleFetchError(response);
  const data = await response.json();
  return data;
}
