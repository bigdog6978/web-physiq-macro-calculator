import type { MacroResult } from "@/types/macro";

interface MealPlanProps {
  result: MacroResult;
}

function oneDecimal(x: number): string {
  const n = Math.round(x * 10) / 10;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function MealPlan({ result }: MealPlanProps) {
  const { meals, conflictWarning, mealPlanSummary, targets } = result;
  const PROTEIN_COLOR = "#3B82F6";
  const CARB_COLOR = "#84CC16";
  const FAT_COLOR = "#EAB308";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Sample Meal Plan</h2>

      {conflictWarning && (
        <div
          className="rounded-lg border border-[#FBBF24]/50 bg-[rgba(251,191,36,0.15)] px-4 py-3 text-sm text-[#FBBF24]"
          role="alert"
        >
          {conflictWarning}
        </div>
      )}

      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.label}
            className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4"
          >
            <h3 className="text-lg font-bold text-white mb-3">{meal.label}</h3>
            <ul className="space-y-2">
              {meal.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-[#F5F5F5]">
                    <strong>{item.name}</strong> — {item.portion}
                  </span>
                  <span className="text-[#737373]">
                    {oneDecimal(item.calories)} cal ·{" "}
                    <span style={{ color: PROTEIN_COLOR }}>P{oneDecimal(item.protein)}</span>{" "}
                    <span style={{ color: CARB_COLOR }}>C{oneDecimal(item.carbs)}</span>{" "}
                    <span style={{ color: FAT_COLOR }}>F{oneDecimal(item.fat)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-[#2A2A2A] text-sm text-[#A3A3A3]">
              Total: {oneDecimal(meal.totals.calories)} cal · {oneDecimal(meal.totals.proteinGrams)}g P ·{" "}
              {oneDecimal(meal.totals.carbGrams)}g C · {oneDecimal(meal.totals.fatGrams)}g F
            </div>
          </div>
        ))}
      </div>

      {mealPlanSummary && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-sm text-[#A3A3A3]">
          <p>
            Daily plan total: {oneDecimal(mealPlanSummary.totals.calories)} cal ·{" "}
            {oneDecimal(mealPlanSummary.totals.proteinGrams)}g P · {oneDecimal(mealPlanSummary.totals.carbGrams)}g
            C · {oneDecimal(mealPlanSummary.totals.fatGrams)}g F
          </p>
          <p className="mt-1">
            Live target: {oneDecimal(targets.calories)} cal · {oneDecimal(targets.proteinGrams)}g P ·{" "}
            {oneDecimal(targets.carbGrams)}g C · {oneDecimal(targets.fatGrams)}g F
          </p>
        </div>
      )}

      <p className="text-xs text-[#737373] italic">
        Sample plan built to hit your targets. Not medical advice.
      </p>
    </div>
  );
}
