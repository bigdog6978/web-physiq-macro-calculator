"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import {
  type UserProfile,
  type MacroResult,
  type WeightUnit,
  type HeightUnit,
} from "@/types/macro";
import { TrendingDown, TrendingUp, Minus, RefreshCw } from "lucide-react";
import { GOALS, STRATEGIES, MODIFIERS, ACTIVITY_LEVELS } from "@/constants/macroData";
import { calculateMacros, lbsToKg } from "@/lib/macroEngine";
import { generateMealPlan } from "@/lib/mealPlanEngine";
import { trackEvent } from "@/lib/analytics/client";

const schema = z.object({
  weightKg: z.number().min(23, "Weight too low").max(272, "Weight too high"),
  heightCm: z.number().min(100, "Height 100-250 cm").max(250),
  age: z.number().min(13, "Age 13-100").max(100),
  bodyFatPercent: z.number().min(3).max(60).optional().nullable(),
});

interface InitialValues {
  weightLb?: number;
  gender?: "male" | "female";
  goal?: UserProfile["goal"];
  strategy?: UserProfile["strategy"];
  activityLevel?: UserProfile["activityLevel"];
  heightCm?: number;
  age?: number;
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
  // Height prefill: convert heightCm to ft/in for the ft_in unit default
  const initFt = initialValues?.heightCm
    ? Math.floor(initialValues.heightCm / 2.54 / 12)
    : undefined;
  const initIn = initialValues?.heightCm
    ? Math.round((initialValues.heightCm / 2.54) % 12)
    : undefined;

