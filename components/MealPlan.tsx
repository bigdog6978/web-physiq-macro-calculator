import type { MacroResult } from "@/types/macro";

interface MealPlanProps {
  result: MacroResult;
}

export function MealPlan({ result }: MealPlanProps) {
  const { meals, conflictWarning } = result;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#F5F5F5]">Sample Meal Plan</h2>

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
            <h3 className="font-medium text-[#F5F5F5] mb-3">{meal.label}</h3>
            <ul className="space-y-2">
              {meal.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-[#F5F5F5]">
                    <strong>{item.name}</strong> — {item.portion}
                  </span>
                  <span className="text-[#737373]">
                    {item.calories} cal · P{item.protein} C{item.carbs} F{item.fat}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-[#2A2A2A] text-sm text-[#A3A3A3]">
              Total: {meal.totals.calories} cal · {meal.totals.protein}g P ·{" "}
              {meal.totals.carbs}g C · {meal.totals.fat}g F
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#737373] italic">
        Estimates. Not medical advice. Adjust portions to fit your exact targets.
      </p>
    </div>
  );
}
