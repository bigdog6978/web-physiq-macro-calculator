import type { Goal, MacroStrategy, ActivityLevel, Gender } from "@/types/macro";

export interface SEOPageConfig {
  slug: string;
  tier: "pillar" | "cluster" | "micro";
  weightLb?: number;
  gender?: Gender;
  goal?: Goal;
  strategy?: MacroStrategy;
  activityLevel?: ActivityLevel;
  heightCm?: number;
  age?: number;
}
