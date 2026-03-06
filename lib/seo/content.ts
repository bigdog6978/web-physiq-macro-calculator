import { calculateMacros, lbsToKg } from "@/lib/macroEngine";
import type {
  MacroTargets,
  UserProfile,
  MacroStrategy,
  Goal,
  Gender,
} from "@/types/macro";
import type { SEOPageConfig, SEOPageType } from "./types";
import {
  ALL_SEO_PAGES,
  GOAL_SLUG,
  STRATEGY_SLUG,
  macroSlug,
  mealPlanSlug,
  proteinSlug,
} from "./pages";

// ---- Label maps ----

const GOAL_VERB: Record<Goal, string> = {
  cut: "lose fat",
  build: "build muscle",
  maintain: "maintain weight",
  recomp: "body recompose",
};

export const GOAL_NOUN: Record<Goal, string> = {
  cut: "Cutting",
  build: "Bulking",
  maintain: "Maintenance",
  recomp: "Recomposition",
};

export const STRATEGY_LABEL: Record<MacroStrategy, string> = {
  high_protein: "High Protein",
  keto: "Keto",
  carnivore: "Carnivore",
  low_carb: "Low Carb",
  balanced: "Balanced",
  performance: "Performance",
  low_fat: "Low Fat",
  mediterranean: "Mediterranean",
};

function pageTypeOf(config: SEOPageConfig): SEOPageType {
  return config.pageType ?? "macro";
}

function genderWord(gender?: Gender): "man" | "woman" {
  return gender === "female" ? "woman" : "man";
}

function genderTitle(gender?: Gender): "Male" | "Female" {
  return gender === "female" ? "Female" : "Male";
}

function strategyLabel(strategy?: MacroStrategy): string {
  return strategy ? STRATEGY_LABEL[strategy] : "Balanced";
}

/** Three weight bands used to vary FAQ question framing. */
function weightBand(weightLb: number): "light" | "mid" | "heavy" {
  if (weightLb <= 155) return "light";
  if (weightLb <= 195) return "mid";
  return "heavy";
}

// ---- Profile builder ----

export function configToProfile(config: SEOPageConfig): UserProfile {
  const weightLb = config.weightLb ?? 180;
  return {
    weightKg: lbsToKg(weightLb),
    heightCm: config.heightCm ?? (config.gender === "female" ? 163 : 178),
    age: config.age ?? 30,
    gender: config.gender ?? "male",
    goal: config.goal ?? "maintain",
    strategy: config.strategy ?? "balanced",
    activityLevel: config.activityLevel ?? "moderate",
    weightUnit: "lb",
    heightUnit: "ft_in",
    modifiers: [],
  };
}

// ---- Title / H1 / description ----

const CLUSTER_TITLES: Record<string, string> = {
  "macros-for-men": "Macro Calculator for Men | Physiq",
  "macros-for-women": "Macro Calculator for Women | Physiq",
  "cutting-macros": "Cutting Macros | How to Calculate | Physiq",
  "bulking-macros": "Bulking Macros | How to Calculate | Physiq",
  "maintenance-macros": "Maintenance Macros | How to Calculate | Physiq",
  "keto-macros": "Keto Macros | Calculator & Guide | Physiq",
  "carnivore-macros": "Carnivore Macros | Calculator & Guide | Physiq",
  "high-protein-macros": "High Protein Macros | Calculator & Guide | Physiq",
};

const PILLAR_TITLES: Record<string, string> = {
  "keto-macro-calculator": "Keto Macro Calculator | Free & Personalized | Physiq",
  "carnivore-macro-calculator": "Carnivore Macro Calculator | Free & Personalized | Physiq",
  "cutting-macro-calculator": "Cutting Macro Calculator | Fat Loss Macros | Physiq",
  "bulking-macro-calculator": "Bulking Macro Calculator | Muscle Gain Macros | Physiq",
  "high-protein-macro-calculator": "High Protein Macro Calculator | Free | Physiq",
};

const CLUSTER_H1S: Record<string, string> = {
  "macros-for-men": "Macro Calculator for Men",
  "macros-for-women": "Macro Calculator for Women",
  "cutting-macros": "Cutting Macros: How to Calculate Your Fat Loss Targets",
  "bulking-macros": "Bulking Macros: How to Calculate Your Muscle Gain Targets",
  "maintenance-macros": "Maintenance Macros: How to Find Your TDEE",
  "keto-macros": "Keto Macros: How to Set Up Your Ketogenic Diet",
  "carnivore-macros": "Carnivore Macros: Your Animal-Based Nutrition Targets",
  "high-protein-macros": "High Protein Macros: Prioritizing Protein for Your Goals",
};

const PILLAR_H1S: Record<string, string> = {
  "keto-macro-calculator": "Keto Macro Calculator",
  "carnivore-macro-calculator": "Carnivore Macro Calculator",
  "cutting-macro-calculator": "Cutting Macro Calculator",
  "bulking-macro-calculator": "Bulking Macro Calculator",
  "high-protein-macro-calculator": "High Protein Macro Calculator",
};

export function buildTitle(config: SEOPageConfig): string {
  if (config.tier === "pillar") {
    return PILLAR_TITLES[config.slug] ?? "Macro Calculator | Physiq";
  }
  if (config.tier === "cluster") {
    return CLUSTER_TITLES[config.slug] ?? "Macros Guide | Physiq";
  }

  const type = pageTypeOf(config);
  if (type === "protein_intake") {
    return `Daily Protein Intake for a ${config.weightLb} lb ${genderTitle(config.gender)} | Physiq`;
  }
  if (type === "meal_plan") {
    return `${config.calorieTarget}-Calorie ${strategyLabel(config.strategy)} Meal Plan | Physiq`;
  }

  return `Macros for ${config.weightLb} lb ${genderTitle(config.gender)} ${GOAL_NOUN[config.goal ?? "maintain"]} — ${strategyLabel(config.strategy)} | Physiq`;
}

export function buildH1(config: SEOPageConfig): string {
  if (config.tier === "pillar") return PILLAR_H1S[config.slug] ?? "Macro Calculator";
  if (config.tier === "cluster") return CLUSTER_H1S[config.slug] ?? "Macros Guide";

  const type = pageTypeOf(config);
  if (type === "protein_intake") {
    return `Protein Intake for a ${config.weightLb} lb ${genderTitle(config.gender)}`;
  }
  if (type === "meal_plan") {
    return `${config.calorieTarget}-Calorie ${strategyLabel(config.strategy)} Meal Plan`;
  }
  return `${GOAL_NOUN[config.goal ?? "maintain"]} Macros for a ${config.weightLb} lb ${genderTitle(config.gender)} (${strategyLabel(config.strategy)})`;
}

