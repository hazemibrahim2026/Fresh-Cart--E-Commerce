import Link from "next/link";
import React from "react";
import { getAllCategories } from "@/services/categories.services";
import { FaArrowRightLong } from "react-icons/fa6";
import { CategoryI } from "@/types/category.type";
import Image from "next/image";

export default async function ShopByCategory() {
  const response = await getAllCategories();
  const categories: CategoryI[] = response.data;

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div className="flex  items-center gap-3 my-8">
              <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Shop By <span className="text-emerald-600">Category</span>
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-green-600 self-end sm:self-auto hover:text-green-700 font-medium flex items-center cursor-pointer"
            >
              View All Categories <FaArrowRightLong className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category: CategoryI) => (
              
                <Link key={category._id}
                  className="bg-white rounded-lg w-full p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
                  href={`/categories/${category._id}`}
                >
                  <div className="h-20 w-20 overflow-hidden bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition">
                    <Image
                      className="w-full h-full object-cover"
                      src={category.image}
                      alt={category.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </Link>
              
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
