import { getRequestConfig } from "next-intl/server";
import { defaultLocale, Locale, locales } from "./i18n/config";

export { defaultLocale, locales } from "./i18n/config";
export type { Locale } from "./i18n/config";

export default getRequestConfig(async (params) => {
  const locale = params?.locale;
  const safeLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  };
});
