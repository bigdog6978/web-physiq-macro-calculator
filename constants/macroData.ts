import type { Goal, MacroStrategy, DietModifier } from "@/types/macro";

export const GOALS: {
  id: Goal;
  label: string;
  description: string;
}[] = [
  {
    id: "cut",
    label: "Cut Fat",
    description: "Lose body fat while preserving muscle",
  },
  {
    id: "build",
    label: "Build Muscle",
    description: "Gain lean mass with a calorie surplus",
  },
  {
    id: "maintain",
    label: "Maintain",
    description: "Keep your current weight and composition",
  },
  {
    id: "recomp",
    label: "Body Recomp",
    description: "Build muscle and lose fat simultaneously",
  },
];

export const STRATEGIES: {
  id: MacroStrategy;
  label: string;
  shortDesc: string;
}[] = [
  { id: "high_protein", label: "High Protein", shortDesc: "30% fat / 30% carbs" },
  { id: "low_carb", label: "Low Carb", shortDesc: "40% fat / 20% carbs" },
  { id: "low_fat", label: "Low Fat", shortDesc: "20% fat / 50% carbs" },
  { id: "balanced", label: "Balanced", shortDesc: "30% fat / 40% carbs" },
  { id: "performance", label: "Performance", shortDesc: "25% fat / 50% carbs" },
  { id: "carnivore", label: "Carnivore", shortDesc: "70% fat / 0% carbs" },
  { id: "keto", label: "Keto", shortDesc: "65% fat / 5% carbs" },
  {
    id: "mediterranean",
    label: "Mediterranean",
    shortDesc: "35% fat / 40% carbs",
  },
];

export const MODIFIERS: { id: DietModifier; label: string }[] = [
  { id: "vegan", label: "Vegan" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten_free", label: "Gluten-Free" },
  { id: "dairy_free", label: "Dairy-Free" },
  { id: "nut_free", label: "Nut-Free" },
  { id: "egg_free", label: "Egg-Free" },
  { id: "shellfish_free", label: "Shellfish-Free" },
  { id: "soy_free", label: "Soy-Free" },
];

import type { ActivityLevel } from "@/types/macro";

export const ACTIVITY_LEVELS: {
  id: ActivityLevel;
  label: string;
  multiplier: number;
}[] = [
  { id: "sedentary", label: "Sedentary", multiplier: 1.2 },
  { id: "light", label: "Lightly Active", multiplier: 1.375 },
  { id: "moderate", label: "Moderately Active", multiplier: 1.55 },
  { id: "very_active", label: "Very Active", multiplier: 1.725 },
  { id: "extra_active", label: "Extra Active", multiplier: 1.9 },
];

// Fat/carb split as % of REMAINING calories (after protein)
// Format: { fat: number, carbs: number } - remainder goes to fat for carnivore
export const STRATEGY_FAT_CARB_SPLIT: Record<
  MacroStrategy,
  { fat: number; carbs: number }
> = {
  balanced: { fat: 0.3, carbs: 0.4 },
  high_protein: { fat: 0.3, carbs: 0.3 },
  low_carb: { fat: 0.4, carbs: 0.2 },
  low_fat: { fat: 0.2, carbs: 0.5 },
  performance: { fat: 0.25, carbs: 0.5 },
  keto: { fat: 0.65, carbs: 0.05 },
  carnivore: { fat: 0.7, carbs: 0 },
  mediterranean: { fat: 0.35, carbs: 0.4 },
};

// Protein g per lb body weight when body fat % not provided
export const STRATEGY_PROTEIN_G_PER_LB: Record<MacroStrategy, number> = {
  high_protein: 1.1,
  balanced: 0.9,
  performance: 0.9,
  low_carb: 1.0,
  low_fat: 0.9,
  keto: 1.0,
  carnivore: 1.1,
  mediterranean: 0.9,
};
