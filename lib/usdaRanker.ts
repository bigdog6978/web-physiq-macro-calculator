import type { USDAFood } from "@/types/macro";

const DATA_TYPE_SCORE: Record<string, number> = {
  Foundation: 4,
  "Survey (FNDDS)": 3,
  "SR Legacy": 2,
  Branded: 1,
};

const BRAND_PATTERN = /®|™|LLC|Inc\.|brand|Wegmans|Tyson|Kroger|Walmart|Costco|Trader Joe's|Whole Foods|Target/i;

function getDataTypeScore(dataType: string): number {
  return DATA_TYPE_SCORE[dataType] ?? 1;
}

function getNameMatchScore(description: string, query: string): number {
  const descLower = description.toLowerCase();
  const queryLower = query.toLowerCase().trim();
  const queryTokens = queryLower.split(/\s+/).filter(Boolean);

  if (!queryTokens.length) return 0;

  let score = 0;
  if (descLower === queryLower) score += 2;
  else if (descLower.startsWith(queryLower)) score += 1;

  for (const token of queryTokens) {
    if (descLower.includes(token)) score += 0.5;
  }
  return score;
}

function getBrandPenalty(description: string, brandOwner?: string): number {
  let penalty = 0;
  if (BRAND_PATTERN.test(description)) penalty += 2;
  if (brandOwner) penalty += 1;
  return penalty;
}

function getLengthBonus(description: string): number {
  // Shorter descriptions tend to be more generic (e.g., "Egg, whole, raw")
  const len = description.length;
  if (len < 30) return 0.5;
  if (len < 50) return 0.2;
  return 0;
}

export function scoreAndRankFoods(
  foods: Array<{
    fdcId: number;
    description: string;
    dataType: string;
    brandOwner?: string;
    servingSize?: number;
    servingSizeUnit?: string;
    foodNutrients: Array<{ nutrientId: number; value: number }>;
  }>,
  query: string
): { generic: USDAFood[]; branded: USDAFood[] } {
  const extractNutrient = (
    nutrients: Array<{ nutrientId: number; value: number }>,
    id: number
  ): number => {
    const n = nutrients.find((n) => n.nutrientId === id);
    return n ? Math.round(n.value * 10) / 10 : 0;
  };

  const scored = foods.map((food) => {
    const dataScore = getDataTypeScore(food.dataType);
    const nameScore = getNameMatchScore(food.description, query);
    const brandPenalty = getBrandPenalty(food.description, food.brandOwner);
    const lengthBonus = getLengthBonus(food.description);
    const total =
      dataScore + nameScore - brandPenalty + lengthBonus;

    return {
      food,
      score: total,
      isBranded: food.dataType === "Branded",
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const generic: USDAFood[] = [];
  const branded: USDAFood[] = [];

  for (const { food, isBranded } of scored) {
    const mapped: USDAFood = {
      fdcId: food.fdcId,
      description: food.description,
      dataType: food.dataType,
      brandOwner: food.brandOwner,
      servingSize: food.servingSize,
      servingSizeUnit: food.servingSizeUnit,
      nutrients: {
        calories: extractNutrient(food.foodNutrients, 1008),
        protein: extractNutrient(food.foodNutrients, 1003),
        carbs: extractNutrient(food.foodNutrients, 1005),
        fat: extractNutrient(food.foodNutrients, 1004),
        fiber: extractNutrient(food.foodNutrients, 1079),
        sugar: extractNutrient(food.foodNutrients, 2000),
        sodium: extractNutrient(food.foodNutrients, 1093),
      },
    };

    if (isBranded) {
      branded.push(mapped);
    } else {
      if (generic.length < 25) generic.push(mapped);
    }
  }

  return { generic, branded };
}
