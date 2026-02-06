type HonorCardProps = {
  title: string;
  issuer: string;
  summary: string;
  date: string;
};

export default function HonorCard({
  title,
  issuer,
  summary,
  date,
}: HonorCardProps) {
  return (
    <article className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-accent">{issuer}</p>
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
        </div>
        <div className="text-xs font-semibold text-muted">{date}</div>
      </div>
      <p className="mt-4 text-sm text-muted">{summary}</p>
    </article>
  );
}
