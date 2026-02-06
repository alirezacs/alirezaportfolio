type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export default function SectionHeading({
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="section-title text-ink">{title}</h2>
        {subtitle ? <p className="section-subtitle mt-2">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
