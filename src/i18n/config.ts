export const locales = ["en", "fa", "tr", "ar"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];
