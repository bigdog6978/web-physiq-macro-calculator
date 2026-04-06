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
      <h2 className="text-lg font-bold text-foreground">Sample Meal Plan</h2>

      {conflictWarning && (
        <div
          className="rounded-lg border border-primary/45 bg-primary-muted px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {conflictWarning}
        </div>
      )}

      <div className="space-y-4">
        {meals.map((meal) => (
          <div
            key={meal.label}
            className="rounded-xl border border-card-border bg-card p-4"
          >
            <h3 className="text-lg font-bold text-foreground mb-3">{meal.label}</h3>
            <ul className="space-y-2">
              {meal.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    <strong>{item.name}</strong> — {item.portion}
                  </span>
                  <span className="text-muted-foreground">
                    {oneDecimal(item.calories)} cal ·{" "}
                    <span style={{ color: PROTEIN_COLOR }}>P{oneDecimal(item.protein)}</span>{" "}
                    <span style={{ color: CARB_COLOR }}>C{oneDecimal(item.carbs)}</span>{" "}
                    <span style={{ color: FAT_COLOR }}>F{oneDecimal(item.fat)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 pt-2 border-t border-card-border text-sm text-muted-foreground">
              Total: {oneDecimal(meal.totals.calories)} cal · {oneDecimal(meal.totals.proteinGrams)}g P ·{" "}
              {oneDecimal(meal.totals.carbGrams)}g C · {oneDecimal(meal.totals.fatGrams)}g F
            </div>
          </div>
        ))}
      </div>

      {mealPlanSummary && (
        <div className="rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-muted-foreground">
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

      <p className="text-xs text-muted-foreground italic">
        Sample plan built to hit your targets. Not medical advice.
      </p>
    </div>
  );
}
