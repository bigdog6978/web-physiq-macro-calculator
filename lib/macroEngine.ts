import {
  ACTIVITY_MULTIPLIERS,
  ACTIVITY_PROTEIN_FLOOR_G_PER_LB,
  CALORIE_FLOORS,
  EATING_STYLE_CARB_CAPS,
  EATING_STYLE_LABELS,
  FAT_MINIMUM_G_PER_LB,
  GOAL_CALORIE_ADJUSTMENTS,
  GOAL_LABELS,
  MINIMUM_FAT_CALORIE_PERCENT,
  MINIMUM_FAT_G_PER_LB,
  MINIMUM_PROTEIN_G_PER_LB,
  PROTEIN_FROM_BODY_WEIGHT_G_PER_LB,
  PROTEIN_FROM_LEAN_MASS_G_PER_LB,
  PSMF_TDEE_FRACTION,
  RECOMP_BODY_FAT_THRESHOLDS,
} from "@/constants/macroData";
import {
  getLeanMassKg,
  getSafeWeightKg,
  getValidBodyFatPercent,
} from "@/lib/profile";
import { PSMF_ENGINE_NOTES } from "@/lib/psmfContent";
import type {
  Goal,
  MacroCalculationBreakdown,
  MacroTargets,
  MacroPercentages,
  UserProfile,
} from "@/types/macro";

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

function sanitizeProfile(profile: UserProfile): UserProfile {
  return {
    ...profile,
    weightKg: getSafeWeightKg(profile.weightKg),
    heightCm: Number.isFinite(profile.heightCm)
      ? Math.max(profile.heightCm, 100)
      : 100,
    age: Number.isFinite(profile.age) ? clamp(profile.age, 13, 100) : 30,
    bodyFatPercent: getValidBodyFatPercent(profile.bodyFatPercent),
  };
}

function hasBodyFat(profile: UserProfile): profile is UserProfile & {
  bodyFatPercent: number;
} {
  return profile.bodyFatPercent !== undefined;
}

export function calculateBMR(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const base =
    10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age;

  if (profile.sex === "male") return roundInt(base + 5);
  if (profile.sex === "female") return roundInt(base - 161);

  // When sex is unspecified we use the midpoint of the binary constants to avoid
  // blocking the user while keeping the calculation explicit and predictable.
  return roundInt(base - 78);
}

export function calculateTDEE(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const bmr = calculateBMR(profile);
  return roundInt(bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]);
}

function getGoalAdjustmentPercent(profile: UserProfile): number {
  if (profile.goal !== "recomp") {
    return GOAL_CALORIE_ADJUSTMENTS[profile.goal];
  }

  if (!hasBodyFat(profile)) return 0;
  if (profile.sex === "male" && profile.bodyFatPercent > RECOMP_BODY_FAT_THRESHOLDS.male) {
    return -0.05;
  }
  if (
    profile.sex === "female" &&
    profile.bodyFatPercent > RECOMP_BODY_FAT_THRESHOLDS.female
  ) {
    return -0.05;
  }
  return 0;
}

export function calculateCalorieTarget(rawProfile: UserProfile): number {
  const profile = sanitizeProfile(rawProfile);
  const tdee = calculateTDEE(profile);
  const adjusted = roundInt(tdee * (1 + getGoalAdjustmentPercent(profile)));
  return Math.max(adjusted, CALORIE_FLOORS[profile.sex]);
}