export function buildDescription(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  const type = pageTypeOf(config);
  if (type === "protein_intake") {
    return `How much protein should a ${config.weightLb} lb ${config.gender} eat per day? Target: ${targets.protein}gm/day. Includes full macro context — ${targets.calories} calories, ${targets.carbs}gm carbs, ${targets.fat}gm fat — with an adjustable calculator.`;
  }
  if (type === "meal_plan") {
    return `${config.calorieTarget}-calorie ${strategyLabel(config.strategy).toLowerCase()} meal plan with macro targets (${targets.protein}gm protein, ${targets.carbs}gm carbs, ${targets.fat}gm fat), sample foods, and an adjustable calculator preset.`;
  }
  if (config.tier !== "micro") {
    const guideLabel = buildH1(config);
    return `${guideLabel}: set your ${strategyLabel(config.strategy).toLowerCase()} macros for ${GOAL_NOUN[config.goal ?? "maintain"].toLowerCase()}. Representative TDEE ${tdee} cal/day. Includes calculator, meal plan, and FAQ.`;
  }
  return `${config.weightLb} lb ${config.gender} ${GOAL_NOUN[config.goal ?? "maintain"].toLowerCase()} macros (${strategyLabel(config.strategy)}): ${targets.calories} cal, ${targets.protein}gm protein, ${targets.carbs}gm carbs, ${targets.fat}gm fat. Free calculator + meal plan included.`;
}

// ---- Intro ----

export function buildIntro(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  const type = pageTypeOf(config);
  const w = config.weightLb ?? 180;
  const gWord = genderWord(config.gender);
  const weightKg = Math.round(lbsToKg(w));
  const calDiff = Math.abs(targets.calories - tdee);

  if (type === "protein_intake") {
    const proteinPerLb = (targets.protein / w).toFixed(2);
    return [
      `A ${w}-pound ${gWord} (${weightKg} kg) should target approximately ${targets.protein}gm of protein per day — that is ${proteinPerLb}g per lb of bodyweight.`,
      `This page provides a protein-first baseline plus full macro context: ${targets.calories} calories, ${targets.carbs}gm carbs, and ${targets.fat}gm fat. Use it as a starting point, then adjust with the calculator for your specific training goal and activity level.`,
      `Use the interactive calculator below to dial in your exact targets.`,
    ].join("\n\n");
  }

  if (type === "meal_plan") {
    return [
      `This ${config.calorieTarget}-calorie ${strategyLabel(config.strategy).toLowerCase()} meal plan is a structured starting point, not a rigid prescription. The goal is a repeatable daily framework you can sustain.`,
      `Representative macro split: ${targets.calories} calories · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat.`,
      `Use the preset calculator below to personalize this baseline to your weight, goal, and activity level.`,
    ].join("\n\n");
  }

  if (config.tier !== "micro") {
    return [
      `This guide covers how to set macros for ${GOAL_NOUN[config.goal ?? "maintain"].toLowerCase()} using a ${strategyLabel(config.strategy).toLowerCase()} approach.`,
      `Representative targets: ${targets.calories} calories · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat.`,
      `Use the calculator below to generate your own numbers based on weight, height, age, and activity level.`,
    ].join("\n\n");
  }

  return [
    `If you are a ${w}-pound ${gWord} (${weightKg} kg) looking to ${GOAL_VERB[config.goal ?? "maintain"]} using ${strategyLabel(config.strategy).toLowerCase()}, your starting daily target is ${targets.calories} calories.`,
    `${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat`,
    `${config.goal === "maintain"
      ? `These match your estimated maintenance (TDEE: ${tdee} cal/day).`
      : `This reflects a ${calDiff}-calorie ${config.goal === "build" ? "surplus above" : "deficit below"} your estimated ${tdee}-calorie TDEE.`
    } Use the pre-filled calculator below to adjust for your exact height, age, and activity level.`,
  ].join("\n\n");
}

// ---- Who This Is For ----
// Goal × strategy combinations provide distinct persona descriptions.

function buildWhoThisIsFor(config: SEOPageConfig): string {
  const type = pageTypeOf(config);

  if (type === "protein_intake") {
    const w = config.weightLb ?? 180;
    const band = weightBand(w);
    const g = genderWord(config.gender);
    if (band === "light") {
      return `Lighter ${g}s (under 160 lb) who want a concrete daily protein target without overthinking it. Also useful for people new to macro tracking who want to start with protein first before worrying about carbs and fat.`;
    }
    if (band === "heavy") {
      return `Heavier individuals (190 lb+) who need accurate protein targets scaled to a larger body mass. Larger frames require more total protein in grams even at the same per-pound ratio.`;
    }
    return `${w}-pound ${g}s who want a straightforward daily protein number alongside full macro context — calories, carbs, and fat — rather than just a grams-per-pound formula.`;
  }

  if (type === "meal_plan") {
    const strategy = config.strategy ?? "balanced";
    const cal = config.calorieTarget ?? 2200;
    if (strategy === "keto") {
      return `People following a ketogenic approach who want a concrete ${cal}-calorie meal structure. Most useful for those in their first few months of keto who need help knowing what a full day of eating actually looks like in practice.`;
    }
    if (strategy === "carnivore") {
      return `Strict animal-based dieters who want a ${cal}-calorie day structured entirely around meat, eggs, and some dairy. Useful for people transitioning from keto or looking to simplify food decisions.`;
    }
    if (cal <= 1900) {
      return `People targeting lower calories — typically those in a fat-loss phase — who want a concrete day of eating around ${cal} calories without extreme restriction.`;
    }
    if (cal >= 2700) {
      return `People in a surplus or maintaining at higher bodyweights who need a ${cal}-calorie structure that does not feel like constant eating.`;
    }
    return `People who want a practical ${cal}-calorie day they can repeat — not a recipe book, just a clear daily macro framework they can execute consistently.`;
  }

  const goal = config.goal ?? "maintain";
  const strategy = config.strategy ?? "balanced";
  const w = config.weightLb ?? 180;
  const g = genderWord(config.gender);

  const personas: Partial<Record<`${Goal}_${MacroStrategy}`, string>> = {
    cut_high_protein: `${w}-pound ${g}s actively cutting who want strong muscle preservation during a deficit. Typically people who have been training consistently and want to lose fat without sacrificing the strength or muscle they have built.`,
    cut_keto: `${w}-pound ${g}s who respond better to low-carb eating during a cut. Keto cutting tends to suit people who find carb-heavy foods harder to moderate or who prefer the appetite-suppression effects of ketosis over calorie counting.`,
    cut_carnivore: `${w}-pound ${g}s using a strict animal-based approach to cut fat. Most relevant for people who have already tried keto and want to simplify further, eliminating plant foods entirely.`,
    cut_balanced: `${w}-pound ${g}s who want a flexible macro structure for fat loss — no strict dietary protocol, just a sensible calorie reduction with adequate protein and food variety.`,
    build_high_protein: `${w}-pound ${g}s in a muscle-building phase who want to maximize protein availability for synthesis. Typically consistent gym-goers looking to add lean mass with minimal fat gain.`,
    build_balanced: `${w}-pound ${g}s bulking without restricting any macronutrient group. Useful for people who find performance on high-carb eating and do not want to limit food variety during a gaining phase.`,
    build_performance: `${w}-pound ${g}s in a performance-focused bulk — typically athletes or serious strength trainees who need high carbohydrate availability to support training volume and recovery.`,
    maintain_high_protein: `${w}-pound ${g}s who have reached their target weight and want to hold body composition and performance without entering another cut or bulk phase. Protein is kept high to support lean mass over time.`,
    maintain_balanced: `${w}-pound ${g}s at a stable, sustainable weight who want a simple, flexible macro framework for everyday life — no active cutting or bulking, just consistent nutrition.`,
    recomp_balanced: `${w}-pound ${g}s trying to build muscle and lose fat simultaneously. Body recomposition is most effective for people newer to consistent training, those returning after a long break, or people with above-average body fat.`,
  };

  const key = `${goal}_${strategy}` as `${Goal}_${MacroStrategy}`;
  return (
    personas[key] ??
    `${w}-pound ${g}s pursuing ${GOAL_NOUN[goal].toLowerCase()} with a ${strategyLabel(strategy).toLowerCase()} macro approach.`
  );
}

