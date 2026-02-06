"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const localeOptions = locales.map((value) => ({
  value,
  label: value.toUpperCase(),
}));

const localeSet = new Set(locales);

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const safePathname = pathname ?? "/";
    const segments = safePathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const rest = localeSet.has(firstSegment as Locale)
      ? segments.slice(1)
      : segments;
    const basePath = rest.join("/");
    const shouldPrefix = nextLocale !== defaultLocale;
    const nextPath = "/" +
      (shouldPrefix
        ? [nextLocale, basePath].filter(Boolean).join("/")
        : basePath);

    router.replace(nextPath || "/");
  };

  return (
    <label className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="bg-transparent text-xs font-semibold text-ink outline-none"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
