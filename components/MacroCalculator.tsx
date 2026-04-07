"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import {
  type DietModifier,
  type EatingStyle,
  type HeightUnit,
  type LegacyActivityLevel,
  type MacroResult,
  type Sex,
  type UserProfile,
  type WeightUnit,
} from "@/types/macro";
import { TrendingDown, TrendingUp, Minus, RefreshCw, Info } from "lucide-react";
import {
  ACTIVITY_LEVELS,
  DIET_MODIFIERS,
  EATING_STYLES,
  GOALS,
} from "@/constants/macroData";
import { calculateMacros, lbsToKg } from "@/lib/macroEngine";
import { generateMealPlan } from "@/lib/mealPlanEngine";
import { trackEvent } from "@/lib/analytics/client";
import { normalizeUserProfile } from "@/lib/profile";
import { loadStoredProfile, saveStoredProfile } from "@/lib/profileStorage";
import { PSMF_INFO_DIALOG_ID, PsmfInfoModal } from "@/components/PsmfInfoModal";

const schema = z.object({
  weightKg: z.number().min(23, "Weight too low").max(272, "Weight too high"),
  heightCm: z.number().min(100, "Height 100-250 cm").max(250),
  age: z.number().min(13, "Age 13-100").max(100),
  bodyFatPercent: z.number().min(3).max(60).optional().nullable(),
});

interface InitialValues {
  weightLb?: number;
  weightKg?: number;
  gender?: "male" | "female";
  sex?: Sex;
  goal?: UserProfile["goal"];
  strategy?: UserProfile["strategy"];
  eatingStyle?: EatingStyle;
  activityLevel?: UserProfile["activityLevel"] | LegacyActivityLevel;
  heightCm?: number;
  age?: number;
  bodyFatPercent?: number;
  dietModifiers?: DietModifier[];
  modifiers?: UserProfile["modifiers"];
  dietNotes?: string;
}

interface MacroCalculatorProps {
  onResult: (result: MacroResult) => void;
  initialValues?: InitialValues;
  analyticsContext?: {
    page_type?: string;
    landing_slug?: string;
    seo_page_type?: string;
  };
}

