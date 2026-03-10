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

const KG_PER_LB = 0.453592;
const DEFAULT_SAFE_WEIGHT_KG = 150 * KG_PER_LB;
const DEFAULT_SAFE_HEIGHT_CM = 170;
const DEFAULT_SAFE_AGE = 30;
const MIN_PLAUSIBLE_WEIGHT_KG = 23;
const MAX_PLAUSIBLE_WEIGHT_KG = 272;
const MIN_PLAUSIBLE_BODY_FAT_PERCENT = 3;
const MAX_PLAUSIBLE_BODY_FAT_PERCENT = 60;
const MIN_HEIGHT_CM = 100;
const MAX_HEIGHT_CM = 250;
const MIN_AGE = 13;
const MAX_AGE = 100;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function toFiniteNumber(value: unknown): number | undefined {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

function getFiniteInRange(
  value: unknown,
  min: number,
  max: number
): number | undefined {
  const numeric = toFiniteNumber(value);
  if (numeric === undefined) return undefined;
  return numeric >= min && numeric <= max ? numeric : undefined;
}

function convertAssumedPoundsToKg(value: number): number | undefined {
  const converted = value * KG_PER_LB;
  return converted >= MIN_PLAUSIBLE_WEIGHT_KG && converted <= MAX_PLAUSIBLE_WEIGHT_KG
    ? converted
    : undefined;
}

export function getValidBodyFatPercent(value?: number | null): number | undefined {
  return getFiniteInRange(
    value,
    MIN_PLAUSIBLE_BODY_FAT_PERCENT,
    MAX_PLAUSIBLE_BODY_FAT_PERCENT
  );
}

export function getSafeWeightKg(
  value?: number | null
): number {
  const numeric = toFiniteNumber(value);

  if (numeric !== undefined) {
    if (numeric >= MIN_PLAUSIBLE_WEIGHT_KG && numeric <= MAX_PLAUSIBLE_WEIGHT_KG) {
      return numeric;
    }

    const correctedWeightKg = convertAssumedPoundsToKg(numeric);
    if (correctedWeightKg !== undefined) {
      return correctedWeightKg;
    }
  }

  return DEFAULT_SAFE_WEIGHT_KG;
}

export function getLeanMassKg(
  weightKg: number,
  bodyFatPercent?: number | null
): number | undefined {
  const validBodyFatPercent = getValidBodyFatPercent(bodyFatPercent);
  if (validBodyFatPercent === undefined) return undefined;

  return getSafeWeightKg(weightKg) * (1 - validBodyFatPercent / 100);
}

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
    bodyFatPercent: getValidBodyFatPercent(input.bodyFatPercent),
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

export function normalizeStoredUserProfile(input: PartialUserProfile): UserProfile {
  const normalized = normalizeUserProfile(input);

  return {
    ...normalized,
    weightKg: getSafeWeightKg(normalized.weightKg),
    heightCm: clamp(
      toFiniteNumber(normalized.heightCm) ?? DEFAULT_SAFE_HEIGHT_CM,
      MIN_HEIGHT_CM,
      MAX_HEIGHT_CM
    ),
    age: clamp(toFiniteNumber(normalized.age) ?? DEFAULT_SAFE_AGE, MIN_AGE, MAX_AGE),
    bodyFatPercent: getValidBodyFatPercent(normalized.bodyFatPercent),
  };
}
