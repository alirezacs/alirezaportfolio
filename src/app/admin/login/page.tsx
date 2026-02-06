import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { loginAction } from "../actions";

type LoginPageProps = {
  searchParams?: { error?: string };
};

export default async function AdminLogin({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const hasError = searchParams?.error === "1";

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface/90 p-8 shadow-[0_30px_60px_rgba(15,20,30,0.12)]">
        <h1 className="text-2xl font-semibold text-ink">Admin access</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to manage projects, experience, honors, and more.
        </p>
        {hasError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Invalid credentials. Please try again.
          </p>
        ) : null}
        <form action={loginAction} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-muted">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded-xl border border-border bg-white/80 px-4 py-2 text-ink outline-none focus:border-ink/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-muted">
            Password
            <input
              type="password"
              name="password"
              required
              className="rounded-xl border border-border bg-white/80 px-4 py-2 text-ink outline-none focus:border-ink/30"
            />
          </label>
          <button
            type="submit"
            className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
