import type { ObjectId } from "mongodb";

export type LocaleKey = "en" | "fa" | "tr" | "ar";

export type LocalizedText = Record<LocaleKey, string>;
export type LocalizedArray = Record<LocaleKey, string[]>;

export type Project = {
  _id?: ObjectId;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  start?: string;
  end?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Experience = {
  _id?: ObjectId;
  company: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  location: LocalizedText;
  start: string;
  end?: string;
  current: boolean;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Education = {
  _id?: ObjectId;
  school: LocalizedText;
  degree: LocalizedText;
  field: LocalizedText;
  summary: LocalizedText;
  start: string;
  end?: string;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Honor = {
  _id?: ObjectId;
  title: LocalizedText;
  issuer: LocalizedText;
  summary: LocalizedText;
  date: string;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Bio = {
  _id?: ObjectId;
  name: string;
  headline: LocalizedText;
  summary: LocalizedText;
  story: LocalizedText;
  location: LocalizedText;
  email: string;
  github?: string;
  linkedin?: string;
  updatedAt?: string;
};
