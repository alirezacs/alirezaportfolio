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

export async function createEducation(formData: FormData) {
  await requireAdmin();
  const db = await getDb();

  const payload = {
    school: parseLocalizedText(formData, "school"),
    degree: parseLocalizedText(formData, "degree"),
    field: parseLocalizedText(formData, "field"),
    summary: parseLocalizedText(formData, "summary"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("education").insertOne(payload);
}

export async function updateEducation(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  const payload = {
    school: parseLocalizedText(formData, "school"),
    degree: parseLocalizedText(formData, "degree"),
    field: parseLocalizedText(formData, "field"),
    summary: parseLocalizedText(formData, "summary"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection("education")
    .updateOne({ _id: new ObjectId(id) }, { $set: payload });
}

export async function deleteEducation(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  await db.collection("education").deleteOne({ _id: new ObjectId(id) });
}

