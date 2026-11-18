"use server";

import { getServerSession } from "next-auth";
import { getOurToken } from "@/lib/auth";
import { authOptions } from "@/lib/authOptions";
import { updatePasswordSchema, type UpdatePasswordSchemaType } from "@/lib/schemas/auth.schema";

export async function changePassword(values: UpdatePasswordSchemaType) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: "Please sign in again to change your password." };
  }

  const parsed = updatePasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password details." };
  }

  let token: string;
  try {
    token = await getOurToken();
  } catch {
    return { error: "Your session has expired. Please sign in again." };
  }
  if (!token) {
    return { error: "Your session has expired. Please sign in again." };
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) {
    console.error("Password change failed: API base URL is not configured.");
    return { error: "Password changes are temporarily unavailable." };
  }

  let response: Response;
  try {
    response = await fetch(`${baseURL}/api/v1/users/changeMyPassword`, {
      method: "PUT",
      headers: { token, "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });
  } catch {
    return { error: "Could not confirm the password change. Try signing in with your new password before retrying." };
  }

  if (!response.ok) {
    let message: string | undefined;
    try {
      const data: unknown = await response.json();
      if (typeof data === "object" && data !== null && "message" in data && typeof data.message === "string") {
        message = data.message;
      }
    } catch {
      console.error("Password change failed: API returned an invalid error response.");
    }
    return { error: message || `Password change failed (HTTP ${response.status}).` };
  }

  return { success: true };
}
