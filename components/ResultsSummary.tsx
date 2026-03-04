import type { MacroResult } from "@/types/macro";
import { kgToLbs } from "@/lib/macroEngine";

interface ResultsSummaryProps {
  result: MacroResult;
}

export function ResultsSummary({ result }: ResultsSummaryProps) {
  const { targets, profile, explanation } = result;
  const weightLbs = kgToLbs(profile.weightKg);
  const proteinPerUnit =
    profile.weightUnit === "lb"
      ? targets.protein / weightLbs
      : targets.protein / profile.weightKg;
  const unitLabel = profile.weightUnit === "lb" ? "per lb" : "per kg";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#737373] mb-2">
          Daily Target
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[#EF4444]">
            {targets.calories}
          </span>
          <span className="text-[#737373]">calories/day</span>
        </div>
        <p className="mt-2 text-sm text-[#A3A3A3]">{explanation}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Protein", value: targets.protein, unit: "g", color: "bg-[#FF5F1F]" },
          { label: "Carbs", value: targets.carbs, unit: "g", color: "bg-[#3B82F6]" },
          { label: "Fat", value: targets.fat, unit: "g", color: "bg-[#FBBF24]" },
        ].map(({ label, value, unit, color }) => (
          <div
            key={label}
            className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-4 text-center"
          >
            <div className={`h-1 w-8 mx-auto rounded ${color} mb-2`} />
            <div className="text-2xl font-bold text-[#F5F5F5]">{value}</div>
            <div className="text-sm text-[#737373]">
              {label} ({unit})
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3">
        <p className="text-sm text-[#A3A3A3]">
          Protein: <strong className="text-[#F5F5F5]">{targets.protein}g</strong> (
          {proteinPerUnit.toFixed(1)}g {unitLabel} body weight)
        </p>
      </div>
    </div>
  );
}
