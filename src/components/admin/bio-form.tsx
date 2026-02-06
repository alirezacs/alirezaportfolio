import { Field, LocalizedField } from "./fields";
import type { Bio } from "@/lib/types";

type BioFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Bio | null;
  submitLabel: string;
};

export default function BioForm({
  action,
  defaultValues,
  submitLabel,
}: BioFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <Field label="Name" name="name" defaultValue={defaultValues?.name} />
      <LocalizedField
        label="Headline"
        name="headline"
        defaultValue={defaultValues?.headline}
      />
      <LocalizedField
        label="Summary"
        name="summary"
        defaultValue={defaultValues?.summary}
        as="textarea"
        rows={3}
      />
      <LocalizedField
        label="Story"
        name="story"
        defaultValue={defaultValues?.story}
        as="textarea"
        rows={5}
      />
      <LocalizedField
        label="Location"
        name="location"
        defaultValue={defaultValues?.location}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" defaultValue={defaultValues?.email} />
        <Field
          label="Website"
          name="website"
          defaultValue={defaultValues?.website}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="GitHub"
          name="github"
          defaultValue={defaultValues?.github}
        />
        <Field
          label="LinkedIn"
          name="linkedin"
          defaultValue={defaultValues?.linkedin}
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
