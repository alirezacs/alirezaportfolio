"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { parseLocalizedText, parseString } from "@/lib/forms";
import { locales } from "@/i18n/config";

export async function updateBio(formData: FormData) {
  await requireAdmin();
  const db = await getDb();

  const payload = {
    name: parseString(formData, "name"),
    headline: parseLocalizedText(formData, "headline"),
    summary: parseLocalizedText(formData, "summary"),
    story: parseLocalizedText(formData, "story"),
    location: parseLocalizedText(formData, "location"),
    email: parseString(formData, "email"),
    github: parseString(formData, "github"),
    linkedin: parseString(formData, "linkedin"),
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.collection("bio").updateOne({}, { $set: payload }, { upsert: true });

    revalidatePath("/admin/bio");
    for (const locale of locales) {
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/bio`);
    }

    redirect("/admin/bio?success=1");
  } catch {
    redirect("/admin/bio?error=1");
  }
}
