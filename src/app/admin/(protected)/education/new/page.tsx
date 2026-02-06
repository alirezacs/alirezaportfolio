import EducationForm from "@/components/admin/education-form";
import { createEducation } from "../actions";

export default function NewEducationPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">New education</h1>
      <EducationForm action={createEducation} submitLabel="Create education" />
    </div>
  );
}
