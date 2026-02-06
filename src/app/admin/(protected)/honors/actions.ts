"use server";

import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  parseBoolean,
  parseLocalizedText,
  parseNumber,
  parseString,
} from "@/lib/forms";

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
}

export async function deleteHonor(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  await db.collection("honors").deleteOne({ _id: new ObjectId(id) });
}

