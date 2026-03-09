import { describe, expect, it } from "vitest";
import { calculateMacros, lbsToKg } from "../macroEngine";
import { generateMealPlan } from "../mealPlanEngine";
import { normalizeUserProfile } from "../profile";
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
});
