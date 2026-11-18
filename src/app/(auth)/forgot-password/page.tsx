import ForgotPasswordIntro from "@/components/forgot-passwordIntro/page";
import { FaLock, FaEnvelope, FaKey } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgetPassword() {
  return (
    <>
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <ForgotPasswordIntro />
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    Fresh <span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  No worries, we&apos;ll send you a reset code
                </p>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-green-600 text-white ring-4 ring-green-100">
                    <FaEnvelope className="text-xs" />
                  </div>
                  <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                    <FaKey className="text-xs" />
                  </div>
                  <div className="w-16 h-0.5 mx-2 transition-all duration-300 bg-gray-200"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400">
                    <FaLock className="text-xs" />
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <div>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="fieldgroup-email">
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                          id="fieldgroup-email"
                          type="email"
                          placeholder="Enter your email address"
                        />
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </Field>
                  </FieldGroup>
                </div>
                <Button
                  className="h-auto w-full bg-green-600 px-4 py-3 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  Send Reset Code
                </Button>
                <div className="text-center">
                  <Link className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors" href="/login"><FaArrowLeftLong className="text-xs"/>Back to login</Link>
                </div>
              </form>
              <div className="text-center mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-600">Remember your password? <Link href="/login" className="text-green-600 hover:text-green-700 font-semibold transition-colors">Sign in</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
