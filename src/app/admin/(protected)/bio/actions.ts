"use server";

import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { parseLocalizedText, parseString } from "@/lib/forms";

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
    website: parseString(formData, "website"),
    github: parseString(formData, "github"),
    linkedin: parseString(formData, "linkedin"),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("bio").updateOne({}, { $set: payload }, { upsert: true });
}

