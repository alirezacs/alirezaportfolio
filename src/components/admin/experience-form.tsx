import { CheckboxField, Field, LocalizedField } from "./fields";
import type { Experience } from "@/lib/types";

type ExperienceFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Experience | null;
  submitLabel: string;
};

export default function ExperienceForm({
  action,
  defaultValues,
  submitLabel,
}: ExperienceFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6">
      {defaultValues?._id ? (
        <input type="hidden" name="id" value={String(defaultValues._id)} />
      ) : null}
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
        label="Order"
        name="order"
        type="number"
        defaultValue={defaultValues?.order ?? 0}
      />
      <LocalizedField
        label="Company"
        name="company"
        defaultValue={defaultValues?.company}
      />
      <LocalizedField label="Role" name="role" defaultValue={defaultValues?.role} />
      <LocalizedField
        label="Summary"
        name="summary"
        defaultValue={defaultValues?.summary}
        as="textarea"
        rows={3}
      />
      <LocalizedField
        label="Location"
        name="location"
        defaultValue={defaultValues?.location}
      />
      <div className="flex flex-wrap gap-6">
        <CheckboxField
          label="Current role"
          name="current"
          defaultChecked={defaultValues?.current}
        />
        <CheckboxField
          label="Published"
          name="published"
          defaultChecked={defaultValues?.published}
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
