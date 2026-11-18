import { getSpeficCategory } from "@/services/categories.services";
import { getSubCategoriesByCategory } from "@/services/subCategories.services";
import type { CategoryI } from "@/types/category.type";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";
import { FaArrowRight, FaArrowLeft, FaFolderOpen } from "react-icons/fa6";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [response, subcategories] = await Promise.all([
    getSpeficCategory(id),
    getSubCategoriesByCategory(id),
  ]);

  const category: CategoryI = response.data;
  if (!category) {
    throw new Error("Failed to fetch category details");
  }
  return (
    <>
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="breadcrumb py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="flex items-center gap-2 ml-4"
                    href="/"
                  >
                    <House size={16} /> Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">
                    {category.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="object-cover rounded-lg"
                />
            </div>
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{category.name}</h1>
                <p className="text-white/80 mt-1">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-10">
        <Link href="/categories" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6"><FaArrowLeft/>Back to Categories</Link>
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">{subcategories.length}  Subcategories in {category.name}</h2>
        </div>
        {subcategories.length === 0 ? (
          <p className="text-gray-500">No subcategories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory._id}
                href={`/products?subcategory=${encodeURIComponent(subcategory._id)}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <FaFolderOpen className="text-2xl text-green-600" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
                  {subcategory.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <span>Browse Products</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
