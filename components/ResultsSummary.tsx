import type { MacroResult } from "@/types/macro";
import { kgToLbs } from "@/lib/macroEngine";

interface ResultsSummaryProps {
  result: MacroResult;
}

/** Radial dial - matches Macro Tracker style: thick ring, dashed grey track, colored fill */
function RadialDial({
  value,
  label,
  unit,
  color,
  size = 120,
  strokeWidth = 10,
}: {
  value: number;
  label: string;
  unit: string;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const r = (size - strokeWidth) / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg]" width={size} height={size}>
          {/* Dashed grey track */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#374151"
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeWidth * 1.5} ${strokeWidth}`}
          />
          {/* Colored fill - 100% for target */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={0}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center place-content-center">
          <div className="flex flex-col items-center leading-tight translate-y-1">
            <span className="text-2xl font-bold text-white tabular-nums">
              {value}
            </span>
            <span className="text-xs text-[#9CA3AF] mt-px">{unit}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-white">{label}</p>
      <p className="text-xs text-[#9CA3AF]">{value}{unit}</p>
    </div>
  );
}

export function ResultsSummary({ result }: ResultsSummaryProps) {
  const { targets, profile, explanationSummary, macroProfileLabel, calculationBreakdown } =
    result;
  const weightLbs = kgToLbs(profile.weightKg);
  const proteinPerUnit =
    profile.weightUnit === "lb"
      ? targets.proteinGrams / weightLbs
      : targets.proteinGrams / profile.weightKg;
  const unitLabel = profile.weightUnit === "lb" ? "per lb" : "per kg";

  // Shared Physiq family palette (aligns with Macro Tracker)
  const CALORIES_COLOR = "#FF5F1F";
  const PROTEIN_COLOR = "#3B82F6";
  const CARBS_COLOR = "#84CC16";
  const FAT_COLOR = "#EAB308";

  return (
    <div className="space-y-4">
      {/* Top card - Calories (matches Macro Tracker layout) */}
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
        <h2 className="text-lg font-bold text-white mb-4">Daily Target Calories</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Left: Large radial dial */}
          <div className="flex-shrink-0">
            <div className="relative w-[140px] h-[140px]">
              <svg className="rotate-[-90deg] w-full h-full">
                <circle
                  cx={70}
                  cy={70}
                  r={58}
                  fill="none"
                  stroke="#374151"
                  strokeWidth={10}
                  strokeDasharray="15 10"
                />
                <circle
                  cx={70}
                  cy={70}
                  r={58}
                  fill="none"
                  stroke={CALORIES_COLOR}
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={0}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center place-content-center">
                <div className="flex flex-col items-center leading-tight translate-y-1">
                  <span className="text-3xl font-bold text-white tabular-nums">
                    {targets.calories}
                  </span>
                  <span className="text-sm text-[#9CA3AF] mt-px">cal/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Target + explanation */}
          <div className="flex-1 w-full sm:w-auto text-center sm:text-left">
            <div className="space-y-2">
              <div className="flex justify-between sm:block sm:space-y-1">
                <span className="text-sm text-[#9CA3AF]">Target</span>
                <span className="text-2xl font-bold text-white tabular-nums sm:block">
                  {targets.calories}
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#9CA3AF] leading-relaxed">
              {explanationSummary}
            </p>
            <p className="mt-3 text-sm font-medium text-[#FF5F1F]">
              {macroProfileLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom card - Macros (3 radial dials) */}
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
        <h2 className="text-lg font-bold text-white mb-4">Daily Target Macros</h2>
        <div className="grid grid-cols-3 gap-8">
          <RadialDial
            value={targets.proteinGrams}
            label="Protein"
            unit="gm"
            color={PROTEIN_COLOR}
            size={120}
            strokeWidth={10}
          />
          <RadialDial
            value={targets.carbGrams}
            label="Carbs"
            unit="gm"
            color={CARBS_COLOR}
            size={120}
            strokeWidth={10}
          />
          <RadialDial
            value={targets.fatGrams}
            label="Fat"
            unit="gm"
            color={FAT_COLOR}
            size={120}
            strokeWidth={10}
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
        <p className="text-sm text-[#9CA3AF]">
          Protein: <strong className="text-white">{targets.proteinGrams}gm</strong>{" "}
          ({proteinPerUnit.toFixed(1)}gm {unitLabel} body weight)
        </p>
      </div>

      <details className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-white">
          How we calculated this
        </summary>
        <div className="mt-3 space-y-2 text-sm text-[#9CA3AF]">
          <p>
            Calories are based on BMR ({calculationBreakdown.bmr}) × activity for a
            TDEE of {calculationBreakdown.tdee}, then adjusted by{" "}
            {Math.round(calculationBreakdown.calorieAdjustmentPercent * 100)}% for
            your goal.
          </p>
          <p>{calculationBreakdown.proteinRule}</p>
          <p>{calculationBreakdown.fatRule}</p>
          <p>{calculationBreakdown.carbRule}</p>
          <p>{calculationBreakdown.eatingStyleAdjustment}</p>
          {calculationBreakdown.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </details>
    </div>
  );
}
