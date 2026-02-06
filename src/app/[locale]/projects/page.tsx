import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjects, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";

type ProjectsPageProps = {
  params: { locale: string };
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const locale = params.locale as LocaleKey;
  setRequestLocale(locale);

  const t = await getTranslations();
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
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={localizeText(project.title, locale)}
            summary={localizeText(project.summary, locale)}
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
  );
}
