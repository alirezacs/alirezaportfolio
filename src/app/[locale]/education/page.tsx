import { getTranslations, setRequestLocale } from "next-intl/server";
import { getEducation, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { formatRange } from "@/lib/format";
import EducationCard from "@/components/education-card";
import SectionHeading from "@/components/section-heading";

type EducationPageProps = {
  params: { locale: string };
};

export default async function EducationPage({ params }: EducationPageProps) {
  const locale = params.locale as LocaleKey;
  setRequestLocale(locale);

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
            degree={localizeText(entry.degree, locale)}
            school={localizeText(entry.school, locale)}
            field={localizeText(entry.field, locale)}
            summary={localizeText(entry.summary, locale)}
            period={formatRange(entry.start, entry.end, locale, t("labels.present"))}
          />
        ))}
      </div>
    </section>
  );
}
