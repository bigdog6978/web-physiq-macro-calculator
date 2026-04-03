import type { AcademyCategory } from "./types";

export const ACADEMY_CATEGORIES: AcademyCategory[] = [
  {
    id: "basics",
    label: "Basics",
    slug: "basics",
    description: "Macro math, definitions, and how to use the calculator.",
  },
  {
    id: "fat-loss",
    label: "Fat Loss",
    slug: "fat-loss",
    description: "Deficits, protein, and sustainable cutting strategies.",
  },
  {
    id: "muscle-gain",
    label: "Muscle Gain",
    slug: "muscle-gain",
    description: "Surpluses, training fuel, and lean bulking.",
  },
  {
    id: "body-recomposition",
    label: "Body Recomposition",
    slug: "body-recomposition",
    description: "Recomp goals, protein, and gradual change.",
  },
  {
    id: "diet-strategies",
    label: "Diet Strategies",
    slug: "diet-strategies",
    description: "High protein, low carb, and style-specific setups.",
  },
  {
    id: "men",
    label: "Men",
    slug: "men",
    description: "Macro considerations common for male trainees.",
  },
  {
    id: "women",
    label: "Women",
    slug: "women",
    description: "Macro considerations common for female trainees.",
  },
  {
    id: "comparisons",
    label: "Comparisons",
    slug: "comparisons",
    description: "Tool and approach comparisons for clarity.",
  },
];

const bySlug = new Map(ACADEMY_CATEGORIES.map((c) => [c.slug, c]));
const byId = new Map(ACADEMY_CATEGORIES.map((c) => [c.id, c]));

export function getCategoryBySlug(slug: string): AcademyCategory | undefined {
  return bySlug.get(slug);
}

export function getCategoryById(id: string): AcademyCategory | undefined {
  return byId.get(id);
}
