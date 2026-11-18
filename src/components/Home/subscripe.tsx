import React from "react";
import { FaEnvelope, FaLeaf, FaTag, FaTruck, FaApple, FaGooglePlay } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Subscripe() {
  return (
    <>
      <section className="py-16 bg-linear-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="relative">
            <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
              <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                        Newsletter
                      </h3>
                      <p className="text-xs text-gray-500">
                        50,000+ subscribers
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                      Get the Freshest Updates{" "}
                      <span className="text-emerald-600"> Delivered Free</span>
                    </h2>
                    <p className="text-gray-500 mt-3 text-lg">
                      Weekly recipes, seasonal offers & exclusive member perks.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaLeaf className="text-emerald-600 text-xs" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Fresh Picks Weekly
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaTruck className="text-emerald-600 text-xs" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Free Delivery Codes
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm">
                      <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                        <FaTag className="text-emerald-600 text-xs" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Members-Only Deals
                      </span>
                    </div>
                  </div>
                  <form className="pt-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Input placeholder="you@example.com" required />
                      </div>
                      <Button
                        type="submit"
                        className="group flex items-center justify-center gap-3 !px-8 !py-4 !h-auto rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                      >
                        Subscribe
                        <FaArrowRightLong className="text-sm group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 pl-1">
                      ✨ Unsubscribe anytime. No spam, ever.
                    </p>
                  </form>
                </div>
                <div className="lg:col-span-2 lg:border-l lg:border-emerald-100 lg:pl-8">
                  <div className="h-full flex flex-col justify-center">
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>
                      <div className="relative space-y-5">
                        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
                          📱 MOBILE APP
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">
                          Shop Faster on Our App
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Get app-exclusive deals & 15% off your first order.
                        </p>
                        <div className="flex flex-col gap-3 pt-2">
                          <Link
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                            href="#"
                          >
                            <FaApple className="text-xl" />
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Download on</div>
                              <div className="text-sm font-semibold -mt-0.5">App Store</div>
                            </div>
                          </Link>
                          <Link
                            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]"
                            href="#"
                          >
                            <FaGooglePlay className="text-xl" />
                            <div className="text-left">
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Download on</div>
                              <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                            </div>
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 pt-2 text-sm">
                            <span className="text-yellow-400">
                                ★★★★★
                            </span>
                            <div className="text-gray-400">
                                4.9 • 100K+ downloads
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
