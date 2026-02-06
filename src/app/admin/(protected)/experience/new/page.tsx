import ExperienceForm from "@/components/admin/experience-form";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">New experience</h1>
      <ExperienceForm action={createExperience} submitLabel="Create experience" />
    </div>
  );
}
