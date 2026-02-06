import BioForm from "@/components/admin/bio-form";
import { getBio } from "@/lib/content";
import { updateBio } from "./actions";

type BioAdminPageProps = {
  searchParams?: { success?: string; error?: string };
};

export default async function BioAdminPage({ searchParams }: BioAdminPageProps) {
  const bio = await getBio();
  const showSuccess = searchParams?.success === "1";
  const showError = searchParams?.error === "1";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold text-ink">Biography</h1>
        {showSuccess ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Biography updated.
          </div>
        ) : null}
        {showError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Something went wrong. Please try again.
          </div>
        ) : null}
      </div>
      <BioForm action={updateBio} submitLabel="Update bio" defaultValues={bio ?? undefined} />
    </div>
  );
}
