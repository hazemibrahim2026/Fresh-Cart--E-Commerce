import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/navbar";
import { Toaster } from "sonner";
import { Suspense } from "react";
import NoticeToast from "@/components/common/noticeToast";
import UpperFooter from "@/components/common/upperFooter";
import Footer from "@/components/common/footer";
import AuthContextProvider from "@/context/AuthContext";
import type { CategoryI } from "@/types/category.type";
import { getAllCategories } from "@/services/categories.services";

const inter = Exo({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh Products Delivered to your Door",
  icons: {
    icon: "/favicon.webp",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const response = await getAllCategories();
  const categories: CategoryI[] = response.data;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthContextProvider>
          <Navbar categories={categories} />
          <Toaster position="top-center" richColors />
          <Suspense fallback={null}>
            <NoticeToast />
          </Suspense>
          {children}
          <UpperFooter />
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
