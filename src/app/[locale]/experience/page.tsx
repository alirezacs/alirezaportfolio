import { getTranslations, setRequestLocale } from "next-intl/server";
import { getExperiences, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { formatRange } from "@/lib/format";
import ExperienceCard from "@/components/experience-card";
import SectionHeading from "@/components/section-heading";

type ExperiencePageProps = {
  params: { locale: string };
};

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const locale = params.locale as LocaleKey;
  setRequestLocale(locale);

  const t = await getTranslations();
  const experiences = await getExperiences();

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title={t("sections.experience.title")}
        subtitle={t("sections.experience.subtitle")}
      />
      <div className="grid gap-4">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`${experience.company.en}-${index}`}
            role={localizeText(experience.role, locale)}
            company={localizeText(experience.company, locale)}
            summary={localizeText(experience.summary, locale)}
            location={localizeText(experience.location, locale)}
            period={formatRange(
              experience.start,
              experience.end || "",
              locale,
              t("labels.present")
            )}
          />
        ))}
      </div>
    </section>
  );
}