// ---- Macro Rationale ----

function buildMacroRationale(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  const type = pageTypeOf(config);

  if (type === "protein_intake") {
    return `Protein is the most important macro to anchor first. At ${targets.protein}gm/day, intake is high enough to protect lean mass and control appetite regardless of whether total calories are in a deficit, surplus, or at maintenance. Carbs and fat can shift considerably — protein should stay consistent.`;
  }

  if (type === "meal_plan") {
    return `This structure lands near ${targets.calories} calories/day using a ${strategyLabel(config.strategy).toLowerCase()} split. The goal is not perfection in every meal — it is a repeatable framework that makes hitting protein and total calories predictable enough to sustain for weeks, not days.`;
  }

  const delta = targets.calories - tdee;
  if (delta > 0) {
    return `A controlled surplus of ${Math.abs(delta)} calories above your estimated TDEE supports muscle protein synthesis without excessive fat gain. Protein is kept high throughout the surplus to ensure muscle is the primary beneficiary of the extra energy, not stored fat. Training quality and progressive overload do the rest.`;
  }
  if (delta < 0) {
    return `A measured deficit of ${Math.abs(delta)} calories below your estimated ${tdee}-calorie TDEE is enough to drive consistent fat loss without triggering aggressive muscle breakdown. Protein is elevated specifically to counter the muscle-loss risk that comes with calorie restriction — it is the most important macro to protect during a cut.`;
  }
  return `At an estimated maintenance of ${tdee} calories, bodyweight stays stable. The focus shifts from the quantity of food to the quality — consistent protein, adequate micronutrients, and enough energy to support training and recovery without excess.`;
}

// ---- Strategy Explanation — goal-aware ----
// Each goal × strategy combination produces different context.

function buildStrategyExplanation(config: SEOPageConfig): string {
  const strategy = config.strategy ?? "balanced";
  const goal = config.goal ?? "maintain";

  if (strategy === "keto") {
    if (goal === "cut") {
      return "Keto restricts carbs to promote fat oxidation as the primary fuel source. During a cut, it can improve appetite control and blunt hunger spikes, making the calorie deficit easier to sustain day-to-day without constant willpower. The tradeoff is reduced glycogen for high-intensity training — best suited for moderate-intensity activity.";
    }
    if (goal === "build") {
      return "Keto during a bulk is less conventional. Without carbohydrates driving insulin response and glycogen storage, muscle growth can still occur — but training intensity and recovery may be harder to sustain at high volumes. Best for people who perform well on fat-based fuel and prefer dietary simplicity over carb cycling.";
    }
    return "Keto at maintenance provides stable energy and appetite from ketones rather than glucose. It suits people who have adapted to fat burning and prefer avoiding the blood sugar fluctuations that can come with higher carbohydrate eating at maintenance calories.";
  }

  if (strategy === "carnivore") {
    if (goal === "cut") {
      return "Carnivore eliminates all plant sources and relies entirely on protein and fat from animal foods. During a cut, the strict food list simplifies decision-making and naturally eliminates most processed foods. Adherence is either very easy or very hard depending on food preferences — there is little middle ground.";
    }
    if (goal === "build") {
      return "A carnivore approach during a muscle-building phase relies on protein and saturated fat as the primary fuel sources, with zero carbohydrate. High protein intake is achievable, but carbohydrate-driven training fuel is absent — this works best for people whose training volume is moderate rather than high.";
    }
    return "Carnivore at maintenance simplifies food to its most distilled form — meat, eggs, and some dairy. It eliminates most decision fatigue around food. Long-term micronutrient coverage requires intentional food selection, particularly for minerals and vitamins not concentrated in muscle meat alone.";
  }

  if (strategy === "high_protein") {
    if (goal === "cut") {
      return "High-protein macros keep protein elevated during a deficit to protect lean muscle tissue. This is the most evidence-backed approach for body-composition-focused fat loss. Higher protein also increases satiety and has a greater thermic effect than carbs or fat, making the deficit effectively slightly larger than it appears on paper.";
    }
    if (goal === "build") {
      return "High-protein macros on a bulk ensure sufficient amino acid availability for muscle protein synthesis throughout the calorie surplus. Extra protein above the minimum threshold does not directly build more muscle, but it provides a safe buffer and supports recovery between sessions — especially for people training 4+ days per week.";
    }
    return "High protein at maintenance holds body composition stable without requiring a strict cut or bulk. For people who train consistently, maintaining a protein target around 0.8–1.1g per lb supports lean mass retention and recovery even without a calorie surplus.";
  }

  if (strategy === "performance") {
    if (goal === "build") {
      return "Performance macros prioritize carbohydrates to fuel training volume, support glycogen replenishment, and improve session quality. During a muscle-building phase, high carb availability directly supports the ability to train harder and recover faster — two of the most important variables for muscle gain beyond protein intake.";
    }
    return "Performance macros increase carbohydrate allocation to support high-intensity or high-volume training. More carbs mean more glycogen, better session output, and improved recovery. This split works best for people training at high frequency where energy availability meaningfully affects performance.";
  }

  if (strategy === "balanced") {
    if (goal === "cut") {
      return "A balanced macro split during a cut does not restrict any food group aggressively. Carbs and fats are both present in reasonable proportions, which tends to improve long-term dietary adherence — you are less likely to abandon a flexible plan after a hard week than a strict protocol.";
    }
    if (goal === "build") {
      return "Balanced macros on a bulk allow high food variety and flexibility, which helps sustain a calorie surplus over months without food fatigue. Carbs are available for training fuel, protein is adequate for synthesis, and fat supports hormones — no macro is excessively restricted or inflated.";
    }
    if (goal === "recomp") {
      return "Balanced macros at near-maintenance support simultaneous muscle gain and fat loss by providing enough protein to drive synthesis while keeping calories from creating a true surplus. The process is slow but sustainable — particularly effective over 12+ weeks for beginners or people returning after a training break.";
    }
    return "Balanced macros at maintenance provide a stable, sustainable eating structure. Energy is distributed between carbs and fat in proportions that support daily function without pushing the body toward fat gain or loss. This is the least restrictive macro approach and tends to produce the highest long-term adherence.";
  }

  return `${strategyLabel(strategy)} macros provide a structured split aligned with your goal and activity demands.`;
}

