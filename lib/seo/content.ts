import { calculateMacros, lbsToKg } from "@/lib/macroEngine";
import type { SEOPageConfig } from "./types";
import type { MacroTargets, UserProfile, MacroStrategy, Goal } from "@/types/macro";
import { ALL_SEO_PAGES, GOAL_SLUG, STRATEGY_SLUG } from "./pages";

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
  "carnivore-macro-calculator":
    "Carnivore Macro Calculator | Free & Personalized | Physiq",
  "cutting-macro-calculator":
    "Cutting Macro Calculator | Fat Loss Macros | Physiq",
  "bulking-macro-calculator":
    "Bulking Macro Calculator | Muscle Gain Macros | Physiq",
  "high-protein-macro-calculator":
    "High Protein Macro Calculator | Free | Physiq",
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
  // Micro page
  const { weightLb, gender, goal, strategy } = config;
  const genderWord = gender === "female" ? "Woman" : "Man";
  const goalStr = goal ? GOAL_NOUN[goal] : "";
  const stratStr = strategy ? ` — ${STRATEGY_LABEL[strategy]}` : "";
  return `Macros for ${weightLb} lb ${genderWord} ${goalStr}${stratStr} | Physiq`;
}

export function buildH1(config: SEOPageConfig): string {
  if (config.tier === "pillar") {
    return PILLAR_H1S[config.slug] ?? "Macro Calculator";
  }
  if (config.tier === "cluster") {
    return CLUSTER_H1S[config.slug] ?? "Macros Guide";
  }
  // Micro page
  const { weightLb, gender, goal, strategy } = config;
  const genderWord = gender === "female" ? "Woman" : "Man";
  const goalStr = goal ? GOAL_NOUN[goal] : "Macros";
  const stratStr = strategy ? ` — ${STRATEGY_LABEL[strategy]}` : "";
  return `${goalStr} Macros for a ${weightLb} lb ${genderWord}${stratStr}`;
}

export function buildDescription(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  if (config.tier !== "micro") {
    const stratStr = config.strategy
      ? `${STRATEGY_LABEL[config.strategy].toLowerCase()} `
      : "";
    const goalStr = config.goal
      ? `for ${GOAL_NOUN[config.goal].toLowerCase()}`
      : "";
    return `Calculate your ${stratStr}macros ${goalStr}. Representative TDEE: ${tdee} cal. Get personalized protein, carbs, and fat targets. Free — no signup required.`;
  }

  const { weightLb, gender, goal, strategy } = config;
  const genderWord = gender === "female" ? "female" : "male";
  const goalStr = goal ? GOAL_NOUN[goal].toLowerCase() : "macros";
  const stratStr = strategy ? ` (${STRATEGY_LABEL[strategy]})` : "";
  return `Exact macros for a ${weightLb} lb ${genderWord} ${goalStr}${stratStr}: ${targets.calories} cal, ${targets.protein}gm protein, ${targets.carbs}gm carbs, ${targets.fat}gm fat/day. Free Physiq calculator included.`;
}

// ---- Intro (uniquely data-driven per page) ----

export function buildIntro(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  if (config.tier !== "micro") {
    return buildClusterIntro(config, targets, tdee);
  }

  const { weightLb = 180, gender = "male", goal = "maintain", strategy } =
    config;
  const genderWord = gender === "male" ? "man" : "woman";
  const weightKg = Math.round(lbsToKg(weightLb));
  const calDiff = Math.abs(targets.calories - tdee);
  const deficitOrSurplus = goal === "build" ? "surplus" : "deficit";

  const goalPhrases: Record<Goal, string> = {
    cut: `lose fat with a ${calDiff}-calorie daily ${deficitOrSurplus}`,
    build: `build muscle with a ${calDiff}-calorie daily ${deficitOrSurplus}`,
    maintain: `maintain your current weight at ${tdee} calories per day`,
    recomp: `body recompose with a ${calDiff}-calorie mild ${deficitOrSurplus}`,
  };

  const stratPhrase = strategy
    ? ` using a ${STRATEGY_LABEL[strategy].toLowerCase()} approach`
    : "";

  return [
    `If you're a ${weightLb}-pound ${genderWord} (${weightKg} kg) looking to ${goalPhrases[goal]}${stratPhrase}, your personalized daily macro targets are:`,
    `${targets.calories} calories · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat`,
    `These numbers come from your estimated TDEE of ${tdee} cal/day via the Mifflin-St Jeor equation at moderate activity. Adjust the calculator below for your exact height, age, and activity level.`,
  ].join("\n\n");
}

