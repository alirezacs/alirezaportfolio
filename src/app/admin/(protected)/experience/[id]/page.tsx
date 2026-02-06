import { notFound } from "next/navigation";
import ExperienceForm from "@/components/admin/experience-form";
import { getExperienceById } from "@/lib/content";
import { updateExperience } from "../actions";

type ExperienceEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceEditPage({
  params,
}: ExperienceEditPageProps) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">Edit experience</h1>
      <ExperienceForm
        action={updateExperience}
        submitLabel="Update experience"
        defaultValues={experience}
      />
    </div>
  );
}

