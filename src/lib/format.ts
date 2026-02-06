import type { LocaleKey } from "./types";

const RTL_LOCALES = new Set<LocaleKey>(["fa", "ar"]);

export function isRtlLocale(locale: LocaleKey) {
  return RTL_LOCALES.has(locale);
}

export function formatDate(value: string | undefined, locale: LocaleKey) {
  if (!value) return "";
  const parts = value.split("-").map(Number);

  if (parts.length === 1) {
    return value;
  }

  const year = parts[0];
  const month = parts.length >= 2 ? parts[1] - 1 : 0;
  const day = parts.length === 3 ? parts[2] : 1;
  const date = new Date(Date.UTC(year, month, day));

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
}

export function formatRange(
  start: string | undefined,
  end: string | undefined,
  locale: LocaleKey,
  presentLabel: string
) {
  const startText = formatDate(start, locale);
  const endText = end ? formatDate(end, locale) : presentLabel;
  if (!startText) {
    return endText;
  }
  return `${startText} · ${endText}`;
}

export function splitParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
