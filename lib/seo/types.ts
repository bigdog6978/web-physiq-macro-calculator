import type {
  Goal,
  MacroStrategy,
  ActivityLevel,
  Gender,
  LegacyActivityLevel,
} from "@/types/macro";

export type SEOPageType = "macro" | "protein_intake" | "meal_plan";

export interface SEOPageConfig {
  slug: string;
  tier: "pillar" | "cluster" | "micro";
  pageType?: SEOPageType;
  weightLb?: number;
  gender?: Gender;
  goal?: Goal;
  strategy?: MacroStrategy;
  calorieTarget?: number;
  activityLevel?: ActivityLevel | LegacyActivityLevel;
  heightCm?: number;
  age?: number;
}
