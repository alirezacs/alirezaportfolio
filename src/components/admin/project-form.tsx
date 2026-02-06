import { CheckboxField, Field, LocalizedField } from "./fields";
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
      <LocalizedField
        label="Title"
        name="title"
        defaultValue={defaultValues?.title}
      />
      <LocalizedField
        label="Summary"
        name="summary"
        defaultValue={defaultValues?.summary}
        as="textarea"
        rows={3}
      />
      <LocalizedField
        label="Description"
        name="description"
        defaultValue={defaultValues?.description}
        as="textarea"
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
      <Field
        label="Cover image URL"
        name="coverImage"
        defaultValue={defaultValues?.coverImage}
      />
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
