import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/project-form";
import { getProjectById } from "@/lib/content";
import { updateProject } from "../actions";

type ProjectEditPageProps = {
  params: { id: string };
};

export default async function ProjectEditPage({ params }: ProjectEditPageProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">Edit project</h1>
      <ProjectForm
        action={updateProject}
        submitLabel="Update project"
        defaultValues={project}
      />
    </div>
  );
}
