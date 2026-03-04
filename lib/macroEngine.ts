import type { UserProfile, MacroTargets } from "@/types/macro";
import {
  STRATEGY_FAT_CARB_SPLIT,
  STRATEGY_PROTEIN_G_PER_LB,
  ACTIVITY_LEVELS,
} from "@/constants/macroData";

// --- Unit conversions ---
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function kgToLbs(kg: number): number {
  return kg / 0.453592;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

// --- BMR: Mifflin-St Jeor (always) ---
function calculateBMR(profile: UserProfile): number {
  const { weightKg, heightCm, age, gender } = profile;
  if (gender === "male") {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

// --- TDEE = BMR * activity multiplier ---
function getActivityMultiplier(activityLevel: UserProfile["activityLevel"]): number {
  const level = ACTIVITY_LEVELS.find((l) => l.id === activityLevel);
  return level?.multiplier ?? 1.55;
}

// --- Goal calorie adjustment ---
function getGoalCalorieMultiplier(profile: UserProfile): number {
  const { goal, bodyFatPercent, gender } = profile;
  switch (goal) {
    case "cut":
      return 0.85; // -15%
    case "build":
      return 1.1; // +10%
    case "maintain":
      return 1.0;
    case "recomp": {
      // -5% OR maintenance if body fat % is low
      if (bodyFatPercent !== undefined && bodyFatPercent > 0) {
        const threshold = gender === "male" ? 15 : 23;
        if (bodyFatPercent < threshold) return 1.0; // maintenance
      }
      return 0.95; // -5%
    }
    default:
      return 1.0;
  }
}

// --- Protein target (g) ---
function calculateProteinGrams(profile: UserProfile): number {
  const { weightKg, bodyFatPercent, strategy } = profile;
  const weightLbs = kgToLbs(weightKg);

  if (bodyFatPercent !== undefined && bodyFatPercent > 0) {
    // Use lean body mass: LBM = weight * (1 - BF/100)
    const leanMassKg = weightKg * (1 - bodyFatPercent / 100);
    const leanMassLbs = kgToLbs(leanMassKg);
    // 1.0 g per lb LBM (or 2.2 g per kg LBM)
    return leanMassLbs * 1.0;
  }

  // Strategy-based g per lb body weight
  const gPerLb = STRATEGY_PROTEIN_G_PER_LB[strategy];
  let protein = weightLbs * gPerLb;

  // Clamp to 0.7–1.2 g/lb
  const minProtein = weightLbs * 0.7;
  const maxProtein = weightLbs * 1.2;
  protein = Math.max(minProtein, Math.min(maxProtein, protein));

  return protein;
}

// --- Round to nearest 5g; calories to nearest 10 ---
function roundMacro(value: number): number {
  return Math.round(value / 5) * 5;
}

function roundCalories(value: number): number {
  return Math.round(value / 10) * 10;
}

// --- Main calculation ---
export interface MacroResultWithExplanation {
  tdee: number;
  targets: MacroTargets;
  explanation: string;
}

export function calculateMacros(
  profile: UserProfile
): MacroResultWithExplanation {
  const bmr = calculateBMR(profile);
  const activityMultiplier = getActivityMultiplier(profile.activityLevel);
  const tdee = bmr * activityMultiplier;
  const goalMultiplier = getGoalCalorieMultiplier(profile);
  const targetCaloriesRaw = tdee * goalMultiplier;

  const proteinGrams = calculateProteinGrams(profile);
  const proteinCalories = proteinGrams * 4;
  const remainingCalories = targetCaloriesRaw - proteinCalories;

  const split = STRATEGY_FAT_CARB_SPLIT[profile.strategy];
  let fatGrams: number;
  let carbGrams: number;

  if (profile.strategy === "carnivore") {
    carbGrams = 0;
    fatGrams = remainingCalories / 9;
  } else {
    const fatCalories = remainingCalories * split.fat;
    const carbCalories = remainingCalories * split.carbs;
    fatGrams = fatCalories / 9;
    carbGrams = carbCalories / 4;
  }

  const targets: MacroTargets = {
    calories: roundCalories(targetCaloriesRaw),
    protein: roundMacro(proteinGrams),
    carbs: roundMacro(Math.max(0, carbGrams)),
    fat: roundMacro(Math.max(0, fatGrams)),
  };

  const explanation = buildExplanation(profile, tdee, targets, goalMultiplier);

  return { tdee: Math.round(tdee), targets, explanation };
}

function buildExplanation(
  profile: UserProfile,
  tdee: number,
  targets: MacroTargets,
  goalMultiplier: number
): string {
  const goalDesc =
    profile.goal === "cut"
      ? "A 15% deficit supports fat loss while preserving muscle."
      : profile.goal === "build"
        ? "A 10% surplus supports muscle gain."
        : profile.goal === "maintain"
          ? "Calories match your TDEE for weight maintenance."
          : "A slight deficit (or maintenance if body fat is low) supports body recomposition.";
  const strategyDesc =
    profile.strategy === "carnivore"
      ? "Carnivore strategy prioritizes protein and fat with zero carbs."
      : profile.strategy === "keto"
        ? "Keto strategy keeps carbs very low (5%) with high fat."
        : profile.strategy === "high_protein"
          ? "High protein strategy emphasizes protein for satiety and muscle support."
          : profile.strategy === "low_carb"
            ? "Low carb strategy reduces carbs and increases fat."
            : profile.strategy === "low_fat"
              ? "Low fat strategy emphasizes carbs with minimal fat."
              : profile.strategy === "performance"
                ? "Performance strategy emphasizes carbs for energy."
                : profile.strategy === "mediterranean"
                  ? "Mediterranean strategy uses a balanced fat/carb split."
                  : "Balanced strategy splits calories across protein, carbs, and fat.";
  return `${goalDesc} ${strategyDesc}`;
}
