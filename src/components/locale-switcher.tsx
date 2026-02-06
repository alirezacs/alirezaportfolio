"use client";

import { useLocale } from "next-intl";
import { defaultLocale, locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const localeOptions = locales.map((value) => ({
  value,
  label: value.toUpperCase(),
}));

const localeSet = new Set(locales);
const COOKIE_NAME = "NEXT_LOCALE";

export default function LocaleSwitcher() {
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === locale) return;

    const { pathname, search, hash, protocol } = window.location;
    const segments = pathname.split("/").filter(Boolean);
    const rest = localeSet.has(segments[0] as Locale)
      ? segments.slice(1)
      : segments;
    const basePath = rest.join("/");
    const prefix = nextLocale === defaultLocale ? "" : `/${nextLocale}`;
    const nextPath = `${prefix}${basePath ? `/${basePath}` : ""}` || "/";

    const secureFlag = protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax${secureFlag}`;

    window.location.assign(`${nextPath}${search}${hash}`);
  };

  return (
    <label className="group relative flex items-center gap-2 rounded-full border border-border/50 bg-gradient-to-r from-surface/95 to-surface/70 px-3 py-2 text-xs font-medium text-muted shadow-[0_8px_20px_rgba(15,20,30,0.08)] backdrop-blur transition hover:border-ink/20">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent pr-5 text-xs font-semibold text-ink outline-none"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 text-ink/60 transition group-hover:text-ink">
        ▾
      </span>
    </label>
  );
}