// ---- Adjustment Notes ----

function buildAdjustmentNotes(config: SEOPageConfig, targets: MacroTargets): string[] {
  const goal = config.goal ?? "maintain";
  const notes: string[] = [
    "Hold your targets for at least 2 full weeks before making changes — short-term weight fluctuations are water and digestion, not fat or muscle.",
    "Adjust calories in 100–150 calorie increments, not large jumps. Small changes compound without disrupting adherence.",
    "Recalculate every 10–15 lb of bodyweight change or every 6–8 weeks.",
  ];

  if (goal === "cut") {
    notes.push(
      "If your scale trend is flat for 2–3 weeks, reduce by ~100 calories from carbs or fats first — keep protein at current levels."
    );
    notes.push(
      `Current target: ${targets.calories} cal/day. If you are losing more than 1.5 lb/week consistently, add 100 calories — excessive loss rate increases muscle breakdown risk.`
    );
  } else if (goal === "build") {
    notes.push(
      "If scale weight is not rising after 2–3 weeks, add 100 calories. If gaining faster than 0.5–1 lb/week, trim 100 calories."
    );
    notes.push(
      `Current target: ${targets.calories} cal/day. Track gym performance alongside scale weight — stalled lifts are often a sign calories need adjusting upward.`
    );
  } else if (goal === "recomp") {
    notes.push(
      "Body recomposition progress shows up in body measurements and how clothes fit before it shows on the scale — do not use scale weight alone to evaluate this phase."
    );
    notes.push(
      `Current target: ${targets.calories} cal/day. Expect meaningful changes over 12–16 weeks, not 4.`
    );
  } else {
    notes.push(
      "If scale weight trends consistently up or down over 3+ weeks, recalculate — your true maintenance has shifted."
    );
    notes.push(
      `Current maintenance estimate: ${targets.calories} cal/day. Adjust by ±100 calories based on trend.`
    );
  }

  return notes;
}

// ---- FAQs ----
// Every question varies by at least one dimension: weight, gender, goal, strategy, or weight band.

export interface FAQ {
  q: string;
  a: string;
}

