import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Honors", href: "/admin/honors" },
  { label: "Education", href: "/admin/education" },
  { label: "Biography", href: "/admin/bio" },
];

export default function AdminNav() {
  return (
    <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-4 py-3">
      <div className="flex items-center gap-6">
        <Link href="/admin" className="text-lg font-semibold text-ink">
          Admin
        </Link>
        <nav className="hidden gap-4 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-border bg-surface/80 px-4 py-2 text-xs font-semibold text-ink"
          >
            Sign out
          </button>
        </form>
      </div>
      <nav className="flex w-full flex-wrap gap-2 text-xs font-semibold text-muted md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-border bg-surface/80 px-3 py-1"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
