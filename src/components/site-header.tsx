"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./locale-switcher";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { key: "nav.home", href: "" },
  { key: "nav.projects", href: "projects" },
  { key: "nav.experience", href: "experience" },
  { key: "nav.honors", href: "honors" },
  { key: "nav.education", href: "education" },
  { key: "nav.bio", href: "bio" },
];

export default function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const target = `/${locale}/${href}`.replace(/\/$/, "");
    const current = pathname.replace(/\/$/, "");
    return current === target || (href && current.startsWith(target));
  };

  return (
    <header className="sticky top-4 z-30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 md:px-10">
        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-4 py-3 md:flex-nowrap">
          <Link
            href={`/${locale}`}
            className="text-lg font-semibold tracking-tight text-ink"
          >
            Alireza
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-muted md:flex">
            {navItems.map((item) => {
              const href = `/${locale}/${item.href}`.replace(/\/$/, "");
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`transition hover:text-ink ${
                    isActive(item.href)
                      ? "text-ink"
                      : "text-muted"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted md:hidden">
          {navItems.map((item) => {
            const href = `/${locale}/${item.href}`.replace(/\/$/, "");
            return (
              <Link
                key={item.key}
                href={href}
                className={`rounded-full border border-border px-3 py-1 transition ${
                  isActive(item.href)
                    ? "bg-ink text-white"
                    : "bg-surface/80 text-muted"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
