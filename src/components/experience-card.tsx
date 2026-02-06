type ExperienceCardProps = {
  role: string;
  company: string;
  summary: string;
  period: string;
  location?: string;
};

export default function ExperienceCard({
  role,
  company,
  summary,
  period,
  location,
}: ExperienceCardProps) {
  return (
    <article className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-accent">{company}</p>
          <h3 className="text-lg font-semibold text-ink">{role}</h3>
        </div>
        <div className="text-xs font-semibold text-muted">{period}</div>
      </div>
      <p className="mt-4 text-sm text-muted">{summary}</p>
      {location ? (
        <p className="mt-4 text-xs font-semibold text-ink">{location}</p>
      ) : null}
    </article>
  );
}