function buildClusterIntro(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): string {
  const { strategy, goal, gender } = config;
  const genderWord = gender === "male" ? "men" : gender === "female" ? "women" : "people";

  if (strategy === "keto") {
    return [
      `Keto macros keep carbohydrates under 50gm per day, pushing your body into ketosis — a fat-burning metabolic state. Fat becomes the primary fuel source, supplying ${Math.round((targets.fat * 9) / targets.calories * 100)}% of your daily calories.`,
      `Representative targets at ${config.weightLb} lb: ${targets.calories} cal · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat`,
      `Use the calculator below to get your exact keto macros based on your body weight, height, age, and activity level.`,
    ].join("\n\n");
  }

  if (strategy === "carnivore") {
    return [
      `Carnivore macros eliminate carbohydrates entirely. All calories come from animal-based protein and fat — beef, eggs, poultry, fish, and some dairy. Zero carbs means zero glucose fluctuation.`,
      `Representative targets at ${config.weightLb} lb: ${targets.calories} cal · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat`,
      `Use the calculator below to get your exact carnivore macros.`,
    ].join("\n\n");
  }

  if (goal === "cut") {
    const calDiff = Math.abs(targets.calories - tdee);
    return [
      `Cutting macros create a controlled calorie deficit to drive fat loss while preserving lean muscle. For ${genderWord}, a 15% deficit from TDEE is the most sustainable approach — aggressive enough to see weekly progress, conservative enough to keep muscle intact.`,
      `Representative targets for a ${config.weightLb} lb ${gender ?? "person"}: ${targets.calories} cal · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat (${calDiff}-calorie deficit from ${tdee} TDEE)`,
      `Use the calculator below to compute your personalized cutting macros.`,
    ].join("\n\n");
  }

  if (goal === "build") {
    const calDiff = Math.abs(targets.calories - tdee);
    return [
      `Bulking macros place you in a calorie surplus to support muscle protein synthesis and strength gains. A 10% surplus above TDEE is recommended for lean muscle gain with minimal fat accumulation.`,
      `Representative targets for a ${config.weightLb} lb ${gender ?? "person"}: ${targets.calories} cal · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat (+${calDiff} over ${tdee} TDEE)`,
      `Use the calculator below to set your personalized bulking macros.`,
    ].join("\n\n");
  }

  return [
    `These macro targets are calculated for ${genderWord} at a representative weight of ${config.weightLb ?? 180} lb and moderate activity level using the Mifflin-St Jeor equation.`,
    `Representative targets: ${targets.calories} cal · ${targets.protein}gm protein · ${targets.carbs}gm carbs · ${targets.fat}gm fat`,
    `Use the calculator below to get your exact personalized macros.`,
  ].join("\n\n");
}

// ---- FAQ builders ----

export interface FAQ {
  q: string;
  a: string;
}

