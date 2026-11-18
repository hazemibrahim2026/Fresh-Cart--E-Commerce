"use server"
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

export async function addProductToWishlist(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v1/wishlist`, {
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

export async function getLoggedUserWishlist() {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v1/wishlist`, {
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

export async function deleteProductfromWishlist(productId: string) {
  const token = await getOurToken();
  const response = await fetch(`${baseURL}/api/v1/wishlist/${productId}`, {
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