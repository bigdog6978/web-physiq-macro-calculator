import { describe, expect, it } from "vitest";
import { calculateMacros, lbsToKg } from "../macroEngine";
import { generateMealPlan } from "../mealPlanEngine";
import {
  getSafeWeightKg,
  getValidBodyFatPercent,
  normalizeStoredUserProfile,
  normalizeUserProfile,
} from "../profile";
import type { UserProfile } from "../../types/macro";

function buildProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    weightKg: lbsToKg(180),
    heightCm: 178,
    weightUnit: "lb",
    heightUnit: "ft_in",
    age: 30,
    sex: "male",
    gender: "male",
    goal: "cut",
    activityLevel: "moderate_training",
    eatingStyle: "standard",
    dietModifiers: [],
    ...overrides,
  };
}

describe("macro engine refactor", () => {
  it("uses lean mass when body fat % is provided", () => {
    const result = calculateMacros(
      buildProfile({
        bodyFatPercent: 25,
      })
    );

    expect(result.calculationBreakdown.bodyCompositionBasis).toBe("lean_mass");
    expect(result.calculationBreakdown.leanBodyMassKg).toBeDefined();
    expect(result.targets.proteinGrams).toBeGreaterThanOrEqual(Math.round(180 * 0.85));
    expect(result.targets.calories).toBeGreaterThanOrEqual(1500);
  });

  it("ignores implausible body fat values instead of clamping them", () => {
    const withoutBodyFat = calculateMacros(buildProfile());
    const withInvalidBodyFat = calculateMacros(
      buildProfile({
        bodyFatPercent: 80,
      })
    );

    expect(withInvalidBodyFat.calculationBreakdown.bodyCompositionBasis).toBe("body_weight");
    expect(withInvalidBodyFat.targets.proteinGrams).toBe(withoutBodyFat.targets.proteinGrams);
    expect(withInvalidBodyFat.calculationBreakdown.notes).toContain(
      "Body fat % was ignored because it was outside the supported range."
    );
  });

  it("keeps lean-mass protein above the body-weight anchor", () => {
    const result = calculateMacros(
      buildProfile({
        goal: "maintain",
        activityLevel: "moderate_training",
        bodyFatPercent: 40,
      })
    );

    expect(result.targets.proteinGrams).toBeGreaterThanOrEqual(Math.round(180 * 0.8));
  });

  it("caps carbs for keto and shifts calories into fat", () => {
    const result = calculateMacros(
      buildProfile({
        goal: "build",
        activityLevel: "strength_training",
        eatingStyle: "keto",
      })
    );

    expect(result.targets.carbGrams).toBeLessThanOrEqual(30);
    expect(result.targets.fatGrams).toBeGreaterThan(result.targets.carbGrams);
    expect(result.calculationBreakdown.eatingStyleAdjustment).toContain("Keto");
  });

  it("keeps carnivore carbs near zero", () => {
    const result = calculateMacros(
      buildProfile({
        eatingStyle: "carnivore",
        goal: "maintain",
      })
    );

    expect(result.targets.carbGrams).toBeLessThanOrEqual(5);
    expect(result.macroProfileLabel).toContain("Very Low Carb");
  });

  it("keeps keto protein anchored to the same body-size logic as standard", () => {
    const standard = calculateMacros(
      buildProfile({
        goal: "build",
        activityLevel: "strength_training",
        eatingStyle: "standard",
      })
    );
    const keto = calculateMacros(
      buildProfile({
        goal: "build",
        activityLevel: "strength_training",
        eatingStyle: "keto",
      })
    );

    expect(keto.targets.proteinGrams).toBe(standard.targets.proteinGrams);
    expect(keto.targets.carbGrams).toBeLessThan(standard.targets.carbGrams);
  });

  it("protects protein from collapsing for smaller users with bad body-fat inputs", () => {
    const result = calculateMacros(
      buildProfile({
        weightKg: lbsToKg(110),
        heightCm: 160,
        age: 26,
        sex: "female",
        goal: "cut",
        activityLevel: "light_activity",
        bodyFatPercent: 1,
      })
    );

    expect(result.targets.proteinGrams).toBeGreaterThanOrEqual(Math.round(110 * 0.9));
  });
});

