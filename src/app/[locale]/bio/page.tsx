import { getTranslations, setRequestLocale } from "next-intl/server";
import { defaultLocale } from "@/i18n/config";
import { getBio, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";
import { splitParagraphs } from "@/lib/format";
import SectionHeading from "@/components/section-heading";

type BioPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BioPage({ params }: BioPageProps) {
  const resolvedParams = await params;
  const localeKey = (resolvedParams?.locale ?? defaultLocale) as LocaleKey;
  setRequestLocale(localeKey);

  const t = await getTranslations({ locale: localeKey });
  const bio = await getBio();

  const headline = localizeText(bio?.headline, localeKey);
  const summary = localizeText(bio?.summary, localeKey);
  const story = localizeText(bio?.story, localeKey);
  const paragraphs = splitParagraphs(story || summary);
  const location = localizeText(bio?.location, localeKey);

  return (
    <section className="flex flex-col gap-10">
      <SectionHeading
        title={t("sections.bio.title")}
        subtitle={t("sections.bio.subtitle")}
      />
      {bio ? (
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="card p-8">
            <p className="text-sm font-semibold text-accent">{bio.name}</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink">{headline}</h2>
            <p className="mt-4 text-base text-muted">{summary}</p>
            <div className="mt-6 space-y-4 text-sm text-muted">
              {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 8)}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
          <aside className="card flex flex-col gap-4 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {t("labels.contact")}
              </p>
              {bio.email ? (
                <p className="mt-2 text-sm text-ink">
                  {t("labels.email")}: {" "}
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`mailto:${bio.email}`}
                  >
                    {bio.email}
                  </a>
                </p>
              ) : null}
              {location ? (
                <p className="mt-2 text-sm text-ink">
                  {t("labels.location")}: {location}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {bio.website ? (
                <a className="text-accent hover:underline" href={bio.website}>
                  Website
                </a>
              ) : null}
              {bio.github ? (
                <a className="text-accent hover:underline" href={bio.github}>
                  GitHub
                </a>
              ) : null}
              {bio.linkedin ? (
                <a className="text-accent hover:underline" href={bio.linkedin}>
                  LinkedIn
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      ) : (
        <p className="text-sm text-muted">{t("empty.bio")}</p>
      )}
    </section>
  );
}
