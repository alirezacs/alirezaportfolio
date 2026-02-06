import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n/config";
import { getHonors, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import HonorCard from "@/components/honor-card";
import SectionHeading from "@/components/section-heading";

type HonorsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HonorsPage({ params }: HonorsPageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  setRequestLocale(localeKey);

  const t = await getTranslations();
  const honors = await getHonors();

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title={t("sections.honors.title")}
        subtitle={t("sections.honors.subtitle")}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {honors.map((honor, index) => (
          <HonorCard
            key={`${honor.title.en}-${index}`}
            title={localizeText(honor.title, localeKey)}
            issuer={localizeText(honor.issuer, localeKey)}
            summary={localizeText(honor.summary, localeKey)}
            date={honor.date}
            url={honor.url}
          />
        ))}
      </div>
    </section>
  );
}