function buildMacroFAQs(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): FAQ[] {
  const w = config.weightLb ?? 180;
  const g = genderWord(config.gender);
  const goal = config.goal ?? "maintain";
  const strategy = config.strategy ?? "balanced";
  const calDiff = Math.abs(targets.calories - tdee);
  const proteinPerLb = (targets.protein / w).toFixed(2);
  const band = weightBand(w);

  // Q1: Calories — unique by weight, gender, goal, calorie number
  const q1: FAQ = {
    q: `How many calories should a ${w} lb ${g} eat to ${GOAL_VERB[goal]}?`,
    a: goal === "maintain"
      ? `A ${w} lb ${g} at moderate activity needs approximately ${targets.calories} calories per day to maintain bodyweight. This estimate comes from the Mifflin-St Jeor equation applied at a moderate activity multiplier (1.55). Your real maintenance may be 100–150 calories above or below this depending on individual metabolism and true daily activity — track your scale trend for 2 weeks to confirm.`
      : `A practical starting target is ${targets.calories} calories/day — a ${calDiff}-calorie ${goal === "build" ? "surplus above" : "deficit below"} your estimated TDEE of ${tdee}. This provides a meaningful signal for ${goal === "build" ? "muscle growth" : "fat loss"} without being aggressive enough to risk significant muscle loss or excessive fat gain. Adjust in 100-calorie steps after 2–3 weeks of data.`,
  };

  // Q2: Protein — unique by weight, gender, protein grams
  const q2: FAQ = {
    q: `How much protein should a ${w} lb ${g} eat per day?`,
    a: `At ${w} lb, a daily target of ${targets.protein}gm of protein (${proteinPerLb}g per lb bodyweight) supports body composition goals whether cutting, building, or maintaining. Protein has a higher thermic effect than carbs or fats, keeps hunger lower than either, and directly determines how much muscle your body can build or retain. Distribute across 3–5 meals for best use — a single large protein serving has diminishing returns compared to spread intake.`,
  };

  // Q3: Goal-specific — 4 variants (cut, build, maintain, recomp)
  const q3GoalMap: Record<Goal, FAQ> = {
    cut: {
      q: `Will a ${w} lb ${g} lose muscle during this ${calDiff}-calorie deficit?`,
      a: `Muscle loss risk on a ${calDiff}-calorie deficit is real but manageable. The most important protection is keeping protein at ${targets.protein}gm/day — elevated protein directly reduces muscle breakdown during a deficit. Continuing resistance training is the second most important factor; muscle is only retained if it is being used. A ${calDiff}-calorie deficit is in a moderate range, which means weekly fat loss should be around ${(calDiff / 3500).toFixed(1)} lbs — sustainable without requiring the body to cannibalize significant lean tissue.`,
    },
    build: {
      q: `How fast should a ${w} lb ${g} expect to gain muscle at ${targets.calories} calories?`,
      a: `Realistic natural muscle gain is slow — typically 0.25–0.5 lb of muscle per month for trained individuals, more for true beginners. Scale weight may increase faster than that because the surplus adds glycogen, water, and some fat alongside muscle. At a ${calDiff}-calorie surplus, expect to track body composition (measurements, how clothes fit, strength progress) rather than relying on scale weight alone. Strength gains are often the earliest and most reliable signal that the surplus is working.`,
    },
    maintain: {
      q: `How does a ${w} lb ${g} know if ${targets.calories} calories is their true maintenance?`,
      a: `If your scale weight is stable within 1–2 lbs over 3+ weeks at ${targets.calories} calories, you have found your maintenance. If weight trends downward consistently, add 100–150 calories. If it trends upward, reduce by 100–150 calories. Formulas like Mifflin-St Jeor give a close estimate, but actual maintenance is individual and can vary ±10% from calculated values based on NEAT (non-exercise activity thermogenesis) and metabolic rate differences.`,
    },
    recomp: {
      q: `Can a ${w} lb ${g} realistically build muscle and lose fat at the same time?`,
      a: `Yes, but the conditions matter. Body recomposition is most effective for people who are newer to consistent training (first 1–2 years), returning after a break, or who carry higher body fat (typically above 20% for men, 28% for women). At ${w} lb, keeping calories near maintenance (${tdee}) with protein at ${targets.protein}gm/day gives the body enough material to build muscle while still using stored fat for energy. Expect changes to show up in body measurements and strength over 12–16 weeks before they show clearly on the scale.`,
    },
  };
  const q3 = q3GoalMap[goal];

  // Q4: Strategy-specific — 5 variants
  const q4StratMap: Partial<Record<MacroStrategy, FAQ>> = {
    keto: {
      q: `What are the specific macro rules for a ${w} lb ${g} on keto?`,
      a: `On a ketogenic approach at ${w} lb, net carbs are capped at approximately ${targets.carbs}gm/day to maintain ketosis. Fat provides the majority of calories at ${targets.fat}gm/day (roughly ${Math.round((targets.fat * 9) / targets.calories * 100)}% of total intake). Protein stays moderate at ${targets.protein}gm — high enough to protect muscle but not so high that excess amino acids convert to glucose via gluconeogenesis and interrupt ketosis. Focus on tracking net carbs (total carbs minus fiber) rather than total carbs.`,
    },
    carnivore: {
      q: `What does a full day of carnivore eating look like at ${targets.calories} calories for a ${w} lb ${g}?`,
      a: `At ${targets.calories} calories, a carnivore day for a ${w} lb ${g} is built entirely from animal protein and fat: fatty cuts of beef, eggs, butter, chicken thighs, salmon, or pork belly are typical staples. The target is ${targets.protein}gm protein and ${targets.fat}gm fat with ${targets.carbs}gm carbs (trace amounts from eggs or some dairy). Ribeye steak is the closest single-food option to a complete carnivore macro profile. Most people find 2–3 meals per day easier to sustain than 4+ on carnivore.`,
    },
    high_protein: {
      q: `How should a ${w} lb ${g} distribute ${targets.protein}gm of protein across meals?`,
      a: `Spreading ${targets.protein}gm across 3–5 meals maximizes muscle protein synthesis compared to front-loading or back-loading protein in 1–2 large servings. A practical starting structure: ~${Math.round(targets.protein * 0.27)}gm at breakfast, ~${Math.round(targets.protein * 0.27)}gm at lunch, ~${Math.round(targets.protein * 0.33)}gm at dinner, and ~${Math.round(targets.protein * 0.13)}gm from a snack. High-protein foods like chicken breast (31gm/100g), Greek yogurt (10gm/100g), eggs (6gm each), and cottage cheese (11gm/100g) make the target achievable without supplements.`,
    },
    performance: {
      q: `How many carbs does a ${w} lb ${g} need for a performance-focused macro split?`,
      a: `At ${w} lb on a performance split, carbohydrates land around ${targets.carbs}gm/day. For athletes or serious gym-goers, carbs are the primary fuel for high-intensity effort — glycogen depletion directly impairs training quality and recovery. Pre-workout carbs (30–60 minutes before training) and post-workout carbs (within 2 hours) are the highest-leverage meal windows. The ${targets.carbs}gm target should not be confused with a high-carb diet; it is simply prioritizing carbohydrates over additional fat calories to support output.`,
    },
    balanced: {
      q: `Is a balanced macro split the right choice for a ${w} lb ${g} with a ${GOAL_NOUN[goal].toLowerCase()} goal?`,
      a: `A balanced split at ${w} lb is a strong default choice — it provides enough carbs for training fuel, adequate fat for hormone function, and a solid protein floor at ${targets.protein}gm/day without restricting any macro aggressively. It is particularly well-suited for people who do not want to follow a specific dietary protocol (keto, carnivore) and prefer food flexibility over a rigid structure. The main tradeoff is that it requires more active tracking than simplified approaches, since no food group is off-limits.`,
    },
  };
  const q4 = q4StratMap[strategy] ?? {
    q: `How does a ${strategyLabel(strategy).toLowerCase()} approach differ for a ${w} lb ${g}?`,
    a: `A ${strategyLabel(strategy).toLowerCase()} split at ${w} lb adjusts the carb-to-fat ratio to align with your dietary preferences and activity. The overall calorie target (${targets.calories}) and protein floor (${targets.protein}gm) remain the primary drivers of results — strategy primarily determines how those calories are distributed, which affects food choices and adherence.`,
  };

  // Q5: Weight-band-specific — 3 variants
  const q5BandMap: Record<"light" | "mid" | "heavy", FAQ> = {
    light: {
      q: `What should a ${w} lb ${g} know about adjusting macros at a lower body weight?`,
      a: `At ${w} lb, total calorie targets are lower, which means every macro gram matters more. Protein is the priority to protect — at ${targets.protein}gm, you are targeting ${proteinPerLb}g per lb, which leaves little room to reduce protein without consequences for muscle retention. If you need to reduce total calories, trim from carbs or fats, not protein. The lower absolute calorie target also means tracking accuracy is more important: a 200-calorie tracking error represents a larger percentage of total intake at ${targets.calories} calories than it would at 2,800+.`,
    },
    mid: {
      q: `When should a ${w} lb ${g} adjust their ${targets.calories}-calorie macro target?`,
      a: `Adjust when your body sends a clear signal for 2–3 consecutive weeks: no scale trend movement (up or down as intended), stalled training performance, or persistent energy issues. A single bad week is noise — a consistent 3-week trend is a signal. Adjust in 100–150 calorie increments, not large jumps. At ${targets.calories} calories for a ${w} lb ${g}, a 100-calorie change represents about 4–5% of total intake — meaningful but not disruptive to your food structure.`,
    },
    heavy: {
      q: `How do macros scale for heavier individuals like a ${w} lb ${g}?`,
      a: `At ${w} lb, total intake needs are higher than most generic macro guides suggest. Your estimated maintenance of ${tdee} calories reflects the greater metabolic demand of a larger body. Protein at ${targets.protein}gm scales proportionally with bodyweight — this is more total grams than a lighter person needs, but the per-pound ratio (${proteinPerLb}g/lb) is similar. Heavier individuals often also have a larger absolute margin for calorie adjustments — a 200-calorie change at ${targets.calories} calories is proportionally smaller than the same change at 1,800 calories.`,
    },
  };
  const q5 = q5BandMap[band];

  return [q1, q2, q3, q4, q5];
}

