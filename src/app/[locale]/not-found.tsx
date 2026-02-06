import Link from "next/link";

type NotFoundProps = {
  params: { locale: string };
};

export default function NotFound({ params }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="text-muted">The page you are looking for doesn’t exist.</p>
      <Link
        href={`/${params.locale}`}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
