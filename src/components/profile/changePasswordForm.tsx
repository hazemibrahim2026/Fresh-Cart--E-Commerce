"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { changePassword } from "@/actions/password.actions";
import { updatePasswordSchema, type UpdatePasswordSchemaType } from "@/lib/schemas/auth.schema";

const fields = [
  { name: "currentPassword", id: "current-password", label: "Current Password", placeholder: "Enter your current password", autoComplete: "current-password" },
  { name: "password", id: "new-password", label: "New Password", placeholder: "Enter your new password", autoComplete: "new-password" },
  { name: "rePassword", id: "confirm-password", label: "Confirm New Password", placeholder: "Confirm your new password", autoComplete: "new-password" },
] as const;

export default function ChangePasswordForm() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  function onSubmit(values: UpdatePasswordSchemaType) {
    setMessage("");
    startTransition(async () => {
      try {
        const result = await changePassword(values);
        if (result.error) {
          setMessage(result.error);
          return;
        }
        reset();
        setChanged(true);
        await signOut({ callbackUrl: "/login?notice=password-changed" });
      } catch {
        setMessage("Could not complete the request. If your password was changed, sign in with the new password.");
      }
    });
  }

  return (
    <section aria-labelledby="change-password" className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <LockKeyhole className="size-5" />
        </div>
        <div>
          <h3 id="change-password" className="font-bold text-gray-900">Change Password</h3>
          <p className="mt-1 text-sm text-gray-500">Update your account password</p>
        </div>
      </div>

      <form method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-gray-700">{field.label}</label>
              <div className="relative">
                <input
                  {...register(field.name)}
                  id={field.id}
                  type={visible[field.name] ? "text" : "password"}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  disabled={isSubmitting || isPending || changed}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `${field.id}-error` : field.name === "password" ? "password-hint" : undefined}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 pr-11 text-sm text-gray-800 placeholder:text-gray-400 disabled:opacity-60"
                />
                <button
                  type="button"
                  aria-label={`${visible[field.name] ? "Hide" : "Show"} ${field.label.toLowerCase()}`}
                  onClick={() => setVisible((previous) => ({ ...previous, [field.name]: !previous[field.name] }))}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                >
                  {visible[field.name] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {field.name === "password" && !errors.password && (
                <p id="password-hint" className="mt-1.5 text-xs text-gray-500">8–20 characters, with uppercase and lowercase letters, a number, and a special character (@$!%*?&amp;).</p>
              )}
              {errors[field.name] && (
                <p id={`${field.id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">{errors[field.name]?.message}</p>
              )}
            </div>
          ))}
        </div>
        {message && <p role="alert" className="mt-4 text-sm text-red-600">{message}</p>}
        <p className="mt-4 text-xs text-gray-500">You will be signed out after changing your password.</p>
        <button type="submit" disabled={isSubmitting || isPending || changed} className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-amber-600 px-5 text-sm font-semibold text-white disabled:opacity-60">
          <LockKeyhole className="size-4" />
          {isSubmitting || isPending ? "Changing password..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}
