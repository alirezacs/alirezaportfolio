import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n";
import {
  getBio,
  getEducation,
  getExperiences,
  getHonors,
  getProjects,
  localizeText,
} from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { formatRange, splitParagraphs } from "@/lib/format";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import ExperienceCard from "@/components/experience-card";
import EducationCard from "@/components/education-card";
import HonorCard from "@/components/honor-card";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  const locale = localeKey;
  setRequestLocale(localeKey);

  const t = await getTranslations();
  const [bio, projects, experiences, honors, education] = await Promise.all([
    getBio(),
    getProjects(),
    getExperiences(),
    getHonors(),
    getEducation(),
  ]);

  const headline = localizeText(bio.headline, localeKey) || t("hero.title");
  const summary = localizeText(bio.summary, localeKey) || t("hero.subtitle");
  const story = localizeText(bio.story, localeKey);
  const storyParagraphs = splitParagraphs(story).slice(0, 2);
  const projectLabels = {
    featured: t("labels.featured"),
    liveDemo: t("labels.liveDemo"),
    repository: t("labels.repository"),
  };

  const featuredProjects = projects.filter((project) => project.featured);
  const projectsToShow =
    featuredProjects.length > 0 ? featuredProjects.slice(0, 2) : projects.slice(0, 2);

  return (
    <div className="flex flex-col gap-16">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/90 p-8 shadow-[0_30px_60px_rgba(15,20,30,0.12)] md:p-12">
        <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
        <div className="absolute bottom-0 left-10 h-40 w-40 rounded-full bg-accent-2/30 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {t("hero.eyebrow")}
          </p>
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
              {summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/projects`}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <a
              href={`mailto:${bio.email}`}
              className="rounded-full border border-border bg-surface/80 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {t("nav.projects")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">
                {projects.length}+
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {t("nav.experience")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">
                {experiences.length}+
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {t("labels.languages")}
              </p>
              <p className="mt-2 text-2xl font-semibold text-ink">4</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <SectionHeading
          title={t("sections.projects.title")}
          subtitle={t("sections.projects.subtitle")}
          action={
            <Link
              href={`/${locale}/projects`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {t("sections.projects.cta")}
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projectsToShow.map((project) => (
            <ProjectCard
              key={project.slug}
              title={localizeText(project.title, localeKey)}
              summary={localizeText(project.summary, localeKey)}
              tech={project.tech}
              demoUrl={project.demoUrl}
              repoUrl={project.repoUrl}
              coverImage={project.coverImage}
              featured={project.featured}
              labels={projectLabels}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            title={t("sections.experience.title")}
            subtitle={t("sections.experience.subtitle")}
            action={
              <Link
                href={`/${locale}/experience`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {t("sections.experience.cta")}
              </Link>
            }
          />
          <div className="grid gap-4">
            {experiences.slice(0, 2).map((experience, index) => (
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
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading
            title={t("sections.bio.title")}
            subtitle={t("sections.bio.subtitle")}
            action={
              <Link
                href={`/${locale}/bio`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {t("sections.bio.cta")}
              </Link>
            }
          />
          <div className="card p-6">
            <p className="text-lg font-semibold text-ink">{bio.name}</p>
            <p className="text-sm text-muted">{headline}</p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              {storyParagraphs.length ? (
                storyParagraphs.map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 8)}-${index}`}>{paragraph}</p>
                ))
              ) : (
                <p>{summary}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            title={t("sections.honors.title")}
            subtitle={t("sections.honors.subtitle")}
            action={
              <Link
                href={`/${locale}/honors`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {t("sections.honors.cta")}
              </Link>
            }
          />
          <div className="grid gap-4">
            {honors.slice(0, 2).map((honor, index) => (
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
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeading
            title={t("sections.education.title")}
            subtitle={t("sections.education.subtitle")}
            action={
              <Link
                href={`/${locale}/education`}
                className="text-sm font-semibold text-accent hover:underline"
              >
                {t("sections.education.cta")}
              </Link>
            }
          />
          <div className="grid gap-4">
            {education.slice(0, 2).map((entry, index) => (
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
        </div>
      </section>
    </div>
  );
}
