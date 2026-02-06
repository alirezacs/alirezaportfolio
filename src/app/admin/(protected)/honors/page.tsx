import Link from "next/link";
import { getDb } from "@/lib/db";
import type { Honor } from "@/lib/types";
import { deleteHonor } from "./actions";

type HonorsAdminPageProps = {
  searchParams?: { created?: string; updated?: string; deleted?: string };
};

export default async function HonorsAdminPage({
  searchParams,
}: HonorsAdminPageProps) {
  const db = await getDb();
  const honors = await db
    .collection<Honor>("honors")
    .find()
    .sort({ order: 1, date: -1 })
    .toArray();

  const showCreated = searchParams?.created === "1";
  const showUpdated = searchParams?.updated === "1";
  const showDeleted = searchParams?.deleted === "1";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-ink">Honors</h1>
          <p className="text-sm text-muted">Manage honors and awards.</p>
          {showCreated ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Honor created.
            </div>
          ) : null}
          {showUpdated ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Honor updated.
            </div>
          ) : null}
          {showDeleted ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
              Honor deleted.
            </div>
          ) : null}
        </div>
        <Link
          href="/admin/honors/new"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
        >
          New honor
        </Link>
      </div>
      <div className="grid gap-4">
        {honors.length === 0 ? (
          <p className="text-sm text-muted">No honors yet.</p>
        ) : (
          honors.map((honor) => (
            <div
              key={String(honor._id)}
              className="card flex flex-wrap items-center justify-between gap-4 p-6"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{honor.title.en}</p>
                <p className="text-xs text-muted">
                  {honor.published ? "Published" : "Draft"} · Order {honor.order}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/honors/${honor._id}`}
                  className="text-sm font-semibold text-accent"
                >
                  Edit
                </Link>
                <form action={deleteHonor}>
                  <input type="hidden" name="id" value={String(honor._id)} />
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