function buildProteinFAQs(config: SEOPageConfig, targets: MacroTargets): FAQ[] {
  const w = config.weightLb ?? 180;
  const g = genderWord(config.gender);
  const gender = config.gender ?? "male";
  const proteinPerLb = (targets.protein / w).toFixed(2);
  const band = weightBand(w);

  // Q1: Personalized by weight and gender
  const q1: FAQ = {
    q: `How much protein does a ${w} lb ${g} need each day?`,
    a: `A ${w} lb ${g} should target approximately ${targets.protein}gm of protein per day — around ${proteinPerLb}g per lb of bodyweight. This range supports lean mass retention and growth across most training goals. For context, that is roughly the equivalent of ${Math.round(targets.protein / 6)} eggs or ${Math.round(targets.protein / 31)} × 100g chicken breasts worth of protein distributed across the day.`,
  };

  // Q2: Weight-band-specific food and distribution advice
  const q2BandMap: Record<"light" | "mid" | "heavy", FAQ> = {
    light: {
      q: `What are the easiest ways for a lighter ${g} to hit ${targets.protein}gm of protein daily?`,
      a: `At ${w} lb, ${targets.protein}gm is achievable with 3–4 protein-rich meals. Practical anchors: 2 eggs at breakfast (~12gm), a 150g chicken breast at lunch (~47gm), Greek yogurt as a snack (~10gm per 100g), and a protein-rich dinner. Lower-calorie protein sources matter more at lighter bodyweights because you have less calorie budget to fill — lean sources like chicken breast, white fish, and egg whites give the most protein per calorie.`,
    },
    mid: {
      q: `How should a ${w} lb ${g} spread ${targets.protein}gm of protein across the day?`,
      a: `Dividing ${targets.protein}gm across 3–4 meals maximizes muscle protein synthesis compared to concentrating it in one or two large servings. A rough structure: ~${Math.round(targets.protein * 0.25)}gm with breakfast, ~${Math.round(targets.protein * 0.28)}gm at lunch, ~${Math.round(targets.protein * 0.35)}gm at dinner, ~${Math.round(targets.protein * 0.12)}gm from a snack. Each meal should include a primary protein source — chicken, beef, fish, eggs, dairy, or plant-based alternatives for vegetarians.`,
    },
    heavy: {
      q: `How do heavier individuals like a ${w} lb ${g} manage high protein targets?`,
      a: `At ${w} lb, your ${targets.protein}gm daily protein target is more total grams than smaller people need, but the per-pound ratio (${proteinPerLb}g/lb) is the same. Splitting into 4–5 meals or protein-anchored snacks makes it more manageable. Protein shakes are a practical supplement — not because whole foods cannot cover the target, but because the volume of food required can be challenging. Lean meats, Greek yogurt, cottage cheese, and eggs are the most calorie-efficient whole-food protein sources at this intake level.`,
    },
  };
  const q2 = q2BandMap[band];

  // Q3: Cutting vs bulking protein context
  const q3: FAQ = {
    q: `Does a ${w} lb ${g} need more or less protein when cutting versus bulking?`,
    a: `Protein requirements actually rise slightly during a calorie deficit compared to maintenance or a surplus. When calories are restricted, the body is more likely to use protein for energy — so keeping intake at or above ${targets.protein}gm protects muscle specifically during the cut phase. On a bulk, the minimum protein threshold is slightly lower because excess calories reduce catabolism risk, but keeping protein high (as this calculator targets) is still beneficial for body composition outcomes.`,
  };

  // Q4: Supplement necessity
  const q4: FAQ = {
    q: `Does a ${w} lb ${g} need protein supplements to hit ${targets.protein}gm per day?`,
    a: `No. Whole foods can fully cover ${targets.protein}gm per day. A day with 3 meals built around lean meat, fish, eggs, and some dairy will typically reach this target without supplements. Protein powder is useful for convenience — it is fast, portable, and reduces meal-prep complexity — but it is not nutritionally superior to whole food protein sources. If you already eat adequate protein from food, adding shakes provides diminishing returns.`,
  };

  // Q5: Gender-specific context
  const q5: FAQ =
    gender === "female"
      ? {
          q: `Do women need as much protein per pound as men?`,
          a: `Yes. Women benefit from the same per-pound protein targets as men for muscle retention and body composition. The idea that women should eat less protein is not supported by research — the main difference is that women typically have lower total calorie needs, so they eat fewer total grams in absolute terms. At ${w} lb, ${targets.protein}gm (${proteinPerLb}g/lb) is consistent with evidence-based recommendations for active women regardless of whether the goal is fat loss, maintenance, or muscle gain.`,
        }
      : {
          q: `What is the minimum protein a ${w} lb man should eat to avoid losing muscle?`,
          a: `Research suggests a minimum of roughly 0.7g per lb of bodyweight to prevent significant muscle loss under normal conditions, but 0.8–1.1g per lb is the practical recommendation for people actively training. At ${w} lb, the minimum floor would be around ${Math.round(w * 0.7)}gm/day — this target of ${targets.protein}gm is meaningfully above that floor, giving you a proper buffer for body composition improvement rather than just muscle preservation.`,
        };

  return [q1, q2, q3, q4, q5];
}

