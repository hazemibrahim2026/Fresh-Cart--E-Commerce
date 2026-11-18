import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getOurToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__Secure-next-auth.session-token")?.value
    ?? cookieStore.get("next-auth.session-token")?.value;
  if (!token) { 
    throw new Error("Please Login to add products to your cart");
  }
  const decodedToken = await decode({ token : token, secret: process.env.NEXTAUTH_SECRET ! });
  return decodedToken!.token as string;
}