function buildMicroFAQs(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): FAQ[] {
  const { weightLb = 180, gender = "male", goal = "cut", strategy } = config;
  const genderWord = gender === "male" ? "man" : "woman";
  const calDiff = Math.abs(targets.calories - tdee);
  const lbsPerWeek = (calDiff / 3500).toFixed(1);
  const proteinPerLb = (targets.protein / weightLb).toFixed(1);

  const goalActionMap: Record<Goal, string> = {
    cut: "lose fat",
    build: "build muscle",
    maintain: "maintain weight",
    recomp: "body recompose",
  };

  const faqs: FAQ[] = [
    {
      q: `How many calories should a ${weightLb} lb ${genderWord} eat to ${goalActionMap[goal]}?`,
      a: `A ${weightLb} lb ${genderWord} should target approximately ${targets.calories} calories per day${goal !== "maintain" ? `. That's a ${calDiff}-calorie ${goal === "build" ? "surplus above" : "deficit below"} the estimated TDEE of ${tdee} calories` : `, matching the estimated TDEE of ${tdee} calories`}. This is based on a 30-year-old at moderate activity using the Mifflin-St Jeor equation. Adjust the calculator for your exact age, height, and activity level.`,
    },
    {
      q: `How much protein does a ${weightLb} lb ${genderWord} need${goal === "cut" ? " when cutting" : goal === "build" ? " when bulking" : ""}?`,
      a: `A ${weightLb} lb ${genderWord} needs approximately ${targets.protein}gm of protein per day (${proteinPerLb}g per pound of bodyweight). ${goal === "cut" ? "During a cut, higher protein intake preserves lean muscle while you're in a caloric deficit — the most important nutritional factor for body composition outcomes." : goal === "build" ? "During a bulk, adequate protein provides the amino acids needed for muscle protein synthesis. Distribution across 3–5 meals maximizes absorption." : "Consistent protein intake at maintenance supports muscle retention and metabolic health long-term."}`,
    },
  ];

  // Goal-specific
  if (goal === "cut") {
    faqs.push({
      q: `How fast will a ${weightLb} lb ${genderWord} lose fat on ${targets.calories} calories?`,
      a: `At a ${calDiff}-calorie daily deficit, expect to lose approximately ${lbsPerWeek} pounds per week (3,500 cal ≈ 1 lb of fat). For a ${weightLb} lb ${genderWord}, this is a sustainable rate that minimizes muscle loss. If you stall after 3–4 weeks, reduce by 100–150 calories before making larger cuts.`,
    });
  } else if (goal === "build") {
    faqs.push({
      q: `How fast will a ${weightLb} lb ${genderWord} gain muscle on ${targets.calories} calories?`,
      a: `At a ${calDiff}-calorie daily surplus, total weight gain runs approximately ${lbsPerWeek} lbs/week — but natural muscle gain is slower (0.25–0.5 lb of muscle per week is realistic for trained individuals). Track your body composition alongside scale weight to distinguish muscle from fat gain.`,
    });
  } else if (goal === "recomp") {
    faqs.push({
      q: `Can a ${weightLb} lb ${genderWord} really build muscle and lose fat at the same time?`,
      a: `Yes — body recomposition is most effective for beginners, those returning after a break, or people with higher body fat percentages. A mild deficit of ${calDiff} calories with ${targets.protein}gm protein is the sweet spot. Expect slower but simultaneous progress on both fronts. Results are clearer over 12+ weeks.`,
    });
  } else {
    faqs.push({
      q: `How does a ${weightLb} lb ${genderWord} know if ${targets.calories} calories is their real maintenance?`,
      a: `If your scale weight is stable after 2–3 weeks at ${targets.calories} calories, it's a reliable estimate. If you're losing weight, add 100–150 calories. If gaining, reduce by 100–150. This iterative approach is more accurate than any formula alone.`,
    });
  }

  // Strategy-specific
  if (strategy === "keto") {
    faqs.push({
      q: `What are the exact keto macros for a ${weightLb} lb ${genderWord}?`,
      a: `On keto, a ${weightLb} lb ${genderWord} should target ${targets.calories} calories with ${targets.fat}gm fat (${Math.round((targets.fat * 9) / targets.calories * 100)}% of total calories), ${targets.protein}gm protein (${proteinPerLb}g/lb), and ${targets.carbs}gm carbs — kept under 50gm to maintain ketosis. Fat is the primary fuel source; protein stays moderate; carbs are minimal.`,
    });
  } else if (strategy === "carnivore") {
    faqs.push({
      q: `What are carnivore macros for a ${weightLb} lb ${genderWord}?`,
      a: `On carnivore, a ${weightLb} lb ${genderWord} eliminates all plant foods. The target is ${targets.calories} calories from ${targets.protein}gm protein and ${targets.fat}gm fat sourced exclusively from animal products. Carbs are ${targets.carbs}gm — trace amounts from eggs and dairy. Best food sources: beef, eggs, salmon, chicken thighs, butter.`,
    });
  } else if (strategy === "high_protein") {
    faqs.push({
      q: `Why is ${targets.protein}gm of protein the right target for a ${weightLb} lb ${genderWord}?`,
      a: `High protein macros allocate ${proteinPerLb}g per pound of bodyweight — the research-supported range for maximizing muscle retention and growth. For a ${weightLb} lb ${genderWord}, this means ${targets.protein}gm daily. Best sources: chicken breast (~31gm/100g), Greek yogurt (~10gm/100g), eggs (~6gm each), whey protein (~25gm/scoop).`,
    });
  }

  faqs.push({
    q: "Should I adjust these macros as my weight changes?",
    a: `Yes. As your weight changes, your TDEE changes too. Recalculate every 10–15 lbs or every 6–8 weeks. ${goal === "cut" ? "As you lose fat, your maintenance calories decrease — so your deficit target also drops. Failing to adjust is the #1 reason fat loss plateaus." : goal === "build" ? "As you gain muscle mass, your maintenance calories increase — adjust upward every 4–6 weeks to keep the surplus consistent." : "Periodic recalculation keeps your targets accurate as your body composition evolves."}`,
  });

  return faqs;
}

