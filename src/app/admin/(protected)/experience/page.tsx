import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Experience } from "@/lib/types";
import { deleteExperience } from "./actions";

export default async function ExperienceAdminPage() {
  const db = await getDb();
  const experiences = await db
    .collection<Experience>("experiences")
    .find()
    .sort({ order: 1, start: -1 })
    .toArray();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Experience</h1>
          <p className="text-sm text-muted">Manage experience entries.</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
        >
          New experience
        </Link>
      </div>
      <div className="grid gap-4">
        {experiences.length === 0 ? (
          <p className="text-sm text-muted">No experience yet.</p>
        ) : (
          experiences.map((experience) => (
            <div
              key={String(experience._id)}
              className="card flex flex-wrap items-center justify-between gap-4 p-6"
            >
              <div>
                <p className="text-sm font-semibold text-ink">
                  {experience.role.en} · {experience.company.en}
                </p>
                <p className="text-xs text-muted">
                  {experience.published ? "Published" : "Draft"} · Order {experience.order}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/experience/${experience._id}`}
                  className="text-sm font-semibold text-accent"
                >
                  Edit
                </Link>
                <form action={deleteExperience}>
                  <input type="hidden" name="id" value={String(experience._id)} />
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
