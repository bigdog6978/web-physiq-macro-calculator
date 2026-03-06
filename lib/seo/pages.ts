import type { SEOPageConfig } from "./types";
import type { Goal, MacroStrategy } from "@/types/macro";

const INTENT_WEIGHTS = [130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230] as const;
const INTENT_GENDERS = ["male", "female"] as const;
const MEAL_PLAN_CALORIES = [1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200] as const;
const MEAL_PLAN_STRATEGIES: MacroStrategy[] = [
  "high_protein",
  "balanced",
  "keto",
  "carnivore",
];

const MACRO_INTENTS: Array<{
  goal: Goal;
  strategy: MacroStrategy;
  minWeight?: number;
  skip?: (weightLb: number, gender: "male" | "female") => boolean;
}> = [
  { goal: "cut", strategy: "high_protein" },
  { goal: "cut", strategy: "balanced" },
  { goal: "cut", strategy: "keto" },
  {
    goal: "cut",
    strategy: "carnivore",
    skip: (weightLb, gender) => gender === "female" && weightLb < 150,
  },
  { goal: "build", strategy: "high_protein" },
  { goal: "build", strategy: "balanced" },
  { goal: "build", strategy: "performance", minWeight: 150 },
  { goal: "maintain", strategy: "balanced" },
  { goal: "maintain", strategy: "high_protein" },
  { goal: "recomp", strategy: "balanced", minWeight: 150 },
];

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

export function macroSlug(
  weightLb: number,
  gender: "male" | "female",
  goal: Goal,
  strategy: MacroStrategy
): string {
  return `${weightLb}-pound-${gender}-${GOAL_SLUG[goal]}-${STRATEGY_SLUG[strategy] ?? strategy}-macros`;
}

export function proteinSlug(weightLb: number, gender: "male" | "female"): string {
  return `protein-intake-for-${weightLb}-pound-${gender}`;
}

export function mealPlanSlug(calorieTarget: number, strategy: MacroStrategy): string {
  return `meal-plan-for-${calorieTarget}-calories-${STRATEGY_SLUG[strategy] ?? strategy}`;
}

function profileDefaults(
  weightLb: number,
  gender: "male" | "female",
  goal: Goal,
  strategy: MacroStrategy
): Pick<SEOPageConfig, "heightCm" | "age" | "activityLevel" | "goal" | "strategy"> {
  return {
    heightCm: gender === "female" ? 163 : 178,
    age: 30,
    activityLevel: goal === "build" ? "very_active" : "moderate",
    goal,
    strategy,
  };
}

function generateMacroMicroPages(): SEOPageConfig[] {
  const pages: SEOPageConfig[] = [];
  for (const weightLb of INTENT_WEIGHTS) {
    for (const gender of INTENT_GENDERS) {
      for (const intent of MACRO_INTENTS) {
        if (intent.minWeight && weightLb < intent.minWeight) continue;
        if (intent.skip?.(weightLb, gender)) continue;
        const defaults = profileDefaults(weightLb, gender, intent.goal, intent.strategy);
        pages.push({
          slug: macroSlug(weightLb, gender, intent.goal, intent.strategy),
          tier: "micro",
          pageType: "macro",
          weightLb,
          gender,
          ...defaults,
        });
      }
    }
  }
  return pages;
}

function generateProteinPages(): SEOPageConfig[] {
  const pages: SEOPageConfig[] = [];
  for (const weightLb of INTENT_WEIGHTS) {
    for (const gender of INTENT_GENDERS) {
      pages.push({
        slug: proteinSlug(weightLb, gender),
        tier: "micro",
        pageType: "protein_intake",
        weightLb,
        gender,
        goal: "maintain",
        strategy: "high_protein",
        heightCm: gender === "female" ? 163 : 178,
        age: 30,
        activityLevel: "moderate",
      });
    }
  }
  return pages;
}

function profileForMealPlan(
  calorieTarget: number,
  strategy: MacroStrategy
): Pick<
  SEOPageConfig,
  "weightLb" | "gender" | "goal" | "strategy" | "heightCm" | "age" | "activityLevel"
> {
  if (calorieTarget <= 1800) {
    return {
      weightLb: 145,
      gender: "female",
      goal: "cut",
      strategy,
      heightCm: 163,
      age: 30,
      activityLevel: "moderate",
    };
  }
  if (calorieTarget <= 2200) {
    return {
      weightLb: 175,
      gender: "male",
      goal: "maintain",
      strategy,
      heightCm: 178,
      age: 30,
      activityLevel: "moderate",
    };
  }
  if (calorieTarget <= 2800) {
    return {
      weightLb: 195,
      gender: "male",
      goal: "build",
      strategy,
      heightCm: 180,
      age: 28,
      activityLevel: "very_active",
    };
  }
  return {
    weightLb: 220,
    gender: "male",
    goal: "build",
    strategy,
    heightCm: 183,
    age: 30,
    activityLevel: "very_active",
  };
}

function generateMealPlanPages(): SEOPageConfig[] {
  const pages: SEOPageConfig[] = [];
  for (const calorieTarget of MEAL_PLAN_CALORIES) {
    for (const strategy of MEAL_PLAN_STRATEGIES) {
      if (calorieTarget >= 3000 && (strategy === "keto" || strategy === "carnivore")) {
        continue;
      }
      pages.push({
        slug: mealPlanSlug(calorieTarget, strategy),
        tier: "micro",
        pageType: "meal_plan",
        calorieTarget,
        ...profileForMealPlan(calorieTarget, strategy),
      });
    }
  }
  return pages;
}

const CLUSTER_PAGES: SEOPageConfig[] = [
  {
    slug: "macros-for-men",
    tier: "cluster",
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
    pageType: "macro",
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
  ...generateMacroMicroPages(),
  ...generateProteinPages(),
  ...generateMealPlanPages(),
];

export const SEO_COUNTS = {
  total: ALL_SEO_PAGES.length,
  pillars: PILLAR_PAGES.length,
  clusters: CLUSTER_PAGES.length,
  macroMicro: ALL_SEO_PAGES.filter((p) => p.tier === "micro" && p.pageType === "macro")
    .length,
  proteinPages: ALL_SEO_PAGES.filter(
    (p) => p.tier === "micro" && p.pageType === "protein_intake"
  ).length,
  mealPlanPages: ALL_SEO_PAGES.filter((p) => p.tier === "micro" && p.pageType === "meal_plan")
    .length,
};

const PAGE_BY_SLUG = new Map(ALL_SEO_PAGES.map((page) => [page.slug, page]));

function assertNoDuplicateSlugs(): void {
  const seen = new Set<string>();
  for (const page of ALL_SEO_PAGES) {
    if (seen.has(page.slug)) {
      throw new Error(`[seo] Duplicate slug found: ${page.slug}`);
    }
    seen.add(page.slug);
  }
}

assertNoDuplicateSlugs();

export function getPageConfig(slug: string): SEOPageConfig | undefined {
  return PAGE_BY_SLUG.get(slug);
}
