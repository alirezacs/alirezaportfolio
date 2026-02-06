import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n/config";
import { getExperiences, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { formatRange } from "@/lib/format";
import ExperienceCard from "@/components/experience-card";
import SectionHeading from "@/components/section-heading";

type ExperiencePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  setRequestLocale(localeKey);

  const t = await getTranslations({ locale: localeKey });
  const experiences = await getExperiences();

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title={t("sections.experience.title")}
        subtitle={t("sections.experience.subtitle")}
      />
      {experiences.length ? (
        <div className="grid gap-4">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company.en}-${index}`}
              role={localizeText(experience.role, localeKey)}
              company={localizeText(experience.company, localeKey)}
              summary={localizeText(experience.summary, localeKey)}
              location={localizeText(experience.location, localeKey)}
              period={formatRange(
                experience.start,
                experience.end || "",
                localeKey,
                t("labels.present")
              )}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">{t("empty.experience")}</p>
      )}
    </section>
  );
}

