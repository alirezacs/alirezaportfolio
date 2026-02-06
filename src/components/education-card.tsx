type EducationCardProps = {
  degree: string;
  school: string;
  field: string;
  summary: string;
  period: string;
};

export default function EducationCard({
  degree,
  school,
  field,
  summary,
  period,
}: EducationCardProps) {
  return (
    <article className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-accent">{school}</p>
          <h3 className="text-lg font-semibold text-ink">{degree}</h3>
          <p className="text-sm text-muted">{field}</p>
        </div>
        <div className="text-xs font-semibold text-muted">{period}</div>
      </div>
      <p className="mt-4 text-sm text-muted">{summary}</p>
    </article>
  );
}