function buildClusterFAQs(
  config: SEOPageConfig,
  targets: MacroTargets,
  tdee: number
): FAQ[] {
  const { strategy, goal } = config;

  const faqs: FAQ[] = [
    {
      q: "What are macros and why should I track them?",
      a: "Macros (macronutrients) — protein, carbohydrates, and fat — are the three nutrients that provide energy. Tracking them gives you precise control over body composition in ways that calorie counting alone cannot. Protein drives muscle retention and growth; carbs fuel training; fat supports hormones and satiety. Getting the ratio right is the difference between losing fat vs. muscle, or gaining muscle vs. fat.",
    },
    {
      q: "How do I calculate my TDEE accurately?",
      a: `Your TDEE (Total Daily Energy Expenditure) is estimated using the Mifflin-St Jeor BMR equation multiplied by an activity factor: sedentary (×1.2), light (×1.375), moderate (×1.55), very active (×1.725). For a representative profile, TDEE is approximately ${tdee} calories/day. The formula is most accurate when your activity level is set honestly — most people overestimate activity.`,
    },
  ];

  if (goal === "cut") {
    faqs.push({
      q: "How large should my calorie deficit be for fat loss?",
      a: `A 15% deficit (approximately ${Math.round(tdee * 0.15)} calories below TDEE in this example) is the optimal starting point. Research shows larger deficits increase muscle catabolism without proportionally increasing fat loss. A 15% deficit typically produces 0.5–1.5 lbs of weekly fat loss depending on body fat percentage and adherence.`,
    });
    faqs.push({
      q: "How much protein should I eat while cutting?",
      a: `Protein should remain high during a cut — 0.9–1.1g per pound of bodyweight. This is the single most important macro for preserving muscle while in a deficit. Cutting protein to save calories is the most common and damaging mistake in fat loss dieting.`,
    });
  }

  if (goal === "build") {
    faqs.push({
      q: "How large should my calorie surplus be for muscle gain?",
      a: `A 10% surplus (approximately ${Math.round(tdee * 0.1)} calories above TDEE) is the recommended starting point for lean bulking. Larger surpluses don't build muscle faster — they primarily add fat. For beginners, muscle gain is possible even at maintenance or a slight deficit.`,
    });
  }

  if (strategy === "keto") {
    faqs.push({
      q: "How many carbs can I eat and stay in ketosis?",
      a: "Most people need to keep net carbs under 20–50gm per day to maintain ketosis. Our keto macro calculator caps carbs at 50gm. Ketosis typically occurs within 2–4 days of restricting carbs, but full fat-adaptation (where your body efficiently burns ketones) takes 4–6 weeks.",
    });
    faqs.push({
      q: "What do keto macros look like day to day?",
      a: `Keto macros are typically 65–75% fat, 20–30% protein, and 5% or less carbs. For our representative example: ${targets.fat}gm fat, ${targets.protein}gm protein, ${targets.carbs}gm carbs. Foods: eggs, fatty meats, avocado, olive oil, leafy greens (minimal). Avoid all grains, most fruits, legumes, and starchy vegetables.`,
    });
  }

  if (strategy === "carnivore") {
    faqs.push({
      q: "What do you eat on carnivore macros?",
      a: `Carnivore is an animal-based diet with zero plant foods. All protein and fat comes from beef, chicken, pork, eggs, fish, and some dairy. For our example: ${targets.protein}gm protein + ${targets.fat}gm fat = ${targets.calories} total calories. Carbs are ${targets.carbs}gm (trace amounts from dairy). Most practitioners prioritize fatty cuts of beef as their staple.`,
    });
  }

  faqs.push({
    q: "How often should I recalculate my macros?",
    a: "Recalculate every 10–15 lbs of weight change or every 6–8 weeks — whichever comes first. Your TDEE changes as your body composition shifts. Using the Physiq calculator regularly ensures your targets always reflect your current body, not who you were 3 months ago.",
  });

  return faqs;
}

// ---- Related links ----

export interface RelatedLink {
  slug: string;
  label: string;
}

