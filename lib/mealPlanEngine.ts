import type {
  MacroTargets,
  Meal,
  MealItem,
  DietModifier,
  MacroStrategy,
} from "@/types/macro";
import { FOOD_DB, type FoodTemplate } from "@/data/mealTemplates";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"] as const;
const MEAL_LABELS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
const MEAL_CALORIE_SPLITS = [0.25, 0.35, 0.3, 0.1];

export interface MealPlanResult {
  meals: Meal[];
  conflictWarning?: string;
}

function isModifierCompatible(
  food: FoodTemplate,
  modifiers: DietModifier[]
): boolean {
  for (const mod of modifiers) {
    if (!food.tags.includes(mod)) return false;
  }
  return true;
}

function isCarnivoreCompatible(food: FoodTemplate): boolean {
  const animalFoods = [
    "Egg",
    "Chicken",
    "Salmon",
    "Turkey",
    "Steak",
    "Beef",
    "Pork",
    "Bacon",
    "Butter",
    "Cheese",
    "Yogurt",
    "Cottage",
    "Jerky",
    "Protein Shake",
    "Ribeye",
  ];
  return animalFoods.some((a) => food.name.includes(a));
}

function isKetoCompatible(food: FoodTemplate): boolean {
  return food.carbs <= 10;
}

function filterFoods(
  mealType: string,
  modifiers: DietModifier[],
  strategy: MacroStrategy
): FoodTemplate[] {
  const mealTag = mealType as "breakfast" | "lunch" | "dinner" | "snack";
  let foods = FOOD_DB.filter((f) => f.tags.includes(mealTag));
  foods = foods.filter((f) => isModifierCompatible(f, modifiers));

  if (strategy === "carnivore") {
    foods = foods.filter((f) => isCarnivoreCompatible(f));
  }
  if (strategy === "keto") {
    foods = foods.filter((f) => isKetoCompatible(f));
  }
  if (modifiers.includes("vegan")) {
    foods = foods.filter((f) => f.tags.includes("vegan"));
  }
  if (modifiers.includes("vegetarian") && !modifiers.includes("vegan")) {
    foods = foods.filter((f) => f.tags.includes("vegetarian"));
  }

  return foods;
}

function pickFoodsForMeal(
  available: FoodTemplate[],
  targetCals: number
): MealItem[] {
  if (available.length === 0) return [];

  const items: MealItem[] = [];
  let remainingCals = targetCals;
  const used = new Set<string>();

  const sorted = [...available].sort((a, b) => b.protein - a.protein);

  for (const food of sorted) {
    if (remainingCals < 50) break;
    if (used.has(food.name)) continue;
    if (food.calories <= remainingCals + 50) {
      items.push({
        name: food.name,
        portion: food.portion,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        calories: food.calories,
      });
      remainingCals -= food.calories;
      used.add(food.name);
    }
    if (items.length >= 3) break;
  }

  return items;
}

function sumMacros(items: MealItem[]): MacroTargets {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function hasConflict(modifiers: DietModifier[], strategy: MacroStrategy): boolean {
  if (modifiers.includes("vegan") && strategy === "carnivore") return true;
  if (modifiers.includes("vegetarian") && strategy === "carnivore") return true;
  return false;
}

export function generateMealPlan(
  targets: MacroTargets,
  modifiers: DietModifier[],
  strategy: MacroStrategy
): MealPlanResult {
  const conflictWarning = hasConflict(modifiers, strategy)
    ? "Vegan/Vegetarian conflicts with Carnivore. Showing closest feasible plan (low-carb vegetarian)."
    : undefined;

  // If conflict (vegan/vegetarian + carnivore), fall back to vegan/vegetarian + low carb
  let effectiveModifiers = modifiers;
  let effectiveStrategy = strategy;
  if (hasConflict(modifiers, strategy)) {
    const otherMods = modifiers.filter((m) => m !== "vegan" && m !== "vegetarian");
    effectiveModifiers = modifiers.includes("vegan")
      ? ["vegan", ...otherMods]
      : ["vegetarian", ...otherMods];
    effectiveStrategy = "low_carb";
  }

  const meals: Meal[] = MEAL_TYPES.map((type, idx) => {
    const mealCalTarget = Math.round(
      targets.calories * MEAL_CALORIE_SPLITS[idx]
    );
    const available = filterFoods(type, effectiveModifiers, effectiveStrategy);
    const items = pickFoodsForMeal(available, mealCalTarget);
    const totals = sumMacros(items);

    return {
      label: MEAL_LABELS[idx],
      items,
      totals,
    };
  });

  return { meals, conflictWarning };
}
