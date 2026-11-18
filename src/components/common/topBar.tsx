import Link from "next/link";
import { Gift, LogOut, Mail, Phone, Truck, User2, UserPlus } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

interface TopBarProps {
  status: string;
  userName?: string;
  signOutUser: () => void;
}

export default function TopBar({ status, userName, signOutUser }: TopBarProps) {
  return (
    <div className="hidden border-b border-gray-100 text-sm lg:block">
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-between *:font-semibold">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <Truck className="size-3.5 text-green-600" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-2">
              <Gift className="size-3.5 text-green-600" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <Link
                href="tel:+18001234567"
                className="flex items-center gap-1.5 transition-colors hover:text-green-600"
              >
                <Phone className="size-3.5" />
                +1 (800) 123-4567
              </Link>
              <Link
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 transition-colors hover:text-green-600"
              >
                <Mail className="size-3.5" />
                support@freshcart.com
              </Link>
            </div>
            <span className="w-px h-4 bg-gray-200"></span>
            <div className="flex items-center gap-4 text-gray-500">
              {status === "unauthenticated" ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 hover:text-green-600"
                  >
                    <User2 className="size-3.5" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 hover:text-green-600"
                  >
                    <UserPlus className="size-3.5" />
                    Sign Up
                  </Link>
                </>
              ) : status === "authenticated" ? (
                <>
                  <Link
                    className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
                    href={userName ? `/profile/${encodeURIComponent(userName)}` : "/login"}
                  >
                    <User2 className="size-3.5" />
                    {userName}
                  </Link>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors hover:bg-transparent"
                    onClick={signOutUser}
                  >
                    <LogOut className="size-3.5" />
                    Sign Out
                  </Button>
                </>
              ): <Spinner  />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