function buildMealPlanFAQs(config: SEOPageConfig, targets: MacroTargets): FAQ[] {
  const cal = config.calorieTarget ?? targets.calories;
  const strategy = config.strategy ?? "balanced";
  const strat = strategyLabel(strategy).toLowerCase();

  // Q1: Calorie precision — personalized with calorie number
  const q1: FAQ = {
    q: `How precisely do I need to hit ${cal} calories per day?`,
    a: `Aim to be within 100–150 calories of ${cal} consistently, not exactly on it every day. Daily variance from food weighing, restaurant meals, and portion estimation is normal. What matters is the weekly average trend. If you average close to ${cal} calories across the week, you will get the intended physiological result — fat loss, maintenance, or muscle gain — even if individual days vary.`,
  };

  // Q2: Strategy-specific — 4 variants
  const q2StratMap: Partial<Record<MacroStrategy, FAQ>> = {
    high_protein: {
      q: `What makes a ${cal}-calorie high-protein meal plan different from a regular one?`,
      a: `A high-protein version of this ${cal}-calorie plan allocates more of the calorie budget to protein and less to carbs and fat compared to a balanced plan. At this calorie level, you get ${targets.protein}gm protein — the highest priority macro — while carbs (${targets.carbs}gm) and fat (${targets.fat}gm) fill remaining calories. Foods like chicken breast, Greek yogurt, egg whites, and cottage cheese are the backbone because they deliver more protein per calorie than any other food group.`,
    },
    balanced: {
      q: `How flexible is a ${cal}-calorie balanced meal plan for food choices?`,
      a: `A balanced ${cal}-calorie structure is the most flexible of the major approaches. Carbs, fat, and protein all appear in reasonable proportions — ${targets.carbs}gm carbs, ${targets.fat}gm fat, ${targets.protein}gm protein — so no food group is excluded. You can swap freely within each macro category: chicken or fish for protein, rice or potatoes for carbs, olive oil or nuts for fat. This flexibility is what makes the balanced approach easiest to sustain long-term.`,
    },
    keto: {
      q: `How do I stay in ketosis on a ${cal}-calorie keto meal plan?`,
      a: `Staying in ketosis at ${cal} calories requires keeping net carbs at or below ${targets.carbs}gm/day. This plan allocates ${targets.fat}gm fat, ${targets.protein}gm protein, and ${targets.carbs}gm carbs. The practical rule: build every meal around a fat source (eggs, meat, olive oil, butter, avocado) and a protein source (fatty cuts of meat, eggs, salmon), then add only keto-compatible vegetables like leafy greens, zucchini, or broccoli in small amounts. Avoid anything labeled as a starch, grain, legume, or fruit.`,
    },
    carnivore: {
      q: `What foods make up a ${cal}-calorie carnivore meal plan?`,
      a: `At ${cal} calories, a carnivore day is built entirely from animal products. The macro split — ${targets.protein}gm protein and ${targets.fat}gm fat with ${targets.carbs}gm carbs (trace only) — maps well to fatty cuts of beef, eggs, butter, salmon, chicken thighs, and some cheese or butter. A practical ${cal}-calorie carnivore day might look like: a 3-egg breakfast with bacon, a ribeye or burger lunch, and salmon with butter for dinner. Variety comes from rotating animal species and cuts, not food groups.`,
    },
  };
  const q2 = q2StratMap[strategy] ?? {
    q: `What are the most important rules for a ${cal}-calorie ${strat} meal plan?`,
    a: `The two most important rules are hitting protein (${targets.protein}gm) and staying close to the total calorie target (${cal}). Carb and fat distribution matter less than those two anchors for most body-composition goals. Track your weekly average trend rather than obsessing over daily precision.`,
  };

  // Q3: Calorie-band-specific — 3 variants
  const calBand = cal <= 1900 ? "low" : cal >= 2700 ? "high" : "mid";
  const q3CalMap = {
    low: {
      q: `Is ${cal} calories per day enough to support energy and training?`,
      a: `${cal} calories per day is in the lower range and is typically appropriate for people with a smaller body frame or lower activity level pursuing fat loss. For most people, training performance will be maintained if protein stays at ${targets.protein}gm. Fatigue in the first 1–2 weeks is common as the body adapts to lower intake — this is normal and usually passes. If training quality drops significantly after 2 weeks at ${cal} calories, consider adding a structured refeed day at maintenance calories once per week.`,
    },
    mid: {
      q: `Is ${cal} calories per day suitable for body recomposition?`,
      a: `${cal} calories per day sits close to maintenance for many people and works well for a recomposition approach — building muscle while slowly losing fat, or maintaining weight while improving body composition. At this level, protein (${targets.protein}gm) is the most important variable. Total calories are close enough to maintenance that you can absorb some variance without disrupting the goal significantly in either direction.`,
    },
    high: {
      q: `Will a ${cal}-calorie meal plan cause fat gain?`,
      a: `Whether ${cal} calories causes fat gain depends on your TDEE. For larger individuals or highly active people, ${cal} may be close to or even below maintenance. For smaller or less active people, it will be a surplus. The calculator preset reflects a profile where ${cal} calories aligns with a building or maintenance goal — adjust your weight, height, activity level, and goal using the calculator to see your personalized TDEE and whether ${cal} represents a deficit, maintenance, or surplus for your body.`,
    },
  };
  const q3 = q3CalMap[calBand];

  // Q4 and Q5: stable across all meal plan pages (protein anchor and food swap)
  const q4: FAQ = {
    q: "What is the most important thing to get right in this meal plan?",
    a: `Protein consistency is the most important factor — hit ${targets.protein}gm per day before worrying about getting carbs or fat exact. After protein, total calorie proximity to ${cal} matters most. The specific foods you choose within the macro framework matter far less than repeating the structure consistently over 4–8 weeks.`,
  };

  const q5: FAQ = {
    q: "Can I swap foods and still get the same results?",
    a: `Yes. Food swaps within the same macro category are entirely valid — chicken breast instead of turkey, rice instead of potatoes, olive oil instead of butter. Keep protein grams close when swapping protein sources and keep calorie-dense swaps in check when trading fats. You do not need to follow the exact meals in this template — just use it as a daily macro target and choose foods that consistently hit those numbers.`,
  };

  return [q1, q2, q3, q4, q5];
}

// ---- Related links ----
// Clusters/pillars now link to strategy/goal-relevant micro pages, not hardcoded slugs.

export interface RelatedLink {
  slug: string;
  label: string;
}

export interface SupportingGuideLink {
  href: string;
  label: string;
}

/** Return up to `count` representative micro pages matching a strategy and/or goal. */
function representativeMicroPages(
  opts: { strategy?: MacroStrategy; goal?: Goal; limit?: number }
): RelatedLink[] {
  const { strategy, goal, limit = 6 } = opts;
  const SHOWCASE_WEIGHTS = [160, 170, 180, 190, 200];
  const results: RelatedLink[] = [];

  for (const w of SHOWCASE_WEIGHTS) {
    for (const gender of ["male", "female"] as const) {
      const g = goal ?? "cut";
      const s = strategy ?? "high_protein";
      const slug = macroSlug(w, gender, g, s);
      if (ALL_SEO_PAGES.some((p) => p.slug === slug)) {
        results.push({
          slug,
          label: `${w} lb ${gender === "male" ? "Male" : "Female"} ${GOAL_NOUN[g]} — ${strategyLabel(s)}`,
        });
      }
      if (results.length >= limit) break;
    }
    if (results.length >= limit) break;
  }
  return results;
}

