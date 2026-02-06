import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Education } from "@/lib/types";
import { deleteEducation } from "./actions";

export default async function EducationAdminPage() {
  const db = await getDb();
  const education = await db
    .collection<Education>("education")
    .find()
    .sort({ order: 1, start: -1 })
    .toArray();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Education</h1>
          <p className="text-sm text-muted">Manage education entries.</p>
        </div>
        <Link
          href="/admin/education/new"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
        >
          New education
        </Link>
      </div>
      <div className="grid gap-4">
        {education.length === 0 ? (
          <p className="text-sm text-muted">No education yet.</p>
        ) : (
          education.map((entry) => (
            <div
              key={String(entry._id)}
              className="card flex flex-wrap items-center justify-between gap-4 p-6"
            >
              <div>
                <p className="text-sm font-semibold text-ink">
                  {entry.degree.en} · {entry.school.en}
                </p>
                <p className="text-xs text-muted">
                  {entry.published ? "Published" : "Draft"} · Order {entry.order}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/education/${entry._id}`}
                  className="text-sm font-semibold text-accent"
                >
                  Edit
                </Link>
                <form action={deleteEducation}>
                  <input type="hidden" name="id" value={String(entry._id)} />
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
