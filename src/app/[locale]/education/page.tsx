import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n";
import { getEducation, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { formatRange } from "@/lib/format";
import EducationCard from "@/components/education-card";
import SectionHeading from "@/components/section-heading";

type EducationPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function EducationPage({ params }: EducationPageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  setRequestLocale(localeKey);

  const t = await getTranslations();
  const education = await getEducation();

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title={t("sections.education.title")}
        subtitle={t("sections.education.subtitle")}
      />
      <div className="grid gap-4">
        {education.map((entry, index) => (
          <EducationCard
            key={`${entry.school.en}-${index}`}
            degree={localizeText(entry.degree, localeKey)}
            school={localizeText(entry.school, localeKey)}
            field={localizeText(entry.field, localeKey)}
            summary={localizeText(entry.summary, localeKey)}
            period={formatRange(entry.start, entry.end, localeKey, t("labels.present"))}
          />
        ))}
      </div>
    </section>
  );
}
