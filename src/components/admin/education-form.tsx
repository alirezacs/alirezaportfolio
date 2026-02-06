import { CheckboxField, Field, LocalizedField } from "./fields";
import type { Education } from "@/lib/types";

type EducationFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Education | null;
  submitLabel: string;
};

export default function EducationForm({
  action,
  defaultValues,
  submitLabel,
}: EducationFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6">
      {defaultValues?._id ? (
        <input type="hidden" name="id" value={String(defaultValues._id)} />
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Start (YYYY)"
          name="start"
          defaultValue={defaultValues?.start}
        />
        <Field
          label="End (YYYY)"
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
        label="School"
        name="school"
        defaultValue={defaultValues?.school}
      />
      <LocalizedField
        label="Degree"
        name="degree"
        defaultValue={defaultValues?.degree}
      />
      <LocalizedField
        label="Field of study"
        name="field"
        defaultValue={defaultValues?.field}
      />
      <LocalizedField
        label="Summary"
        name="summary"
        defaultValue={defaultValues?.summary}
        as="textarea"
        rows={3}
      />
      <CheckboxField
        label="Published"
        name="published"
        defaultChecked={defaultValues?.published}
      />
      <button
        type="submit"
        className="w-fit rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
