"use client";
import React from "react";
import Image from "next/image";
import loginImage from "@/assets/login.webp";
import {
  FaTruck,
  FaShieldAlt,
  FaClock,
  FaFacebook,
  FaGoogle,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/schemas/auth.schema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Star, UserGroup, UserPlus2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleUserLogin(values: LoginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Logged in successfully");
      router.push("/products");
    } else {
      toast.error(response?.error ?? "Unable to sign in");
    }
  }

  return (
    <>
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <Image
                src={loginImage}
                alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
                width={200}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              ></Image>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  FreshCart - Your One-Stop Shop for Fresh Products
                </h2>
                <p className="text-lg text-gray-600">
                  Join thousands of happy customers who trust FreshCart for
                  their daily grocery needs
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaTruck className="mr-2 text-green-600" />
                    Free Delivery
                  </div>
                  <div className="flex items-center text-green-600">
                    <FaShieldAlt className="mr-2" />
                    Secure Payment
                  </div>
                  <div className="flex items-center text-green-600">
                    <FaClock className="mr-2" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-green-600">
                    Fresh <span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">
                  Sign in to continue your fresh shopping experience
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <Button className="text-black h-auto w-full py-3 text-md font-semibold bg-transparent rounded-lg border border-gray-300 hover:bg-green-50 hover:border-green-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                  <FaGoogle className="mr-2 text-red-600" />
                  Continue with Google
                </Button>
                <Button className="text-black h-auto w-full py-3 text-md font-semibold bg-transparent rounded-lg border border-gray-300 hover:bg-green-50 hover:border-green-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                  <FaFacebook className="mr-2 text-blue-600" />
                  Continue with Facebook
                </Button>
              </div>
              <div className="relative my-8 flex items-center">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 text-sm font-medium text-gray-500">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handleUserLogin)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <FaEnvelope
                          aria-hidden="true"
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email"
                          type="email"
                          className="rounded-lg border-gray-300 bg-transparent pl-10 focus-visible:border-green-100 focus-visible:ring-green-100"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center justify-between mb-2">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Link
                          className="text-sm text-green-600 hover:text-green-700 cursor-pointer font-medium"
                          href="/forgot-password"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <FaLock
                          aria-hidden="true"
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your Password"
                          type="password"
                          className="rounded-lg border-gray-300 bg-transparent pl-10 focus-visible:border-green-100 focus-visible:ring-green-100"
                        />
                      </div>
                      <p className="text-gray-500 -mt-2 text-xs">
                        Must be at least 8 characters with numbers and symbols
                      </p>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="flex items-center gap-2">
                  <input
                    className="size-4 accent-green-600"
                    type="checkbox"
                    id="remember-me"
                  />
                  <label
                    className="ml-3 text-sm text-gray-700"
                    htmlFor="remember-me"
                  >
                    Keep me signed in
                  </label>
                </div>
                <Button
                  variant="default"
                  className="w-full h-auto py-4 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg"
                  type="submit"
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <>
                      <UserPlus2 className="mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              <div className="text-center mt-8 pt-6 border-t border-gray-100 font-semibold">
                <p className="text-gray-600">
                  New to FreshCart?{" "}
                  <Link href="/register" className="text-green-600">
                    Create an account
                  </Link>
                </p>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                <div className="flex items-center font-semibold">
                  <Lock className="mr-1 h-[12] w-[15]" /> SSL Secured
                </div>
                <div className="flex items-center font-semibold">
                  <UserGroup className="mr-1 h-[12] w-[15]" /> 50K+ Users
                </div>
                <div className="flex items-center font-semibold">
                  <Star className="mr-1 h-[12] w-[15]" /> 4.9 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
