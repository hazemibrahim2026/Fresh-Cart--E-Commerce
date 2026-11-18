"use client";
import { SignupUser } from "@/services/auth.services";
import { Shield, Star, Truck, UserPlus2 } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../assets/imgi_2_image.webp";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/lib/schemas/auth.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function Register() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleUserRegister(values: RegisterSchemaType) {
    try {
      const response = await SignupUser(values);
      if (response.message === "success") {
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again later");
    }
  }
  return (
    <>
      <main className="py-10">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
            <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <Star fill="currentColor" />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Premium Quality</h2>
                  <p className="text-gray-600">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <Truck fill="currentColor" />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Fast Delivery</h2>
                  <p className="text-gray-600">
                    Same-day delivery available in most areas.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                  <Shield fill="currentColor" />
                </div>
                <div className="content">
                  <h2 className="text-lg font-semibold">Secure Shopping</h2>
                  <p className="text-gray-600">
                    Your data and payments are completely secure.
                  </p>
                </div>
              </li>
            </ul>
            <div className="review bg-white shadow-sm p-4 rounded-md">
              <div className="author flex items-center gap-4 mb-4">
                <Image
                  className="size-12 rounded-full"
                  src={avatar}
                  alt="Author"
                  width={512}
                  height={512}
                ></Image>
                <div>
                  <h3>Sarah Johnson</h3>
                  <div className="rating flex *:text-yellow-300">
                    <Star size="20" fill="currentColor" />
                    <Star size="20" fill="currentColor" />
                    <Star size="20" fill="currentColor" />
                    <Star size="20" fill="currentColor" />
                    <Star size="20" fill="currentColor" />
                  </div>
                </div>
              </div>
              <blockquote>
                <p className="italic text-gray-600">
                  &quot;FreshCart has transformed my shopping experience. The quality
                  of the products is outstanding, and the delivery is always on
                  time. Highly recommend!&quot;
                </p>
              </blockquote>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
            <h2 className="text-center text-3xl font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="text-center">
              Sign up to start shopping with FreshCart.
            </p>
            <div className="register-options flex gap-2 *:grow my-10">
              <Button className="text-black text-md font-semibold bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                <FaGoogle className="mr-2 text-red-600" /> Google
              </Button>
              <Button className="text-black text-md font-semibold bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                <FaFacebook className="mr-2 text-blue-600" /> Facebook
              </Button>
            </div>
            <div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4">
              <span className="sr-only">or</span>
            </div>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleUserRegister)}
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ali"
                      type="text"
                      className="bg-transparent border-gray-300 rounded-lg"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="ali@example.com"
                      type="email"
                      className="bg-transparent border-gray-300 rounded-lg"
                    />

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
                    <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Create a strong password"
                      type="password"
                      className="bg-transparent border-gray-300 rounded-lg"
                    />
                    <p className="text-gray-500 -mt-2 text-xs">
                      Must be at least 8 characters with numbers and symbols
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Password*
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
                      type="password"
                      className="bg-transparent border-gray-300 rounded-lg"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone*</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="+12345678900"
                      type="tel"
                      className="bg-transparent border-gray-300 rounded-lg"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div>
                <div className="flex items-center gap-2">
                  <input
                    className="size-4 accent-green-600"
                    type="checkbox"
                    id="terms"
                  />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <Link
                      className="text-green-600 hover:underline"
                      href="/terms"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-green-600 hover:underline"
                      href="/privacy"
                    >
                      Privacy Policy
                    </Link>
                    *
                  </label>
                </div>
              </div>
              <Button
                variant="default"
                className="w-full h-auto py-3 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg"
                type="submit"
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    <UserPlus2 className="mr-2" />
                    Create My Account
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
