import ProjectForm from "@/components/admin/project-form";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">New project</h1>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
