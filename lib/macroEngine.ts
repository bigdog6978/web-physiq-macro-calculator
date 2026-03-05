import type {
  UserProfile,
  MacroTargets,
  ActivityLevel,
  Goal,
  MacroStrategy,
} from "@/types/macro";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

type InternalGoal = "cut" | "gain" | "maintain" | "recompose";
const CUT_ADJUSTMENT = -0.15; // moderate
const GAIN_ADJUSTMENT = 0.1; // moderate
const RECOMPOSE_ADJUSTMENT = -0.05;

// ---- small safety helpers ----
const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
const roundInt = (n: number) => Math.round(n);

/** Convert pounds to kilograms */
export function lbsToKg(lb: number): number {
  return lb * 0.453592;
}

/** Convert kilograms to pounds */
export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

/**
 * Ensure required numeric inputs are sane (prevents NaN cascades and weird negatives)
 */
function sanitizeProfile(profile: UserProfile): UserProfile {
  return {
    ...profile,
    weightKg: Number.isFinite(profile.weightKg)
      ? Math.max(profile.weightKg, 1)
      : 1,
    heightCm: Number.isFinite(profile.heightCm)
      ? Math.max(profile.heightCm, 50)
      : 50,
    age: Number.isFinite(profile.age) ? clamp(profile.age, 10, 120) : 30,
  };
}

function toInternalGoal(goal: Goal): InternalGoal {
  if (goal === "build") return "gain";
  if (goal === "recomp") return "recompose";
  return goal as InternalGoal;
}

export function calculateBMR(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const base =
    10 * profile.weightKg +
    6.25 * profile.heightCm -
    5 * profile.age;

  if (profile.gender === "male") return base + 5;
  return base - 161;
}

export function calculateTDEE(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const bmr = calculateBMR(profile);
  const mult = ACTIVITY_MULTIPLIERS[profile.activityLevel] ?? 1.2;
  return roundInt(bmr * mult);
}

export function calculateCalorieTarget(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const tdee = calculateTDEE(profile);
  const goal = toInternalGoal(profile.goal);

  if (goal === "maintain") return tdee;
  if (goal === "cut")
    return roundInt(tdee * (1 + CUT_ADJUSTMENT));
  if (goal === "recompose")
    return roundInt(tdee * (1 + RECOMPOSE_ADJUSTMENT));
  // gain
  return roundInt(tdee * (1 + GAIN_ADJUSTMENT));
}

function getProteinPerLb(goal: InternalGoal): number {
  switch (goal) {
    case "cut":
      return 1.0;
    case "recompose":
      return 1.1;
    case "gain":
      return 0.9;
    case "maintain":
      return 0.85;
    default:
      return 0.9;
  }
}

function getFatPercentFromStrategy(strategy: MacroStrategy): number {
  switch (strategy) {
    case "keto":
      return 0.7;
    case "carnivore":
      return 0.65;
    case "low_carb":
      return 0.45;
    case "high_protein":
      return 0.25;
    case "low_fat":
      return 0.15;
    case "performance":
      return 0.2;
    case "mediterranean":
      return 0.35;
    case "balanced":
      return 0.3;
    default:
      return 0.3;
  }
}

function getProteinMultiplierFromStrategy(
  strategy: MacroStrategy,
  goal: InternalGoal
): number {
  const base = getProteinPerLb(goal);
  if (strategy === "high_protein") return Math.min(base + 0.2, 1.2);
  return base;
}

function applyCarbCaps(strategy: MacroStrategy, carbs_g: number): number {
  if (strategy === "keto") return Math.min(carbs_g, 50);
  if (strategy === "low_carb") return Math.min(carbs_g, 100);
  if (strategy === "carnivore") return Math.min(carbs_g, 20);
  return carbs_g;
}

function buildExplanation(
  tdee: number,
  calories: number,
  goal: Goal,
  strategy: MacroStrategy
): string {
  const parts: string[] = [];
  if (goal === "maintain") {
    parts.push(`Maintenance at ~${tdee} cal/day (TDEE).`);
  } else if (goal === "cut") {
    parts.push(`~15% deficit from TDEE (${tdee} cal) for fat loss.`);
  } else if (goal === "build") {
    parts.push(`~10% surplus from TDEE (${tdee} cal) for muscle gain.`);
  } else if (goal === "recomp") {
    parts.push(`~5% deficit from TDEE (${tdee} cal) for body recomp.`);
  }
  parts.push(`${strategy.replace("_", " ")} macro split.`);
  return parts.join(" ");
}

export interface CalculateMacrosResult {
  tdee: number;
  targets: MacroTargets;
  explanation: string;
}

export function calculateMacros(rawProfile: UserProfile): CalculateMacrosResult {
  const profile = sanitizeProfile(rawProfile);
  const tdee = calculateTDEE(profile);
  const calories = Math.max(calculateCalorieTarget(profile), 0);
  const strategy = profile.strategy;
  const goal = toInternalGoal(profile.goal);

  const proteinPerLb = getProteinMultiplierFromStrategy(strategy, goal);
  const weightLb = profile.weightKg * 2.20462;
  const protein = Math.max(roundInt(weightLb * proteinPerLb), 0);
  const proteinCalories = protein * 4;

  if (proteinCalories >= calories) {
    return {
      tdee,
      targets: { calories, protein, carbs: 0, fat: 0 },
      explanation: buildExplanation(tdee, calories, profile.goal, strategy),
    };
  }

  const fatPercent = getFatPercentFromStrategy(strategy);
  let fatCalories = roundInt(calories * fatPercent);
  fatCalories = clamp(fatCalories, 0, calories - proteinCalories);
  let fat = Math.max(roundInt(fatCalories / 9), 0);

  let carbCalories = calories - proteinCalories - fatCalories;
  let carbs = Math.max(roundInt(carbCalories / 4), 0);

  carbs = applyCarbCaps(strategy, carbs);
  carbCalories = carbs * 4;
  fatCalories = calories - proteinCalories - carbCalories;
  if (fatCalories < 0) fatCalories = 0;
  fat = Math.max(roundInt(fatCalories / 9), 0);

  return {
    tdee,
    targets: { calories, protein, carbs, fat },
    explanation: buildExplanation(tdee, calories, profile.goal, strategy),
  };
}

export function macrosFromEntry(entry: {
  protein: number;
  carbs: number;
  fat: number;
}): number {
  const p = Number.isFinite(entry.protein) ? entry.protein : 0;
  const c = Number.isFinite(entry.carbs) ? entry.carbs : 0;
  const f = Number.isFinite(entry.fat) ? entry.fat : 0;
  return p * 4 + c * 4 + f * 9;
}

export function getAdherencePercent(
  consumed: MacroTargets,
  targets: MacroTargets
): number {
  if (!targets || targets.calories <= 0) return 0;

  const calRatio = Math.min(consumed.calories / targets.calories, 1.2);
  const protRatio = Math.min(
    consumed.protein / Math.max(targets.protein, 1),
    1.2
  );
  const carbRatio = Math.min(
    consumed.carbs / Math.max(targets.carbs, 1),
    1.2
  );
  const fatRatio = Math.min(consumed.fat / Math.max(targets.fat, 1), 1.2);

  const avg = (calRatio + protRatio + carbRatio + fatRatio) / 4;
  return roundInt(Math.min(avg, 1) * 100);
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