function calculateProteinTarget(profile: UserProfile, weightLb: number): {
  grams: number;
  rule: string;
  basis: "body_weight" | "lean_mass";
  leanBodyMassKg?: number;
} {
  const minimumFloor = weightLb * MINIMUM_PROTEIN_G_PER_LB;
  const activityFloor = weightLb * ACTIVITY_PROTEIN_FLOOR_G_PER_LB[profile.activityLevel];
  const bodyWeightAnchor =
    weightLb * PROTEIN_FROM_BODY_WEIGHT_G_PER_LB[profile.goal][profile.activityLevel];
  const leanMassKg = getLeanMassKg(profile.weightKg, profile.bodyFatPercent);

  if (leanMassKg) {
    const leanMassLb = kgToLbs(leanMassKg);
    const leanMassProtein =
      leanMassLb * PROTEIN_FROM_LEAN_MASS_G_PER_LB[profile.goal];

    return {
      grams: Math.max(leanMassProtein, bodyWeightAnchor, activityFloor, minimumFloor),
      rule: `Protein uses lean mass for ${GOAL_LABELS[profile.goal].toLowerCase()} but never drops below the body-weight anchor and activity floor.`,
      basis: "lean_mass",
      leanBodyMassKg: leanMassKg,
    };
  }

  return {
    grams: Math.max(bodyWeightAnchor, activityFloor, minimumFloor),
    rule: `Protein uses total body weight because body fat % was missing or outside the supported range.`,
    basis: "body_weight",
  };
}

function getGoalAdjustmentLabel(goal: Goal, adjustmentPercent: number): string {
  if (goal === "build") return "Controlled surplus for muscle gain";
  if (goal === "cut") return "Moderate deficit for fat loss";
  if (goal === "recomp") {
    return adjustmentPercent < 0
      ? "Small recomp deficit based on body fat %"
      : "Recomp at maintenance because body fat guidance did not support a deficit";
  }
  return "Maintenance calories";
}

function createMacroProfileLabel(targets: MacroTargets): string {
  const totalCalories = Math.max(targets.calories, 1);
  const percentages: MacroPercentages = {
    protein: (targets.proteinGrams * 4) / totalCalories,
    carbs: (targets.carbGrams * 4) / totalCalories,
    fat: (targets.fatGrams * 9) / totalCalories,
  };

  const proteinLabel = percentages.protein >= 0.3 ? "High Protein" : "Moderate Protein";
  const carbLabel =
    percentages.carbs <= 0.1
      ? "Very Low Carb"
      : percentages.carbs <= 0.2
        ? "Low Carb"
        : percentages.carbs <= 0.45
          ? "Moderate Carb"
          : "High Carb";
  const fatLabel = percentages.fat >= 0.4 ? "High Fat" : "Moderate Fat";

  if (
    percentages.protein < 0.3 &&
    percentages.carbs > 0.3 &&
    percentages.carbs <= 0.45 &&
    percentages.fat >= 0.25 &&
    percentages.fat < 0.4
  ) {
    return "Balanced Macros";
  }

  return `${proteinLabel} / ${carbLabel} / ${fatLabel}`;
}

function calculateMacroPercentages(targets: MacroTargets): MacroPercentages {
  const calories = Math.max(targets.calories, 1);
  return {
    protein: (targets.proteinGrams * 4) / calories,
    carbs: (targets.carbGrams * 4) / calories,
    fat: (targets.fatGrams * 9) / calories,
  };
}

function finalizeTargets(
  proteinGrams: number,
  carbGrams: number,
  fatGrams: number
): MacroTargets {
  const roundedProtein = Math.max(roundInt(proteinGrams), 0);
  const roundedCarbs = Math.max(roundInt(carbGrams), 0);
  const roundedFat = Math.max(roundInt(fatGrams), 0);

  return {
    calories: roundedProtein * 4 + roundedCarbs * 4 + roundedFat * 9,
    proteinGrams: roundedProtein,
    carbGrams: roundedCarbs,
    fatGrams: roundedFat,
    protein: roundedProtein,
    carbs: roundedCarbs,
    fat: roundedFat,
  };
}

