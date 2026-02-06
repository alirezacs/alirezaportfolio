"use server";

import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  parseBoolean,
  parseNumber,
  parseString,
  parseStringArray,
} from "@/lib/forms";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export async function createProject(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const title = parseString(formData, "title");
  const summary = parseString(formData, "summary");
  const description = parseString(formData, "description");
  const slugInput = parseString(formData, "slug");

  const payload = {
    slug: slugInput || slugify(title || "project"),
    title,
    summary,
    description,
    tech: parseStringArray(formData, "tech"),
    demoUrl: parseString(formData, "demoUrl"),
    repoUrl: parseString(formData, "repoUrl"),
    featured: parseBoolean(formData, "featured"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection("projects").insertOne(payload);
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  const title = parseString(formData, "title");
  const summary = parseString(formData, "summary");
  const description = parseString(formData, "description");
  const slugInput = parseString(formData, "slug");

  const payload = {
    slug: slugInput || slugify(title || "project"),
    title,
    summary,
    description,
    tech: parseStringArray(formData, "tech"),
    demoUrl: parseString(formData, "demoUrl"),
    repoUrl: parseString(formData, "repoUrl"),
    featured: parseBoolean(formData, "featured"),
    published: parseBoolean(formData, "published"),
    order: parseNumber(formData, "order"),
    start: parseString(formData, "start"),
    end: parseString(formData, "end"),
    updatedAt: new Date().toISOString(),
  };

  await db
    .collection("projects")
    .updateOne({ _id: new ObjectId(id) }, { $set: payload });
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const db = await getDb();
  const id = parseString(formData, "id");

  if (!ObjectId.isValid(id)) {
    return;
  }

  await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
}

