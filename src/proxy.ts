import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthPages = pathname == "/login" || pathname == "/register";
  if (token && isAuthPages) {
    return NextResponse.redirect(new URL("/?notice=already-logged-in", request.url));
  }
  if (!token && !isAuthPages) {
    return NextResponse.redirect(new URL("/login?notice=login-required", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/checkout",
    "/allorders",
    "/wishlist",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
