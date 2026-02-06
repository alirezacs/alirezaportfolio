import Link from "next/link";
import { defaultLocale } from "@/i18n";

type NotFoundProps = {
  params: Promise<{ locale: string }>;
};

export default async function NotFound({ params }: NotFoundProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? defaultLocale;

  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="text-muted">The page you are looking for doesn’t exist.</p>
      <Link
        href={`/${locale}`}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
