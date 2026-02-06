import type { LocalizedText } from "@/lib/types";

const localeLabels: Record<string, string> = {
  en: "EN",
  fa: "FA",
  tr: "TR",
  ar: "AR",
};

const localeKeys = ["en", "fa", "tr", "ar"] as const;

type LocalizedFieldProps = {
  label: string;
  name: string;
  defaultValue?: LocalizedText;
  as?: "input" | "textarea";
  rows?: number;
};

export function LocalizedField({
  label,
  name,
  defaultValue,
  as = "input",
  rows = 3,
}: LocalizedFieldProps) {
  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {localeKeys.map((locale) => {
          const fieldName = `${name}_${locale}`;
          const value = defaultValue?.[locale] ?? "";
          const commonClass =
            "rounded-xl border border-border bg-white/80 px-4 py-2 text-sm text-ink outline-none focus:border-ink/30";

          return (
            <label key={fieldName} className="flex flex-col gap-2 text-xs font-semibold text-muted">
              {label} ({localeLabels[locale]})
              {as === "textarea" ? (
                <textarea
                  name={fieldName}
                  defaultValue={value}
                  rows={rows}
                  className={commonClass}
                />
              ) : (
                <input
                  name={fieldName}
                  defaultValue={value}
                  className={commonClass}
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
};

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs font-semibold text-muted">
      {label}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="rounded-xl border border-border bg-white/80 px-4 py-2 text-sm text-ink outline-none focus:border-ink/30"
      />
    </label>
  );
}

type CheckboxFieldProps = {
  label: string;
  name: string;
  defaultChecked?: boolean;
};

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-muted">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-border"
      />
      {label}
    </label>
  );
}
