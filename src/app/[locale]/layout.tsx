import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { defaultLocale, Locale, locales } from "@/i18n/config";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  const localeParam = resolvedParams?.locale;
  const locale = locales.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : defaultLocale;

  if (localeParam && !locales.includes(localeParam as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={direction} lang={locale} className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10 md:px-10">
          {children}
        </main>
        <SiteFooter />
      </div>
    </NextIntlClientProvider>
  );
}

