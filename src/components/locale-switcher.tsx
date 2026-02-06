"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

const localeOptions = locales.map((value) => ({
  value,
  label: value.toUpperCase(),
}));

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    if (nextLocale === locale) return;
    router.replace(pathname ?? "/", { locale: nextLocale });
    router.refresh();
  };

  return (
    <label className="flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-2 text-xs font-medium text-muted shadow-sm backdrop-blur">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent text-xs font-semibold text-ink outline-none"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-ink/60">▾</span>
    </label>
  );
}
