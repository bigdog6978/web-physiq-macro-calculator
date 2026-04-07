import type {
  ActivityLevel,
  DietModifier,
  EatingStyle,
  Goal,
  LegacyActivityLevel,
  LegacyMacroStrategy,
  Sex,
} from "@/types/macro";

export const GOALS: {
  id: Goal;
  label: string;
  description: string;
}[] = [
  {
    id: "cut",
    label: "Cut Fat",
    description: "Lose body fat while preserving muscle.",
  },
  {
    id: "build",
    label: "Build Muscle",
    description: "Add lean mass with a controlled calorie surplus.",
  },
  {
    id: "maintain",
    label: "Maintain",
    description: "Keep weight stable while supporting recovery and training.",
  },
  {
    id: "recomp",
    label: "Body Recomposition",
    description: "Improve body composition with a near-maintenance intake.",
  },
];

export const EATING_STYLES: {
  id: EatingStyle;
  label: string;
  description: string;
}[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Flexible mixed-diet meal suggestions.",
  },
  {
    id: "mediterranean",
    label: "Mediterranean",
    description: "Emphasizes olive oil, fish, legumes, fruits, and vegetables.",
  },
  {
    id: "vegan",
    label: "Vegan",
    description: "Plant-based meals with protein spread across the day.",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
    description: "Plant-forward meals that may include eggs and dairy.",
  },
  {
    id: "paleo",
    label: "Paleo",
    description: "Whole-food meals centered on meat, produce, and minimally processed foods.",
  },
  {
    id: "keto",
    label: "Keto",
    description: "Low-carb, higher-fat meals with a strict carb ceiling.",
  },
  {
    id: "carnivore",
    label: "Carnivore",
    description: "Animal-based meals with near-zero carbohydrate intake.",
  },
  {
    id: "psmf",
    label: "PSMF (protein-sparing)",
    description:
      "A short-term, very low-calorie pattern relative to your TDEE with protein emphasized to help spare lean mass while fat and carbs are kept minimal. Intended for aggressive fat loss, not maintenance or muscle-building surpluses. This calculator is educational only and not a substitute for medical advice.",
  },
];

