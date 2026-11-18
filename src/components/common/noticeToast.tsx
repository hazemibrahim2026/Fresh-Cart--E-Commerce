"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const messages: Record<string, string> = {
  "already-logged-in": "You are already logged in",
  "login-required": "You must login to view this page",
  "password-changed": "Password changed successfully. Please sign in again.",
};

export default function NoticeToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const notice = searchParams.get("notice");

  useEffect(() => {
    if (notice && messages[notice]) {
      toast.message(messages[notice], { id: notice });
      router.replace(pathname);
    }
  }, [notice, pathname, router]);

  return null;
}
