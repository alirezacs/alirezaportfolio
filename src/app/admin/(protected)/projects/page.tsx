import Link from "next/link";
import { getDb } from "@/lib/db";
import { deleteProject } from "./actions";
import type { Project } from "@/lib/types";

type ProjectsAdminPageProps = {
  searchParams?: { created?: string; updated?: string; deleted?: string };
};

export default async function ProjectsAdminPage({
  searchParams,
}: ProjectsAdminPageProps) {
  const db = await getDb();
  const projects = await db
    .collection<Project>("projects")
    .find()
    .sort({ order: 1, createdAt: -1 })
    .toArray();

  const showCreated = searchParams?.created === "1";
  const showUpdated = searchParams?.updated === "1";
  const showDeleted = searchParams?.deleted === "1";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-ink">Projects</h1>
          <p className="text-sm text-muted">Manage project entries.</p>
          {showCreated ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Project created.
            </div>
          ) : null}
          {showUpdated ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Project updated.
            </div>
          ) : null}
          {showDeleted ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Project deleted.
            </div>
          ) : null}
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
        >
          New project
        </Link>
      </div>
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p className="text-sm text-muted">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={String(project._id)}
              className="card flex flex-wrap items-center justify-between gap-4 p-6"
            >
              <div>
                <p className="text-sm font-semibold text-ink">
                  {typeof project.title === "string"
                    ? project.title
                    : project.title.en}
                </p>
                <p className="text-xs text-muted">
                  {project.published ? "Published" : "Draft"} · Order {project.order}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${project._id}`}
                  className="text-sm font-semibold text-accent"
                >
                  Edit
                </Link>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={String(project._id)} />
                  <button
                    type="submit"
                    className="text-sm font-semibold text-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
