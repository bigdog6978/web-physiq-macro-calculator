import type { SEOPageConfig } from "./types";
import type { Goal, MacroStrategy } from "@/types/macro";

const MICRO_WEIGHTS = [130, 140, 150, 160, 170, 180, 190, 200, 210] as const;
const MICRO_GENDERS = ["male", "female"] as const;
const MICRO_GOALS: Goal[] = ["cut", "build", "maintain"];
const MICRO_STRATEGIES: MacroStrategy[] = ["high_protein", "keto", "carnivore"];

export const GOAL_SLUG: Record<Goal, string> = {
  cut: "cutting",
  build: "bulking",
  maintain: "maintenance",
  recomp: "recomp",
};

export const STRATEGY_SLUG: Partial<Record<MacroStrategy, string>> = {
  high_protein: "high-protein",
  keto: "keto",
  carnivore: "carnivore",
  low_carb: "low-carb",
  balanced: "balanced",
  performance: "performance",
  low_fat: "low-fat",
  mediterranean: "mediterranean",
};

export function microSlug(
  weightLb: number,
  gender: string,
  goal: Goal,
  strategy: MacroStrategy
): string {
  return `${weightLb}-pound-${gender}-${GOAL_SLUG[goal]}-${STRATEGY_SLUG[strategy] ?? strategy}-macros`;
}

function generateMicroPages(): SEOPageConfig[] {
  const pages: SEOPageConfig[] = [];
  for (const weightLb of MICRO_WEIGHTS) {
    for (const gender of MICRO_GENDERS) {
      for (const goal of MICRO_GOALS) {
        for (const strategy of MICRO_STRATEGIES) {
          pages.push({
            slug: microSlug(weightLb, gender, goal, strategy),
            tier: "micro",
            weightLb,
            gender,
            goal,
            strategy,
            activityLevel: "moderate",
            heightCm: gender === "male" ? 178 : 163,
            age: 30,
          });
        }
      }
    }
  }
  return pages;
}

const CLUSTER_PAGES: SEOPageConfig[] = [
  {
    slug: "macros-for-men",
    tier: "cluster",
    gender: "male",
    goal: "cut",
    weightLb: 185,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "macros-for-women",
    tier: "cluster",
    gender: "female",
    goal: "cut",
    weightLb: 145,
    heightCm: 163,
    age: 30,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "cutting-macros",
    tier: "cluster",
    goal: "cut",
    gender: "male",
    weightLb: 180,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "bulking-macros",
    tier: "cluster",
    goal: "build",
    gender: "male",
    weightLb: 175,
    heightCm: 178,
    age: 25,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "maintenance-macros",
    tier: "cluster",
    goal: "maintain",
    gender: "male",
    weightLb: 175,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
    strategy: "balanced",
  },
  {
    slug: "keto-macros",
    tier: "cluster",
    strategy: "keto",
    goal: "cut",
    gender: "male",
    weightLb: 185,
    heightCm: 178,
    age: 35,
    activityLevel: "moderate",
  },
  {
    slug: "carnivore-macros",
    tier: "cluster",
    strategy: "carnivore",
    goal: "cut",
    gender: "male",
    weightLb: 190,
    heightCm: 178,
    age: 35,
    activityLevel: "moderate",
  },
  {
    slug: "high-protein-macros",
    tier: "cluster",
    strategy: "high_protein",
    goal: "cut",
    gender: "male",
    weightLb: 180,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
  },
];

const PILLAR_PAGES: SEOPageConfig[] = [
  {
    slug: "keto-macro-calculator",
    tier: "pillar",
    strategy: "keto",
    goal: "cut",
    gender: "male",
    weightLb: 185,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
  },
  {
    slug: "carnivore-macro-calculator",
    tier: "pillar",
    strategy: "carnivore",
    goal: "cut",
    gender: "male",
    weightLb: 185,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
  },
  {
    slug: "cutting-macro-calculator",
    tier: "pillar",
    goal: "cut",
    gender: "male",
    weightLb: 180,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "bulking-macro-calculator",
    tier: "pillar",
    goal: "build",
    gender: "male",
    weightLb: 175,
    heightCm: 178,
    age: 25,
    activityLevel: "moderate",
    strategy: "high_protein",
  },
  {
    slug: "high-protein-macro-calculator",
    tier: "pillar",
    strategy: "high_protein",
    goal: "cut",
    gender: "male",
    weightLb: 180,
    heightCm: 178,
    age: 30,
    activityLevel: "moderate",
  },
];

export const ALL_SEO_PAGES: SEOPageConfig[] = [
  ...PILLAR_PAGES,
  ...CLUSTER_PAGES,
  ...generateMicroPages(),
];

export function getPageConfig(slug: string): SEOPageConfig | undefined {
  return ALL_SEO_PAGES.find((p) => p.slug === slug);
}