function buildRelatedLinks(config: SEOPageConfig): RelatedLink[] {
  const links: RelatedLink[] = [];
  const valid = new Set(ALL_SEO_PAGES.map((p) => p.slug));
  const type = pageTypeOf(config);
  const w = config.weightLb ?? 180;
  const g = config.gender ?? "male";
  const goal = config.goal ?? "maintain";
  const strategy = config.strategy ?? "balanced";
  const gTitle = genderTitle(g);

  if (type === "macro" && config.tier === "micro") {
    // Adjacent weights (same goal + strategy)
    if (w > 130) {
      links.push({
        slug: macroSlug(w - 10, g, goal, strategy),
        label: `${w - 10} lb ${gTitle} ${GOAL_NOUN[goal]} (${strategyLabel(strategy)})`,
      });
    }
    if (w < 230) {
      links.push({
        slug: macroSlug(w + 10, g, goal, strategy),
        label: `${w + 10} lb ${gTitle} ${GOAL_NOUN[goal]} (${strategyLabel(strategy)})`,
      });
    }

    // Alternate goals (same weight, gender, strategy)
    for (const altGoal of ["cut", "build", "maintain", "recomp"] as Goal[]) {
      if (altGoal === goal) continue;
      links.push({
        slug: macroSlug(w, g, altGoal, strategy),
        label: `${w} lb ${gTitle} ${GOAL_NOUN[altGoal]} (${strategyLabel(strategy)})`,
      });
    }

    // Alternate strategies (same weight, gender, goal)
    for (const altStrategy of [
      "high_protein",
      "balanced",
      "keto",
      "carnivore",
      "performance",
    ] as MacroStrategy[]) {
      if (altStrategy === strategy) continue;
      links.push({
        slug: macroSlug(w, g, goal, altStrategy),
        label: `${w} lb ${gTitle} ${GOAL_NOUN[goal]} (${strategyLabel(altStrategy)})`,
      });
    }

    // Cross-family: protein page + nearest meal-plan page
    links.push({
      slug: proteinSlug(w, g),
      label: `Protein intake for ${w} lb ${gTitle}`,
    });
    links.push({
      slug: mealPlanSlug(targetCaloriesBucket(config), strategy),
      label: `${targetCaloriesBucket(config)} cal ${strategyLabel(strategy)} meal plan`,
    });

    // Hub links (goal/strategy cluster pages)
    const goalClusterMap: Partial<Record<Goal, string>> = {
      cut: "cutting-macros",
      build: "bulking-macros",
      maintain: "maintenance-macros",
    };
    const stratClusterMap: Partial<Record<MacroStrategy, string>> = {
      keto: "keto-macros",
      carnivore: "carnivore-macros",
      high_protein: "high-protein-macros",
    };
    if (goalClusterMap[goal]) {
      links.push({ slug: goalClusterMap[goal]!, label: `${GOAL_NOUN[goal]} Macros Guide` });
    }
    if (stratClusterMap[strategy]) {
      links.push({ slug: stratClusterMap[strategy]!, label: `${strategyLabel(strategy)} Macros Guide` });
    }
  } else if (type === "protein_intake") {
    // Adjacent protein pages
    if (w > 130) links.push({ slug: proteinSlug(w - 10, g), label: `Protein intake for ${w - 10} lb ${gTitle}` });
    if (w < 230) links.push({ slug: proteinSlug(w + 10, g), label: `Protein intake for ${w + 10} lb ${gTitle}` });

    // Cross to macro pages (same weight, this gender, top 3 goals)
    for (const crossGoal of ["cut", "build", "maintain"] as Goal[]) {
      links.push({
        slug: macroSlug(w, g, crossGoal, "high_protein"),
        label: `${w} lb ${gTitle} ${GOAL_NOUN[crossGoal]} macros`,
      });
    }
    links.push({ slug: "high-protein-macros", label: "High Protein Macros Guide" });
  } else if (type === "meal_plan") {
    const cals = config.calorieTarget ?? 2200;
    // Adjacent calorie bands
    for (const nextCal of [cals - 200, cals + 200]) {
      if (nextCal >= 1600 && nextCal <= 3200) {
        links.push({
          slug: mealPlanSlug(nextCal, strategy),
          label: `${nextCal} calorie ${strategyLabel(strategy)} meal plan`,
        });
      }
    }
    // Same calorie, alternate strategies
    for (const altStrategy of [
      "high_protein",
      "balanced",
      "keto",
      "carnivore",
    ] as MacroStrategy[]) {
      if (altStrategy === strategy) continue;
      links.push({
        slug: mealPlanSlug(cals, altStrategy),
        label: `${cals} calorie ${strategyLabel(altStrategy)} meal plan`,
      });
    }
    // Cross to representative macro page
    links.push({
      slug: macroSlug(w, g, goal, strategy),
      label: `${w} lb ${gTitle} ${GOAL_NOUN[goal]} macros (${strategyLabel(strategy)})`,
    });
  } else {
    // Cluster / pillar: link to strategy/goal-relevant micro pages instead of hardcoded slugs
    const microLinks = representativeMicroPages({
      strategy: config.strategy,
      goal: config.goal,
      limit: 6,
    });
    links.push(...microLinks);

    // Always surface the hub pages
    links.push({ slug: "cutting-macros", label: "Cutting Macros Guide" });
    links.push({ slug: "bulking-macros", label: "Bulking Macros Guide" });
    if (config.strategy !== "keto") links.push({ slug: "keto-macros", label: "Keto Macros Guide" });
    if (config.strategy !== "carnivore") links.push({ slug: "carnivore-macros", label: "Carnivore Macros Guide" });
    links.push({ slug: "high-protein-macros", label: "High Protein Macros Guide" });
  }

  const unique = new Map<string, RelatedLink>();
  for (const link of links) {
    if (!valid.has(link.slug)) continue;
    if (link.slug === config.slug) continue;
    if (!unique.has(link.slug)) unique.set(link.slug, link);
  }
  return Array.from(unique.values()).slice(0, 12);
}

function targetCaloriesBucket(config: SEOPageConfig): number {
  if ((config.goal ?? "maintain") === "cut") return 2000;
  if ((config.goal ?? "maintain") === "build") return 2800;
  return 2200;
}

function buildSupportingGuides(config: SEOPageConfig): SupportingGuideLink[] {
  const type = pageTypeOf(config);
  const strategy = config.strategy ?? "balanced";
  const goal = config.goal ?? "maintain";

  const all: SupportingGuideLink[] = [
    { href: "/guides/fat-loss-macros", label: "How to calculate macros for fat loss" },
    { href: "/guides/protein-per-pound", label: "Protein intake per pound explained" },
    { href: "/guides/keto-macros-explained", label: "Keto macros explained" },
    { href: "/guides/carnivore-macros-guide", label: "Carnivore macros guide" },
    { href: "/guides/best-macro-split-for-muscle-gain", label: "Best macro split for muscle gain" },
  ];

  if (type === "protein_intake") {
    return all.filter((g) => g.href.includes("protein") || g.href.includes("muscle"));
  }
  if (type === "meal_plan") {
    return all.filter((g) => !g.href.includes("protein-per-pound"));
  }
  if (strategy === "keto") return all.filter((g) => g.href.includes("keto") || g.href.includes("fat-loss"));
  if (strategy === "carnivore") return all.filter((g) => g.href.includes("carnivore") || g.href.includes("fat-loss"));
  if (goal === "build") return all.filter((g) => g.href.includes("muscle") || g.href.includes("protein"));
  return all.filter((g) => g.href.includes("fat-loss") || g.href.includes("protein"));
}

// ---- Main export ----

export interface PageContent {
  pageType: SEOPageType;
  title: string;
  description: string;
  h1: string;
  intro: string;
  whoThisIsFor: string;
  macroRationale: string;
  strategyExplanation: string;
  adjustmentNotes: string[];
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
  supportingGuides: SupportingGuideLink[];
  targets: MacroTargets;
  tdee: number;
  explanation: string;
}

export function buildPageContent(config: SEOPageConfig): PageContent {
  const profile = configToProfile(config);
  const { targets, tdee, explanation } = calculateMacros(profile);
  const type = pageTypeOf(config);

  const faqs =
    type === "protein_intake"
      ? buildProteinFAQs(config, targets)
      : type === "meal_plan"
        ? buildMealPlanFAQs(config, targets)
        : buildMacroFAQs(config, targets, tdee);

  return {
    pageType: type,
    title: buildTitle(config),
    description: buildDescription(config, targets, tdee),
    h1: buildH1(config),
    intro: buildIntro(config, targets, tdee),
    whoThisIsFor: buildWhoThisIsFor(config),
    macroRationale: buildMacroRationale(config, targets, tdee),
    strategyExplanation: buildStrategyExplanation(config),
    adjustmentNotes: buildAdjustmentNotes(config, targets),
    faqs,
    relatedLinks: buildRelatedLinks(config),
    supportingGuides: buildSupportingGuides(config),
    targets,
    tdee,
    explanation,
  };
}
