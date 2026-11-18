"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import productsSwiper from "@/assets/products-swiper.webp";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    link1: "Shop Now",
    link2: "View Deals"
  },
  {
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    link1: "Shop Now",
    link2: "Learn More"
  },
  {
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    link1: "Order Now",
    link2: "Delivery Info",
  },
];

export default function ProductsHeroSlider() {
  return (
    <section className="relative group  overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        className="h-75 sm:h-100"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="h-100 flex items-center text-start">
              <Image
                src={productsSwiper}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50" />
              <div className="relative z-10 h-full flex flex-col justify-center gap-4 px-8 sm:px-16 text-white">
                <h2
                  className={"hero-reveal hero-reveal-1 text-white text-3xl font-bold mb-4 max-w-96"}
                >
                  {slide.title}
                </h2>
                <p
                  className={"hero-reveal hero-reveal-2 text-base"}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={"hero-reveal hero-reveal-3 flex gap-3"}
                >
                  <Link
                    href="/products"
                    className="bg-white text-green-600 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-100 transition"
                  >
                    {slide.link1}
                  </Link>
                  <Link
                    href="/categories"
                    className="border border-white text-white font-medium px-6 py-2.5 rounded-lg hover:bg-white/10 transition"
                  >
                    {slide.link2}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 text-green-600 flex items-center justify-center shadow hover:bg-white transition"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/90 text-green-600 flex items-center justify-center shadow hover:bg-white transition"
      >
        <ChevronRight size={20} />
      </button>

      <div className="hero-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-1.5 [&_.swiper-pagination-bullet]:m-0 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet-active]:opacity-100" />
    </section>
  );
}
