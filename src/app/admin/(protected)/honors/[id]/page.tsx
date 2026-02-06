import { notFound } from "next/navigation";
import HonorForm from "@/components/admin/honor-form";
import { getHonorById } from "@/lib/content";
import { updateHonor } from "../actions";

type HonorEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function HonorEditPage({ params }: HonorEditPageProps) {
  const { id } = await params;
  const honor = await getHonorById(id);

  if (!honor) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">Edit honor</h1>
      <HonorForm
        action={updateHonor}
        submitLabel="Update honor"
        defaultValues={honor}
      />
    </div>
  );
}

