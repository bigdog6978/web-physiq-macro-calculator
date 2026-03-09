import type {
  MacroTargets,
  Meal,
  MealItem,
  DietModifier,
  UserProfile,
} from "@/types/macro";
import { FOOD_DB, type FoodTemplate } from "@/data/mealTemplates";

const STANDARD_MEALS = [
  { type: "breakfast", label: "Breakfast", split: 0.25 },
  { type: "lunch", label: "Lunch", split: 0.35 },
  { type: "dinner", label: "Dinner", split: 0.3 },
  { type: "snack", label: "Snack", split: 0.1 },
] as const;

const FASTING_MEALS = [
  { type: "lunch", label: "Lunch", split: 0.4 },
  { type: "snack", label: "Break-Fast Snack", split: 0.15 },
  { type: "dinner", label: "Dinner", split: 0.45 },
] as const;

export interface MealPlanResult {
  meals: Meal[];
  conflictWarning?: string;
}

function isModifierCompatible(
  food: FoodTemplate,
  modifiers: DietModifier[]
): boolean {
  for (const mod of modifiers) {
    if (mod === "intermittent_fasting") continue;
    if (mod === "halal" && /(bacon|pork)/i.test(food.name)) return false;
    if (mod === "kosher" && /(pork|shellfish|shrimp|bacon)/i.test(food.name)) {
      return false;
    }
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

function isPaleoCompatible(food: FoodTemplate): boolean {
  return !/(rice|quinoa|beans|oatmeal|toast|yogurt|cheese|cottage)/i.test(
    food.name
  );
}

function isMediterraneanPriority(food: FoodTemplate): boolean {
  return /(salmon|olive oil|quinoa|brown rice|beans|broccoli|salad|asparagus)/i.test(
    food.name
  );
}

function filterFoods(
  mealType: string,
  profile: UserProfile
): FoodTemplate[] {
  const mealTag = mealType as "breakfast" | "lunch" | "dinner" | "snack";
  let foods = FOOD_DB.filter((f) => f.tags.includes(mealTag));
  foods = foods.filter((f) => isModifierCompatible(f, profile.dietModifiers));

  if (profile.eatingStyle === "carnivore") {
    foods = foods.filter((f) => isCarnivoreCompatible(f));
  }
  if (profile.eatingStyle === "keto") {
    foods = foods.filter((f) => isKetoCompatible(f));
  }
  if (profile.eatingStyle === "vegan") {
    foods = foods.filter((f) => f.tags.includes("vegan"));
  }
  if (profile.eatingStyle === "vegetarian") {
    foods = foods.filter((f) => f.tags.includes("vegetarian"));
  }
  if (profile.eatingStyle === "paleo") {
    foods = foods.filter((f) => isPaleoCompatible(f));
  }
  if (profile.eatingStyle === "mediterranean") {
    foods = [
      ...foods.filter((f) => isMediterraneanPriority(f)),
      ...foods.filter((f) => !isMediterraneanPriority(f)),
    ];
  }

  return foods;
}

function pickFoodsForMeal(
  available: FoodTemplate[],
  targetCals: number,
  targetProtein: number,
  targetCarbs: number
): MealItem[] {
  if (available.length === 0) return [];

  const items: MealItem[] = [];
  let remainingCals = targetCals;
  const used = new Set<string>();

  const sorted = [...available].sort((a, b) => {
    const aScore =
      Math.abs(a.calories - remainingCals) +
      Math.abs(a.protein - targetProtein) * 3 +
      Math.abs(a.carbs - targetCarbs);
    const bScore =
      Math.abs(b.calories - remainingCals) +
      Math.abs(b.protein - targetProtein) * 3 +
      Math.abs(b.carbs - targetCarbs);
    return aScore - bScore;
  });

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
      proteinGrams: acc.proteinGrams + item.protein,
      carbGrams: acc.carbGrams + item.carbs,
      fatGrams: acc.fatGrams + item.fat,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    {
      calories: 0,
      proteinGrams: 0,
      carbGrams: 0,
      fatGrams: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );
}

export function generateMealPlan(
  targets: MacroTargets,
  profile: UserProfile
): MealPlanResult {
  const mealTemplate = profile.dietModifiers.includes("intermittent_fasting")
    ? FASTING_MEALS
    : STANDARD_MEALS;
  const warnings: string[] = [];

  const meals: Meal[] = mealTemplate.map(({ type, label, split }) => {
    const mealCalTarget = Math.round(targets.calories * split);
    const mealProteinTarget = Math.round(targets.proteinGrams * split);
    const mealCarbTarget = Math.round(targets.carbGrams * split);
    const available = filterFoods(type, profile);
    const items = pickFoodsForMeal(available, mealCalTarget, mealProteinTarget, mealCarbTarget);
    const totals = sumMacros(items);

    if (items.length === 0) {
      warnings.push(
        `We had limited food matches for ${label.toLowerCase()} with the selected eating style and restrictions.`
      );
    }

    return {
      label,
      items,
      totals,
    };
  });

  return {
    meals,
    conflictWarning: warnings.length > 0 ? warnings.join(" ") : undefined,
  };
}
