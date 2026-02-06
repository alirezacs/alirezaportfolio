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

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const db = await getDb();

  const payload = {
    company: parseLocalizedText(formData, "company"),
    role: parseLocalizedText(formData, "role"),
    summary: parseLocalizedText(formData, "summary"),
    location: parseLocalizedText(formData, "location"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    current: parseBoolean(formData, "current"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("experiences").insertOne(payload);
}

export async function updateExperience(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  const payload = {
    company: parseLocalizedText(formData, "company"),
    role: parseLocalizedText(formData, "role"),
    summary: parseLocalizedText(formData, "summary"),
    location: parseLocalizedText(formData, "location"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    current: parseBoolean(formData, "current"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection("experiences")
    .updateOne({ _id: new ObjectId(id) }, { $set: payload });
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  await db.collection("experiences").deleteOne({ _id: new ObjectId(id) });
}

