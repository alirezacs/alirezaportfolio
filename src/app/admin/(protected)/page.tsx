import Link from "next/link";
import { getDb } from "@/lib/db";

export default async function AdminDashboard() {
  const db = await getDb();
  const [projects, experiences, honors, education] = await Promise.all([
    db.collection("projects").countDocuments(),
    db.collection("experiences").countDocuments(),
    db.collection("honors").countDocuments(),
    db.collection("education").countDocuments(),
  ]);

  const cards = [
    { label: "Projects", count: projects, href: "/admin/projects" },
    { label: "Experience", count: experiences, href: "/admin/experience" },
    { label: "Honors", count: honors, href: "/admin/honors" },
    { label: "Education", count: education, href: "/admin/education" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
          <p className="text-sm text-muted">
            Manage your content and keep the portfolio up to date.
          </p>
        </div>
        <Link
          href="/admin/bio"
          className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white"
        >
          Update bio
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="card flex items-center justify-between p-6 transition hover:-translate-y-1"
          >
            <div>
              <p className="text-sm font-semibold text-muted">{card.label}</p>
              <p className="text-2xl font-semibold text-ink">{card.count}</p>
            </div>
            <span className="text-sm font-semibold text-accent">Manage</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
