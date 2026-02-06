import HonorForm from "@/components/admin/honor-form";
import { createHonor } from "../actions";

export default function NewHonorPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-ink">New honor</h1>
      <HonorForm action={createHonor} submitLabel="Create honor" />
    </div>
  );
}
