import { ObjectId } from "mongodb";
import { getDb } from "./db";
import {
  Bio,
  Education,
  Experience,
  Honor,
  LocalizedText,
  LocaleKey,
  Project,
} from "./types";

export function localizeText(
  text: LocalizedText | null | undefined,
  locale: LocaleKey
) {
  return text?.[locale] || text?.en || "";
}

export function resolveText(
  value: string | LocalizedText | null | undefined,
  locale: LocaleKey
) {
  if (!value) return "";
  return typeof value === "string" ? value : localizeText(value, locale);
}

export async function getProjects() {
  try {
    const db = await getDb();
    const items = await db
      .collection<Project>("projects")
      .find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return items;
  } catch {
    return [];
  }
}

export async function getExperiences() {
  try {
    const db = await getDb();
    const items = await db
      .collection<Experience>("experiences")
      .find({ published: true })
      .sort({ order: 1, start: -1 })
      .toArray();

    return items;
  } catch {
    return [];
  }
}

export async function getEducation() {
  try {
    const db = await getDb();
    const items = await db
      .collection<Education>("education")
      .find({ published: true })
      .sort({ order: 1, start: -1 })
      .toArray();

    return items;
  } catch {
    return [];
  }
}

export async function getHonors() {
  try {
    const db = await getDb();
    const items = await db
      .collection<Honor>("honors")
      .find({ published: true })
      .sort({ order: 1, date: -1 })
      .toArray();

    return items;
  } catch {
    return [];
  }
}

export async function getBio() {
  try {
    const db = await getDb();
    const item = await db.collection<Bio>("bio").findOne({});
    return item ?? null;
  } catch {
    return null;
  }
}

export async function getProjectById(id: string) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return db.collection<Project>("projects").findOne({ _id: new ObjectId(id) });
}

export async function getExperienceById(id: string) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return db
    .collection<Experience>("experiences")
    .findOne({ _id: new ObjectId(id) });
}

export async function getEducationById(id: string) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return db
    .collection<Education>("education")
    .findOne({ _id: new ObjectId(id) });
}

export async function getHonorById(id: string) {
  const db = await getDb();
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return db.collection<Honor>("honors").findOne({ _id: new ObjectId(id) });
}
