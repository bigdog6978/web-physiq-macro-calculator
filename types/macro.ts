export type Gender = "male" | "female";

export type Goal = "cut" | "build" | "maintain" | "recomp";

export type MacroStrategy =
  | "high_protein"
  | "low_carb"
  | "low_fat"
  | "balanced"
  | "performance"
  | "carnivore"
  | "keto"
  | "mediterranean";

export type DietModifier =
  | "vegan"
  | "vegetarian"
  | "gluten_free"
  | "dairy_free"
  | "nut_free"
  | "egg_free"
  | "shellfish_free"
  | "soy_free";

export type ActivityLevel =
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
  gender: Gender;
  bodyFatPercent?: number;
  goal: Goal;
  strategy: MacroStrategy;
  modifiers: DietModifier[];
  activityLevel: ActivityLevel;
}

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
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

export interface MacroResult {
  tdee: number;
  targets: MacroTargets;
  meals: Meal[];
  profile: UserProfile;
  explanation: string;
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
