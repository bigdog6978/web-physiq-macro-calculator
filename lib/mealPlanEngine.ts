import type {
  MacroTargets,
  Meal,
  MealItem,
  DietModifier,
  MealPlanSummary,
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
  mealPlanSummary: MealPlanSummary;
}

const EMPTY_MACRO_TARGETS: MacroTargets = {
  calories: 0,
  proteinGrams: 0,
  carbGrams: 0,
  fatGrams: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
};

function isModifierCompatible(
  food: FoodTemplate,
  modifiers: DietModifier[]
): boolean {
  for (const mod of modifiers) {
    if (mod === "intermittent_fasting" || mod === "low_glycemic") continue;
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

/**
 * Lower = better for tie-breaking after macro scores match.
 * Mediterranean tier is weighted above glycemic tier so eating style stays primary.
 */
function getGlycemicRank(food: FoodTemplate, profile: UserProfile, dailyCarbGrams: number): number {
  if (!lowGlycemicScoringActive(profile, dailyCarbGrams)) return 0;
  if (food.tags.includes("low_glycemic_friendly")) return 0;
  if (food.tags.includes("high_glycemic_carb")) return 2;
  return 1;
}

function getStyleRank(
  food: FoodTemplate,
  profile: UserProfile,
  dailyCarbGrams: number
): number {
  let rank = 0;
  if (profile.eatingStyle === "mediterranean") {
    rank = isMediterraneanPriority(food) ? 0 : 1;
  }
  if (lowGlycemicScoringActive(profile, dailyCarbGrams)) {
    rank = rank * 10 + getGlycemicRank(food, profile, dailyCarbGrams);
  }
  return rank;
}

/** Score penalty for non-style-preferred foods so switching style changes the plan (lower score = better). */
const STYLE_PENALTY = 80;

/** Bias carb picks when daily carbs are meaningful; smaller than STYLE_PENALTY so macro fit still dominates. */
const LOW_GI_CARB_THRESHOLD_G = 15;
const LOW_GI_FRIENDLY_BONUS = -38;
const HIGH_GI_CARB_PENALTY = 55;

function lowGlycemicScoringActive(
  profile: UserProfile,
  dailyCarbGrams: number
): boolean {
  return (
    profile.dietModifiers.includes("low_glycemic") &&
    profile.eatingStyle !== "carnivore" &&
    dailyCarbGrams > LOW_GI_CARB_THRESHOLD_G
  );
}

function glycemicScoreAdjustment(
  food: FoodTemplate,
  profile: UserProfile,
  dailyCarbGrams: number
): number {
  if (!lowGlycemicScoringActive(profile, dailyCarbGrams)) return 0;
  if (food.tags.includes("high_glycemic_carb")) return HIGH_GI_CARB_PENALTY;
  if (food.tags.includes("low_glycemic_friendly")) return LOW_GI_FRIENDLY_BONUS;
  return 0;
}

function styleScoreAdjustment(food: FoodTemplate, profile: UserProfile): number {
  if (profile.eatingStyle === "mediterranean" && !isMediterraneanPriority(food)) {
    return STYLE_PENALTY;
  }
  return 0;
}

function mealPickScoreAdjustment(
  food: FoodTemplate,
  profile: UserProfile,
  dailyCarbGrams: number
): number {
  return (
    styleScoreAdjustment(food, profile) +
    glycemicScoreAdjustment(food, profile, dailyCarbGrams)
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

/** Score: after adding this food and scaling meal to hit calorie target, how far are scaled P/C/F from targets? */
function scoreFoodForTargets(
  currentCals: number,
  currentP: number,
  currentC: number,
  currentF: number,
  food: FoodTemplate,
  targetCals: number,
  targetP: number,
  targetC: number,
  targetF: number
): number {
  const newCals = currentCals + food.calories;
  const newP = currentP + food.protein;
  const newC = currentC + food.carbs;
  const newF = currentF + food.fat;
  if (newCals <= 0) return 1e9;
  const scale = targetCals / newCals;
  const scaledP = scale * newP;
  const scaledC = scale * newC;
  const scaledF = scale * newF;
  return (
    (scaledP - targetP) ** 2 +
    (scaledC - targetC) ** 2 +
    (scaledF - targetF) ** 2
  );
}

const MIN_MEAL_SCALE = 0.4;
const MAX_MEAL_SCALE = 2.5;
const MAX_DAILY_SCALE = 1.15;
const MIN_DAILY_SCALE = 0.85;
const MIN_REBALANCE_SCALE = 0.5;
const MAX_REBALANCE_SCALE = 2;

function pickFoodsForMeal(
  available: FoodTemplate[],
  targetCals: number,
  targetProtein: number,
  targetCarbs: number,
  targetFat: number,
  profile: UserProfile,
  dailyCarbGrams: number
): MealItem[] {
  if (available.length === 0) return [];

  const items: MealItem[] = [];
  let totalCals = 0;
  let totalP = 0;
  let totalC = 0;
  let totalF = 0;
  const used = new Set<string>();

  while (items.length < 3 && targetCals - totalCals > 30) {
    const nextFood = [...available]
      .filter((f) => !used.has(f.name))
      .sort((a, b) => {
        const aScore =
          scoreFoodForTargets(
            totalCals,
            totalP,
            totalC,
            totalF,
            a,
            targetCals,
            targetProtein,
            targetCarbs,
            targetFat
          ) + mealPickScoreAdjustment(a, profile, dailyCarbGrams);
        const bScore =
          scoreFoodForTargets(
            totalCals,
            totalP,
            totalC,
            totalF,
            b,
            targetCals,
            targetProtein,
            targetCarbs,
            targetFat
          ) + mealPickScoreAdjustment(b, profile, dailyCarbGrams);
        const scoreDiff = aScore - bScore;
        if (scoreDiff !== 0) return scoreDiff;
        return getStyleRank(a, profile, dailyCarbGrams) - getStyleRank(b, profile, dailyCarbGrams);
      })
      .find(
        (f) =>
          f.calories <= targetCals - totalCals + 100 || items.length === 0
      );

    if (!nextFood) break;

    items.push({
      name: nextFood.name,
      portion: nextFood.portion,
      protein: nextFood.protein,
      carbs: nextFood.carbs,
      fat: nextFood.fat,
      calories: nextFood.calories,
    });
    totalCals += nextFood.calories;
    totalP += nextFood.protein;
    totalC += nextFood.carbs;
    totalF += nextFood.fat;
    used.add(nextFood.name);
  }

  return items;
}

function formatScaledPortion(scale: number, basePortion: string): string {
  if (scale <= 0 || !Number.isFinite(scale)) return basePortion;
  const s = Math.round(scale * 10) / 10;
  if (Math.abs(s - 1) < 0.05) return basePortion;
  return `${s}× (${basePortion})`;
}

/** Scale meal items so meal totals match targets; clamp scale to avoid absurd portions. */
function scaleMealToTargets(
  items: MealItem[],
  targetCals: number,
  targetP: number,
  targetC: number,
  targetF: number
): MealItem[] {
  if (items.length === 0) return [];

  const currentCals = items.reduce((sum, i) => sum + i.calories, 0);
  if (currentCals <= 0) return items;

  let scale = targetCals / currentCals;
  scale = Math.max(MIN_MEAL_SCALE, Math.min(MAX_MEAL_SCALE, scale));

  return items.map((item) => ({
    ...item,
    calories: Math.round(item.calories * scale * 10) / 10,
    protein: Math.round(item.protein * scale * 10) / 10,
    carbs: Math.round(item.carbs * scale * 10) / 10,
    fat: Math.round(item.fat * scale * 10) / 10,
    portion: formatScaledPortion(scale, item.portion),
  }));
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
    EMPTY_MACRO_TARGETS
  );
}

function sumMealTotals(meals: Meal[]): MacroTargets {
  return meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totals.calories,
      proteinGrams: acc.proteinGrams + meal.totals.proteinGrams,
      carbGrams: acc.carbGrams + meal.totals.carbGrams,
      fatGrams: acc.fatGrams + meal.totals.fatGrams,
      protein: acc.protein + meal.totals.protein,
      carbs: acc.carbs + meal.totals.carbs,
      fat: acc.fat + meal.totals.fat,
    }),
    EMPTY_MACRO_TARGETS
  );
}

