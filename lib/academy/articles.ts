import type { AcademyArticle } from "./types";

/** Representative programmatic page for body recomposition (micro URL). */
export const RECOMP_MACRO_SLUG = "180-pound-male-recomp-standard-macros";

/**
 * Single registry for Macro Academy. Add rows here; published entries
 * appear on /guides, category pages, and sitemap.
 */
export const ACADEMY_ARTICLES: AcademyArticle[] = [
  // ----- Original evergreen guides (kept; mesh updated for new pillars) -----
  {
    slug: "fat-loss-macros",
    title: "How to Calculate Macros for Fat Loss",
    categoryId: "fat-loss",
    tags: ["cutting", "deficit"],
    excerpt:
      "A practical framework for fat-loss macros: calorie deficit sizing, protein targets, carb/fat tradeoffs, and adjustment timing.",
    metaTitle: "How to Calculate Macros for Fat Loss | Physiq",
    metaDescription:
      "A practical framework for fat-loss macros: calorie deficit sizing, protein targets, carb/fat tradeoffs, and adjustment timing.",
    publishedAt: "2024-06-01",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: false,
    status: "published",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "protein-sparing-modified-fasting",
      "how-to-calculate-macros",
      "protein-per-pound",
    ],
    relatedMacroSlugs: ["cutting-macros", "high-protein-macros", "keto-macros"],
    body: `## Start with a sustainable deficit

Start with maintenance calories (TDEE), then apply a 10–20% deficit. Most people do best around **15%** because it is aggressive enough to progress but still sustainable for training and adherence.

## Protein first

Keep protein high (commonly around **0.8–1.1g per lb** bodyweight), then allocate remaining calories between carbs and fat based on preference and training quality.

## Adjust on trends, not single days

Track weekly trends, not daily fluctuations. If scale trend stalls for 2–3 weeks, adjust by ~100–150 calories and reassess before making another change.`,
  },
  {
    slug: "protein-per-pound",
    title: "Protein Intake per Pound Explained",
    categoryId: "basics",
    tags: ["protein"],
    excerpt:
      "How much protein per pound should you eat for fat loss, maintenance, and muscle gain? Practical intake ranges with implementation guidance.",
    metaTitle: "Protein Intake per Pound Explained | Physiq",
    metaDescription:
      "How much protein per pound should you eat for fat loss, maintenance, and muscle gain? Practical intake ranges with implementation guidance.",
    publishedAt: "2024-06-01",
    updatedAt: "2026-04-03",
    featured: false,
    status: "published",
    relatedGuideSlugs: [
      "what-are-macros",
      "how-to-calculate-macros",
      "high-protein-diet-macros",
    ],
    relatedMacroSlugs: [
      "protein-intake-for-180-pound-male",
      "high-protein-macros",
      "high-protein-macro-calculator",
    ],
    body: `Protein recommendations are often easiest to apply on a **per-pound** basis. A common practical range for active adults is roughly **0.8–1.1g/lb**, with higher intake often helpful during calorie deficits.

## Spread it out

Distribution matters: spreading protein across **3–5 meals** improves consistency and can support recovery and appetite control better than one large serving.

## Make it repeatable

The best target is one you can hit daily. Use the [Macro Calculator](/#calculator) to set grams, then build simple repeatable meals around that anchor.`,
  },
  {
    slug: "keto-macros-explained",
    title: "Keto Macros Explained",
    categoryId: "diet-strategies",
    tags: ["keto", "low-carb"],
    excerpt:
      "Understand keto macro setup: carb ceilings, protein adequacy, fat allocation, and when to adjust based on adherence and results.",
    metaTitle: "Keto Macros Explained | Physiq",
    metaDescription:
      "Understand keto macro setup: carb ceilings, protein adequacy, fat allocation, and when to adjust based on adherence and results.",
    publishedAt: "2024-06-01",
    updatedAt: "2026-04-03",
    featured: false,
    status: "published",
    relatedGuideSlugs: [
      "low-carb-diet-macros",
      "macro-calculator-vs-calorie-calculator",
      "carnivore-macros-guide",
    ],
    relatedMacroSlugs: ["keto-macros", "keto-macro-calculator", "carnivore-macros"],
    body: `Keto macros typically cap carbs to very low levels while increasing fat intake. Protein remains adequate, not extreme, to support lean mass without crowding out fat calories.

## Give it time

Most people need consistency for several weeks before evaluating whether keto improves adherence and energy for their routine. Electrolytes, hydration, and food quality matter as much as macro percentages.

## If progress stalls

If progress stalls, adjust **total calories** first before changing the carb ceiling. Keep changes small and review trend data over 2–3 weeks.`,
  },
  {
    slug: "carnivore-macros-guide",
    title: "Carnivore Macros Guide",
    categoryId: "diet-strategies",
    tags: ["carnivore"],
    excerpt:
      "Carnivore macro framework: protein/fat balance, calorie control, adherence considerations, and practical adjustment checkpoints.",
    metaTitle: "Carnivore Macros Guide | Physiq",
    metaDescription:
      "Carnivore macro framework: protein/fat balance, calorie control, adherence considerations, and practical adjustment checkpoints.",
    publishedAt: "2024-06-01",
    updatedAt: "2026-04-03",
    status: "published",
    relatedGuideSlugs: [
      "high-protein-diet-macros",
      "keto-macros-explained",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: ["carnivore-macros", "carnivore-macro-calculator", "keto-macros"],
    body: `Carnivore macros remove carbohydrate-heavy plant sources and focus intake on **animal protein and fat**. This can simplify decision-making for some users.

## Calories and adherence still rule

Macro success still depends on calories, protein sufficiency, and long-term adherence. Use objective metrics (weight trend, training output, appetite) to evaluate effectiveness.

## Troubleshooting

If progress is inconsistent, check total calories and food consistency before making major strategy changes.`,
  },
  {
    slug: "best-macro-split-for-muscle-gain",
    title: "Best Macro Split for Muscle Gain",
    categoryId: "muscle-gain",
    tags: ["bulking", "training"],
    excerpt:
      "A practical muscle-gain macro split framework: surplus sizing, protein targets, carb emphasis for training, and adjustment cadence.",
    metaTitle: "Best Macro Split for Muscle Gain | Physiq",
    metaDescription:
      "A practical muscle-gain macro split framework: surplus sizing, protein targets, carb emphasis for training, and adjustment cadence.",
    publishedAt: "2024-06-01",
    updatedAt: "2026-04-03",
    status: "published",
    relatedGuideSlugs: [
      "macros-for-muscle-gain",
      "high-protein-diet-macros",
      "best-macros-for-men",
    ],
    relatedMacroSlugs: ["bulking-macros", "bulking-macro-calculator", "high-protein-macros"],
    body: `Lean bulking typically works best with a **controlled calorie surplus** (often around 5–12%), high protein consistency, and enough carbohydrates to support training volume.

## Avoid oversized surpluses

Bigger surpluses do not necessarily accelerate muscle gain proportionally—they usually increase fat gain. Start conservative, then adjust with measured data.

## Review every few weeks

Review bodyweight trend and gym performance every **2–3 weeks** and adjust calories in small steps rather than large jumps.`,
  },

  // ----- Pillar articles (batch 2026) -----
  {
    slug: "how-to-calculate-macros",
    title: "How to Calculate Macros",
    categoryId: "basics",
    tags: ["basics", "calculator"],
    excerpt:
      "Learn how to calculate macros step by step: calories first, then protein, fats, and carbs—plus when to use a macro calculator.",
    metaTitle: "How to Calculate Macros | Macro Academy | Physiq",
    metaDescription:
      "Step-by-step: estimate calories, set protein, allocate fats and carbs. Use a macro calculator for personalized daily targets.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: true,
    status: "published",
    relatedGuideSlugs: [
      "why-macros-matter",
      "what-are-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "protein-sparing-modified-fasting",
      "macro-calculator-vs-calorie-calculator",
    ],
    relatedMacroSlugs: ["cutting-macros", "bulking-macros", "high-protein-macros", "keto-macros"],
    heroIntro:
      "If you want to lose fat, build muscle, or maintain your weight, learning how to calculate macros is one of the most effective ways to control your nutrition.",
    body: `If you want to lose fat, build muscle, or maintain your weight, learning how to calculate macros is one of the most effective ways to control your nutrition. Macros, short for macronutrients, are protein, carbohydrates, and fats. The right macro balance helps control calories, improve body composition, support training, and maintain energy levels.

Many people try to diet by just cutting calories, but calculating macros gives you much more control over how your body looks, performs, and recovers.

## Step 1: Determine Your Calories

Before calculating macros, you need to estimate how many calories you should eat per day. This depends on:

- Body weight
- Height
- Age
- Gender
- Activity level
- Goal (fat loss, muscle gain, maintenance)

Calories determine whether you lose weight, gain weight, or maintain your weight. Macros determine what that weight is made of — fat or muscle.

## Step 2: Set Your Protein

Protein is the most important macro for body composition. It helps:

- Build muscle
- Maintain muscle while dieting
- Improve recovery
- Keep you full

Typical protein recommendations:

- Fat loss: 0.8–1.0g per lb body weight
- Muscle gain: 0.8–1.0g per lb
- Maintenance: 0.7–0.9g per lb

## Step 3: Set Your Fats

Fat is important for hormones, brain function, vitamin absorption, and overall health. Most macro plans recommend fat intake around 20–30% of total calories.

## Step 4: Fill Remaining Calories With Carbs

Carbohydrates fuel workouts, training performance, recovery, and daily energy. Once protein and fats are set, the remaining calories go toward carbs.

## Use a Macro Calculator

Doing this manually can be confusing. A macro calculator automatically calculates your macros based on your body size, activity level, and goal.

👉 Use the **[Macro Calculator](/#calculator)** to calculate your personalized daily macros.`,
  },
  {
    slug: "what-are-macros",
    title: "What Are Macros?",
    categoryId: "basics",
    tags: ["basics", "macros-101"],
    excerpt:
      "Macros (macronutrients) are protein, carbs, and fats—what they do, calories per gram, and why macro targets beat calories alone.",
    metaTitle: "What Are Macros? | Macro Academy | Physiq",
    metaDescription:
      "Protein, carbohydrates, and fats explained: roles, calories per gram, and why tracking macros improves body composition.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: true,
    status: "published",
    relatedGuideSlugs: [
      "why-macros-matter",
      "how-to-calculate-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "high-protein-diet-macros",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      RECOMP_MACRO_SLUG,
      "high-protein-macros",
    ],
    heroIntro:
      "Macros, short for macronutrients, are the three main nutrients your body needs in large amounts.",
    body: `Macros, short for macronutrients, are the three main nutrients your body needs in large amounts:

- Protein
- Carbohydrates
- Fats

Tracking macros means tracking how many grams of protein, carbs, and fats you eat each day.

## Protein

Protein is used for:

- Muscle growth
- Muscle repair
- Recovery
- Immune function
- Hair, skin, and nails

Protein contains 4 calories per gram and is the most important macro for fat loss and muscle gain.

## Carbohydrates

Carbohydrates are your body's primary energy source. Carbs fuel:

- Workouts
- Running
- Lifting
- Sports
- Brain function
- Daily movement

Carbs also contain 4 calories per gram.

## Fats

Fats are important for:

- Hormone production
- Brain health
- Joint health
- Vitamin absorption
- Long-term energy

Fat contains 9 calories per gram.

## Calories vs Macros

Calories determine your weight change.
Macros determine your body composition and performance.

That is why many people use a **macro calculator instead of just counting calories**.

👉 Use the [Macro Calculator](/#calculator) to determine your daily macros.`,
  },
  {
    slug: "why-macros-matter",
    title: "Why Macros Matter",
    categoryId: "basics",
    tags: ["basics", "macros-101"],
    excerpt:
      "Why tracking protein, carbs, and fat—not just calories—controls body composition, energy, and long-term results for fat loss, muscle gain, and performance.",
    metaTitle: "Why Macros Matter | Macro Academy | Physiq",
    metaDescription:
      "Macros vs calories, benefits of tracking, goal-based targets, and how to start—plus links to guides and the free macro calculator.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: false,
    status: "published",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "what-are-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "macros-for-body-recomposition",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      "maintenance-macros",
      "high-protein-macros",
    ],
    heroIntro:
      "If you are trying to lose fat, build muscle, improve performance, or simply eat healthier, understanding why macros matter can completely change how you approach nutrition.",
    body: `Many people focus only on calories, but tracking macros gives you much more control over your body composition, energy, performance, and long-term results.

Macros are not just for bodybuilders. They are one of the most practical and effective ways to manage nutrition for real life.

For definitions and gram targets, start with [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros).

## What Are Macros?

Macros, short for macronutrients, are the three nutrients your body needs in large amounts:

- **Protein**
- **Carbohydrates**
- **Fats**

Each macro plays a different role in your body:

- **Protein** builds and maintains muscle and helps with recovery.
- **Carbohydrates** provide energy for workouts, movement, and brain function.
- **Fats** support hormones, brain health, and long-term energy.

When you track macros, you are tracking how much protein, carbs, and fat you eat each day, not just calories.

## Calories Control Weight, Macros Control Body Composition

This is one of the most important concepts in nutrition.

- **Calories** determine whether you gain or lose weight.
- **Macros** determine whether that weight is fat or muscle.

Two people can eat the same number of calories and have completely different results depending on their macros. For example:

- High protein vs low protein
- High carb vs low carb
- High fat vs low fat

Macros give you control over how your body looks and performs, not just what the scale says.

For a deeper comparison, see [Macro Calculator vs Calorie Calculator](/guides/macro-calculator-vs-calorie-calculator).

## Benefits of Tracking Macros

Tracking macros has several major benefits compared to just dieting or counting calories.

### 1. Better Fat Loss

High protein intake helps preserve muscle while losing fat, which leads to better body composition and a higher metabolism. Goal-specific setup: [Macros for Fat Loss](/guides/macros-for-fat-loss) and [Cutting Macros](/macros/cutting-macros).

### 2. Better Muscle Growth

If you want to build muscle, you need enough protein and enough carbohydrates to support training and recovery. See [Macros for Muscle Gain](/guides/macros-for-muscle-gain) and [Bulking Macros](/macros/bulking-macros).

### 3. More Energy

Carbohydrates fuel workouts and daily activity. Proper macro balance helps prevent low energy and burnout.

### 4. Flexible Dieting

Tracking macros allows you to eat a variety of foods instead of following a strict meal plan. You can fit foods you enjoy into your macros.

### 5. Consistency

Macros give you clear daily targets, which makes nutrition easier to manage long term.

## Macros Help You Match Nutrition to Your Goal

Your macro targets should change depending on your goal. At a high level:

- **Fat loss:** Calorie **deficit**, **high** protein, **moderate** carbs, **moderate** fat — [Macros for Fat Loss](/guides/macros-for-fat-loss)
- **Muscle gain:** Calorie **surplus**, **high** protein, **high** carbs, **moderate** fat — [Macros for Muscle Gain](/guides/macros-for-muscle-gain)
- **Maintenance:** Calories at **maintenance**, **moderate** protein, **moderate** carbs, **moderate** fat — [Maintenance Macros](/macros/maintenance-macros)
- **Body recomp:** Calories near **maintenance**, **high** protein, **moderate** carbs, **moderate** fat — [Macros for Body Recomposition](/guides/macros-for-body-recomposition)

This is why many people use a macro calculator to determine the correct macro targets for their specific goal, body size, and activity level.

## Tracking Macros vs Dieting

**Traditional dieting** usually means:

- Cutting calories
- Avoiding certain foods
- Following strict meal plans
- Losing weight quickly but gaining it back

**Tracking macros** is different:

- You focus on hitting protein, carbs, and fat targets
- You can still eat foods you enjoy
- You can adjust macros for your goal
- It is more sustainable long term

Macros turn nutrition into a system instead of a temporary diet.

## Who Should Track Macros?

Tracking macros can be useful for:

- People trying to lose fat
- People trying to build muscle
- Athletes
- People who lift weights
- People who want to improve body composition
- People who want more control over their nutrition
- People who want flexible dieting instead of strict meal plans

You do not need to track macros forever, but learning how macros work can help you understand nutrition for life.

## The Easiest Way to Start Tracking Macros

The easiest way to start is to calculate your macro targets based on:

- Weight
- Height
- Age
- Activity level
- Goal
- Eating style

👉 Use the **[Macro Calculator](/#calculator)** to calculate your personalized daily macros.

Once you know your macro targets, you can start tracking protein, carbs, and fat each day and adjust based on your progress.

## Final Thoughts — Why Macros Matter

Macros matter because they give you control over your nutrition, your body composition, and your results. Instead of guessing what to eat, macros give you a clear structure that can be adjusted for fat loss, muscle gain, maintenance, or performance.

Tracking macros is not about eating perfectly. It is about being consistent, understanding your nutrition, and making adjustments over time.

If you understand macros, you understand how nutrition works.

**Calculate your macros:** Use the [Physiq Macro Calculator](/#calculator) for personalized daily targets based on your body stats, goal, activity level, and eating style.`,
  },
  {
    slug: "macros-for-fat-loss",
    title: "Macros for Fat Loss",
    categoryId: "fat-loss",
    tags: ["cutting", "deficit"],
    excerpt:
      "Fat loss comes from a calorie deficit; macros determine whether you lose mostly fat or muscle. Protein, carbs, and fats for cutting.",
    metaTitle: "Macros for Fat Loss | Macro Academy | Physiq",
    metaDescription:
      "Fat loss macro guidelines: deficit, high protein, sustainable carbs and fats—plus how to stay consistent.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: true,
    status: "published",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "what-are-macros",
      "high-protein-diet-macros",
      "protein-sparing-modified-fasting",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "high-protein-macros",
      "keto-macros",
      "cutting-macro-calculator",
    ],
    heroIntro:
      "If your goal is fat loss, the most important factor is a calorie deficit. However, macros still matter because they determine whether you lose fat, muscle, or both.",
    body: `If your goal is fat loss, the most important factor is a calorie deficit. However, macros still matter because they determine whether you lose fat, muscle, or both.

## Fat Loss Macro Guidelines

Typical fat loss macro setup:

- Protein: High
- Carbs: Moderate
- Fat: Moderate to Low
- Calories: Deficit

High protein is critical during fat loss because it helps preserve muscle while losing weight.

## Why Protein Matters for Fat Loss

High protein intake:

- Preserves muscle
- Reduces hunger
- Improves metabolism
- Improves body composition

Most fat loss macro plans recommend 0.8–1.0g protein per lb body weight.

## Consistency Is More Important Than Perfection

The best macro plan for fat loss is one that:

- Keeps you in a calorie deficit
- Provides enough protein
- Supports workouts
- Is easy to maintain

👉 Use the **[Macro Calculator](/#calculator)** to determine your fat loss macros.`,
  },
  {
    slug: "macros-for-muscle-gain",
    title: "Macros for Muscle Gain",
    categoryId: "muscle-gain",
    tags: ["bulking", "muscle"],
    excerpt:
      "Muscle gain macros: slight calorie surplus, high protein, carbs for training, and practical surplus sizing.",
    metaTitle: "Macros for Muscle Gain | Macro Academy | Physiq",
    metaDescription:
      "How to set macros for muscle gain: surplus, protein targets, carbs for performance, and adjustment tips.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "what-are-macros",
      "macros-for-body-recomposition",
      "high-protein-diet-macros",
    ],
    relatedMacroSlugs: [
      "bulking-macros",
      "bulking-macro-calculator",
      "high-protein-macros",
      "macros-for-men",
    ],
    heroIntro:
      "To build muscle, your body needs enough calories, protein, carbs, and fats to support training and recovery.",
    body: `To build muscle, your body needs enough calories, protein, carbs, and fats to support training and recovery.

## Muscle Gain Macro Guidelines

Typical muscle gain macro setup:

- Calories: Slight surplus
- Protein: High
- Carbs: High
- Fat: Moderate

## Calories for Muscle Gain

You need a calorie surplus to build muscle. Usually 200–300 calories above maintenance is enough.

## Protein for Muscle Growth

Protein provides the building blocks for muscle. Most people should aim for 0.8–1.0g protein per lb body weight.

## Carbs for Training

Carbs are very important for muscle gain because they fuel training performance and recovery.

👉 Use the **[Macro Calculator](/#calculator)** to calculate your muscle gain macros.`,
  },
  {
    slug: "macros-for-body-recomposition",
    title: "Macros for Body Recomposition",
    categoryId: "body-recomposition",
    tags: ["recomp", "protein"],
    excerpt:
      "Body recomposition: calories near maintenance, high protein, and who benefits most from losing fat and building muscle together.",
    metaTitle: "Macros for Body Recomposition | Macro Academy | Physiq",
    metaDescription:
      "Recomposition macro strategy: maintenance calories, protein-first setup, and realistic expectations.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "high-protein-diet-macros",
    ],
    relatedMacroSlugs: [
      RECOMP_MACRO_SLUG,
      "high-protein-macros",
      "maintenance-macros",
      "macros-for-women",
    ],
    heroIntro:
      "Body recomposition means losing fat and building muscle at the same time. This works best for beginners, people returning to training, and people with higher body fat.",
    body: `Body recomposition means losing fat and building muscle at the same time. This works best for beginners, people returning to training, and people with higher body fat.

## Recomposition Macro Strategy

Typical recomposition macros:

- Calories: Around maintenance
- Protein: High
- Carbs: Moderate
- Fat: Moderate

Protein is the most important macro for body recomposition.

👉 Use the **[Macro Calculator](/#calculator)** to determine your recomposition macros.`,
  },
  {
    slug: "high-protein-diet-macros",
    title: "High Protein Diet Macros",
    categoryId: "diet-strategies",
    tags: ["protein", "diet"],
    excerpt:
      "Why high-protein diets work for fat loss and muscle gain, typical protein ranges per lb, and how to set macros.",
    metaTitle: "High Protein Diet Macros | Macro Academy | Physiq",
    metaDescription:
      "Benefits of high protein macros, practical intake ranges, and how to calculate high-protein targets.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "what-are-macros",
      "protein-sparing-modified-fasting",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: [
      "high-protein-macros",
      "cutting-macros",
      "bulking-macros",
      RECOMP_MACRO_SLUG,
    ],
    heroIntro:
      "A high protein diet is commonly used for fat loss, muscle building, and body recomposition.",
    body: `A high protein diet is commonly used for fat loss, muscle building, and body recomposition.

## Benefits of High Protein Diet

- Preserves muscle during fat loss
- Keeps you full
- Improves recovery
- Helps build muscle
- Improves metabolism

Typical recommendation:
0.8–1.0g protein per lb body weight.

👉 Use the **[Macro Calculator](/#calculator)** to calculate high protein macros.`,
  },
  {
    slug: "low-carb-diet-macros",
    title: "Low Carb Diet Macros",
    categoryId: "diet-strategies",
    tags: ["low-carb", "keto"],
    excerpt:
      "Low carb macro setups: who they suit, fat and protein emphasis, and training considerations.",
    metaTitle: "Low Carb Diet Macros | Macro Academy | Physiq",
    metaDescription:
      "How to think about low carb macros for fat loss and appetite control—plus when keto-style setups make sense.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "high-protein-diet-macros",
      "what-are-macros",
      "macros-for-body-recomposition",
    ],
    relatedMacroSlugs: ["keto-macros", "keto-macro-calculator", "cutting-macros", "maintenance-macros"],
    heroIntro:
      "Low carb diets reduce carbohydrate intake and increase fat and protein intake. Low carb diets are often used for fat loss and appetite control.",
    body: `Low carb diets reduce carbohydrate intake and increase fat and protein intake. Low carb diets are often used for fat loss and appetite control.

Low carb diets may work well for people who prefer fatty foods or have low activity levels, but they may not be ideal for athletes or high-volume training.

👉 Use the **[Macro Calculator](/#calculator)** to calculate low carb macros.`,
  },
  {
    slug: "macro-calculator-vs-calorie-calculator",
    title: "Macro Calculator vs Calorie Calculator",
    categoryId: "comparisons",
    tags: ["calculator", "comparison"],
    excerpt:
      "Calorie calculators give you a daily energy target. Macro calculators add protein, carbs, and fat—better for composition and performance.",
    metaTitle: "Macro Calculator vs Calorie Calculator | Macro Academy | Physiq",
    metaDescription:
      "Understand the difference between calorie-only targets and full macro targets—and when each makes sense.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: true,
    status: "published",
    relatedGuideSlugs: [
      "what-are-macros",
      "how-to-calculate-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      RECOMP_MACRO_SLUG,
      "maintenance-macros",
    ],
    heroIntro:
      "A calorie calculator tells you how many calories to eat per day. A macro calculator tells you calories plus protein, carbs, and fat targets.",
    body: `A calorie calculator tells you how many calories to eat per day. A macro calculator tells you calories plus protein, carbs, and fat targets.

Macros give you more control over body composition and performance than calories alone.

👉 Use the **[Macro Calculator](/#calculator)** to determine your macros.`,
  },
  {
    slug: "best-macros-for-women",
    title: "Best Macros for Women",
    categoryId: "women",
    tags: ["women"],
    excerpt:
      "How to think about macros for women: protein, fat percentage, carbs from remaining calories, and personalization.",
    metaTitle: "Best Macros for Women | Macro Academy | Physiq",
    metaDescription:
      "General macro guidelines for women: protein per lb, fat as a percent of calories, and carbs from the remainder.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "what-are-macros",
      "how-to-calculate-macros",
    ],
    relatedMacroSlugs: [
      "macros-for-women",
      "bulking-macros",
      "maintenance-macros",
      "high-protein-macros",
    ],
    heroIntro:
      "The best macros for women depend on body weight, activity level, and goals.",
    body: `The best macros for women depend on body weight, activity level, and goals.

General guidelines:

- Protein: 0.8–1.0g per lb body weight
- Fat: 20–30% of calories
- Carbs: Remaining calories

👉 Use the **[Macro Calculator](/#calculator)** for women to determine personalized macros.`,
  },
  {
    slug: "best-macros-for-men",
    title: "Best Macros for Men",
    categoryId: "men",
    tags: ["men"],
    excerpt:
      "Macro guidelines for men: higher calorie needs for many, protein per lb, and balancing fats and carbs.",
    metaTitle: "Best Macros for Men | Macro Academy | Physiq",
    metaDescription:
      "How to set macros for men: protein targets, fat percentage, carbs from remaining calories, and training context.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    status: "published",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "what-are-macros",
      "how-to-calculate-macros",
    ],
    relatedMacroSlugs: [
      "macros-for-men",
      "bulking-macros",
      "bulking-macro-calculator",
      "maintenance-macros",
    ],
    heroIntro:
      "Macros for men depend on body size, activity level, and goals. Men typically require more calories and carbs due to higher muscle mass and activity.",
    body: `Macros for men depend on body size, activity level, and goals. Men typically require more calories and carbs due to higher muscle mass and activity.

General guidelines:

- Protein: 0.8–1.0g per lb body weight
- Fat: 20–30% of calories
- Carbs: Remaining calories

👉 Use the **[Macro Calculator](/#calculator)** for men to determine your macros.`,
  },
  {
    slug: "protein-sparing-modified-fasting",
    title: "Protein Sparing Modified Fasting (PSMF)",
    categoryId: "fat-loss",
    tags: ["psmf", "fat-loss", "high-protein", "deficit", "very-low-calorie"],
    excerpt:
      "PSMF is an aggressive short-term approach: very low calories with high protein and minimal carbs and fat to maximize fat loss while limiting muscle loss. Not for long-term use.",
    metaTitle: "PSMF (Protein Sparing Modified Fast) | Macro Academy | Physiq",
    metaDescription:
      "What PSMF is, how it works, benefits and risks, who should avoid it, and how it compares to sustainable macro-based fat loss—plus trusted sources.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-03",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Protein Sparing Modified Fasting (PSMF) is an aggressive, short-term strategy for rapid fat loss while prioritizing protein to help preserve lean mass. It is not a long-term lifestyle and often belongs under professional supervision.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "high-protein-diet-macros",
      "how-to-calculate-macros",
      "what-are-macros",
      "fat-loss-macros",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "high-protein-macros",
      "keto-macros",
      "maintenance-macros",
      "cutting-macro-calculator",
      "high-protein-macro-calculator",
    ],
    body: `Protein Sparing Modified Fasting (PSMF) is an aggressive, short-term dieting strategy designed to maximize fat loss while preserving lean muscle mass. It involves consuming very low calories while prioritizing high protein intake and minimizing carbohydrates and fats.

PSMF is often used for rapid fat loss in specific situations, but it is not intended to be a long-term diet. Because of its restrictive nature, it should be approached carefully and, in many clinical contexts, under professional guidance.

## What Is PSMF?

PSMF is a structured low-calorie diet that focuses on:

- Very high protein intake
- Extremely low carbohydrates
- Very low fat intake
- Minimal total calories

The goal is to create a large calorie deficit while providing enough protein to help **spare** muscle mass.

### Typical PSMF structure

- **Protein:** High (lean sources only)
- **Carbs:** Very low
- **Fat:** Very low
- **Calories:** Very low

This pattern encourages the body to rely more heavily on stored body fat for energy while protein supports lean tissue.

## How PSMF Works

PSMF combines two key mechanisms:

### 1. Large calorie deficit

PSMF significantly reduces calorie intake, increasing reliance on stored fat for energy.

### 2. Muscle preservation through protein

Higher protein intake can help:

- Preserve lean muscle mass
- Reduce muscle breakdown
- Support metabolic rate compared with very low protein crash diets

This protein emphasis is a major difference from unstructured crash dieting.

## Best Use Cases for PSMF

PSMF is not for everyone. It is typically discussed in contexts such as:

1. **Rapid fat loss phases** — short windows where faster loss is a priority.
2. **Higher body fat levels** — more stored energy to draw from; individual assessment still matters.
3. **Plateau breaking** — occasionally used strategically (not casually).
4. **Short-term cutting** — e.g. bodybuilding prep (brief), weight-class sports, or time-bound events.

## Benefits of PSMF

1. **Rapid fat loss** — large deficits can move scale and fat mass quickly.
2. **Muscle retention (vs. naive crash diets)** — protein-first framing is designed to protect lean mass more than protein-poor very low calorie approaches.
3. **Insulin sensitivity** — very low carbohydrate intake may improve glycemic control in some people (individual response varies).
4. **Structure** — clear rules can simplify decisions during a short phase.

## Risks and Considerations

PSMF is aggressive and comes with real downsides:

1. **Nutrient deficiencies** — limited food variety raises risk for vitamin and mineral gaps; supervised protocols often use targeted supplementation.
2. **Low energy and fatigue** — training performance, focus, and daily energy can suffer.
3. **Hormonal stress** — prolonged or repeated use increases concern; length and context matter.
4. **Muscle loss if executed poorly** — inadequate protein, excessive deficit without structure, or dropping training can still yield lean mass loss.
5. **Not sustainable** — PSMF is a short-term tool, not a permanent eating pattern.

## Who Should NOT Use PSMF

PSMF is generally a poor fit or contraindicated without medical oversight for:

- Very lean individuals
- Beginners with no structured nutrition experience
- Anyone with medical conditions unless a qualified clinician approves and monitors the plan
- Pregnancy or breastfeeding
- Anyone with a history of disordered eating

## How Long Should You Do PSMF?

Typical discussions involve **short cycles** (often on the order of **1–6 weeks**, highly individual). Longer use increases risk and should only occur with careful monitoring.

## PSMF vs traditional fat loss diets

**PSMF-style approach**

- Calories: very low
- Sustainability: low (by design)
- Speed: often fast

**Standard fat loss (macro-based deficit)**

- Calories: moderate deficit
- Sustainability: higher for most people
- Speed: moderate

PSMF can be faster; sustainable macro dieting usually wins for long-term adherence and lifestyle fit. For a sustainable framework, read [Macros for Fat Loss](/guides/macros-for-fat-loss) and [How to Calculate Macros for Fat Loss](/guides/fat-loss-macros).

## PSMF vs macro-based dieting

Tracking macros tends to offer:

- More flexibility
- Better long-term adherence for many people
- Sustainable fat loss pacing
- Easier balanced micronutrient intake across foods

PSMF is a **specialized short-term tool**; macro tracking is usually the better **long-term system**. Start with [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros).

👉 Use the **[Macro Calculator](/#calculator)** to build a sustainable macro plan for your goal, activity level, and preferences. The calculator also includes **PSMF (protein-sparing)** as an optional eating style for educational targets—treat it as short-term and read the in-app medical notice.

## When to choose macros over PSMF

Most people do best with:

- A moderate calorie deficit
- High protein
- Balanced carbs and fats for training and adherence
- Consistent tracking and gradual adjustments

Consider PSMF only when rapid fat loss is truly required, the timeline is short, risks are understood, and ideally when a qualified professional is involved.

### Related guides

- [Macros for Fat Loss](/guides/macros-for-fat-loss)
- [High Protein Diet Macros](/guides/high-protein-diet-macros)
- [How to Calculate Macros](/guides/how-to-calculate-macros)
- [What Are Macros?](/guides/what-are-macros)

### Popular macro pages

- [Cutting macros](/macros/cutting-macros)
- [High protein macros](/macros/high-protein-macros)
- [Keto macros](/macros/keto-macros) (low-carb hub)
- [Maintenance macros](/macros/maintenance-macros) (recomposition context)
- [Cutting macro calculator](/macros/cutting-macro-calculator)
- [High protein macro calculator](/macros/high-protein-macro-calculator)

## Sources and references

- [Nutrients — review of protein-sparing therapies and George Blackburn’s contributions to nutrition science (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5809291/)
- [Cleveland Clinic — Protein-Sparing Modified Fast Diet](https://health.clevelandclinic.org/protein-sparing-modified-fast-diet/)
- [NIH NIDDK — Understanding adult overweight and obesity](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity)
- [NIH NHLBI — Overweight and obesity](https://www.nhlbi.nih.gov/health/overweight-and-obesity)
- [Helms ER, et al. — Evidence-based recommendations for natural bodybuilding contest preparation (PubMed)](https://pubmed.ncbi.nlm.nih.gov/24864135/)
- [Higher protein intake during caloric restriction and lean mass (PubMed)](https://pubmed.ncbi.nlm.nih.gov/35538903/)

> **Important:** This article is for **educational purposes only** and does **not** constitute medical advice. Always consult a qualified healthcare professional before starting an aggressive or restrictive diet.`,
  },
];
