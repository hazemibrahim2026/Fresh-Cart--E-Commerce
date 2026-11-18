import React from "react";
import { getAllBrands } from "@/services/brands.services";
import type { BrandI } from "@/types/brand.type";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default async function AllBrands() {
  const response = await getAllBrands();
  const categories: BrandI[] = response.data;
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {categories.map((brand) => (
          <Link
            className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
            key={brand._id}
            href={`/brands/${brand._id}`}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <h3 className="font-bold text-gray-900 text-center group-hover:text-green-600 transition-colors">{brand.name}</h3>
            <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-green-600 flex items-center gap-1">View Products <FaArrowRightLong /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