export function MacroCalculator({
  onResult,
  initialValues,
  analyticsContext,
}: MacroCalculatorProps) {
  const initialProfile = useMemo(
    () =>
      normalizeUserProfile({
        ...initialValues,
        weightKg:
          initialValues?.weightKg ??
          (initialValues?.weightLb ? lbsToKg(initialValues.weightLb) : undefined),
        sex: initialValues?.sex ?? initialValues?.gender,
        eatingStyle: initialValues?.eatingStyle,
        strategy: initialValues?.strategy,
        dietModifiers: initialValues?.dietModifiers,
        modifiers: initialValues?.modifiers,
      }),
    [initialValues]
  );

  const initFt = initialProfile.heightCm
    ? Math.floor(initialProfile.heightCm / 2.54 / 12)
    : undefined;
  const initIn = initialProfile.heightCm
    ? Math.round((initialProfile.heightCm / 2.54) % 12)
    : undefined;

  const [weightUnit, setWeightUnit] = useState<WeightUnit>(
    initialProfile.weightUnit ?? "lb"
  );
  const [heightUnit, setHeightUnit] = useState<HeightUnit>(
    initialProfile.heightUnit ?? "ft_in"
  );
  const [weight, setWeight] = useState(
    initialValues?.weightLb
      ? String(initialValues.weightLb)
      : initialProfile.weightKg
        ? String(Math.round((initialProfile.weightKg / 0.453592) * 10) / 10)
        : ""
  );
  const [heightFeet, setHeightFeet] = useState(
    initFt !== undefined ? String(initFt) : ""
  );
  const [heightInches, setHeightInches] = useState(
    initIn !== undefined ? String(initIn) : ""
  );
  const [heightCm, setHeightCm] = useState(
    initialProfile.heightCm ? String(initialProfile.heightCm) : ""
  );
  const [age, setAge] = useState(initialProfile.age ? String(initialProfile.age) : "");
  const [sex, setSex] = useState<Sex>(
    initialProfile.sex === "female" ? "female" : "male"
  );
  const [bodyFatPercent, setBodyFatPercent] = useState(
    initialProfile.bodyFatPercent ? String(initialProfile.bodyFatPercent) : ""
  );
  const [activityLevel, setActivityLevel] = useState<UserProfile["activityLevel"]>(
    initialProfile.activityLevel
  );
  const [goal, setGoal] = useState<UserProfile["goal"]>(initialProfile.goal);
  const [eatingStyle, setEatingStyle] = useState<UserProfile["eatingStyle"]>(
    initialProfile.eatingStyle
  );
  const [psmfInfoOpen, setPsmfInfoOpen] = useState(false);
  const [dietModifiers, setDietModifiers] = useState<UserProfile["dietModifiers"]>(
    initialProfile.dietModifiers
  );
  const [dietNotes, setDietNotes] = useState(initialProfile.dietNotes ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hasHydratedStoredProfile = useRef(false);

  const toggleModifier = useCallback((modifier: DietModifier) => {
    setDietModifiers((prev) =>
      prev.includes(modifier)
        ? prev.filter((item) => item !== modifier)
        : [...prev, modifier]
    );
  }, []);

  const getHeightCm = useCallback((): number => {
    if (heightUnit === "cm") {
      return parseFloat(heightCm) || 0;
    }
    const ft = parseInt(heightFeet, 10) || 0;
    const inVal = parseInt(heightInches, 10) || 0;
    return (ft * 12 + inVal) * 2.54;
  }, [heightUnit, heightCm, heightFeet, heightInches]);

  const buildProfile = useCallback((): UserProfile => {
    const enteredWeight = parseFloat(weight);
    const enteredBodyFat = bodyFatPercent ? parseFloat(bodyFatPercent) : undefined;

    return {
      weightKg: weightUnit === "lb" ? lbsToKg(enteredWeight) : enteredWeight,
      heightCm: getHeightCm(),
      weightUnit,
      heightUnit,
      age: parseInt(age, 10),
      sex,
      bodyFatPercent: enteredBodyFat,
      goal,
      activityLevel,
      eatingStyle,
      dietModifiers,
      dietNotes: dietNotes.trim() || undefined,
    };
  }, [
    activityLevel,
    age,
    bodyFatPercent,
    dietModifiers,
    dietNotes,
    eatingStyle,
    getHeightCm,
    goal,
    heightUnit,
    sex,
    weight,
    weightUnit,
  ]);

  const applyProfileToForm = useCallback((profile: UserProfile) => {
    const weightValue =
      profile.weightUnit === "kg"
        ? String(Math.round(profile.weightKg * 10) / 10)
        : String(Math.round((profile.weightKg / 0.453592) * 10) / 10);
    const heightFeetValue = profile.heightCm ? Math.floor(profile.heightCm / 2.54 / 12) : 0;
    const heightInchesValue = profile.heightCm
      ? Math.round((profile.heightCm / 2.54) % 12)
      : 0;

    setWeightUnit(profile.weightUnit);
    setHeightUnit(profile.heightUnit);
    setWeight(weightValue);
    setHeightFeet(heightFeetValue ? String(heightFeetValue) : "");
    setHeightInches(String(heightInchesValue));
    setHeightCm(profile.heightCm ? String(profile.heightCm) : "");
    setAge(profile.age ? String(profile.age) : "");
    setSex(profile.sex === "female" ? "female" : "male");
    setBodyFatPercent(
      profile.bodyFatPercent !== undefined ? String(profile.bodyFatPercent) : ""
    );
    setActivityLevel(profile.activityLevel);
    setGoal(profile.goal);
    setEatingStyle(profile.eatingStyle);
    setDietModifiers(profile.dietModifiers);
    setDietNotes(profile.dietNotes ?? "");
  }, []);

  useEffect(() => {
    if (initialValues || hasHydratedStoredProfile.current) return;
    hasHydratedStoredProfile.current = true;

    const storedProfile = loadStoredProfile();
    if (!storedProfile) return;

    const hydrationTimeout = window.setTimeout(() => {
      applyProfileToForm(storedProfile);
    }, 0);

    return () => window.clearTimeout(hydrationTimeout);
  }, [applyProfileToForm, initialValues]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      setSubmitError(null);

      try {
        const profile = buildProfile();

        if (!Number.isFinite(profile.weightKg) || profile.weightKg <= 0) {
          setErrors({ weight: "Enter a valid weight" });
          return;
        }
        if (profile.heightCm <= 0) {
          setErrors({ heightCm: "Enter a valid height" });
          return;
        }
        if (!Number.isFinite(profile.age) || profile.age <= 0) {
          setErrors({ age: "Enter a valid age" });
          return;
        }

        const parsed = schema.safeParse({
          weightKg: profile.weightKg,
          heightCm: profile.heightCm,
          age: profile.age,
          bodyFatPercent: profile.bodyFatPercent ?? null,
        });

        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          parsed.error.issues.forEach((err) => {
            const path = (err.path[0] as string) || "";
            const key = path === "weightKg" ? "weight" : path;
            if (key && err.message) fieldErrors[key] = err.message;
          });
          setErrors(fieldErrors);
          return;
        }

        const macroResult = calculateMacros(profile);
        const { meals, conflictWarning, mealPlanSummary } = generateMealPlan(
          macroResult.targets,
          profile
        );

        saveStoredProfile(profile);

        trackEvent("calculator_submitted", {
          goal,
          eating_style: eatingStyle,
          sex,
          weight_unit: weightUnit,
          activity_level: activityLevel,
          ...(analyticsContext?.page_type
            ? { page_type: analyticsContext.page_type }
            : {}),
          ...(analyticsContext?.landing_slug
            ? { landing_slug: analyticsContext.landing_slug }
            : {}),
          ...(analyticsContext?.seo_page_type
            ? { seo_page_type: analyticsContext.seo_page_type }
            : {}),
        });

        onResult({
          ...macroResult,
          meals,
          mealPlanSummary,
          profile,
          ...(conflictWarning && { conflictWarning }),
        });
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
      }
    },
    [
      activityLevel,
      analyticsContext,
      buildProfile,
      eatingStyle,
      goal,
      onResult,
      sex,
      weightUnit,
    ]
  );

  const btnBase =
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors";
  const btnActive =
    "border-2 border-primary bg-primary-muted text-foreground dark:text-white";
  const btnInactive =
    "bg-card text-muted-foreground border-2 border-card-border hover:border-muted-foreground/25";
  const inputBase =
    "rounded-lg border border-card-border bg-input-bg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none";
  const labelClass = "block text-sm font-medium text-foreground mb-2";
  const labelClassSmall = "block text-sm font-medium text-foreground mb-1";
  const helperClass = "mt-1 text-sm text-muted-foreground";

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div
          className="rounded-lg border border-[#EF4444] bg-[rgba(239,68,68,0.15)] px-4 py-3 text-sm text-[#EF4444]"
          role="alert"
        >
          {submitError}
        </div>
      )}
      {hasErrors && (
        <p className="text-sm text-[#EF4444]" role="alert">
          Please fix the errors below and try again.
        </p>
      )}
      <div>
        <h2 className="text-[1.15rem] font-bold text-foreground mb-4">Body Stats</h2>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:gap-6">
          <div className="min-w-0">
            <label className={labelClass}>Weight</label>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setWeightUnit("lb")}
                className={`${btnBase} ${weightUnit === "lb" ? btnActive : btnInactive}`}
                aria-pressed={weightUnit === "lb"}
              >
                lb
              </button>
              <button
                type="button"
                onClick={() => setWeightUnit("kg")}
                className={`${btnBase} ${weightUnit === "kg" ? btnActive : btnInactive}`}
                aria-pressed={weightUnit === "kg"}
              >
                kg
              </button>
            </div>
            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={weightUnit === "lb" ? "180" : "82"}
              className={`mt-2 w-full min-w-0 ${inputBase}`}
              aria-label="Weight"
              aria-invalid={!!errors.weight}
            />
            {errors.weight && (
              <p id="weight-error" className="mt-1 text-sm text-[#EF4444]">
                {errors.weight}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label className={labelClass}>Height</label>
            <div className="flex gap-1.5 sm:gap-2 mb-2">
              <button
                type="button"
                onClick={() => setHeightUnit("ft_in")}
                className={`${btnBase} ${heightUnit === "ft_in" ? btnActive : btnInactive}`}
                aria-pressed={heightUnit === "ft_in"}
              >
                ft/in
              </button>
              <button
                type="button"
                onClick={() => setHeightUnit("cm")}
                className={`${btnBase} ${heightUnit === "cm" ? btnActive : btnInactive}`}
                aria-pressed={heightUnit === "cm"}
              >
                cm
              </button>
            </div>
            {heightUnit === "ft_in" ? (
              <div className="flex gap-1.5 sm:gap-2 min-w-0">
                <input
                  type="number"
                  inputMode="numeric"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  placeholder="5"
                  min={3}
                  max={8}
                  className={`min-w-0 w-12 sm:w-16 flex-1 ${inputBase}`}
                  aria-label="Height feet"
                />
                <input
                  type="number"
                  inputMode="numeric"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  placeholder="10"
                  min={0}
                  max={11}
                  className={`min-w-0 w-12 sm:w-16 flex-1 ${inputBase}`}
                  aria-label="Height inches"
                />
              </div>
            ) : (
              <input
                type="number"
                inputMode="decimal"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="178"
                className={`w-full min-w-0 ${inputBase}`}
                aria-label="Height in cm"
              />
            )}
            {errors.heightCm && (
              <p className="mt-1 text-sm text-[#EF4444]">{errors.heightCm}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
        <div className="min-w-0">
          <label htmlFor="age" className={labelClassSmall}>
            Age
          </label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="30"
            className={`w-full min-w-0 ${inputBase}`}
            aria-invalid={!!errors.age}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-[#EF4444]">{errors.age}</p>
          )}
        </div>
        <div className="min-w-0">
          <label htmlFor="bodyfat" className={labelClassSmall}>
            Body Fat % <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="bodyfat"
            type="number"
            inputMode="decimal"
            value={bodyFatPercent}
            onChange={(e) => setBodyFatPercent(e.target.value)}
            placeholder="18"
            className={`w-full min-w-0 ${inputBase}`}
            aria-invalid={!!errors.bodyFatPercent}
          />
          {errors.bodyFatPercent && (
            <p className="mt-1 text-sm text-[#EF4444]">{errors.bodyFatPercent}</p>
          )}
          <p className={`${helperClass} break-words`}>
            If you know your body fat %, we can calculate more accurate macros.
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Sex</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "male", label: "Male" },
            { id: "female", label: "Female" },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSex(option.id as Sex)}
              className={`py-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                sex === option.id ? btnActive : btnInactive
              }`}
              aria-pressed={sex === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-foreground mb-2">Goal</h3>
        <p className={helperClass}>Your goal affects calories and macro targets.</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {GOALS.map((g) => {
            const isSelected = goal === g.id;
            const Icon =
              g.id === "cut"
                ? TrendingDown
                : g.id === "build"
                  ? TrendingUp
                  : g.id === "maintain"
                    ? Minus
                    : RefreshCw;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(g.id)}
                className={`p-3 rounded-lg text-left border-2 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary-muted text-foreground dark:text-white"
                    : "border-card-border bg-card hover:border-muted-foreground/25"
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-primary-muted text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="block font-medium text-sm text-foreground">{g.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {g.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-foreground mb-2">Activity Level</h3>
        <p className={helperClass}>
          Your activity level affects calories, protein needs, and carb needs.
        </p>
        <div className="grid grid-cols-1 gap-2 mt-3">
          {ACTIVITY_LEVELS.map((level) => {
            const isSelected = activityLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setActivityLevel(level.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium border-2 transition-colors text-left ${
                  isSelected
                    ? "border-primary bg-primary-muted text-foreground dark:text-white"
                    : "border-card-border bg-card text-muted-foreground hover:border-muted-foreground/25"
                }`}
                aria-pressed={isSelected}
              >
                <span className="block">{level.label}</span>
                <span className="block text-xs text-muted-foreground mt-1">
                  {level.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-foreground mb-2">Eating Style</h3>
        <p className={helperClass}>
          Your eating style affects meal suggestions and food choices. Keto, carnivore, and
          PSMF also change how carbs and fat are set (PSMF adds a large deficit versus TDEE).
        </p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {EATING_STYLES.map((style) => {
            const isSelected = eatingStyle === style.id;
            const cardClass = `relative overflow-hidden rounded-lg border-2 transition-colors ${
              isSelected
                ? "border-primary bg-primary-muted text-foreground dark:text-white"
                : "border-card-border bg-card text-muted-foreground hover:border-muted-foreground/25"
            }`;
            return (
              <div key={style.id} className={cardClass}>
                <button
                  type="button"
                  onClick={() => setEatingStyle(style.id)}
                  className={`w-full rounded-lg p-3 text-left ${
                    style.infoModal ? "pr-11" : ""
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="block font-medium text-sm">{style.label}</span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    {style.description}
                  </span>
                </button>
                {style.infoModal === "psmf" && (
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-md p-1.5 text-muted-foreground hover:bg-primary-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="About PSMF (protein-sparing)"
                    aria-expanded={psmfInfoOpen}
                    aria-controls={PSMF_INFO_DIALOG_ID}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPsmfInfoOpen(true);
                    }}
                  >
                    <Info className="h-4 w-4 shrink-0" aria-hidden />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <PsmfInfoModal open={psmfInfoOpen} onClose={() => setPsmfInfoOpen(false)} />
        {eatingStyle === "psmf" && (
          <div className="mt-4 space-y-3">
            {(goal === "build" || goal === "maintain") && (
              <div
                className="rounded-lg border border-[#F59E0B] bg-[rgba(245,158,11,0.12)] px-4 py-3 text-sm text-foreground"
                role="status"
              >
                <strong className="font-semibold">Goal mismatch:</strong> PSMF is a short-term fat-loss pattern and
                does not match a build or maintenance goal. Consider another eating style for surpluses or steady
                weight.
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Full details and medical disclaimer: use the information button on the PSMF card, or see the notice
              after you calculate.
            </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-foreground mb-2">
          Dietary Restrictions &amp; Preferences
        </h3>
        <p className={helperClass}>
          These help us avoid foods that do not fit your needs.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {DIET_MODIFIERS.map((modifier) => (
            <button
              key={modifier.id}
              type="button"
              onClick={() => toggleModifier(modifier.id)}
              className={`px-3 py-2 rounded-full text-sm border-2 transition-colors ${
                dietModifiers.includes(modifier.id)
                  ? "border-primary bg-primary-muted text-foreground dark:text-white"
                  : "border-card-border bg-card text-muted-foreground hover:border-muted-foreground/25"
              }`}
              aria-pressed={dietModifiers.includes(modifier.id)}
            >
              {modifier.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={dietNotes}
          onChange={(e) => setDietNotes(e.target.value)}
          placeholder="Other dietary notes"
          className={`mt-3 w-full ${inputBase} py-2`}
          aria-label="Other dietary notes"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors"
      >
        Calculate Macros
      </button>
    </form>
  );
}