function calculateMacrosPsmf(
  profile: UserProfile,
  ctx: { bmr: number; tdee: number; weightLb: number; notes: string[] }
): CalculateMacrosResult {
  const { bmr, tdee, weightLb, notes } = ctx;
  const calorieFloor = CALORIE_FLOORS[profile.sex];
  const carbCap = EATING_STYLE_CARB_CAPS.psmf ?? 28;
  const fatPerLb = FAT_MINIMUM_G_PER_LB.psmf;

  const tdeeFracTarget = roundInt(tdee * PSMF_TDEE_FRACTION);
  let calorieTarget = Math.max(calorieFloor, tdeeFracTarget);

  const leanMassKg = getLeanMassKg(profile.weightKg, profile.bodyFatPercent);

  let proteinGrams: number;
  let proteinRule: string;
  let bodyComp: "lean_mass" | "body_weight";

  if (leanMassKg !== undefined && leanMassKg > 0) {
    const lbmLb = kgToLbs(leanMassKg);
    proteinGrams = roundInt(
      Math.max(
        lbmLb * 1.2,
        weightLb * 1.0,
        weightLb * MINIMUM_PROTEIN_G_PER_LB
      )
    );
    proteinRule = `PSMF targets high protein (~1.2g per lb lean mass; LBM ~${roundInt(lbmLb)} lb) to emphasize lean-mass preservation during a short-term deficit.`;
    bodyComp = "lean_mass";
  } else {
    proteinGrams = roundInt(
      Math.max(weightLb * 1.05, weightLb * MINIMUM_PROTEIN_G_PER_LB)
    );
    proteinRule =
      "PSMF uses ~1.05g protein per lb body weight when lean mass is unknown; add a supported body fat % for a lean-mass-based target.";
    bodyComp = "body_weight";
  }

  const hardFatFloor = weightLb * fatPerLb;
  const fatGrams = Math.max(roundInt(hardFatFloor), 15);
  const carbGrams = carbCap;

  let requiredCals = proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;

  if (tdeeFracTarget < calorieFloor && calorieTarget === calorieFloor) {
    notes.push(
      "The calorie safety floor limited how deep the PSMF deficit could go versus a fixed fraction of TDEE; individualized medical guidance is important for very-low-calorie plans."
    );
  }

  if (requiredCals > calorieTarget) {
    calorieTarget = requiredCals;
    notes.push(
      "Calories were raised to fit PSMF protein plus essential fat and the carb cap (protein-sparing priority over a stricter deficit)."
    );
  }

  const maxProteinByCal = (calorieTarget - carbGrams * 4 - fatGrams * 9) / 4;
  if (proteinGrams > maxProteinByCal) {
    proteinGrams = Math.max(
      roundInt(weightLb * MINIMUM_PROTEIN_G_PER_LB),
      roundInt(maxProteinByCal)
    );
    notes.push(
      "Protein was trimmed slightly so macros fit the calorie target with the PSMF fat floor and carb cap."
    );
    requiredCals = proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;
    if (requiredCals > calorieTarget) {
      calorieTarget = roundInt(requiredCals);
    }
  }

  if (profile.goal === "build" || profile.goal === "maintain") {
    notes.push(
      "PSMF is a short-term fat-loss pattern and is a poor fit for sustained muscle gain or maintenance; consider another eating style for those goals."
    );
  }

  notes.push(
    "For PSMF, the goal-based calorie percentage in the breakdown is for reference; the active calorie target follows the PSMF TDEE fraction and feasibility adjustments."
  );

  for (const line of PSMF_ENGINE_NOTES) {
    notes.push(line);
  }

  const calorieAdjustmentPercent = getGoalAdjustmentPercent(profile);
  const carbRule = `Carbs are capped around ${carbCap}g per day for PSMF-style ketogenic energy restriction.`;
  const fatRule = `PSMF keeps dietary fat near an essential floor (~${fatPerLb.toFixed(2)}g per lb body weight, minimum ~15g/day) rather than standard balanced-fat targets.`;
  const eatingStyleAdjustment = `PSMF targets a large deficit (about ${Math.round(PSMF_TDEE_FRACTION * 100)}% of TDEE before feasibility adjustments), caps daily carbs near ${carbCap}g, minimizes fat, and prioritizes high protein.`;

  const targets = finalizeTargets(proteinGrams, carbGrams, fatGrams);
  const percentages = calculateMacroPercentages(targets);

  return {
    bmr,
    tdee,
    targets,
    macroProfileLabel: createMacroProfileLabel(targets),
    explanationSummary:
      "Your macros use a PSMF-style pattern: a low calorie target versus TDEE, high protein, very low carbs, and minimal fat. This is for short-term, educational planning—not medical care.",
    explanation:
      "Your macros use a PSMF-style pattern: a low calorie target versus TDEE, high protein, very low carbs, and minimal fat. This is for short-term, educational planning—not medical care.",
    calculationBreakdown: {
      bodyCompositionBasis: bodyComp,
      leanBodyMassKg:
        leanMassKg !== undefined && leanMassKg > 0
          ? roundInt(leanMassKg * 10) / 10
          : undefined,
      bmr,
      tdee,
      calorieAdjustmentPercent,
      calorieAdjustmentLabel: getGoalAdjustmentLabel(
        profile.goal,
        calorieAdjustmentPercent
      ),
      proteinRule,
      fatRule,
      carbRule,
      eatingStyleAdjustment,
      percentages,
      notes,
    },
  };
}

