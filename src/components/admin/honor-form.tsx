import { CheckboxField, Field, LocalizedField } from "./fields";
import type { Honor } from "@/lib/types";

type HonorFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Honor | null;
  submitLabel: string;
};

export default function HonorForm({
  action,
  defaultValues,
  submitLabel,
}: HonorFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6">
      {defaultValues?._id ? (
        <input type="hidden" name="id" value={String(defaultValues._id)} />
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field
          label="Date"
          name="date"
          defaultValue={defaultValues?.date}
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
        label="Issuer"
        name="issuer"
        defaultValue={defaultValues?.issuer}
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