  const [weightUnit, setWeightUnit] = useState<WeightUnit>("lb");
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("ft_in");
  const [weight, setWeight] = useState(
    initialValues?.weightLb ? String(initialValues.weightLb) : ""
  );
  const [heightFeet, setHeightFeet] = useState(
    initFt !== undefined ? String(initFt) : ""
  );
  const [heightInches, setHeightInches] = useState(
    initIn !== undefined ? String(initIn) : ""
  );
  const [heightCm, setHeightCm] = useState("");
  const [age, setAge] = useState(
    initialValues?.age ? String(initialValues.age) : ""
  );
  const [gender, setGender] = useState<"male" | "female">(
    initialValues?.gender ?? "male"
  );
  const [bodyFatPercent, setBodyFatPercent] = useState("");
  const [activityLevel, setActivityLevel] = useState<UserProfile["activityLevel"]>(
    initialValues?.activityLevel ?? "moderate"
  );
  const [goal, setGoal] = useState<UserProfile["goal"]>(
    initialValues?.goal ?? "cut"
  );
  const [strategy, setStrategy] = useState<UserProfile["strategy"]>(
    initialValues?.strategy ?? "high_protein"
  );
  const [modifiers, setModifiers] = useState<UserProfile["modifiers"]>([]);
  const [otherModifier, setOtherModifier] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleModifier = useCallback((mod: UserProfile["modifiers"][number]) => {
    setModifiers((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      const w = parseFloat(weight);
      const a = parseInt(age, 10);
      const hCm = getHeightCm();
      const bf = bodyFatPercent ? parseFloat(bodyFatPercent) : undefined;

      const weightKg = weightUnit === "lb" ? lbsToKg(w) : w;

      if (isNaN(w) || w <= 0) {
        setErrors({ weight: "Enter a valid weight" });
        return;
      }
      if (hCm <= 0) {
        setErrors({ heightCm: "Enter a valid height" });
        return;
      }
      if (isNaN(a) || a <= 0) {
        setErrors({ age: "Enter a valid age" });
        return;
      }

      const parsed = schema.safeParse({
        weightKg,
        heightCm: hCm,
        age: a,
        bodyFatPercent: bf ?? null,
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

      const profile: UserProfile = {
        weightKg,
        heightCm: hCm,
        weightUnit,
        heightUnit,
        age: a,
        gender,
        bodyFatPercent: bf,
        goal,
        strategy,
        modifiers,
        activityLevel,
      };

      const { tdee, targets, explanation } = calculateMacros(profile);
      const { meals, conflictWarning } = generateMealPlan(
        targets,
        modifiers,
        strategy
      );

      trackEvent("calculator_submitted", {
        goal,
        strategy,
        gender,
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
        tdee,
        targets,
        meals,
        profile,
        explanation,
        ...(conflictWarning && { conflictWarning }),
      });
    },
    [
      weight,
      weightUnit,
      heightFeet,
      heightInches,
      heightCm,
      heightUnit,
      age,
      gender,
      bodyFatPercent,
      goal,
      strategy,
      modifiers,
      activityLevel,
      getHeightCm,
    ]
  );

  const btnBase =
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors";
  const btnActive =
    "border-2 border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-white";
  const btnInactive =
    "bg-[#1A1A1A] text-[#737373] border-2 border-[#2A2A2A] hover:border-[#3A3A3A]";
  const inputBase =
    "rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-base text-[#F5F5F5] placeholder-[#525252] focus:border-[#FF5F1F] focus:ring-1 focus:ring-[#FF5F1F] focus:outline-none";
  const labelClass = "block text-sm font-medium text-[#F5F5F5] mb-2";
  const labelClassSmall = "block text-sm font-medium text-[#F5F5F5] mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-[1.15rem] font-bold text-white mb-4">Body Stats</h2>
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
              aria-describedby={errors.weight ? "weight-error" : undefined}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
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
            className={inputBase}
            aria-invalid={!!errors.age}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-[#EF4444]">{errors.age}</p>
          )}
        </div>
        <div>
          <label htmlFor="bodyfat" className={labelClassSmall}>
            Body Fat % <span className="text-[#737373]">(optional)</span>
          </label>
          <input
            id="bodyfat"
            type="number"
            inputMode="decimal"
            value={bodyFatPercent}
            onChange={(e) => setBodyFatPercent(e.target.value)}
            placeholder="—"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Gender</label>
        <div className="flex gap-2">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={`flex-1 py-3 rounded-lg text-sm font-medium border-2 transition-colors ${
                gender === g ? btnActive : btnInactive
              }`}
              aria-pressed={gender === g}
            >
              {g === "male" ? "Male" : "Female"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-white mb-2">Activity</h3>
        <div className="grid grid-cols-2 gap-2">
          {ACTIVITY_LEVELS.map((l) => {
            const isSelected = activityLevel === l.id;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setActivityLevel(l.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium border-2 transition-colors text-left ${
                  isSelected
                    ? "border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-[#FF5F1F]"
                    : "border-[#2A2A2A] bg-[#1A1A1A] text-[#A3A3A3] hover:border-[#3A3A3A]"
                }`}
                aria-pressed={isSelected}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-white mb-2">Goal</h3>
        <div className="grid grid-cols-2 gap-2">
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
                    ? "border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-white"
                    : "border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#3A3A3A]"
                }`}
                aria-pressed={isSelected}
              >
                <div
                  className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-[rgba(255,95,31,0.35)] text-[#FF5F1F]"
                      : "bg-[#2A2A2A] text-[#737373]"
                  }`}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="block font-medium text-sm text-white">{g.label}</span>
                <span className="block text-xs text-white/70 mt-0.5">
                  {g.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-white mb-2">
          Macro Strategy
        </h3>
        <div className="flex flex-wrap gap-2">
          {STRATEGIES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStrategy(s.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                strategy === s.id
                  ? "border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-white"
                  : "border-[#2A2A2A] bg-[#1A1A1A] text-[#737373] hover:border-[#3A3A3A]"
              }`}
              aria-pressed={strategy === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[1.15rem] font-bold text-white mb-2">
          Diet Modifiers <span className="text-[#737373] font-normal">(optional)</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {MODIFIERS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleModifier(m.id)}
              className={`px-3 py-2 rounded-full text-sm border-2 transition-colors ${
                modifiers.includes(m.id)
                  ? "border-[#FF5F1F] bg-[rgba(255,95,31,0.15)] text-white"
                  : "border-[#2A2A2A] bg-[#1A1A1A] text-[#737373] hover:border-[#3A3A3A]"
              }`}
              aria-pressed={modifiers.includes(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={otherModifier}
          onChange={(e) => setOtherModifier(e.target.value)}
          placeholder="Other (not stored)"
          className={`mt-2 w-full ${inputBase} py-2`}
          aria-label="Other dietary modifier"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-[#FF5F1F] text-white font-semibold text-lg hover:bg-[#ff7a3d] focus:outline-none focus:ring-2 focus:ring-[#FF5F1F] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] transition-colors"
      >
        Calculate Macros
      </button>
    </form>
  );
}
