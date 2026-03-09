import {
  LEGACY_ACTIVITY_LEVEL_MAP,
  LEGACY_EATING_STYLE_MAP,
} from "@/constants/macroData";
import type {
  ActivityLevel,
  DietModifier,
  EatingStyle,
  HeightUnit,
  LegacyActivityLevel,
  LegacyDietModifier,
  LegacyMacroStrategy,
  Sex,
  UserProfile,
  WeightUnit,
} from "@/types/macro";

type PartialUserProfile = Omit<
  Partial<UserProfile>,
  "activityLevel" | "strategy" | "modifiers"
> & {
  gender?: "male" | "female";
  sex?: Sex;
  strategy?: LegacyMacroStrategy | EatingStyle;
  eatingStyle?: EatingStyle;
  modifiers?: LegacyDietModifier[];
  dietModifiers?: DietModifier[];
  activityLevel?: ActivityLevel | LegacyActivityLevel;
  dietNotes?: string;
  weightUnit?: WeightUnit;
  heightUnit?: HeightUnit;
};

export function migrateLegacyEatingStyle(
  value?: EatingStyle | LegacyMacroStrategy
): EatingStyle {
  if (!value) return "standard";
  if (value in LEGACY_EATING_STYLE_MAP) {
    return LEGACY_EATING_STYLE_MAP[value as LegacyMacroStrategy];
  }
  return value as EatingStyle;
}

export function migrateLegacyActivityLevel(
  value?: ActivityLevel | LegacyActivityLevel
): ActivityLevel {
  if (!value) return "moderate_training";
  if (value in LEGACY_ACTIVITY_LEVEL_MAP) {
    return LEGACY_ACTIVITY_LEVEL_MAP[value as LegacyActivityLevel];
  }
  return value as ActivityLevel;
}

function normalizeDietModifiers(
  modifiers: LegacyDietModifier[] | undefined,
  eatingStyle: EatingStyle
): DietModifier[] {
  const normalized = new Set<DietModifier>();

  for (const modifier of modifiers ?? []) {
    if (modifier === "vegan" || modifier === "vegetarian") {
      continue;
    }
    normalized.add(modifier);
  }

  // Legacy data sometimes stored vegan or vegetarian as modifiers instead of style.
  if ((modifiers ?? []).includes("vegan") && eatingStyle === "standard") {
    return Array.from(normalized);
  }

  return Array.from(normalized);
}

export function inferEatingStyleFromLegacyData(
  input: Pick<PartialUserProfile, "eatingStyle" | "strategy" | "modifiers">
): EatingStyle {
  if (input.eatingStyle) return input.eatingStyle;
  if (input.modifiers?.includes("vegan")) return "vegan";
  if (input.modifiers?.includes("vegetarian")) return "vegetarian";
  return migrateLegacyEatingStyle(input.strategy);
}

export function normalizeUserProfile(input: PartialUserProfile): UserProfile {
  const eatingStyle = inferEatingStyleFromLegacyData(input);

  return {
    weightKg: Number.isFinite(input.weightKg) ? Number(input.weightKg) : 0,
    heightCm: Number.isFinite(input.heightCm) ? Number(input.heightCm) : 0,
    weightUnit: input.weightUnit ?? "lb",
    heightUnit: input.heightUnit ?? "ft_in",
    age: Number.isFinite(input.age) ? Number(input.age) : 0,
    sex: input.sex ?? input.gender ?? "prefer_not_to_say",
    gender:
      input.sex === "male" || input.sex === "female"
        ? input.sex
        : input.gender,
    bodyFatPercent:
      input.bodyFatPercent !== undefined && input.bodyFatPercent !== null
        ? Number(input.bodyFatPercent)
        : undefined,
    goal: input.goal ?? "maintain",
    activityLevel: migrateLegacyActivityLevel(input.activityLevel),
    eatingStyle,
    strategy: input.strategy,
    dietModifiers: normalizeDietModifiers(
      (input.dietModifiers ?? input.modifiers) as LegacyDietModifier[] | undefined,
      eatingStyle
    ),
    modifiers: input.modifiers,
    dietNotes: input.dietNotes?.trim() ? input.dietNotes.trim() : undefined,
  };
}