function buildRelatedLinks(config: SEOPageConfig): RelatedLink[] {
  const { tier, weightLb, gender, goal, strategy } = config;
  const links: RelatedLink[] = [];

  const validSlugs = new Set(ALL_SEO_PAGES.map((p) => p.slug));

  if (tier === "micro" && weightLb && gender && goal && strategy) {
    const otherGender = gender === "male" ? "female" : "male";
    const genderWord = gender === "male" ? "Male" : "Female";
    const otherGenderWord = otherGender === "male" ? "Male" : "Female";
    const stratSlug = STRATEGY_SLUG[strategy] ?? strategy;
    const goalSlug = GOAL_SLUG[goal];

    // Adjacent weights
    if (weightLb > 130) {
      const w = weightLb - 10;
      links.push({
        slug: `${w}-pound-${gender}-${goalSlug}-${stratSlug}-macros`,
        label: `${w} lb ${genderWord} ${GOAL_NOUN[goal]}`,
      });
    }
    if (weightLb < 210) {
      const w = weightLb + 10;
      links.push({
        slug: `${w}-pound-${gender}-${goalSlug}-${stratSlug}-macros`,
        label: `${w} lb ${genderWord} ${GOAL_NOUN[goal]}`,
      });
    }

    // Opposite gender (same weight, goal, strategy)
    links.push({
      slug: `${weightLb}-pound-${otherGender}-${goalSlug}-${stratSlug}-macros`,
      label: `${weightLb} lb ${otherGenderWord} ${GOAL_NOUN[goal]}`,
    });

    // Other goals (same weight, gender, strategy)
    const otherGoals: Goal[] = (["cut", "build", "maintain"] as Goal[]).filter(
      (g) => g !== goal
    );
    for (const g of otherGoals) {
      links.push({
        slug: `${weightLb}-pound-${gender}-${GOAL_SLUG[g]}-${stratSlug}-macros`,
        label: `${weightLb} lb ${genderWord} ${GOAL_NOUN[g]}`,
      });
    }

    // Other strategies (same weight, gender, goal)
    const otherStrats: MacroStrategy[] = (
      ["high_protein", "keto", "carnivore"] as MacroStrategy[]
    ).filter((s) => s !== strategy);
    for (const s of otherStrats) {
      const sl = STRATEGY_SLUG[s] ?? s;
      links.push({
        slug: `${weightLb}-pound-${gender}-${goalSlug}-${sl}-macros`,
        label: `${weightLb} lb ${genderWord} ${GOAL_NOUN[goal]} — ${STRATEGY_LABEL[s]}`,
      });
    }

    // Cluster hub links
    if (strategy === "keto")
      links.push({ slug: "keto-macros", label: "Keto Macros Guide" });
    if (strategy === "carnivore")
      links.push({ slug: "carnivore-macros", label: "Carnivore Macros Guide" });
    if (strategy === "high_protein")
      links.push({
        slug: "high-protein-macros",
        label: "High Protein Macros Guide",
      });
    if (goal === "cut")
      links.push({ slug: "cutting-macros", label: "Cutting Macros Guide" });
    if (goal === "build")
      links.push({ slug: "bulking-macros", label: "Bulking Macros Guide" });
  } else {
    // Cluster / pillar → link to adjacent hubs and popular micro pages
    links.push({ slug: "cutting-macros", label: "Cutting Macros Guide" });
    links.push({ slug: "bulking-macros", label: "Bulking Macros Guide" });
    links.push({ slug: "keto-macros", label: "Keto Macros Guide" });
    links.push({ slug: "carnivore-macros", label: "Carnivore Macros Guide" });
    links.push({ slug: "high-protein-macros", label: "High Protein Macros Guide" });
    // Representative micro pages
    links.push({
      slug: "180-pound-male-cutting-high-protein-macros",
      label: "180 lb Male Cutting (High Protein)",
    });
    links.push({
      slug: "150-pound-female-cutting-high-protein-macros",
      label: "150 lb Female Cutting (High Protein)",
    });
  }

  return links.filter((l) => validSlugs.has(l.slug));
}

// ---- Main export ----

export interface PageContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
  targets: MacroTargets;
  tdee: number;
  explanation: string;
}

export function buildPageContent(config: SEOPageConfig): PageContent {
  const profile = configToProfile(config);
  const { targets, tdee, explanation } = calculateMacros(profile);

  const faqs =
    config.tier === "micro"
      ? buildMicroFAQs(config, targets, tdee)
      : buildClusterFAQs(config, targets, tdee);

  return {
    title: buildTitle(config),
    description: buildDescription(config, targets, tdee),
    h1: buildH1(config),
    intro: buildIntro(config, targets, tdee),
    faqs,
    relatedLinks: buildRelatedLinks(config),
    targets,
    tdee,
    explanation,
  };
}
