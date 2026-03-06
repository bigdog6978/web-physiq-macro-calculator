import type { Goal, MacroStrategy, ActivityLevel, Gender } from "@/types/macro";

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
  activityLevel?: ActivityLevel;
  heightCm?: number;
  age?: number;
}