export interface CalculateMacrosResult {
  bmr: number;
  tdee: number;
  targets: MacroTargets;
  macroProfileLabel: string;
  explanationSummary: string;
  explanation: string;
  calculationBreakdown: MacroCalculationBreakdown;
}

export function calculateMacros(rawProfile: UserProfile): CalculateMacrosResult {
  const profile = sanitizeProfile(rawProfile);
  const notes: string[] = [];
  if (
    rawProfile.bodyFatPercent !== undefined &&
    getValidBodyFatPercent(rawProfile.bodyFatPercent) === undefined
  ) {
    notes.push("Body fat % was ignored because it was outside the supported range.");
  }
  const weightLb = kgToLbs(profile.weightKg);
  const bmr = calculateBMR(profile);
  const tdee = roundInt(bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]);

  if (profile.eatingStyle === "psmf") {
    return calculateMacrosPsmf(profile, { bmr, tdee, weightLb, notes });
  }

  const calorieAdjustmentPercent = getGoalAdjustmentPercent(profile);
  let calorieTarget = roundInt(tdee * (1 + calorieAdjustmentPercent));
  const calorieFloor = CALORIE_FLOORS[profile.sex];
  if (calorieTarget < calorieFloor) {
    calorieTarget = calorieFloor;
    notes.push(`Calories were clamped to the ${profile.sex} safety floor.`);
  }

  const proteinTarget = calculateProteinTarget(profile, weightLb);
  const hardProteinFloor = weightLb * MINIMUM_PROTEIN_G_PER_LB;
  let proteinGrams = proteinTarget.grams;

  const styleFatMinimum = weightLb * FAT_MINIMUM_G_PER_LB[profile.eatingStyle];
  const hardFatFloor =
    profile.eatingStyle === "keto" || profile.eatingStyle === "carnivore"
      ? styleFatMinimum
      : Math.max(weightLb * MINIMUM_FAT_G_PER_LB, styleFatMinimum);
  let fatGrams = Math.max(
    styleFatMinimum,
    (calorieTarget * MINIMUM_FAT_CALORIE_PERCENT) / 9
  );

  const minimumSupportedCalories = proteinGrams * 4 + hardFatFloor * 9;
  if (minimumSupportedCalories > calorieTarget) {
    calorieTarget = roundInt(minimumSupportedCalories);
    notes.push(
      "Calories were raised to support the minimum protein and fat floors safely."
    );
  }

  let remainingCalories = calorieTarget - proteinGrams * 4 - fatGrams * 9;

  // If protein + preferred fat baseline exceed the calorie target, reduce fat
  // toward the hard floor first, then reduce protein only to the explicit safety floor.
  if (remainingCalories < 0) {
    fatGrams = Math.max(hardFatFloor, (calorieTarget - proteinGrams * 4) / 9);
    remainingCalories = calorieTarget - proteinGrams * 4 - fatGrams * 9;
  }

  if (remainingCalories < 0) {
    proteinGrams = Math.max(
      hardProteinFloor,
      (calorieTarget - fatGrams * 9) / 4
    );
    remainingCalories = calorieTarget - proteinGrams * 4 - fatGrams * 9;
    notes.push("Protein was reduced slightly to preserve non-negative carb output.");
  }

  let carbGrams = Math.max(remainingCalories / 4, 0);
  let eatingStyleAdjustment = `${EATING_STYLE_LABELS[profile.eatingStyle]} uses the algorithm output as-is.`;

  if (profile.eatingStyle === "keto") {
    carbGrams = Math.min(carbGrams, EATING_STYLE_CARB_CAPS.keto ?? 30);
    fatGrams = Math.max(
      hardFatFloor,
      (calorieTarget - proteinGrams * 4 - carbGrams * 4) / 9
    );
    eatingStyleAdjustment =
      "Keto caps carbs around 30g per day and moves the remaining calories into fat.";
  } else if (profile.eatingStyle === "carnivore") {
    carbGrams = Math.min(carbGrams, EATING_STYLE_CARB_CAPS.carnivore ?? 5);
    fatGrams = Math.max(
      hardFatFloor,
      (calorieTarget - proteinGrams * 4 - carbGrams * 4) / 9
    );
    eatingStyleAdjustment =
      "Carnivore keeps carbs near zero and shifts the rest of the calories into protein and fat.";
  }

  if (fatGrams * 9 + proteinGrams * 4 + carbGrams * 4 > calorieTarget) {
    calorieTarget = roundInt(fatGrams * 9 + proteinGrams * 4 + carbGrams * 4);
    notes.push(
      "Final calories were aligned to the rounded macro floors to keep the display internally consistent."
    );
  }

  const targets = finalizeTargets(proteinGrams, carbGrams, fatGrams);
  const percentages = calculateMacroPercentages(targets);

  return {
    bmr,
    tdee,
    targets,
    macroProfileLabel: createMacroProfileLabel(targets),
    explanationSummary:
      "Your macros are based on your body stats, goal, and activity level. Eating style shapes meal suggestions; keto, carnivore, and PSMF also change how carbs and fat are set.",
    explanation:
      "Your macros are based on your body stats, goal, and activity level. Eating style shapes meal suggestions; keto, carnivore, and PSMF also change how carbs and fat are set.",
    calculationBreakdown: {
      bodyCompositionBasis: proteinTarget.basis,
      leanBodyMassKg: proteinTarget.leanBodyMassKg
        ? roundInt(proteinTarget.leanBodyMassKg * 10) / 10
        : undefined,
      bmr,
      tdee,
      calorieAdjustmentPercent,
      calorieAdjustmentLabel: getGoalAdjustmentLabel(
        profile.goal,
        calorieAdjustmentPercent
      ),
      proteinRule: proteinTarget.rule,
      fatRule:
        profile.eatingStyle === "keto" || profile.eatingStyle === "carnivore"
          ? `Fat minimum is ${FAT_MINIMUM_G_PER_LB[profile.eatingStyle].toFixed(2)}g per lb for ${profile.eatingStyle}.`
          : "Fat starts at 0.30g per lb body weight and generally stays above 20% of calories.",
      carbRule:
        profile.eatingStyle === "keto"
          ? "Carbs are capped near ketogenic levels after protein and fat are set."
          : profile.eatingStyle === "carnivore"
            ? "Carbs are kept near zero and never allowed to go negative."
            : "Carbs fill the calories remaining after protein and fat are set.",
      eatingStyleAdjustment,
      percentages,
      notes,
    },
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
    consumed.proteinGrams / Math.max(targets.proteinGrams, 1),
    1.2
  );
  const carbRatio = Math.min(
    consumed.carbGrams / Math.max(targets.carbGrams, 1),
    1.2
  );
  const fatRatio = Math.min(consumed.fatGrams / Math.max(targets.fatGrams, 1), 1.2);

  const avg = (calRatio + protRatio + carbRatio + fatRatio) / 4;
  return roundInt(Math.min(avg, 1) * 100);
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}
