import type { LocalizedText } from "./types";

const locales = ["en", "fa", "tr", "ar"] as const;

export function parseLocalizedText(
  formData: FormData,
  baseName: string
): LocalizedText {
  return locales.reduce((acc, locale) => {
    const value = formData.get(`${baseName}_${locale}`);
    acc[locale] = typeof value === "string" ? value.trim() : "";
    return acc;
  }, {} as LocalizedText);
}

export function parseString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export function parseBoolean(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

export function parseNumber(formData: FormData, name: string) {
  const value = parseString(formData, name);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseStringArray(formData: FormData, name: string) {
  const value = parseString(formData, name);
  if (!value) {
    return [] as string[];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseMultiline(formData: FormData, name: string) {
  const value = parseString(formData, name);
  return value;
}
