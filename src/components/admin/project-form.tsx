import { CheckboxField, Field, TextAreaField } from "./fields";
import type { Project } from "@/lib/types";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Project | null;
  submitLabel: string;
};

export default function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: ProjectFormProps) {
  const titleValue =
    typeof defaultValues?.title === "string"
      ? defaultValues.title
      : defaultValues?.title?.en ?? "";
  const summaryValue =
    typeof defaultValues?.summary === "string"
      ? defaultValues.summary
      : defaultValues?.summary?.en ?? "";
  const descriptionValue =
    typeof defaultValues?.description === "string"
      ? defaultValues.description
      : defaultValues?.description?.en ?? "";

  return (
    <form action={action} className="flex flex-col gap-6">
      {defaultValues?._id ? (
        <input type="hidden" name="id" value={String(defaultValues._id)} />
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Slug"
          name="slug"
          defaultValue={defaultValues?.slug}
          placeholder="atlas-notes"
        />
        <Field
          label="Order"
          name="order"
          type="number"
          defaultValue={defaultValues?.order ?? 0}
        />
      </div>
      <Field label="Title" name="title" defaultValue={titleValue} />
      <TextAreaField
        label="Summary"
        name="summary"
        defaultValue={summaryValue}
        rows={3}
      />
      <TextAreaField
        label="Description"
        name="description"
        defaultValue={descriptionValue}
        rows={4}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Start (YYYY-MM)"
          name="start"
          defaultValue={defaultValues?.start}
        />
        <Field
          label="End (YYYY-MM)"
          name="end"
          defaultValue={defaultValues?.end}
        />
      </div>
      <Field
        label="Tech stack (comma separated)"
        name="tech"
        defaultValue={defaultValues?.tech?.join(", ")}
        placeholder="Next.js, MongoDB, TypeScript"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Demo URL"
          name="demoUrl"
          defaultValue={defaultValues?.demoUrl}
        />
        <Field
          label="Repo URL"
          name="repoUrl"
          defaultValue={defaultValues?.repoUrl}
        />
      </div>
      <div className="flex flex-wrap gap-6">
        <CheckboxField
          label="Published"
          name="published"
          defaultChecked={defaultValues?.published}
        />
        <CheckboxField
          label="Featured"
          name="featured"
          defaultChecked={defaultValues?.featured}
        />
      </div>
      <button
        type="submit"
        className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
