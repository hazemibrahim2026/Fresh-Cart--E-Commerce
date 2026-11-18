"use server";
import { getOurToken } from "@/lib/auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

async function handleFetchError(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `HTTP ${response.status}`;
    throw new Error(errorMessage);
  }
  return response;
}

export async function addProductToCart(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  await handleFetchError(response);
  const data = await response.json();
  return data;
}

export async function getLoggedUserCart() {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v2/cart`, {
    method: "GET",

    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  await handleFetchError(response);
  const data = await response.json();
  return data;
}

export async function deleteProductfromCart(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  await handleFetchError(response);
  const data = await response.json();
  return data;
}

export async function updateCartProductQty(productId: string, count: number) {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v2/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  await handleFetchError(response);
  const data = await response.json();
  return data;
}

export async function clearUserCart() {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  await handleFetchError(response);
  const data = await response.json();
  return data;
}