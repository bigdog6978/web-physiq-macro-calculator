export type Gender = "male" | "female";
export type Sex = Gender | "prefer_not_to_say";

export type Goal = "cut" | "build" | "maintain" | "recomp";

export type EatingStyle =
  | "standard"
  | "mediterranean"
  | "vegan"
  | "vegetarian"
  | "paleo"
  | "keto"
  | "carnivore";

export type LegacyMacroStrategy =
  | "high_protein"
  | "low_carb"
  | "low_fat"
  | "balanced"
  | "performance"
  | "carnivore"
  | "keto"
  | "mediterranean";

// Backwards-compatible alias for legacy SEO and preset code paths.
export type MacroStrategy = EatingStyle | LegacyMacroStrategy;

export type DietModifier =
  | "gluten_free"
  | "dairy_free"
  | "nut_free"
  | "egg_free"
  | "soy_free"
  | "shellfish_free"
  | "intermittent_fasting"
  | "low_glycemic"
  | "halal"
  | "kosher";

export type LegacyDietModifier = DietModifier | "vegan" | "vegetarian";

export type ActivityLevel =
  | "sedentary"
  | "light_activity"
  | "moderate_training"
  | "strength_training"
  | "endurance_training";

export type LegacyActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very_active"
  | "extra_active";

export type WeightUnit = "lb" | "kg";
export type HeightUnit = "ft_in" | "cm";

export interface UserProfile {
  weightKg: number;
  heightCm: number;
  weightUnit: WeightUnit;
  heightUnit: HeightUnit;
  age: number;
  sex: Sex;
  gender?: Gender;
  bodyFatPercent?: number;
  goal: Goal;
  eatingStyle: EatingStyle;
  strategy?: MacroStrategy;
  dietModifiers: DietModifier[];
  modifiers?: LegacyDietModifier[];
  dietNotes?: string;
  activityLevel: ActivityLevel;
}

export interface MacroTargets {
  calories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroPercentages {
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroCalculationBreakdown {
  bodyCompositionBasis: "body_weight" | "lean_mass";
  leanBodyMassKg?: number;
  bmr: number;
  tdee: number;
  calorieAdjustmentPercent: number;
  calorieAdjustmentLabel: string;
  proteinRule: string;
  fatRule: string;
  carbRule: string;
  eatingStyleAdjustment: string;
  percentages: MacroPercentages;
  notes: string[];
}

export interface MealItem {
  name: string;
  portion: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Meal {
  label: string;
  items: MealItem[];
  totals: MacroTargets;
}

export interface MealPlanSummary {
  totals: MacroTargets;
  alignmentWarning?: string;
}

export interface MacroResult {
  bmr: number;
  tdee: number;
  targets: MacroTargets;
  meals: Meal[];
  mealPlanSummary?: MealPlanSummary;
  profile: UserProfile;
  macroProfileLabel: string;
  explanationSummary: string;
  explanation?: string;
  calculationBreakdown: MacroCalculationBreakdown;
  conflictWarning?: string;
}

export interface USDAFood {
  fdcId: number;
  description: string;
  dataType: string;
  brandOwner?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
  };
}