export const DIET_MODIFIERS: { id: DietModifier; label: string }[] = [
  { id: "gluten_free", label: "Gluten-Free" },
  { id: "dairy_free", label: "Dairy-Free" },
  { id: "nut_free", label: "Nut-Free" },
  { id: "egg_free", label: "Egg-Free" },
  { id: "soy_free", label: "Soy-Free" },
  { id: "shellfish_free", label: "Shellfish-Free" },
  { id: "intermittent_fasting", label: "Intermittent Fasting" },
  { id: "low_glycemic", label: "Low Glycemic" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
];

export const ACTIVITY_LEVELS: {
  id: ActivityLevel;
  label: string;
  description: string;
  multiplier: number;
}[] = [
  {
    id: "sedentary",
    label: "Sedentary",
    description: "Desk work or low daily movement.",
    multiplier: 1.2,
  },
  {
    id: "light_activity",
    label: "Light Activity",
    description: "Walking, yoga, and light movement.",
    multiplier: 1.35,
  },
  {
    id: "moderate_training",
    label: "Moderate Training",
    description: "3-4 workouts per week.",
    multiplier: 1.5,
  },
  {
    id: "strength_training",
    label: "Strength Training",
    description: "4-6 gym sessions per week.",
    multiplier: 1.65,
  },
  {
    id: "endurance_training",
    label: "Endurance Training",
    description: "Running, cycling, or high sport volume.",
    multiplier: 1.75,
  },
];

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> =
  Object.fromEntries(
    ACTIVITY_LEVELS.map((level) => [level.id, level.multiplier])
  ) as Record<ActivityLevel, number>;

export const GOAL_CALORIE_ADJUSTMENTS: Record<
  Exclude<Goal, "recomp">,
  number
> = {
  cut: -0.2,
  build: 0.1,
  maintain: 0,
};

export const RECOMP_BODY_FAT_THRESHOLDS: Record<
  Exclude<Sex, "prefer_not_to_say">,
  number
> = {
  male: 18,
  female: 25,
};

export const PROTEIN_FROM_LEAN_MASS_G_PER_LB: Record<Goal, number> = {
  cut: 1.1,
  build: 0.95,
  maintain: 0.85,
  recomp: 1,
};

export const ACTIVITY_PROTEIN_FLOOR_G_PER_LB: Record<ActivityLevel, number> = {
  sedentary: 0.7,
  light_activity: 0.8,
  moderate_training: 0.85,
  strength_training: 0.95,
  endurance_training: 0.85,
};

export const PROTEIN_FROM_BODY_WEIGHT_G_PER_LB: Record<
  Goal,
  Record<ActivityLevel, number>
> = {
  cut: {
    sedentary: 0.8,
    light_activity: 0.9,
    moderate_training: 1,
    strength_training: 1.05,
    endurance_training: 0.95,
  },
  build: {
    sedentary: 0.75,
    light_activity: 0.8,
    moderate_training: 0.9,
    strength_training: 0.95,
    endurance_training: 0.9,
  },
  maintain: {
    sedentary: 0.7,
    light_activity: 0.75,
    moderate_training: 0.8,
    strength_training: 0.85,
    endurance_training: 0.8,
  },
  recomp: {
    sedentary: 0.8,
    light_activity: 0.85,
    moderate_training: 0.95,
    strength_training: 1,
    endurance_training: 0.9,
  },
};

export const FAT_MINIMUM_G_PER_LB: Record<EatingStyle, number> = {
  standard: 0.3,
  mediterranean: 0.3,
  vegan: 0.3,
  vegetarian: 0.3,
  paleo: 0.3,
  keto: 0.5,
  carnivore: 0.45,
  /** Essential-fat floor only; PSMF keeps dietary fat minimal vs standard 0.3 g/lb. */
  psmf: 0.12,
};

export const CALORIE_FLOORS: Record<Sex, number> = {
  female: 1200,
  male: 1500,
  prefer_not_to_say: 1350,
};

export const MINIMUM_PROTEIN_G_PER_LB = 0.7;
export const MINIMUM_FAT_G_PER_LB = 0.25;
export const MINIMUM_FAT_CALORIE_PERCENT = 0.2;

export const EATING_STYLE_CARB_CAPS: Partial<Record<EatingStyle, number>> = {
  keto: 30,
  carnivore: 5,
  /** PSMF: low daily carb total (often ~20–40g in clinical-style protocols). */
  psmf: 28,
};

/** Calorie target ≈ this fraction of TDEE before PSMF protein/fat/carb feasibility bumps. */
export const PSMF_TDEE_FRACTION = 0.55;

export const LEGACY_EATING_STYLE_MAP: Record<LegacyMacroStrategy, EatingStyle> = {
  high_protein: "standard",
  balanced: "standard",
  low_fat: "standard",
  performance: "standard",
  low_carb: "keto",
  mediterranean: "mediterranean",
  keto: "keto",
  carnivore: "carnivore",
};

export const LEGACY_ACTIVITY_LEVEL_MAP: Record<
  LegacyActivityLevel,
  ActivityLevel
> = {
  sedentary: "sedentary",
  light: "light_activity",
  moderate: "moderate_training",
  very_active: "strength_training",
  extra_active: "endurance_training",
};

export const EATING_STYLE_LABELS: Record<EatingStyle, string> =
  Object.fromEntries(EATING_STYLES.map((style) => [style.id, style.label])) as Record<
    EatingStyle,
    string
  >;

export const GOAL_LABELS: Record<Goal, string> = Object.fromEntries(
  GOALS.map((goal) => [goal.id, goal.label])
) as Record<Goal, string>;
