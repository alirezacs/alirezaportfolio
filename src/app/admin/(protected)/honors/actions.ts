"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  parseBoolean,
  parseLocalizedText,
  parseNumber,
  parseString,
} from "@/lib/forms";
import { locales } from "@/i18n/config";

export async function createHonor(formData: FormData) {
  await requireAdmin();
  const db = await getDb();

  const payload = {
    title: parseLocalizedText(formData, "title"),
    issuer: parseLocalizedText(formData, "issuer"),
    summary: parseLocalizedText(formData, "summary"),
    date: parseString(formData, "date"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("honors").insertOne(payload);
  revalidatePath("/admin/honors");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/honors`);
  }
  redirect("/admin/honors?created=1");
}

export async function updateHonor(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  const payload = {
    title: parseLocalizedText(formData, "title"),
    issuer: parseLocalizedText(formData, "issuer"),
    summary: parseLocalizedText(formData, "summary"),
    date: parseString(formData, "date"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection("honors")
    .updateOne({ _id: new ObjectId(id) }, { $set: payload });

  revalidatePath("/admin/honors");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/honors`);
  }
  redirect("/admin/honors?updated=1");
}

export async function deleteHonor(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  await db.collection("honors").deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/admin/honors");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/honors`);
  }
  redirect("/admin/honors?deleted=1");
}
