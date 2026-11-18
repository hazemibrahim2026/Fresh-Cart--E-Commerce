import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Save,
  Settings,
  UserRound,
} from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import ChangePasswordForm from "@/components/profile/changePasswordForm";

const inputClassName =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400";
const labelClassName = "mb-2 block text-sm font-medium text-gray-700";

export default async function UserProfile() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?notice=login-required");
  }

  return (
    <main className="flex-1 bg-gray-50/50">
      <div className="bg-linear-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-9">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-green-50">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2 opacity-70">/</span>
            <span>My Account</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <UserRound className="size-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">My Account</h1>
              <p className="mt-1 text-sm text-green-50">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid max-w-7xl gap-6 px-4 py-7 md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <h2 className="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">
            My Account
          </h2>
          <nav aria-label="Account navigation" className="space-y-1 p-2">
            <div aria-disabled="true" className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gray-100">
                <MapPin className="size-4" />
              </span>
              <span className="flex-1">My Addresses</span>
              <span className="text-xs">Coming soon</span>
            </div>
            <div aria-current="page" className="flex items-center gap-3 rounded-lg bg-green-50 px-3 py-3 text-sm font-medium text-green-700">
              <span className="flex size-8 items-center justify-center rounded-lg bg-green-500 text-white">
                <Settings className="size-4" />
              </span>
              <span className="flex-1">Settings</span>
              <ChevronRight className="size-4" />
            </div>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
              View your profile information and account settings
            </p>
          </div>

          <section aria-labelledby="profile-information" className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <UserRound className="size-5" />
                </div>
                <div>
                  <h3 id="profile-information" className="font-bold text-gray-900">Profile Information</h3>
                  <p className="mt-1 text-sm text-gray-500">Your personal details</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="profile-name" className={labelClassName}>Full Name</label>
                  <input id="profile-name" className={inputClassName} value={session.user.name ?? ""} placeholder="Not available" readOnly />
                </div>
                <div>
                  <label htmlFor="profile-email" className={labelClassName}>Email Address</label>
                  <input id="profile-email" type="email" className={inputClassName} value={session.user.email ?? ""} placeholder="Not available" readOnly />
                </div>
                <div>
                  <label htmlFor="profile-phone" className={labelClassName}>Phone Number</label>
                  <input id="profile-phone" type="tel" className={inputClassName} placeholder="Not available" readOnly />
                </div>
              </div>

              <button type="button" disabled className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-green-600 px-5 text-sm font-semibold text-white opacity-60">
                <Save className="size-4" />
                Save Changes
              </button>
              <p className="mt-2 text-xs text-gray-500">Profile editing is not available yet.</p>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-6 sm:px-7">
              <h4 className="mb-4 text-sm font-bold text-gray-900">Account Information</h4>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-gray-500">User ID</dt>
                  <dd className="text-gray-500">Not available</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-gray-500">Role</dt>
                  <dd className="text-gray-500">Not available</dd>
                </div>
              </dl>
            </div>
          </section>

          <ChangePasswordForm />
        </div>
      </div>
    </main>
  );
}
