import { RegisterSchemaType, LoginSchemaType } from "@/lib/schemas/auth.schema";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function SignupUser(formData: RegisterSchemaType) {
  const response = await fetch(`${baseURL}/api/v1/auth/signup`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function LoginUser(formData: LoginSchemaType) {
  const response = await fetch(`${baseURL}/api/v1/auth/signin`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}