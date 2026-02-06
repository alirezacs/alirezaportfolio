import { getLocale, getTranslations } from "next-intl/server";
import { getBio, localizeText } from "@/lib/content";
import type { LocaleKey } from "@/lib/types";

export default async function SiteFooter() {
  const locale = (await getLocale()) as LocaleKey;
  const t = await getTranslations({ locale });
  const bio = await getBio();
  const location = localizeText(bio?.location, locale);

  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <p className="text-lg font-semibold text-ink">{bio?.name ?? " "}</p>
          <p className="text-sm text-muted">{t("footer.tagline")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted">
          <p>{t("footer.contact")}</p>
          {bio?.email ? (
            <p>
              <span className="font-semibold text-ink">{t("labels.email")}:</span>{" "}
              <a className="underline-offset-4 hover:underline" href={`mailto:${bio.email}`}>
                {bio.email}
              </a>
            </p>
          ) : null}
          {location ? (
            <p>
              <span className="font-semibold text-ink">{t("labels.location")}:</span>{" "}
              {location}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
