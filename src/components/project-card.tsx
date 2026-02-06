import type { Project } from "@/lib/types";

type ProjectCardProps = {
  title: string;
  summary: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  labels: {
    featured: string;
    liveDemo: string;
    repository: string;
  };
};

export default function ProjectCard({
  title,
  summary,
  tech,
  demoUrl,
  repoUrl,
  featured,
  labels,
}: ProjectCardProps) {
  return (
    <article className="card overflow-hidden">
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          {featured ? (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {labels.featured}
            </span>
          ) : null}
        </div>
        <p className="text-sm text-muted">{summary}</p>
        {tech.length ? (
          <div className="flex flex-wrap gap-2 text-xs font-medium text-muted">
            {tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface/80 px-2 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
        {(demoUrl || repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-3 text-sm font-semibold">
            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                {labels.liveDemo}
              </a>
            ) : null}
            {repoUrl ? (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:underline"
              >
                {labels.repository}
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
