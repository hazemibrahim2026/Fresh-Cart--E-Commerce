"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  CircleUser,
  Headset,
  Heart,
  LogOut,
  Menu,
  PackageOpen,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import logo from "@/assets/imgi_1_freshcart-logo.49f1b44d.svg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import TopBar from "@/components/common/topBar";
import SearchBar from "@/components/common/searchBar";
import { useCartCount } from "@/context/CartCountContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CategoryI } from "@/types/category.type";
import { createNavLinks } from "@/lib/nav-links";



export default function Navbar({categories} : {categories: CategoryI[]}) {
  const navLinks = createNavLinks(categories);
  const session = useSession();
  const status = session.status;
  const userName = session.data?.user?.name ?? "";
  const { cartCount } = useCartCount();

  function signOutUser() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }
  return (
    <>
      <TopBar status={status} userName={userName} signOutUser={signOutUser} />
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-18 lg:gap-8">
            <Link href="/" aria-label="FreshCart home" className="shrink-0">
              <Image
                src={logo}
                alt="FreshCart"
                priority
                className="h-6 w-auto lg:h-8"
              />
            </Link>

            <SearchBar className="hidden max-w-2xl flex-1 lg:flex" />

            <nav className="hidden items-center gap-6 xl:flex">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href} className="group relative">
                    <button
                      type="button"
                      className="flex items-center cursor-pointer gap-1.5 py-2 font-medium text-gray-700 transition-colors hover:text-green-600"
                    >
                      {link.label}
                      <ChevronDown className="size-2.5" />
                    </button>
                    <div className="invisible absolute top-full left-0 pt-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="min-w-50 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium text-gray-700 transition-colors hover:text-green-600"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-1 lg:gap-2">
              <a
                href="mailto:support@freshcart.com"
                className="mr-2 hidden items-center gap-2 border-r border-gray-200 pr-3 transition-opacity hover:opacity-80 lg:flex"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-green-50">
                  <Headset className="size-5 text-green-600" />
                </div>
                <div className="text-xs">
                  <div className="text-gray-400">Support</div>
                  <div className="font-semibold text-gray-700">24/7 Help</div>
                </div>
              </a>

              <Link
                href="/wishlist"
                title="Wishlist"
                aria-label="Wishlist"
                className="relative rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Heart className="size-5" />
              </Link>
              <Link
                href="/cart"
                title="Cart"
                aria-label={`Cart${cartCount > 0 ? `, ${cartCount} item${cartCount === 1 ? "" : "s"}` : ""}`}
                className="relative rounded-full p-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <ShoppingCart className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {session.status == "loading" ? (
                <Spinner />
              ) : session.status == "authenticated" ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                        variant="ghost"
                        size="icon"
                      >
                        <CircleUser className="size-5 text-gray-500 group-hover:text-green-600 transition-colors" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="p-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CircleUser className="size-5 text-xl text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-800 truncate">
                                {userName}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {session.data?.user?.email}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuLabel>

                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                          href={userName ? `/profile/${encodeURIComponent(userName)}` : "/login"}
                        >
                          <User className="size-4" />
                          My Profile
                        </Link>

                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                          href="/allorders"
                        >
                          <PackageOpen className="size-4" />
                          My Orders
                        </Link>

                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                          href="/wishlist"
                        >
                          <Heart className="size-4" />
                          My Wishlist
                        </Link>

                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />

                      <Button
                        onClick={signOutUser}
                        variant="ghost"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="size-4" />
                        Sign out
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link
                    className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-green-600/20"
                    href="/login"
                  >
                    Sign in
                  </Link>
                </>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    aria-label="Open menu"
                    className="ml-1 size-10 rounded-full bg-green-600 text-white hover:bg-green-700 lg:hidden"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  showCloseButton={false}
                  aria-describedby={undefined}
                  className="w-full max-w-95 overflow-y-auto bg-white sm:max-w-95"
                >
                  <SheetHeader className="flex-row items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-5">
                    <SheetTitle>
                      <Image
                        src={logo}
                        alt="FreshCart"
                        className="h-8 w-auto"
                      />
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Close menu"
                        className="size-11 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        <X className="size-5" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <div className="border-b border-gray-100 px-5 py-5">
                    <SearchBar mobile />
                  </div>
                  <div className="px-5">
                    <nav aria-label="Mobile navigation" className="border-b border-gray-100 py-5">
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-lg px-5 py-4 text-xl text-slate-800 transition-colors hover:bg-green-50 hover:text-green-600"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="space-y-2 border-b border-gray-100 py-5">
                      <SheetClose asChild>
                        <Link href="/wishlist" className="flex items-center gap-4 rounded-lg px-5 py-2.5 text-xl text-slate-800 transition-colors hover:bg-green-50">
                          <span className="flex size-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                            <Heart className="size-5" />
                          </span>
                          Wishlist
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/cart" className="flex items-center gap-4 rounded-lg px-5 py-2.5 text-xl text-slate-800 transition-colors hover:bg-green-50">
                          <span className="flex size-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <ShoppingCart className="size-5" />
                          </span>
                          Cart
                          {cartCount > 0 && (
                            <span className="ml-auto text-sm font-semibold text-green-600">{cartCount}</span>
                          )}
                        </Link>
                      </SheetClose>
                    </div>

                    <div className="py-7">
                      {status === "loading" ? (
                        <div className="flex h-16 items-center justify-center"><Spinner /></div>
                      ) : status === "authenticated" ? (
                        <Button
                          type="button"
                          onClick={signOutUser}
                          className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-base font-semibold text-white hover:bg-red-700"
                        >
                          <LogOut className="size-4" />
                          Sign Out
                        </Button>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          <SheetClose asChild>
                            <Link href="/login" className="flex h-16 items-center justify-center rounded-2xl bg-green-600 text-lg font-semibold text-white transition-colors hover:bg-green-700">
                              Sign In
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/register" className="flex h-16 items-center justify-center rounded-2xl border-2 border-green-600 text-lg font-semibold text-green-600 transition-colors hover:bg-green-50">
                              Sign Up
                            </Link>
                          </SheetClose>
                        </div>
                      )}
                    </div>

                    <a href="mailto:support@freshcart.com" className="mb-5 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5 transition-colors hover:bg-green-50">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Headset className="size-5" />
                      </span>
                      <span className="text-base">
                        <span className="block font-medium text-slate-800">Need Help?</span>
                        <span className="block text-green-600">Contact Support</span>
                      </span>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
