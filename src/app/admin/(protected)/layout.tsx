import { requireAdmin } from "@/lib/auth";
import AdminNav from "@/components/admin/admin-nav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-8 md:px-10">
      <AdminNav />
      {children}
    </div>
  );
}
