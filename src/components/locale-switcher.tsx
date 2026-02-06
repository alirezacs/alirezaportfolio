"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { value: "en", label: "EN" },
  { value: "fa", label: "FA" },
  { value: "tr", label: "TR" },
  { value: "ar", label: "AR" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    const segments = pathname.split("/");

    if (segments.length > 1) {
      segments[1] = nextLocale;
    } else {
      segments.push(nextLocale);
    }

    const nextPath = segments.join("/") || `/${nextLocale}`;
    router.replace(nextPath);
  };

  return (
    <label className="flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-muted">
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={handleChange}
        className="bg-transparent text-xs font-semibold text-ink outline-none"
      >
        {locales.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
