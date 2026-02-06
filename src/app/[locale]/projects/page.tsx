import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n/config";
import { getProjects, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  setRequestLocale(localeKey);

  const t = await getTranslations({ locale: localeKey });
  const projects = await getProjects();
  const projectLabels = {
    featured: t("labels.featured"),
    liveDemo: t("labels.liveDemo"),
    repository: t("labels.repository"),
  };

  return (
    <section className="flex flex-col gap-8">
      <SectionHeading
        title={t("sections.projects.title")}
        subtitle={t("sections.projects.subtitle")}
      />
      {projects.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
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
      ) : (
        <p className="text-sm text-muted">{t("empty.projects")}</p>
      )}
    </section>
  );
}

