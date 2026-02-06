import BioForm from "@/components/admin/bio-form";
import { getBio } from "@/lib/content";
import { updateBio } from "./actions";

export default async function BioAdminPage() {
  const bio = await getBio();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">Biography</h1>
      <BioForm action={updateBio} submitLabel="Update bio" defaultValues={bio} />
    </div>
  );
}