describe("profile normalization", () => {
  it("migrates legacy macro strategy and activity values", () => {
    const profile = normalizeUserProfile({
      weightKg: lbsToKg(170),
      heightCm: 175,
      age: 29,
      gender: "female",
      goal: "maintain",
      strategy: "low_carb",
      activityLevel: "very_active",
      modifiers: ["gluten_free"],
    });

    expect(profile.eatingStyle).toBe("keto");
    expect(profile.activityLevel).toBe("strength_training");
    expect(profile.dietModifiers).toEqual(["gluten_free"]);
  });

  it("promotes legacy vegan modifier into eating style", () => {
    const profile = normalizeUserProfile({
      weightKg: lbsToKg(150),
      heightCm: 168,
      age: 27,
      sex: "prefer_not_to_say",
      goal: "maintain",
      modifiers: ["vegan", "soy_free"],
    });

    expect(profile.eatingStyle).toBe("vegan");
    expect(profile.dietModifiers).toEqual(["soy_free"]);
  });

  it("normalizes stored profiles with invalid body fat and pounds-like weight", () => {
    const profile = normalizeStoredUserProfile({
      weightKg: 330,
      weightUnit: "lb",
      heightCm: 90,
      age: 120,
      sex: "male",
      goal: "maintain",
      activityLevel: "moderate",
      bodyFatPercent: 99,
    });

    expect(profile.weightKg).toBeCloseTo(lbsToKg(330), 3);
    expect(profile.heightCm).toBe(100);
    expect(profile.age).toBe(100);
    expect(profile.bodyFatPercent).toBeUndefined();
    expect(profile.activityLevel).toBe("moderate_training");
  });

  it("exposes safe weight and body-fat helpers for engine reuse", () => {
    expect(getValidBodyFatPercent(18)).toBe(18);
    expect(getValidBodyFatPercent(80)).toBeUndefined();
    expect(getSafeWeightKg(Number.NaN)).toBeCloseTo(lbsToKg(150), 3);
  });
});

describe("meal plan integration", () => {
  it("uses intermittent fasting to change meal distribution", () => {
    const profile = buildProfile({
      dietModifiers: ["intermittent_fasting"],
      eatingStyle: "mediterranean",
    });
    const macroResult = calculateMacros(profile);
    const mealPlan = generateMealPlan(macroResult.targets, profile);

    expect(mealPlan.meals).toHaveLength(3);
    expect(mealPlan.meals[0]?.label).toBe("Lunch");
  });

  it("returns meal-plan totals alongside the canonical macro targets", () => {
    const profile = buildProfile({
      eatingStyle: "mediterranean",
    });
    const macroResult = calculateMacros(profile);
    const mealPlan = generateMealPlan(macroResult.targets, profile);

    const summedCalories = mealPlan.meals.reduce(
      (total, meal) => total + meal.totals.calories,
      0
    );
    const summedProtein = mealPlan.meals.reduce(
      (total, meal) => total + meal.totals.proteinGrams,
      0
    );

    expect(mealPlan.mealPlanSummary.totals.calories).toBe(summedCalories);
    expect(mealPlan.mealPlanSummary.totals.proteinGrams).toBe(summedProtein);
  });

  it("flags meal plans that materially miss the live macro targets", () => {
    const profile = buildProfile();
    const mealPlan = generateMealPlan(
      {
        calories: 3200,
        proteinGrams: 260,
        carbGrams: 360,
        fatGrams: 110,
        protein: 260,
        carbs: 360,
        fat: 110,
      },
      profile
    );

    expect(mealPlan.mealPlanSummary.alignmentWarning).toContain("live");
    expect(mealPlan.conflictWarning).toContain("live");
  });

  it("scales meal plan so daily calories match target", () => {
    const profile = buildProfile({ eatingStyle: "standard" });
    const macroResult = calculateMacros(profile);
    const mealPlan = generateMealPlan(macroResult.targets, profile);
    const t = macroResult.targets;
    const tot = mealPlan.mealPlanSummary.totals;

    expect(mealPlan.meals.length).toBeGreaterThan(0);
    expect(Math.abs(tot.calories - t.calories)).toBeLessThanOrEqual(
      Math.max(100, t.calories * 0.12)
    );
  });

  it("produces different meal items when switching from standard to mediterranean", () => {
    const targets = calculateMacros(buildProfile()).targets;
    const standardPlan = generateMealPlan(
      targets,
      buildProfile({ eatingStyle: "standard" })
    );
    const mediterraneanPlan = generateMealPlan(
      targets,
      buildProfile({ eatingStyle: "mediterranean" })
    );

    const standardNames = standardPlan.meals.flatMap((m) =>
      m.items.map((i) => i.name)
    );
    const mediterraneanNames = mediterraneanPlan.meals.flatMap((m) =>
      m.items.map((i) => i.name)
    );

    const sameSet =
      standardNames.length === mediterraneanNames.length &&
      standardNames.every((n) => mediterraneanNames.includes(n));
    expect(sameSet).toBe(false);
  });

  it("matches macro targets within tolerance when per-meal rebalance succeeds", () => {
    const profile = buildProfile({ eatingStyle: "standard" });
    const macroResult = calculateMacros(profile);
    const mealPlan = generateMealPlan(macroResult.targets, profile);
    const t = macroResult.targets;
    const tot = mealPlan.mealPlanSummary.totals;

    expect(mealPlan.meals).toHaveLength(4);
    expect(Math.abs(tot.calories - t.calories)).toBeLessThanOrEqual(30);
    expect(Math.abs(tot.proteinGrams - t.proteinGrams)).toBeLessThanOrEqual(15);
    expect(Math.abs(tot.carbGrams - t.carbGrams)).toBeLessThanOrEqual(15);
    expect(Math.abs(tot.fatGrams - t.fatGrams)).toBeLessThanOrEqual(15);
  });
});