/** Solve 4x4 linear system M*s = t by Gaussian elimination. Returns s or null if singular/invalid. */
function solve4x4(M: number[][], t: number[]): number[] | null {
  const n = 4;
  const aug: number[][] = M.map((row, i) => [...row, t[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    if (Math.abs(aug[col][col]) < 1e-10) return null;
    for (let row = col + 1; row < n; row++) {
      const f = aug[row][col] / aug[col][col];
      for (let k = col; k <= n; k++) aug[row][k] -= f * aug[col][k];
    }
  }
  const s = new Array<number>(n);
  for (let i = n - 1; i >= 0; i--) {
    let v = aug[i][n];
    for (let j = i + 1; j < n; j++) v -= aug[i][j] * s[j];
    s[i] = v / aug[i][i];
    if (!Number.isFinite(s[i])) return null;
  }
  return s;
}

/** Solve 3x3 linear system M*s = t. Returns s or null. */
function solve3x3(M: number[][], t: number[]): number[] | null {
  const n = 3;
  const aug: number[][] = M.map((row, i) => [...row, t[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    if (Math.abs(aug[col][col]) < 1e-10) return null;
    for (let row = col + 1; row < n; row++) {
      const f = aug[row][col] / aug[col][col];
      for (let k = col; k <= n; k++) aug[row][k] -= f * aug[col][k];
    }
  }
  const s = new Array<number>(n);
  for (let i = n - 1; i >= 0; i--) {
    let v = aug[i][n];
    for (let j = i + 1; j < n; j++) v -= aug[i][j] * s[j];
    s[i] = v / aug[i][i];
    if (!Number.isFinite(s[i])) return null;
  }
  return s;
}

/** Least-squares solve for 3 meals: 4 equations, 3 unknowns. (M^T M) s = M^T t, M is 4x3. */
function solve3x4LeastSquares(M: number[][], t: number[]): number[] | null {
  const MtM: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const Mt: number[] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let v = 0;
      for (let k = 0; k < 4; k++) v += M[k][i] * M[k][j];
      MtM[i][j] = v;
    }
    let v = 0;
    for (let k = 0; k < 4; k++) v += M[k][i] * t[k];
    Mt[i] = v;
  }
  return solve3x3(MtM, Mt);
}

/** Per-meal scale factors so scaled daily totals = targets. Returns null if no valid solution. */
function solvePerMealScales(
  mealTotals: MacroTargets[],
  targets: MacroTargets
): number[] | null {
  const n = mealTotals.length;
  const t = [
    targets.calories,
    targets.proteinGrams,
    targets.carbGrams,
    targets.fatGrams,
  ];
  let s: number[] | null;
  if (n === 4) {
    const M = [
      [mealTotals[0].calories, mealTotals[1].calories, mealTotals[2].calories, mealTotals[3].calories],
      [mealTotals[0].proteinGrams, mealTotals[1].proteinGrams, mealTotals[2].proteinGrams, mealTotals[3].proteinGrams],
      [mealTotals[0].carbGrams, mealTotals[1].carbGrams, mealTotals[2].carbGrams, mealTotals[3].carbGrams],
      [mealTotals[0].fatGrams, mealTotals[1].fatGrams, mealTotals[2].fatGrams, mealTotals[3].fatGrams],
    ];
    s = solve4x4(M, t);
  } else if (n === 3) {
    const M = [
      [mealTotals[0].calories, mealTotals[1].calories, mealTotals[2].calories],
      [mealTotals[0].proteinGrams, mealTotals[1].proteinGrams, mealTotals[2].proteinGrams],
      [mealTotals[0].carbGrams, mealTotals[1].carbGrams, mealTotals[2].carbGrams],
      [mealTotals[0].fatGrams, mealTotals[1].fatGrams, mealTotals[2].fatGrams],
    ];
    s = solve3x4LeastSquares(M, t);
  } else {
    return null;
  }
  if (!s) return null;
  for (let i = 0; i < s.length; i++) {
    if (!Number.isFinite(s[i]) || s[i] < MIN_REBALANCE_SCALE || s[i] > MAX_REBALANCE_SCALE) {
      return null;
    }
  }
  return s;
}

/** Only warn when plan is still meaningfully off target (e.g. >8% or >15g so we don't nag when plan is accurate). */
function buildAlignmentWarning(
  totals: MacroTargets,
  targets: MacroTargets
): string | undefined {
  const mismatches: string[] = [];
  const calTol = Math.max(80, targets.calories * 0.08);
  const proteinTol = Math.max(12, targets.proteinGrams * 0.08);
  const carbTol = Math.max(15, targets.carbGrams * 0.08);
  const fatTol = Math.max(8, targets.fatGrams * 0.08);

  if (Math.abs(totals.calories - targets.calories) > calTol) {
    mismatches.push("calories");
  }
  if (Math.abs(totals.proteinGrams - targets.proteinGrams) > proteinTol) {
    mismatches.push("protein");
  }
  if (Math.abs(totals.carbGrams - targets.carbGrams) > carbTol) {
    mismatches.push("carbs");
  }
  if (Math.abs(totals.fatGrams - targets.fatGrams) > fatTol) {
    mismatches.push("fat");
  }

  if (mismatches.length === 0) return undefined;

  return `This sample meal plan does not fully match your live ${mismatches.join(
    ", "
  )} targets yet. Adjust portions or recalculate to tighten the fit.`;
}

export function generateMealPlan(
  targets: MacroTargets,
  profile: UserProfile
): MealPlanResult {
  const mealTemplate = profile.dietModifiers.includes("intermittent_fasting")
    ? FASTING_MEALS
    : STANDARD_MEALS;
  const warnings: string[] = [];

  let meals: Meal[] = mealTemplate.map(({ type, label, split }) => {
    const mealCalTarget = Math.round(targets.calories * split);
    const mealProteinTarget = Math.round(targets.proteinGrams * split);
    const mealCarbTarget = Math.round(targets.carbGrams * split);
    const mealFatTarget = Math.round(targets.fatGrams * split);
    const available = filterFoods(type, profile);
    const rawItems = pickFoodsForMeal(
      available,
      mealCalTarget,
      mealProteinTarget,
      mealCarbTarget,
      mealFatTarget,
      profile,
      targets.carbGrams
    );
    const items = scaleMealToTargets(
      rawItems,
      mealCalTarget,
      mealProteinTarget,
      mealCarbTarget,
      mealFatTarget
    );
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

  let mealPlanTotals = sumMealTotals(meals);

  const perMealScales = solvePerMealScales(
    meals.map((m) => m.totals),
    targets
  );

  if (perMealScales) {
    meals = meals.map((meal, i) => {
      const scale = perMealScales[i];
      return {
        ...meal,
        items: meal.items.map((item) => ({
          ...item,
          calories: Math.round(item.calories * scale * 10) / 10,
          protein: Math.round(item.protein * scale * 10) / 10,
          carbs: Math.round(item.carbs * scale * 10) / 10,
          fat: Math.round(item.fat * scale * 10) / 10,
        })),
        totals: {
          calories: Math.round(meal.totals.calories * scale),
          proteinGrams: Math.round(meal.totals.proteinGrams * scale * 10) / 10,
          carbGrams: Math.round(meal.totals.carbGrams * scale * 10) / 10,
          fatGrams: Math.round(meal.totals.fatGrams * scale * 10) / 10,
          protein: Math.round(meal.totals.protein * scale * 10) / 10,
          carbs: Math.round(meal.totals.carbs * scale * 10) / 10,
          fat: Math.round(meal.totals.fat * scale * 10) / 10,
        },
      };
    });
    mealPlanTotals = sumMealTotals(meals);
  } else {
    // Fallback: single daily scale to match calories only
    const dailyCalDiff = targets.calories - mealPlanTotals.calories;
    if (
      Math.abs(dailyCalDiff) > 5 &&
      mealPlanTotals.calories > 0 &&
      Number.isFinite(targets.calories / mealPlanTotals.calories)
    ) {
      const dailyScale = targets.calories / mealPlanTotals.calories;
      const clamped =
        Math.max(MIN_DAILY_SCALE, Math.min(MAX_DAILY_SCALE, dailyScale));
      meals = meals.map((meal) => ({
        ...meal,
        items: meal.items.map((item) => ({
          ...item,
          calories: Math.round(item.calories * clamped * 10) / 10,
          protein: Math.round(item.protein * clamped * 10) / 10,
          carbs: Math.round(item.carbs * clamped * 10) / 10,
          fat: Math.round(item.fat * clamped * 10) / 10,
        })),
        totals: {
          calories: Math.round(meal.totals.calories * clamped),
          proteinGrams: Math.round(meal.totals.proteinGrams * clamped * 10) / 10,
          carbGrams: Math.round(meal.totals.carbGrams * clamped * 10) / 10,
          fatGrams: Math.round(meal.totals.fatGrams * clamped * 10) / 10,
          protein: Math.round(meal.totals.protein * clamped * 10) / 10,
          carbs: Math.round(meal.totals.carbs * clamped * 10) / 10,
          fat: Math.round(meal.totals.fat * clamped * 10) / 10,
        },
      }));
      mealPlanTotals = sumMealTotals(meals);
    }
  }

  const alignmentWarning = buildAlignmentWarning(mealPlanTotals, targets);
  const allWarnings = [...warnings, alignmentWarning].filter(Boolean).join(" ");

  return {
    meals,
    conflictWarning: allWarnings || undefined,
    mealPlanSummary: {
      totals: mealPlanTotals,
      alignmentWarning,
    },
  };
}
