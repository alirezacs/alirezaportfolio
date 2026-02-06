import type { Bio, Education, Experience, Honor, LocalizedText, Project } from "./types";

const text = (value: string): LocalizedText => ({
  en: value,
  fa: value,
  tr: value,
  ar: value,
});

export const defaultProjects: Project[] = [
  {
    slug: "atlas-notes",
    title: text("Atlas Notes"),
    summary: text("A multilingual research notebook with fast search, smart tags, and structured citations."),
    description: text(
      "Designed a knowledge workspace for long-form research with semantic search, inline citations, and export-ready reports."
    ),
    tech: ["Next.js", "MongoDB", "TypeScript", "Elastic UI"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example",
    featured: true,
    published: true,
    order: 1,
    start: "2024-02",
    end: "2024-08",
  },
  {
    slug: "pulseboard",
    title: text("Pulseboard"),
    summary: text("A real-time analytics dashboard for product teams with alerting and cohort insights."),
    description: text(
      "Built a responsive dashboard that consolidates metrics, experiments, and customer health signals into a single workspace."
    ),
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example",
    featured: true,
    published: true,
    order: 2,
    start: "2023-06",
    end: "2023-12",
  },
  {
    slug: "fieldcraft",
    title: text("FieldCraft"),
    summary: text("A mobile-first reporting suite for distributed field teams and remote inspections."),
    description: text(
      "Launched a mobile workflow that enables offline capture, automated checklists, and audit-ready exports."
    ),
    tech: ["Next.js", "React Native", "MongoDB", "Mapbox"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/example",
    featured: false,
    published: true,
    order: 3,
    start: "2022-04",
    end: "2022-11",
  },
];

export const defaultExperiences: Experience[] = [
  {
    company: text("Independent / Freelance"),
    role: text("Full-Stack Product Engineer"),
    summary: text(
      "Partnered with founders to design, ship, and scale SaaS products with a focus on UX, performance, and reliability."
    ),
    location: text("Remote"),
    start: "2022-01",
    end: "",
    current: true,
    published: true,
    order: 1,
  },
  {
    company: text("Lumen Studio"),
    role: text("Frontend Engineer"),
    summary: text(
      "Led UI architecture for analytics platforms, built design systems, and improved time-to-interactive by 35%."
    ),
    location: text("Tehran"),
    start: "2019-06",
    end: "2021-12",
    current: false,
    published: true,
    order: 2,
  },
];

export const defaultEducation: Education[] = [
  {
    school: text("University of Technology"),
    degree: text("B.Sc. in Computer Engineering"),
    field: text("Software Systems"),
    summary: text(
      "Focused on distributed systems, product design, and human-computer interaction."
    ),
    start: "2016",
    end: "2020",
    published: true,
    order: 1,
  },
];

export const defaultHonors: Honor[] = [
  {
    title: text("Top 5% — Global Product Challenge"),
    issuer: text("Product Guild"),
    summary: text("Recognized for crafting a high-impact civic tech solution in 48 hours."),
    date: "2023",
    published: true,
    order: 1,
  },
  {
    title: text("Best UX Award"),
    issuer: text("Design Week"),
    summary: text("Honored for delivering a research-backed onboarding experience."),
    date: "2022",
    published: true,
    order: 2,
  },
];

export const defaultBio: Bio = {
  name: "Alireza",
  headline: text("Full-Stack Developer & Product Builder"),
  summary: text(
    "I design and build digital products that balance clarity, performance, and measurable outcomes."
  ),
  story: text(
    "I collaborate with teams to turn complex ideas into calm, confident experiences. My work blends systems thinking, rapid prototyping, and thoughtful engineering so products scale gracefully."
  ),
  location: text("Tehran, Iran"),
  email: "hello@example.com",
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
};
