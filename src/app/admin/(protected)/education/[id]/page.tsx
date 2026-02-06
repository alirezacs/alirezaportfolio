import { notFound } from "next/navigation";
import EducationForm from "@/components/admin/education-form";
import { getEducationById } from "@/lib/content";
import { updateEducation } from "../actions";

type EducationEditPageProps = {
  params: { id: string };
};

export default async function EducationEditPage({ params }: EducationEditPageProps) {
  const entry = await getEducationById(params.id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">Edit education</h1>
      <EducationForm
        action={updateEducation}
        submitLabel="Update education"
        defaultValues={entry}
      />
    </div>
  );
}
