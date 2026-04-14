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
      "How to calculate macros: TDEE first, then protein, fats, and carbs—verify with Physiq’s calculator and Cutting/Bulking macro calculator hubs.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
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

## Calculator workflow: from targets to hub pages (2026)

After you generate numbers on the **[Macro Calculator](/#calculator)**, compare them with Physiq’s **pillar hubs** so your daily grams match the same logic as the SEO pages: **[Cutting macro calculator](/macros/cutting-macro-calculator)** for deficits and **[Bulking macro calculator](/macros/bulking-macro-calculator)** for surpluses.

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
      "What are macros? Protein, carbs, and fats—calories per gram, what each does for training, and why gram targets beat calories alone for composition.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
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

## Labels, apps, and “macros” in 2026

Packaged foods in the U.S. still list **protein, carbohydrate, and fat** by gram on the Nutrition Facts panel—those grams are what you log. For goal context, compare your targets with **[Maintenance macros](/macros/maintenance-macros)** (stable weight) and **[High protein macros](/macros/high-protein-macros)** (protein-forward setups).

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
      "Why macros matter: calories change weight; protein, carbs, and fats shape muscle, energy, and adherence—see Cutting and Bulking macro hubs on Physiq.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
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

## FAQ: Do I need different macro pages for each goal?

Yes—**goal changes the calorie budget**, even when protein stays high. Use **[Cutting macros](/macros/cutting-macros)** when you are dieting and **[Bulking macros](/macros/bulking-macros)** when you are building—each hub mirrors how Physiq structures programmatic targets.

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
      "Fat loss macros: deficit first, high protein, then carbs and fats for adherence—compare with Cutting macros and the cutting macro calculator on Physiq.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
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

## Cutting macro hubs: compare your calculator output

Cross-check your **[Macro Calculator](/#calculator)** results with **[Cutting macros](/macros/cutting-macros)** and the **[Cutting macro calculator](/macros/cutting-macro-calculator)** pillar page so your deficit and protein logic match Physiq’s cutting-specific templates.

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
      "Muscle gain macros: small surplus, high protein, carbs for training volume—compare outputs with Bulking macros and the bulking macro calculator hub on Physiq.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
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

## Bulking macro hubs: compare your calculator output

After you set a surplus on the **[Macro Calculator](/#calculator)**, compare against **[Bulking macros](/macros/bulking-macros)** and the **[Bulking macro calculator](/macros/bulking-macro-calculator)** page to ensure your protein and carbs align with Physiq’s muscle-gain templates.

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
      "Calorie calculators estimate a daily energy budget (TDEE). Macro calculators add protein, carbs, and fat grams so you can steer composition, training, and adherence—not just scale weight.",
    metaTitle: "Macro Calculator vs Calorie Calculator | Macro Academy | Physiq",
    metaDescription:
      "Macro vs calorie calculator: when TDEE-only targets work, when protein and carbs matter, and how Physiq’s calculator outputs calories plus macro grams.",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: true,
    status: "published",
    relatedGuideSlugs: [
      "what-are-macros",
      "how-to-calculate-macros",
      "why-macros-matter",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      "maintenance-macros",
      "cutting-macro-calculator",
      "bulking-macro-calculator",
      "high-protein-macro-calculator",
      "keto-macro-calculator",
    ],
    heroIntro:
      "Choosing between calorie-only targets and full macro targets is really a question about what you are optimizing: scale weight, or weight quality, training, and sustainability. Here is a clear comparison—plus when each approach is enough.",
    body: `If you only want the scale to move, a **calorie target** can be enough. If you care how that weight breaks down—**muscle vs fat**—or how you **feel in the gym**, **macro targets** (protein, carbohydrates, fat) usually pay off. This guide explains what each tool estimates, where they overlap, and how to choose without overcomplicating your life.

For definitions, read [What Are Macros?](/guides/what-are-macros). For the full sequence (calories → protein → fats → carbs), see [How to Calculate Macros](/guides/how-to-calculate-macros). For the “why bother” case, see [Why Macros Matter](/guides/why-macros-matter).

## What a calorie calculator actually estimates

A **calorie calculator** (or “TDEE calculator”) answers one main question: **about how much energy you burn per day**, so you can set an **intake budget**.

- It uses inputs such as **weight, height, age, sex**, and **activity level** to approximate **total daily energy expenditure (TDEE)**—the calories you burn across training, steps, digestion, and baseline physiology combined.
- It outputs a **daily calorie target** (or a range) for **maintenance**, or a **deficit/surplus** if you pick a goal.

**What it does not tell you:** how to split those calories into **protein, carbs, and fats**. Two people can eat the **same calories** with very different **protein** and **carb** intake—and get very different **training performance**, **hunger**, and **body-composition** results.

**What it does not guarantee:** that every calculator agrees. Different formulas and activity multipliers produce **different numbers**. Treat any output as a **starting hypothesis**, then adjust using **weekly weight trends** and **performance**, not one calculator’s ego.

## What a macro calculator adds

A **macro calculator** starts from the same idea—**estimate energy needs**—then allocates calories into **grams of protein, carbs, and fat**.

- **Protein** is set first (or emphasized) because it supports **lean mass**, **recovery**, and **satiety** for many people in fitness contexts.
- **Fats** are often set as a **percentage of calories** or a **minimum** for hormones and food enjoyment.
- **Carbohydrates** usually fill **remaining calories** after protein and fat—especially relevant if you **train hard** and care about **glycogen** and performance.

**Same calorie budget, different composition:** A **maintenance** calorie line can be built from **high-carb / moderate-fat** or **lower-carb / higher-fat** patterns—both can match calories, but **training feel** and **adherence** may differ.

### Quick mental model

- **Calorie calculator** → “**How much energy should I budget?**”
- **Macro calculator** → “**How should I spend that budget across protein, carbs, and fats?**”

## Side-by-side comparison

| | **Calorie calculator** | **Macro calculator** |
|---|------------------------|------------------------|
| **Primary output** | Daily **calories** (maintenance or goal-adjusted) | Daily **calories** **plus** **protein / carb / fat grams** |
| **Typical inputs** | Body size, age, sex, activity, sometimes goal | Same, **plus eating style or macro strategy** in many tools |
| **Best for** | Simple weight change focus, minimal tracking tolerance, quick baselines | Training, muscle retention, performance, structured eating styles |
| **Limitations** | No protein/carb/fat guidance; composition outcomes under-specified | Slightly more setup; still only as good as inputs and consistency |
| **Tracking burden** | Lower (calories only) | Higher (three macros + calories) |

## When calories alone can be enough

Calorie-only targets are often reasonable when:

- Your main outcome is **weight on the scale**, not **muscle retention** or **performance nuance**.
- You are running a **short experiment** (a few weeks) and want **one number** to follow.
- You have **low tolerance** for detailed logging—**calorie awareness** alone still beats guessing.
- Your clinician or coach has prescribed **energy-only** guidance for a specific context (always follow **their** instructions first).

## When macros matter more

Macro targets tend to matter more when:

- You are in a **deficit** and want to **preserve muscle**—usually via **higher protein** (see [Macros for Fat Loss](/guides/macros-for-fat-loss)).
- You are **building muscle** or running a **surplus**—**protein** and **carbs** often support **training volume** and recovery (see [Macros for Muscle Gain](/guides/macros-for-muscle-gain)).
- You follow a **style-specific** plan (**keto**, **high protein**, **low carb**) where **carb and fat** are not interchangeable even at the same calories.
- You care about **recomposition** or **performance** outcomes that **calories alone** do not describe.

## Common misconceptions

**“Macros magically override calories.”** They do not. Macros are **how you allocate** your calorie budget. Energy balance still drives broad weight trends for most people in most contexts.

**“All calorie calculators agree.”** They do not. Use **trends** (2–3 weeks), not a single app’s first guess.

**“Protein doesn’t change the calorie line.”** Protein still has **4 calories per gram**—it is part of the same budget. The win is **what protein does for adherence and lean mass**, not a free pass past physics.

**“If I track macros, I don’t need calories.”** Most people still benefit from knowing whether their macro choices **sum** to the **intake** they intended—especially when learning.

**“Carbs and fats are interchangeable for everyone.”** At the **same calories**, some people feel and perform better with different **carb/fat** splits—**preference and training** matter.

## How Physiq fits

The **[Physiq Macro Calculator](/#calculator)** is built to give you **both**: a **daily calorie target** and **macro grams** aligned with your **goal**, **activity**, and **eating style** where applicable.

When you want **goal-specific examples** on dedicated URLs, these **pillar hubs** mirror common intents—open them when they match what you are doing (they are not mandatory clicks):

- **[Cutting macro calculator](/macros/cutting-macro-calculator)** — deficit-oriented framing with Physiq defaults for cutting.
- **[Bulking macro calculator](/macros/bulking-macro-calculator)** — surplus-oriented framing for muscle-gain contexts.
- **[High protein macro calculator](/macros/high-protein-macro-calculator)** — protein-forward presets.
- **[Keto macro calculator](/macros/keto-macro-calculator)** — very-low-carb strategy framing.

For **cluster-level** context (not pillar pages), **[Cutting macros](/macros/cutting-macros)** and **[Bulking macros](/macros/bulking-macros)** are useful comparison anchors; **[Maintenance macros](/macros/maintenance-macros)** helps when your near-term target is **stability** rather than aggressive dieting.

## Practical workflow

1. **Estimate your calorie budget** (maintenance, deficit, or surplus) using a calculator you will actually use consistently—including the **[Macro Calculator](/#calculator)**.
2. **Set protein first** to a practical range for your goal and training (often roughly **0.7–1.1g per lb** body weight for many active adults—individual needs vary).
3. **Set dietary fat** to a sustainable minimum or percentage band that supports **satiety** and **food enjoyment**.
4. **Allocate carbohydrates** from the remaining calories—often higher when training volume is high, lower when you prefer fat-led meals or a carb-controlled strategy.
5. **Track 5–7 typical days**, then adjust based on **weekly averages** (scale trend, measurements if used, gym performance)—not single-day noise.
6. **Re-run inputs** when weight, activity, or goals change materially.

This workflow is the same “spine” described in [How to Calculate Macros](/guides/how-to-calculate-macros)—this article focuses on **why** you might choose macro tracking versus calorie-only tracking.

## FAQ

**Is TDEE the same as BMR?** **No.** **BMR** is closer to **resting** energy needs; **TDEE** includes **activity** and **training**. Most daily calorie targets for active people use a **TDEE-like** estimate, not BMR alone.

**Should beginners track macros?** Not required. Some beginners do best with **one habit** (protein or calories). If you want clearer structure from day one, macros can help—just avoid **perfectionism** on week one.

**Can I track only protein plus calories?** Often, yes—**protein plus total calories** is a common “middle path.” You are still making macro decisions implicitly for the remaining calories.

**Do I need different tools for keto vs high protein?** You need **different macro constraints**, not necessarily different apps. A good macro calculator lets you express **strategy** (Physiq also exposes **pillar pages** like **[Keto macro calculator](/macros/keto-macro-calculator)** for keto-style defaults).

**Will a macro calculator fix plateaus instantly?** No calculator replaces **accuracy**, **sleep**, **stress**, and **training**. Calculators set targets; **consistency and adjustment** drive outcomes.

**Is this medical advice?** No—this is **general fitness education**. If you have a medical condition or special dietary needs, work with a **qualified professional**.

👉 Start here: **[Macro Calculator](/#calculator)** for calorie + macro targets in one pass.
`,
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

  // ----- Content wave 2026-04 (SEO) -----
  {
    slug: "intermittent-fasting-macros",
    title: "Intermittent Fasting Macros: How to Set Protein, Carbs & Calories",
    categoryId: "diet-strategies",
    tags: ["intermittent-fasting", "meal-timing"],
    excerpt:
      "Intermittent fasting macros use the same calorie and protein logic as any schedule—here is how to set grams, time carbs around training, and avoid common IF mistakes.",
    metaTitle: "Intermittent Fasting Macros | Macro Academy | Physiq",
    metaDescription:
      "Intermittent fasting macros: set protein, calories, and carbs for 16:8 or OMAD—train smart around your window, avoid mistakes, and use the free calculator.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: true,
    status: "published",
    heroIntro:
      "Intermittent fasting changes meal timing, not the rules of calories and macros. Here is how to set protein, carbs, and fats inside your eating window.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "how-to-calculate-macros",
      "what-are-macros",
      "high-protein-diet-macros",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      "high-protein-macros",
      "maintenance-macros",
    ],
    body: `Intermittent fasting (IF) does not replace the need for a sensible calorie target and macro split. Whether you eat two meals or six, **calories drive weight change**, and **protein, carbs, and fats** shape how you feel, train, and recover. What changes with IF is *timing*: you compress eating into a window, so each meal may need to carry more of your daily protein and carbohydrate load.

If you are new to macro math, read [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros) first. Then use the [Macro Calculator](/#calculator) to anchor daily grams before you worry about whether those grams land at noon or 8 p.m.

## Set calories first, then macros

Pick your goal—fat loss, maintenance, or muscle gain—and set calories accordingly. Intermittent fasting macros are not a special “IF formula”; they are normal macro targets eaten inside a shorter schedule. For fat loss, that usually means a **moderate deficit** with **high protein**; for muscle gain, a **small surplus** with **high protein** and enough carbs to support training.

For goal-specific framing, see [Macros for Fat Loss](/guides/macros-for-fat-loss) and [Macros for Muscle Gain](/guides/macros-for-muscle-gain). The [Cutting macros](/macros/cutting-macros) and [Bulking macros](/macros/bulking-macros) hubs translate those ideas into concrete gram ranges you can compare with your calculator output.

## Protein: the non-negotiable

With fewer eating occasions, protein planning becomes more important, not less. Spread protein across your feeding window in **at least two doses** when possible (for example, a substantial meal pre-training and a large meal post-training). Aim in the same practical band many adults use on any schedule—often roughly **0.8–1.0g per lb** body weight daily for lifters—then adjust based on hunger, recovery, and trend data.

If you want a deeper dive on protein-first eating, read [High Protein Diet Macros](/guides/high-protein-diet-macros) and compare your targets with [High protein macros](/macros/high-protein-macros).

## Carbs and fats around training

Carbohydrate tolerance varies by person and protocol. Many people do well placing a **large share of daily carbs** around workouts—especially if you train fasted or late in the feeding window. Fats are flexible: allocate them to meals where they improve satiety and food enjoyment, while keeping pre-workout meals a bit easier to digest if heavy fat meals blunt your performance.

Low-carb IF approaches overlap with strategies in [Low Carb Diet Macros](/guides/low-carb-diet-macros). If you are keto-aligned, compare your plan with [Keto macros](/macros/keto-macros) for consistency.

## Practical steps

1. **Choose a window** you can repeat (for example, 16:8) and protect sleep and stress recovery—IF works best when life rhythm supports it.
2. **Pre-build two anchor meals** that hit most of your protein so you are not scrambling at night.
3. **Track trends weekly**: weight, waist, gym performance, and energy—not single-day scale noise.
4. **Adjust calories in small steps** (often ~100–150 kcal) when progress stalls for two to three weeks.

## Common mistakes

- **Assuming IF fixes calories:** You can still overeat in a short window, especially with calorie-dense oils, sweets, and snacks.
- **Under-shooting protein:** Fewer meals makes it easier to miss grams unless you plan lean sources deliberately.
- **Ignoring training fuel:** Hard sessions suffer if carbs are always back-loaded too far from training without a plan.
- **Chasing extreme fasts** before basics are solid: most people benefit more from consistent protein and steps than from OMAD complexity.

## Who this is and isn’t for

IF can be useful if you prefer fewer decisions, feel better with structured eating times, and can still hit protein. It may be a poor fit if you have a history of disordered eating, struggle with dizziness or binge-rebound when fasting, take medications that require food, or cannot meet protein on a tight schedule. When in doubt, work with a qualified clinician or dietitian—especially for medical conditions or pregnancy.

**Bottom line:** Intermittent fasting macros are normal macro targets with smarter meal timing. Lock calories and protein, place carbs and fats where they support training and adherence, then refine with the [Macro Calculator](/#calculator) and the guides linked above.`,
  },
  {
    slug: "reverse-diet-macros",
    title: "Reverse Diet Macros After a Cut",
    categoryId: "fat-loss",
    tags: ["reverse-diet", "maintenance", "recovery"],
    excerpt:
      "Reverse diet macros add calories in small steps after fat loss: protein-first targets, pacing carbs and fats, and how to land at maintenance or a lean bulk.",
    metaTitle: "Reverse Diet Macros After a Cut | Macro Academy | Physiq",
    metaDescription:
      "Reverse diet macros: raise calories after a cut with protein-first targets, pace carbs and fats weekly, and exit a deficit without rapid fat regain or panic.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Reverse dieting is a structured way to raise calories after a cut. These macro principles keep protein high while you increase carbs and fats in measured steps.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "macros-for-body-recomposition",
      "how-to-calculate-macros",
      "high-protein-diet-macros",
      "macro-calculator-vs-calorie-calculator",
    ],
    relatedMacroSlugs: [
      "maintenance-macros",
      "bulking-macros",
      "bulking-macro-calculator",
      "high-protein-macros",
    ],
    body: `A reverse diet is a structured way to **add calories back** after a fat-loss phase—usually by increasing intake in small steps while monitoring weight, waist, training performance, and subjective energy. Reverse diet macros are not magic; they are a conservative progression of **protein, carbohydrate, and fat** targets that keeps you from jumping from a deep deficit straight into uncontrolled eating.

If you are exiting an aggressive approach, compare your plan with sustainable principles in [Macros for Fat Loss](/guides/macros-for-fat-loss) and [How to Calculate Macros](/guides/how-to-calculate-macros). The [Macro Calculator](/#calculator) helps you translate maintenance estimates into daily grams as you raise calories.

## Why reverse dieting shows up in macro coaching

Long cuts can lower spontaneous movement, increase hunger signals, and make large refeeds feel tempting. A reverse diet tries to **smooth the transition** by raising calories gradually—often emphasizing carbs and/or fats depending on preference—while keeping **protein relatively high** to support lean mass and satiety.

This is different from immediately jumping to a full bulking surplus. For what a surplus looks like when you are ready to build, see [Macros for Muscle Gain](/guides/macros-for-muscle-gain) and [Best Macro Split for Muscle Gain](/guides/best-macro-split-for-muscle-gain).

## Step-by-step macro progression

1. **Establish maintenance estimate** using recent tracking data and trend weight—not a single-day scale reading.
2. **Set protein first**, commonly in the same bands used for maintenance or muscle gain (often roughly **0.8–1.0g per lb** for lifters), unless a clinician advises otherwise.
3. **Add calories in small weekly or biweekly steps** (for example, ~5–10% of current intake or ~50–150 kcal), mostly from **carbs and/or fats** depending on training demands and digestion.
4. **Hold each step** until weight and performance stabilize; avoid changing multiple variables at once.
5. **Decide the end state**: maintenance ([Maintenance macros](/macros/maintenance-macros)) or a lean surplus ([Bulking macros](/macros/bulking-macros)).

## How reverse diet macros differ from a bulk

A reverse diet prioritizes **controlled increases** after restriction. A bulk prioritizes **muscle gain** with a clearer surplus and progressive overload. If your goal is recomposition rather than maximal mass gain, [Macros for Body Recomposition](/guides/macros-for-body-recomposition) may be closer to your long-term target than an aggressive bulk.

## Common mistakes

- **Treating reverse dieting as mandatory:** Some people transition fine with a single, well-planned jump to maintenance.
- **Adding calories without tracking outcomes:** You need weight trend, measurements, and performance markers to know if the step size fits.
- **Slashing protein to fit more fun foods:** Protein is the anchor while calories rise.
- **Fear of normal weight fluctuation:** Adding carbs often increases scale weight from glycogen and water—interpret changes over weeks.

## Who this is and isn’t for

Reverse diet macros can help people who finish long cuts, feel metabolically “flat,” or want a structured path back to maintenance. They are less helpful if you bounce between extremes without consistency, or if you need a clear, immediate surplus for sport performance—where a simpler jump may be appropriate under guidance.

Use [High Protein Diet Macros](/guides/high-protein-diet-macros) to keep protein quality high while calories climb, and revisit [Macro Calculator vs Calorie Calculator](/guides/macro-calculator-vs-calorie-calculator) if you are deciding whether to track full macros or energy alone during the transition.

**Takeaway:** Reverse diet macros are a patient, measurable way to raise calories after dieting—protein stays high, increases are small, and your feedback loop (trends, training, adherence) decides the next step. Start with the [Macro Calculator](/#calculator), then align your end goal with either maintenance or a controlled bulk.

If you feel “stuck” between numbers, remember the point is not perfection—it is **directional accuracy**. A reverse is successful when energy rises, training feels better, and you can maintain the new intake without constant rebound eating. Keep protein consistent, bias carbs upward if performance is the priority, and use [Bulking macro calculator](/macros/bulking-macro-calculator) outputs as a sanity check when you transition into a true surplus.

Sleep, stress, and step count still matter: if your expenditure rises as calories return, maintenance is not a single frozen number—it is a moving estimate you refine every few weeks.`,
  },
  {
    slug: "vegetarian-macros",
    title: "Vegetarian Macros for Muscle & Fat Loss",
    categoryId: "diet-strategies",
    tags: ["vegetarian", "plant-based", "protein"],
    excerpt:
      "Vegetarian macros prioritize dense plant proteins, smart carb and fat allocation, and repeatable meals so you can build muscle or lose fat without guessing.",
    metaTitle: "Vegetarian Macros for Muscle & Fat Loss | Macro Academy | Physiq",
    metaDescription:
      "Vegetarian macros: hit protein on plants, balance carbs and fats, and build muscle or lose fat with practical plant-based macro targets, meal ideas, and tips.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Plant-based eating can hit serious protein targets when you plan anchors like legumes, soy, dairy or eggs, and high-protein grains—then align calories to your goal.",
    relatedGuideSlugs: [
      "high-protein-diet-macros",
      "how-to-calculate-macros",
      "macros-for-muscle-gain",
      "macros-for-fat-loss",
      "what-are-macros",
      "best-macros-for-women",
    ],
    relatedMacroSlugs: [
      "high-protein-macros",
      "bulking-macros",
      "180-pound-male-bulking-vegetarian-macros",
      "cutting-macros",
    ],
    body: `Vegetarian eating can absolutely support muscle gain, fat loss, and performance—the key is building **vegetarian macros** that hit protein without relying on luck. Plant proteins vary in amino acid profile and digestibility, so your macro plan should emphasize **repeatable protein anchors** (legumes, soy foods, dairy or eggs if you include them, high-protein grains) and enough total calories for your goal.

Start with fundamentals in [What Are Macros?](/guides/what-are-macros), then personalize numbers with the [Macro Calculator](/#calculator). Compare your targets with [High Protein Diet Macros](/guides/high-protein-diet-macros) and the [High protein macros](/macros/high-protein-macros) hub.

## Protein on plant-based diets

Many vegetarian lifters do well aiming toward the **upper end of common protein bands** (often near **0.8–1.0g per lb** daily for active people) because plant sources can be less protein-dense per calorie. Combine complementary sources across the day rather than obsessing about single meals, and distribute protein across **three to five** eating occasions if possible.

For muscle-building context, see [Macros for Muscle Gain](/guides/macros-for-muscle-gain). A representative plant-forward muscle page you can compare against is [180 pound male bulking vegetarian macros](/macros/180-pound-male-bulking-vegetarian-macros)—use it as a benchmark, then adjust to your stats in the calculator.

## Carbs and fats: flexibility with structure

Vegetarian diets are often **carb-forward** by default (grains, beans, fruit). That is not automatically a problem—carbs fuel training—but it means fat intake must be chosen deliberately so calories match your goal. If you need fewer calories for fat loss, emphasize **vegetables, lean dairy or egg whites (if included), tofu/tempeh, seitan**, and careful portions of oils and nuts.

If you prefer lower carb approaches, read [Low Carb Diet Macros](/guides/low-carb-diet-macros), but note very low carb vegetarian patterns can be harder to execute without careful planning.

## Actionable weekly setup

1. **Pick 3–4 protein staples** you enjoy and can batch cook (for example, lentils, Greek yogurt if vegetarian-not-vegan, tofu, tempeh).
2. **Pre-log one full day** in your tracker to confirm grams—not guesses.
3. **Align training volume** with carb intake; harder weeks justify more starches around workouts.
4. **Review weekly**: scale trend, gym logs, hunger, and digestion—then adjust calories in small steps.

## Common mistakes

- **Assuming “healthy” equals high protein:** Salads and smoothies can be low in protein unless you engineer them.
- **Relying only on nuts for protein:** Nuts add fat calories quickly relative to protein grams.
- **Ignoring B12, iron, and calcium context** (especially for fully vegan plans): macros are only one layer of nutrition adequacy.
- **Copying omnivore meal plans** without swapping in denser plant protein sources.

## Who this is and isn’t for

Vegetarian macro tracking suits people who want plant-forward eating and are willing to plan protein deliberately. It may be frustrating if you refuse to use concentrated sources like soy or legumes, or if medical needs require specialized diets—get individualized guidance in those cases.

Cross-check sex-specific considerations with [Best Macros for Women](/guides/best-macros-for-women) or [Best Macros for Men](/guides/best-macros-for-men) if helpful, and compare bulking targets with [Bulking macros](/macros/bulking-macros) when your primary aim is muscle gain.

**Bottom line:** Vegetarian macros work when protein is intentional, calories match your goal, and carbs and fats are allocated for training and adherence. Use the [Macro Calculator](/#calculator), lean on [How to Calculate Macros](/guides/how-to-calculate-macros) for the sequence of steps, and iterate using trends—not single days.

For fat-loss phases, you can still use the same protein anchor while pulling calories from carbs and fats strategically—see [Macros for Fat Loss](/guides/macros-for-fat-loss) and compare against [Cutting macros](/macros/cutting-macros). If you include dairy, whey or skyr can be an efficient protein lever; if you are fully plant-based, prioritize powders with transparent amino acid profiles when needed, and keep whole-food legumes and soy as your daily foundation.

Batch cooking grains and beans, pre-portioning tofu, and keeping frozen vegetables on hand reduces decision fatigue—the same adherence advantage macro tracking provides for omnivores. When in doubt, add one new protein source per week instead of overhauling everything at once, and re-check grams after the change lands.`,
  },

  // ----- Prompt F backlog (gap analysis) -----
  {
    slug: "mediterranean-diet-macros",
    title: "Mediterranean Diet Macros: Carbs, Fats & Protein",
    categoryId: "diet-strategies",
    tags: ["mediterranean", "fiber", "heart-health"],
    excerpt:
      "Set Mediterranean-style macros: adequate protein, olive-oil-forward fats, and fiber-rich carbs that match fat loss, maintenance, or lean bulking goals.",
    metaTitle: "Mediterranean Diet Macros | Macro Academy | Physiq",
    metaDescription:
      "Mediterranean diet macros: olive oil, fiber-rich carbs, lean protein—set targets with the free Macro Calculator and match Mediterranean-style macro pages.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Mediterranean eating maps cleanly onto macros: hit your calorie target, prioritize protein, then fill carbs and fats with foods you can repeat all week.",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "vegetarian-macros",
      "low-carb-diet-macros",
    ],
    relatedMacroSlugs: [
      "maintenance-macros",
      "cutting-macros",
      "high-protein-macros",
      "180-pound-male-cutting-mediterranean-macros",
      "meal-plan-for-2200-calories-mediterranean",
      "bulking-macros",
    ],
    body: `A **Mediterranean-style** macro pattern emphasizes whole foods, lean proteins, legumes, vegetables, fruit, and unsaturated fats—often with moderate alcohol optional for some adults. For macro tracking, that translates into the same structure as any other plan: **calories for your goal**, **protein high enough** for lean mass, then **carbs and fats** split in a way you can repeat.

This guide aligns with Mediterranean-labeled macro URLs in the app (for example, cutting or maintenance with a Mediterranean eating style). If you are new to macro math, read [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros) first.

## How Mediterranean macros differ from generic “healthy eating”

Mediterranean eating is not one rigid carb or fat percentage. In practice, many people land near:

- **Protein:** Similar to other evidence-based plans—often roughly **0.7–1.0g per lb** body weight for active adults, adjusted for preference and goal.
- **Fat:** Often **moderate to slightly higher**, with emphasis on **olive oil**, nuts, seeds, avocado, and fatty fish rather than only saturated sources.
- **Carbs:** Often **moderate to high** from **grains, beans, fruit, and starchy vegetables**, with fiber as a priority.
- **Fiber and micronutrients:** Naturally higher when vegetables, legumes, and whole grains anchor meals.

Calories still determine weight change. For fat loss, pair this pattern with a **deficit**; for muscle gain, a **small surplus**. See [Macros for Fat Loss](/guides/macros-for-fat-loss) and [Macros for Muscle Gain](/guides/macros-for-muscle-gain) for goal-specific guardrails.

## Step 1: Set calories and protein

Use the [Macro Calculator](/#calculator), choose your **goal** and **Mediterranean** (or closest) eating style if available, and note **daily calories** and **protein grams**. Protein is the anchor; Mediterranean meals build easily around fish, poultry, Greek yogurt, legumes, and smaller portions of cheese.

## Step 2: Allocate fats toward Mediterranean sources

After protein, set **fat** so meals feel satisfying and support hormones—often **25–35%** of calories for many people, but individuals vary. Prioritize **olive oil** for cooking, **nuts and seeds** for snacks, and **fatty fish** a few times per week if you eat fish.

## Step 3: Use carbs for fuel and fiber

Fill remaining calories with **carbs** from oats, potatoes, rice, whole-grain bread, beans, lentils, and fruit. Higher fiber can improve satiety on a cut; on a bulk, denser carbs help hit energy targets without only relying on oils.

## Step 4: Build repeatable meals

Batch-cook **grains + beans**, prep **roasted vegetables**, and keep **canned fish** or **pre-washed greens** on hand. Simplicity beats novelty for adherence.

## How to use the calculator

Open the **[Macro Calculator](/#calculator)**, enter your stats and goal, select **Mediterranean** as the eating style when offered, and use the output as your **daily calorie and macro budget**. Log one full day against those numbers, then adjust after **2–3 weeks** of trend data—not single weigh-ins.

## Common mistakes

- **Confusing “Mediterranean” with unlimited olive oil:** Oil is calorie-dense; measure tablespoons when fat loss is the goal.
- **Under-eating protein:** Plant-forward plates need **legumes, dairy, eggs, fish, or poultry** intentionally placed.
- **Ignoring total calories:** Whole foods can still exceed your target if portions creep up.
- **Copying generic meal plans** that do not match your protein or calorie needs.

## Who this is for

Mediterranean-style macros work well if you want **flexible carbs**, **heart-healthy fats**, and **high-fiber** meals—whether you are cutting, maintaining, or lean bulking. It may be a weaker fit if you need **very low carb** for medical reasons (see [Low Carb Diet Macros](/guides/low-carb-diet-macros)) or **very high protein** prescriptions from a clinician without adjusting other macros.

Compare your targets with the [Maintenance macros](/macros/maintenance-macros) and [High protein macros](/macros/high-protein-macros) hubs, and explore a representative Mediterranean cutting URL such as [180 pound male cutting Mediterranean macros](/macros/180-pound-male-cutting-mediterranean-macros) to see how programmatic pages mirror your selections.

**Bottom line:** Mediterranean diet macros are **goal-appropriate calories**, **adequate protein**, and **fat/carb quality** you can sustain—use the calculator, then repeat simple meals that match your numbers.

If you eat mostly plants, layer this pattern with [Vegetarian Macros for Muscle & Fat Loss](/guides/vegetarian-macros) to keep protein density high. For dining out, pre-pick **protein + vegetable + starch** templates and estimate oil as **1–2 tablespoons** when dishes look sautéed in olive oil.`,
  },
  {
    slug: "macro-meal-planning",
    title: "Macro Meal Planning: Turn Daily Targets Into Real Meals",
    categoryId: "basics",
    tags: ["meal-prep", "planning", "adherence"],
    excerpt:
      "Build grocery lists and repeatable meals from your macro targets: protein anchors, carb timing, measured fats, and batch prep that survives busy weeks.",
    metaTitle: "Macro Meal Planning | Macro Academy | Physiq",
    metaDescription:
      "Macro meal planning: grocery lists, batch prep, and repeatable meals that hit protein, carbs, and fats—start with the Macro Calculator for daily targets.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Macro targets only work in real life when meals are planned. This guide turns daily grams into shopping, prep, and repeatable plates.",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "high-protein-diet-macros",
      "macros-for-fat-loss",
      "macros-for-muscle-gain",
      "macro-calculator-vs-calorie-calculator",
    ],
    relatedMacroSlugs: [
      "cutting-macro-calculator",
      "high-protein-macro-calculator",
      "meal-plan-for-2000-calories-standard",
      "maintenance-macros",
      "bulking-macros",
      "cutting-macros",
      "bulking-macro-calculator",
    ],
    body: `**Macro meal planning** is the bridge between **daily gram targets** and **real food**. Once you know your calories and macros from the calculator, planning answers: *what do I actually buy, cook, and eat this week?* The goal is not perfect variety—it is **repeatable hits** on protein with carbs and fats that fit your life.

If you have not set targets yet, start with [How to Calculate Macros](/guides/how-to-calculate-macros) and [Macro Calculator vs Calorie Calculator](/guides/macro-calculator-vs-calorie-calculator).

## The planning loop

1. **Set numbers** in the **[Macro Calculator](/#calculator)** for your goal, body, activity, and eating style.
2. **Pick 2–3 protein anchors** (chicken, Greek yogurt, tofu, canned fish, whey) you enjoy and can buy every week.
3. **Assign carbs** to meals around training or appetite (rice, potatoes, oats, fruit, bread).
4. **Assign fats** where they improve taste and satiety (oils, nuts, cheese, avocado) without blowing the budget.
5. **Log one full day** before you overhaul recipes—close enough beats hypothetical perfection.

## Templates that scale

- **Breakfast:** Protein + carb + fruit (e.g., oats, whey, berries).
- **Lunch:** Protein + grain + vegetables + light dressing measured.
- **Dinner:** Protein + starchy carb + large vegetable portion + controlled oil.
- **Snacks:** Only if needed for protein or training fuel—pre-log them so they do not erase the deficit.

Align bulk/cut intent with [Macros for Muscle Gain](/guides/macros-for-muscle-gain) or [Macros for Fat Loss](/guides/macros-for-fat-loss).

## Batch prep without boredom

Cook **proteins** and **carbs** in bulk; keep **sauces** and **vegetables** fresh for variety. Freeze single portions so a busy day does not become a “macro mystery day.” If you use meal-plan-style URLs in the app, cross-check a sample page like [meal plan for 2000 calories standard](/macros/meal-plan-for-2000-calories-standard) against your own targets—your calories may differ.

## Grocery list logic

Build your cart in this order: **lean proteins**, **carb staples** you tolerate well, **frozen vegetables** for insurance, **fruit** for easy carbs, and **portion-controlled fats** (nuts in bags with serving sizes, not bulk bins on day one). If you follow a specific style—keto, high protein, or plant-forward—still anchor the list on **protein grams per dollar** and **protein per minute of cooking**.

## One-hour Sunday reset

Many people get **80% of the week** from one prep block: bake or grill proteins, cook a pot of rice or beans, wash and chop salad bases, and pre-portion snacks. Label containers with **grams of protein** if that reduces evening decision fatigue. When travel disrupts prep, fall back to **grocery rotisserie chicken + microwave potatoes + bagged salad**—boring and effective beats clever and inconsistent.

## Eating the same lunch four days a week

Variety is optional; **targets are not**. Repeating lunch accelerates logging accuracy and teaches you what real portions look like. Rotate dinners for sanity if you want, but keep **one predictable anchor meal** while you are learning.

## How to use the calculator

Use the **[Macro Calculator](/#calculator)** to generate **daily calories and macro grams**. Write those numbers at the top of your plan, then build **three to five eating occasions** that sum to the totals. If the app offers meal-plan outputs for your calorie level, treat them as **examples**, not obligations—your protein and calories stay the source of truth.

## Common mistakes

- **Planning meals before setting protein:** Protein is the hardest to hit; build the day around it.
- **Ignoring condiments and oils:** They are often the reason “healthy meals” exceed fat calories.
- **Changing everything weekly:** Consistency for **10–14 days** beats a new menu every Monday.
- **Skipping the grocery list:** If it is not in the house, it will not hit your macros.

## Who this is for

Macro meal planning helps anyone who **tracks macros** or wants to **eat to targets** without decision fatigue—especially people with **shift work**, **families**, or **meal prep** on weekends. It is less helpful if you refuse to repeat foods or cannot store batch-cooked meals safely.

See [High Protein Diet Macros](/guides/high-protein-diet-macros) for protein-heavy ideas, and use [High protein macro calculator](/macros/high-protein-macro-calculator) or [Cutting macro calculator](/macros/cutting-macro-calculator) hubs when you want calculator-first entry points.

**Bottom line:** Plan **protein anchors**, **carb timing**, and **measured fats**, then log against the calculator’s numbers until the week feels automatic.`,
  },
  {
    slug: "maintenance-macros-guide",
    title: "Maintenance Macros: How to Eat at Your TDEE",
    categoryId: "basics",
    tags: ["maintenance", "tdee", "calculator"],
    excerpt:
      "Maintenance macros keep weight stable: calories near TDEE, protein first, carbs and fats matched to training—plus how to read trends and adjust without panic.",
    metaTitle: "Maintenance Macros: Eat at Your TDEE | Macro Academy | Physiq",
    metaDescription:
      "Maintenance macros: eat near TDEE with protein-first targets; balance carbs and fats for training; adjust weekly—not daily. Start with the Macro Calculator.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Eating at maintenance means your average calories match expenditure—while protein stays high enough to support training and lean mass.",
    relatedGuideSlugs: [
      "how-to-calculate-macros",
      "what-are-macros",
      "macros-for-body-recomposition",
      "reverse-diet-macros",
      "macro-meal-planning",
      "intermittent-fasting-macros",
    ],
    relatedMacroSlugs: [
      "maintenance-macros",
      "bulking-macros",
      "cutting-macros",
      "180-pound-male-recomp-standard-macros",
      "macros-for-men",
      "macros-for-women",
      "180-pound-male-maintenance-standard-macros",
    ],
    body: `**Maintenance macros** are the protein, carbohydrate, and fat targets you use when you want to **stay near your current weight** while supporting training, recovery, and daily energy. At maintenance, **calories in ≈ calories out** over time—but “maintenance” is not a single frozen number. It moves with activity, sleep, stress, and training phase.

This guide supports the **maintenance** intent behind [Maintenance macros](/macros/maintenance-macros) and maintenance-labeled programmatic pages. If you are comparing maintenance to a slight deficit or surplus, read [Why Macros Matter](/guides/why-macros-matter) first.

## What “eating at TDEE” really means

**TDEE** (total daily energy expenditure) is an **estimate** of how many calories you burn. Maintenance eating sets your **average intake** near that estimate so **weight trend** stays flat over **2–4 weeks**. Day-to-day weight will still fluctuate from sodium, carbs, digestion, and menstrual cycle—interpret **weekly averages**, not single points.

For many lifters, maintenance still means **high protein** (often roughly **0.7–1.0g per lb** body weight) with **moderate carbs and fats** split by preference and training volume.

## Maintenance vs body recomposition

**Maintenance calories** can still produce **body recomposition** (slow fat loss + muscle gain) for some beginners and detrained individuals. If that is your primary aim, see [Macros for Body Recomposition](/guides/macros-for-body-recomposition) and compare with a representative recomp URL such as [180 pound male recomp standard macros](/macros/180-pound-male-recomp-standard-macros). If the scale is flat but measurements improve, you may be recomping at maintenance-level intake.

## Step 1: Establish a maintenance calorie estimate

Use recent tracking data if you have it: **average intake** during a period when weight was **stable**. If not, use the [Macro Calculator](/#calculator) with **goal = maintain** (or equivalent) and treat the result as a **starting hypothesis**.

If you recently finished a cut, your **appetite** may still be loud while your **expenditure** is recovering—[Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) explains how to raise calories without panic. If you finished a bulk, maintenance may feel **less food than yesterday** but **more than your old diet**—that is normal.

## Step 2: Set protein first

Protein supports lean mass, satiety, and recovery even when you are not in a deficit. Lock **protein grams** before debating small carb/fat swaps. If you are unsure about grams per pound, [Protein Intake per Pound Explained](/guides/protein-per-pound) gives practical ranges you can align with maintenance calories.

## Step 3: Allocate carbs and fats for performance

**Carbs** fuel hard training; **fats** support hormones and meal satisfaction. There is no single correct split—choose the split you can **repeat** and that keeps **gym performance** strong. Endurance-heavy weeks often tolerate **more carbs**; sedentary weeks may need **tighter fats** if calories creep up through oils and snacks.

## Step 4: Monitor trends and adjust

Every **2–3 weeks**, review:

- **Weight trend** (weekly average)
- **Waist** or how clothes fit
- **Training loads** (reps, RPE, progression)
- **Energy and sleep**

If weight **creeps up** steadily, you are likely **above** maintenance—trim **100–150 kcal** or add steps. If weight **drops** unintentionally, add calories **slowly**—see [Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) if you are coming from a long deficit.

## Signals you are above vs below true maintenance

**Above maintenance** often shows up as a **rising weight trend**, **tightening waistbands**, or **easy PRs** paired with unexpected scale gains (not always bad—context matters). **Below maintenance** often pairs with **flattening gym performance**, **higher fatigue**, or **unintended weight loss** when you are not trying to cut.

Neither signal is a single-day verdict—use **2–3 weeks** of structured logging when possible.

## NEAT, steps, and “invisible” calorie burn

Maintenance is not only gym calories. **Steps, standing work, fidgeting, and weekend activity** change TDEE without changing your program card. If you add **5–8k steps** daily for a month, your maintenance intake may rise compared with a desk-only month. When life gets busier, **defend protein** first; adjust carbs/fats second.

## Maintenance and intermittent fasting

Some people maintain weight with **fewer meals** and a shorter eating window—see [Intermittent Fasting Macros](/guides/intermittent-fasting-macros). Maintenance still requires **average calories** to match expenditure; IF mainly changes **timing**, not physics.

## How maintenance differs from a cut or bulk (quick reference)

| Phase | Calorie target | Protein | Typical carb/fat feel |
|-------|----------------|---------|-------------------------|
| Fat loss | Below maintenance | High | Often moderate carbs; fats controlled for calories |
| Maintenance | Near TDEE | High | Flexible split; performance-led |
| Muscle gain | Slight surplus | High | Often higher carbs for training volume |

Use [Macros for Fat Loss](/guides/macros-for-fat-loss) when you intentionally diet, and [Macros for Muscle Gain](/guides/macros-for-muscle-gain) when you intentionally build. Maintenance sits between: **not chasing scale movement**, but still **fueling sessions** and **recovering**.

## Travel, holidays, and social weeks

Maintenance is not “eat intuitively forever without tracking.” It is **knowing your baseline** so you can **flex** when life gets noisy. Practical approach:

- **Keep protein non-negotiable** even when restaurants dominate.
- **Estimate oils** honestly—most hidden calories are fat.
- **Return to normal logging** for **3–5 days** after a trip before you change calories; water weight is not fat.

If you gain a few pounds after a holiday week, that is often **glycogen, sodium, and food volume**—give it **7–10 days** of normal eating before adjusting targets.

## Protein quality still matters

Maintenance is not permission to under-eat **whole protein sources**. Spread intake across the day if it helps satiety and training. If you rely heavily on powders, keep **whole-food protein** in at least **two meals** for micronutrient diversity—especially if your calorie budget is lower than during a bulk.

## When maintenance feels psychologically harder than dieting

Cuts have a clear story: follow the plan, watch the trend. Maintenance can feel **ambiguous** because progress is **not** a falling scale. Anchor maintenance to **performance metrics** (strength, reps, aerobic capacity), **gym consistency**, and **subjective energy**. If those drift downward for weeks while weight is flat, you may still be under-fueling relative to training demands—even at “maintenance” on paper.

## Deloads, injuries, and step changes in activity

When training volume **drops**—deload week, minor injury, or a new desk job—your maintenance calories may **fall** even if gym sessions look “hard” mentally. Conversely, a new **manual job** or **daily walking commute** can raise maintenance without you noticing. Re-run the [Macro Calculator](/#calculator) when **activity level** changes category, then confirm with **two weeks** of weight trend.

## Stacking guides for real-world maintenance

Most people do not maintain on theory alone—they maintain with **habits**. Pair this article with [Macro Meal Planning](/guides/macro-meal-planning) for repeatable meals, [High Protein Diet Macros](/guides/high-protein-diet-macros) for protein-forward grocery logic, and [Intermittent Fasting Macros](/guides/intermittent-fasting-macros) only if meal timing genuinely improves adherence.

## How to use the calculator

Open the **[Macro Calculator](/#calculator)**, enter accurate **weight, height, age, activity**, and select **maintenance** as your goal. Use the **calorie and macro output** as your **default budget**, then track **at least 5–7 days** of normal life. Adjust in **small steps** based on trends, not one salty meal.

If you want a philosophical comparison of tools, [Macro Calculator vs Calorie Calculator](/guides/macro-calculator-vs-calorie-calculator) explains why gram targets help even at maintenance.

## Common mistakes

- **Treating the first calculator result as permanent truth:** TDEE estimates are starting points; real maintenance is **observed** from data.
- **Cutting protein on maintenance:** You still need enough protein to support **training** and **lean mass**.
- **Panicking over two-pound swings:** Water and glycogen move the scale; look at **rolling averages**.
- **Ignoring NEAT:** Steps and daily movement change maintenance needs without you noticing.
- **Chasing the scale while ignoring performance:** Sometimes the best maintenance signal is **stable lifts** and **stable energy** with a **flat trend**.

## Who this is for

Maintenance macros suit **physique athletes between phases**, **people who want stable weight**, and **lifters deloading** or taking a diet break. They are less appropriate if you have a **medical need** for structured weight loss or gain—work with your clinician.

Deepen the basics with [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros). Compare sex-specific defaults in [Best Macros for Women](/guides/best-macros-for-women) and [Best Macros for Men](/guides/best-macros-for-men), and browse [Bulking macros](/macros/bulking-macros) or [Cutting macros](/macros/cutting-macros) when you transition goals.

**Bottom line:** Maintenance is **calorie balance** with **protein-first macros** and **patient trend tracking**—use the calculator, log honestly, and nudge intake when the data says so.`,
  },

  // ----- Prompt F backlog guides 4–6 -----
  {
    slug: "vegan-macros",
    title: "Vegan Macros: Protein, Calories & Plant-Based Targets",
    categoryId: "diet-strategies",
    tags: ["vegan", "plant-based", "protein"],
    excerpt:
      "Vegan macros prioritize dense plant proteins, B12 and micronutrient planning, and calorie goals for fat loss, maintenance, or muscle gain without animal products.",
    metaTitle: "Vegan Macros | Macro Academy | Physiq",
    metaDescription:
      "Vegan macros: hit protein on plants, balance carbs and fats, and cover B12—use the Macro Calculator for fat loss, maintenance, or muscle gain targets.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Fully plant-based eating can hit serious protein targets when you plan legumes, soy, seitan, and powders—then align calories with your goal.",
    relatedGuideSlugs: [
      "vegetarian-macros",
      "high-protein-diet-macros",
      "how-to-calculate-macros",
      "macros-for-muscle-gain",
      "macros-for-fat-loss",
      "what-are-macros",
    ],
    relatedMacroSlugs: [
      "bulking-macros",
      "high-protein-macros",
      "180-pound-male-bulking-vegetarian-macros",
      "cutting-macros",
      "high-protein-macro-calculator",
      "macros-for-women",
    ],
    body: `Vegan macros follow the same hierarchy as any macro plan: **calories for your goal**, **protein high enough** to support lean mass, then **carbs and fats** split for adherence and training. The difference is food selection: you exclude animal products, so **protein per calorie** and **micronutrient planning** matter more.

If you are new to macro math, read [What Are Macros?](/guides/what-are-macros) and [How to Calculate Macros](/guides/how-to-calculate-macros). For plant-forward eating that may still include dairy or eggs, compare with [Vegetarian Macros for Muscle & Fat Loss](/guides/vegetarian-macros)—vegan eating is stricter.

## Protein on a fully plant-based diet

Vegan protein comes from **legumes, soy foods (tofu, tempeh), seitan, high-protein grains, and powders** when helpful. Many active adults aim toward the **upper end of common protein bands** (often roughly **0.8–1.1g per lb** body weight daily) because plant sources can pack **more carbs and fiber per gram of protein** than animal foods.

Spread protein across **3–5 meals** when possible. Combine sources across the day (beans + grains, soy + vegetables) rather than obsessing about single-meal amino acid perfection—consistency beats theory.

## Calories: cut, maintain, or bulk

- **Fat loss:** Moderate deficit with **high protein** and mostly **minimally processed** foods—oils and vegan junk can erase a deficit quickly.
- **Muscle gain:** Controlled surplus with **repeatable protein anchors** and enough **starches** to fuel training.
- **Maintenance:** Calories near **TDEE** with stable protein—see [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide).

Align goals with [Macros for Fat Loss](/guides/macros-for-fat-loss) and [Macros for Muscle Gain](/guides/macros-for-muscle-gain).

## Carbs and fats: flexibility with guardrails

Vegan diets are often **carb-forward** (grains, beans, fruit). That can be excellent for training—just watch **added oils** and **nut portions**, which add fat calories fast. If you need fewer calories, emphasize **vegetables, fruit, starches**, and **lean soy** before defaulting to “more nuts.”

## Supplements that are not optional for many vegans

**Vitamin B12** is the classic example—use a reliable supplement or fortified foods. **Iron, calcium, omega-3 (EPA/DHA from algae), and vitamin D** may need attention depending on labs, sun exposure, and food choices. Supplements do not replace **adequate calories and protein**, but they protect long-term health while you dial in macros.

If you are unsure where to start, pick **one fortified staple** (plant milk with B12, for example) and **one daily supplement routine** you can keep for **30 days** before optimizing further.

## How to use the calculator

Open the **[Macro Calculator](/#calculator)**, enter your stats, goal, and activity. If **vegan** or **vegetarian** is available as an eating style, select it so carb/fat defaults match plant-heavy patterns. Treat the output as your **daily budget**, then build **repeatable meals** that hit **protein first**. Log **5–7 days** before changing anything major.

Compare against [High protein macros](/macros/high-protein-macros) and a plant-forward bulking example like [180 pound male bulking vegetarian macros](/macros/180-pound-male-bulking-vegetarian-macros)—your numbers will differ, but the structure is similar.

## Common mistakes

- **Assuming “plant-based” means high protein:** Smoothies and salads can be low in protein unless you engineer them.
- **Relying only on nuts:** Nuts are fat-heavy relative to protein grams.
- **Ignoring B12:** Long-term vegan health and performance depend on it.
- **Chasing perfection on Day 1:** Add **one new protein staple per week** until your grocery list feels automatic.

## Who this is for

Vegan macros suit people committed to **animal-free eating** who still want **physique or performance** goals. This guide is a weaker fit if medical conditions require individualized diets—work with your clinician or dietitian.

## Quick grocery staples

Stock **canned beans**, **lentils**, **tempeh**, **extra-firm tofu**, **frozen edamame**, **pea protein or soy powder**, **oats**, **whole-grain bread**, and **frozen vegetables** so low-protein days are a choice—not an accident. Batch-cook **grains + beans** once or twice weekly; sauces and spices change flavor without changing your macro skeleton.

When eating out, default to **tofu/tempeh bowls**, **bean-heavy burritos** with known portions, or **ethnic cuisines** with legume-based mains—ask for **oil on the side** when fat calories are blowing your budget.

**Bottom line:** Vegan macros work when **protein is intentional**, **calories match your goal**, and **basics like B12** are covered—use the calculator, log honestly, and iterate.`,
  },
  {
    slug: "fat-loss-plateau-macros",
    title: "Fat Loss Plateau: When and How to Adjust Your Macros",
    categoryId: "fat-loss",
    tags: ["plateau", "cutting", "deficit"],
    excerpt:
      "Stalled fat loss: confirm a real plateau, fix logging, adjust calories conservatively, keep protein high, and know when diet breaks beat deeper cuts.",
    metaTitle: "Fat Loss Plateau Macros | Macro Academy | Physiq",
    metaDescription:
      "Fat loss plateau: audit logging, then adjust calories in small steps while keeping protein high—reset targets with the Macro Calculator and weekly trends.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Plateaus are usually energy balance, water, or measurement—not broken metabolisms. Use structured macro adjustments instead of random restriction.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "how-to-calculate-macros",
      "high-protein-diet-macros",
      "intermittent-fasting-macros",
      "reverse-diet-macros",
      "macro-meal-planning",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "cutting-macro-calculator",
      "high-protein-macros",
      "maintenance-macros",
      "keto-macros",
      "macros-for-men",
    ],
    body: `A **fat loss plateau** usually means your **average intake** matches your **current expenditure** more closely than you think—or **water, stress, and sleep** are masking fat loss on the scale. Macros help because they force **one change at a time** instead of random restriction.

Start with the framework in [Macros for Fat Loss](/guides/macros-for-fat-loss) and [How to Calculate Macros](/guides/how-to-calculate-macros).

## Step 1: Confirm you are actually stalled

You need **2–3 weeks** of **flat weight trend**, not three “bad days.” Also check **waist**, **progress photos**, and **gym performance**—recomposition can flatten scale weight while you still lose fat.

## Step 2: Audit logging accuracy

Before slashing calories, verify:

- **Oils and butter** (easy to underestimate)
- **Condiments and sauces**
- **Weekend intake** vs weekdays
- **Alcohol** (calories + next-day appetite)

If logging is sloppy, fix **measurement** before you change **targets**.

## Step 3: Adjust calories first (usually)

If adherence is solid and trends are flat, reduce **average calories** by roughly **100–150 kcal** or add **2–4k steps** daily—pick **one** lever, hold **2–3 weeks**, reassess.

## Step 4: Keep protein high

Protein preserves lean mass in a deficit and helps appetite. If you are debating where to cut calories from, **protect protein** and trim mostly from **fats and discretionary carbs** first—see [High Protein Diet Macros](/guides/high-protein-diet-macros).

## Step 5: Consider diet breaks or refeeds (advanced)

Long cuts can benefit from structured **higher-calorie weeks** for adherence—not because they “fix metabolism” magically, but because they improve **consistency** for some people. If you have been dieting aggressively, read [Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) before panic-cutting further.

## Training and NEAT: hidden levers

Sometimes a plateau is not “macro math”—it is **fewer steps**, **less NEAT**, or **less training volume** than you assume. If your job went remote or your ankle hurts, **expenditure** drops even when macros stay identical. **Adding steps** is often easier to sustain than **deeper cuts** for people already lean.

## Intermittent fasting and plateaus

If you eat in a **short window**, check whether **total calories** still match your deficit—see [Intermittent Fasting Macros](/guides/intermittent-fasting-macros). IF can help adherence; it does not override **energy balance**.

## When to avoid aggressive cuts

If **energy**, **sleep**, **libido**, or **mood** are crashing, you may already be **too deep** in a deficit for your context. [Protein Sparing Modified Fasting (PSMF)](/guides/protein-sparing-modified-fasting) covers aggressive approaches—most plateaus should be solved with **small adjustments**, not extremes.

## Body recomposition without a falling scale

If the scale is flat but measurements improve, you may be recomping—[Macros for Body Recomposition](/guides/macros-for-body-recomposition) explains the tradeoffs. Do not slash calories just to chase a number if **waist** and **performance** are trending the right way.

## Low-carb or keto and plateaus

Very low carb approaches can mask **water shifts** on the scale. Compare **trends** and **measurements**, not single days—see [Keto Macros Explained](/guides/keto-macros-explained) and [Low Carb Diet Macros](/guides/low-carb-diet-macros) if you are keto-aligned.

## How to use the calculator

Re-run the **[Macro Calculator](/#calculator)** with **current body weight** and **honest activity**. If you have lost weight, your **estimated maintenance** may be lower than at the start of the diet—update inputs before you compare old targets to new needs.

Use [Cutting macros](/macros/cutting-macros) and [Cutting macro calculator](/macros/cutting-macro-calculator) as hubs while you adjust.

## Common mistakes

- **Cutting calories every weekend** based on one weigh-in.
- **Slashing carbs to zero** while under-eating protein—training and adherence suffer.
- **Ignoring sleep and stress**—both affect hunger, steps, and water retention.
- **Copying someone else’s deficit** without matching **body size and activity**.

## Who this is for

This guide helps **people in a real plateau** who already track **reasonably well**. It is less helpful if you are **new to tracking**—start with basics and consistency first.

**Bottom line:** Break plateaus with **accurate data**, **small calorie changes**, and **patience**—the calculator resets your numbers; discipline closes the gap.

If you want a structured grocery approach while you adjust, pair this guide with [Macro Meal Planning](/guides/macro-meal-planning) so your **deficit stays repeatable** week to week.`,
  },
  {
    slug: "lean-bulk-macros",
    title: "Lean Bulk Macros: Surplus Size, Mini-Cuts, and Training Fuel",
    categoryId: "muscle-gain",
    tags: ["lean-bulk", "bulking", "surplus"],
    excerpt:
      "Lean bulk macros: size your surplus, keep protein high, fuel training with carbs, use mini-cuts when needed, and adjust using strength and waist trends—not scale panic.",
    metaTitle: "Lean Bulk Macros | Macro Academy | Physiq",
    metaDescription:
      "Lean bulk macros: a controlled surplus, high protein, carbs for training volume, and patient adjustments—use the Macro Calculator and track monthly trends.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Lean bulking is a small, controlled surplus with high protein and enough carbs to grow muscle without unnecessary fat gain.",
    relatedGuideSlugs: [
      "macros-for-muscle-gain",
      "best-macro-split-for-muscle-gain",
      "maintenance-macros-guide",
      "mediterranean-diet-macros",
      "macro-meal-planning",
      "how-to-calculate-macros",
    ],
    relatedMacroSlugs: [
      "bulking-macros",
      "bulking-macro-calculator",
      "high-protein-macros",
      "macros-for-men",
      "macros-for-women",
      "180-pound-male-recomp-standard-macros",
      "cutting-macros",
    ],
    body: `**Lean bulk macros** pair a **modest calorie surplus** with **high protein** and **enough carbohydrates** to support hard training. The goal is to gain **mostly muscle**, not unnecessary fat—knowing that **some** fat gain is normal when eating above maintenance.

Read [Macros for Muscle Gain](/guides/macros-for-muscle-gain) and [Best Macro Split for Muscle Gain](/guides/best-macro-split-for-muscle-gain) for foundational splits, then use this guide for **surplus sizing**, **mini-cuts**, and **adjustment rules**.

## How large should the surplus be?

Many natural lifters do well with roughly **5–12%** above estimated maintenance, or about **200–350 kcal** for many adults—individuals vary. Larger surpluses rarely produce proportionally faster muscle gain; they usually accelerate **fat gain**.

If you are relatively new to lifting, you may gain strength on **smaller surpluses** or even **maintenance** for a while—see [Macros for Body Recomposition](/guides/macros-for-body-recomposition).

## Protein: the anchor

A common practical range is roughly **0.8–1.0g per lb** body weight daily for muscle gain contexts. Protein supports **muscle protein synthesis**, recovery, and helps limit fat gain relative to very low-protein bulks.

Plant-forward bulkers should also read [Vegetarian Macros for Muscle & Fat Loss](/guides/vegetarian-macros) or [Vegan Macros](/guides/vegan-macros) if those match your ethics.

## Carbohydrates and training performance

Carbs fuel **glycogen**, training quality, and recovery. Low-carb bulking can work for some people, but many lifters feel better with **meaningful carb intake** around workouts. If performance drops after you raise calories, check whether **carbs** rose or only **fats**.

## Fats: enough for hormones, not unlimited

Dietary fat supports **hormones** and **palatability**. After protein is set, allocate fats to **preference and digestion**, then fill remaining calories with **carbs** if training volume is high.

## Mini-cuts and bulk length

Long bulks accumulate fat. A **mini-cut** (short, controlled deficit) can improve insulin sensitivity, appetite regulation, and psychology before another lean-gain phase. Transition carefully—[Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) matters when you return to maintenance or bulk after a mini-cut.

## Monitoring progress beyond the scale

Track **strength trends**, **volume**, **waist**, and **photos** every **2–4 weeks**. If weight climbs rapidly with **no** strength progress, your surplus may be oversized or training stimulus inadequate.

## How to use the calculator

Use the **[Macro Calculator](/#calculator)** with **goal = muscle gain / build** (or equivalent). Enter **accurate weight and activity**—underestimating activity can hide an oversized surplus. Save your output as a **weekly target**, then adjust after **2–3 weeks** of trend data.

Compare hubs: [Bulking macros](/macros/bulking-macros), [Bulking macro calculator](/macros/bulking-macro-calculator), and [High protein macros](/macros/high-protein-macros).

## Macro adjustment rules (simple)

1. If weight trend is **flat** and strength stalls, consider a **small surplus increase** (~5%).
2. If weight spikes **fast** and waist expands quickly, **trim** ~100–150 kcal or add steps.
3. Change **one variable** at a time when possible.
4. Prefer **carb** adjustments for training-led changes when fats are already reasonable.

## Lean bulk vs dirty bulk

**Lean bulk** emphasizes **controlled surplus**, **high protein**, and **training quality**. **Dirty bulk** often means **uncontrolled surplus** and rapid fat gain—sometimes fun short-term, rarely optimal for natural lifters chasing composition.

## Rate of gain: what to expect

A sustainable lean bulk often produces **slow scale weight change**—think **roughly 0.25–0.75%** body weight per month for many lifters, highly individual. Faster gains usually mean **more fat** than necessary. If you are heavier to start, absolute weight changes may look larger; focus on **waist**, **strength**, and **photos** alongside the scale.

## Nutrient timing (optional, not magical)

**Pre-workout carbs** and **post-workout protein** can support performance and recovery, but **daily totals** matter more than perfect timing. If you train fasted and feel flat, a **small carb snack** near training is often worth a few macro moves.

## Fiber, digestion, and appetite on higher intakes

Bulking means **more food volume**. If bloating or GI issues appear, **spread meals**, **choose fiber gradually**, and avoid jumping from **very low** to **very high** calories overnight. Hydration and **step count** help digestion.

## Cardio while bulking

Light cardio can support **cardiovascular health** and **appetite regulation** without “stealing gains” if calories remain **above maintenance**. If cardio appetite makes you **overeat unpredictably**, reduce cardio or tighten **meal structure** with [Macro Meal Planning](/guides/macro-meal-planning).

## Transitioning from a cut to a lean bulk

If you are coming from a long deficit, **maintenance** may be the right first stop—see [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide). Jumping straight to a **large surplus** after restriction can feel chaotic; a **small surplus** with **high protein** is easier to control.

## Using sex-specific hubs as benchmarks

Compare your targets with [Best Macros for Men](/guides/best-macros-for-men) or [Best Macros for Women](/guides/best-macros-for-women) when framing expectations for **muscle gain rate** and **calorie needs**. Browse [Macros for men](/macros/macros-for-men) and [Macros for women](/macros/macros-for-women) programmatic pages for representative examples.

## Recomp reminder

If you are newer to training, **recomposition** at maintenance or a tiny surplus may outperform an aggressive bulk—see [Macros for Body Recomposition](/guides/macros-for-body-recomposition) and [180 pound male recomp standard macros](/macros/180-pound-male-recomp-standard-macros) as a reference profile.

## Protein quality and leucine

Muscle gain still depends on **total daily protein** and **training stimulus**, not one magical amino acid dose. If you prefer smaller meals, consider **slightly higher protein** per meal to compensate for **per-meal protein** thresholds—then verify with **progress**, not theory.

## Fat intake and hormones on a bulking diet

Fat should not drop to zero. If you feel **run down** on very low fat while carbs are high, a **small fat increase** (often **5–10g**) can improve satiety and food enjoyment without wrecking carb targets—adjust **weekly**, not daily.

## Sample adjustment week (example only)

If weight trend is **flat** and strength is **stalling**, try **+150 kcal** mostly from **carbs** around training for **two weeks**. If weight **spikes** faster than comfort allows, revert **half** the increase and reassess. This is **illustrative**, not medical advice—individuals vary.

## Tracking tools and consistency

Whether you use an app or a spreadsheet, **the same tracking method** matters more than the brand. Weigh **dry foods** when possible, **measure oils**, and **log weekends**—lean bulk fails quietly when **untracked bites** accumulate.

## Sleep, stress, and recovery debt

Muscle gain is not only nutrition. If you are **under-slept** or **high-stress**, appetite and performance swing wildly—making surplus targets harder to interpret. Before you **raise calories again**, ask whether **recovery** supports the training volume you are trying to fuel.

## Hypertrophy vs strength blocks

During **higher-volume** blocks, you may tolerate **more carbs** and **slightly higher calories** than during **strength** phases with lower volume. Re-run the [Macro Calculator](/#calculator) when **activity level** changes category, not just when you change goals.

## Women-specific considerations

Menstrual cycle changes can shift **water weight** and **training performance**—compare **monthly averages** rather than single weeks. See [Best Macros for Women](/guides/best-macros-for-women) for framing; the same lean-bulk logic applies, with **patience** around fluid shifts.

## Men-specific considerations

Higher average **lean mass** often means **higher calorie needs** for the same training—but **surplus discipline** still determines fat gain. [Best Macros for Men](/guides/best-macros-for-men) complements this guide when you set expectations.

## How lean bulking pairs with Mediterranean-style eating

If you prefer **Mediterranean-style** foods, you can align a surplus with **olive oil**, **legumes**, and **fish**—see [Mediterranean Diet Macros](/guides/mediterranean-diet-macros). The surplus still comes from **total calories**, not from “healthy” labels alone.

## Long-term periodization (simple version)

Think in **12–16 week** blocks: **lean bulk**, **mini-cut** or **maintenance**, reassess. You do not need a perfect annual plan—just **scheduled check-ins** so you are not accidentally **bulking for years** without noticing.

## Who this is for

Lean bulk macros suit **intermediate lifters**, **athletes** with structured training, and anyone who wants **muscle gain without excessive fat**. They are a weaker fit if you cannot train consistently or if a clinician has prescribed a different nutrition approach.

Pair with [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide) when cycling between phases, and [Macro Meal Planning](/guides/macro-meal-planning) to make high-protein bulking repeatable.

## Common mistakes

- **Surplus too large** on Day 1—start conservative.
- **Ignoring fiber and vegetables**—digestion and appetite matter on higher intakes.
- **Chasing scale weight** without tracking **strength**—mass without performance is often just fat.
- **Never ending the bulk**—periodic assessment beats infinite “permabulk.”

**Bottom line:** Lean bulk macros are a **small surplus**, **high protein**, **carb-supported training**, and **patient adjustments**—use the calculator, train hard, and audit trends monthly.`,
  },

  // ----- Backlog guides 7–9 -----
  {
    slug: "refeed-diet-break-macros",
    title: "Refeed & Diet Break Macros: Protect Muscle on a Long Cut",
    categoryId: "fat-loss",
    tags: ["refeed", "diet-break", "cutting"],
    excerpt:
      "Structured refeeds and diet breaks during fat loss: when to use them, how to set protein and carbs, what the scale means, and how to return to a deficit.",
    metaTitle: "Refeed & Diet Break Macros | Macro Academy | Physiq",
    metaDescription:
      "Refeed & diet break macros: lift calories with protein protected, add carbs for training, return to your deficit with a plan—start from the Macro Calculator.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Long cuts beat up training and hunger—planned higher days or short maintenance breaks can restore performance if protein stays anchored.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "reverse-diet-macros",
      "intermittent-fasting-macros",
      "how-to-calculate-macros",
      "protein-sparing-modified-fasting",
      "maintenance-macros-guide",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "maintenance-macros",
      "bulking-macros",
      "cutting-macro-calculator",
      "high-protein-macros",
    ],
    body: `**Refeed days** and **diet breaks** are structured breaks from a sustained calorie deficit. They are not magic fixes for metabolism—they are **adherence tools** that can improve training, sleep, and psychology during long cuts, while **protein stays high** enough to protect lean mass when implemented sensibly.

If you are new to deficits, start with [Macros for Fat Loss](/guides/macros-for-fat-loss) and [How to Calculate Macros](/guides/how-to-calculate-macros).

## What is a refeed vs a diet break?

- **Refeed (often 1–2 days):** Calories rise—usually with **extra carbs**—while **protein remains high**. The goal is often **glycogen**, **training performance**, and **adherence**, not a week-long binge.
- **Diet break (often 1–2 weeks at maintenance):** Intake rises toward **estimated maintenance** to reduce diet fatigue, improve recovery, and stabilize behavior before you return to a deficit.

Neither replaces **energy balance** long-term. Fat loss still requires **average deficit** over time.

## When refeeds or breaks make sense

They are more useful when:

- You have been in a **consistent deficit** for **many weeks**
- **Training quality** is dropping, sleep is poor, or hunger is extreme
- **Adherence** is breaking down—not because you are bored, but because biology and psychology are fighting you

They are less useful if you are **not actually in a deficit** (logging issues) or if you use breaks to **avoid** addressing weekend overeating.

## Macro priorities during a refeed

1. **Protein:** Keep **high**—often similar to your diet days in grams.
2. **Carbs:** Often increased **more than fat** if the goal is training performance and glycogen.
3. **Fats:** Usually **moderate**—easy to over-add via dining out and “treat” meals.

Think “**high-carb refeed**,” not “**untracked pizza week**,” unless your plan explicitly budgets for that.

## Diet break macros at maintenance

Use the [Macro Calculator](/#calculator) with **maintenance** as your goal and your **current body weight**. Compare with [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide). A diet break is basically **practicing maintenance** with structured intent.

## Returning to the deficit

After a break, **step down** calories gradually if needed—see [Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) for the psychology of transitions. Do not assume you must slash **lower than before** unless trends show fat loss has truly stalled with accurate logging.

## What the scale does during refeeds

**Carb increases** often raise **scale weight** from **glycogen and water**—that is not necessarily fat gain. Judge refeeds on **training quality**, **adherence afterward**, and **multi-week fat trends**, not one morning weigh-in.

## Mini-refeeds vs full diet breaks

A **single high-carb day** may be enough to restore **gym performance** without pausing the whole diet. A **full diet break** is heavier psychologically—use it when **weeks of fatigue** stack up, not because one Saturday felt hard.

## Relationship to aggressive approaches

Very low calorie approaches like [Protein Sparing Modified Fasting (PSMF)](/guides/protein-sparing-modified-fasting) are a different tool. Refeeds and diet breaks are usually discussed for **moderate deficits**, not as a patch for unsupervised extreme restriction.

## How to use the calculator

Open the **[Macro Calculator](/#calculator)** and generate **deficit targets** for your normal week. For a **planned refeed day**, add calories—often mostly **carbs**—while keeping **protein** near your usual gram target. For a **diet break**, switch goal to **maintenance** and run **7–14 days** before reassessing.

Use [Cutting macros](/macros/cutting-macros) and [Maintenance macros](/macros/maintenance-macros) hubs to sanity-check how cluster pages frame goals.

## Common mistakes

- **Calling every cheat meal a “refeed.”** Refeeds are **planned** and **mostly tracked**.
- **Spiking fat and alcohol** and blaming “carbs” for scale jumps—**water retention** is multifactorial.
- **Ending the deficit permanently** after one break—breaks are **interruptions**, not exits, unless you choose maintenance on purpose.
- **Ignoring protein** because calories rose—protein is still the anchor.

## Who this is for

Refeed and diet break strategies help **people in long cuts** who need **recovery** or **reset adherence**. They are a weaker fit for beginners who have not yet mastered **basic tracking**—fix fundamentals first.

**Bottom line:** Refeeds and diet breaks are **structured maintenance or carb-focused higher days** with **protein protected**—use the calculator to define maintenance, plan breaks deliberately, then return to your deficit with clarity.`,
  },
  {
    slug: "alcohol-and-macros",
    title: "Alcohol and Macros: Tracking Drinks Without Sabotaging Progress",
    categoryId: "diet-strategies",
    tags: ["alcohol", "adherence", "lifestyle"],
    excerpt:
      "Fit alcohol into macro targets: calorie math, protein on drinking days, training recovery, and habits that keep weekly averages on track.",
    metaTitle: "Alcohol and Macros | Macro Academy | Physiq",
    metaDescription:
      "Alcohol and macros: budget drinks into daily calories, keep protein high, and manage next-day meals—use the Macro Calculator for your goal and track honestly.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Drinks are calories like anything else—budget them, protect protein, and plan the day after so one night does not erase the week.",
    relatedGuideSlugs: [
      "macros-for-fat-loss",
      "lean-bulk-macros",
      "how-to-calculate-macros",
      "macro-meal-planning",
      "what-are-macros",
      "intermittent-fasting-macros",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "bulking-macros",
      "maintenance-macros",
      "high-protein-macros",
      "macros-for-men",
      "macros-for-women",
    ],
    body: `Alcohol is **calories without protein**—usually **7 kcal per gram** of pure ethanol, plus whatever mixers and carbs you add. For macro tracking, the practical problem is not “one drink”—it is **untracked pours**, **lower protein days**, and **reactive eating** the next day.

Read [Macros for Fat Loss](/guides/macros-for-fat-loss) or [Lean Bulk Macros](/guides/lean-bulk-macros) for goal context, then fit alcohol into **weekly averages**, not isolated perfection.

## How alcohol fits calorie targets

Common approaches:

- **Budget calories** from carbs and fats first, keep **protein** high.
- **Reduce fats** slightly on drinking days if you need room—oils add up fast.
- **Avoid double penalties:** heavy drinking **plus** untracked late-night meals.

Alcohol does not “turn off” fat loss—it shifts **where calories come from** and often worsens **adherence**.

## Protein on drinking days

Keep **protein grams** as close to normal as possible. Alcohol displaces **useful** calories and can blunt **recovery**—do not also erase protein “because the day is ruined.”

## Training and recovery

Poor sleep after drinking reduces **performance**, **steps**, and **impulse control** the next day. If your goal is physique progress, **frequency and dose** matter more than moralizing.

## Low-carb drinking myths

Keto or low-carb plans do not make alcohol “free.” Read [Keto Macros Explained](/guides/keto-macros-explained) if you are keto-aligned—choices still have **caloric cost** and **behavioral cost**.

## Calories by drink type (rough mental math)

**Beer** carries **carbs + alcohol calories**. **Wine** is denser in alcohol per glass than many expect. **Spirits** have fewer carbs but **mixers** can dominate—diet soda or soda water reduces sugar spikes that drive appetite for some people. Your tracker’s database matters less than **repeatable choices** you can log the same way each time.

## Hydration, electrolytes, and sleep

Alcohol is a diuretic; **dehydration** worsens **next-day cravings** and **training quality**. **Water**, **electrolyte-aware** eating (especially if you train hard), and **sleep hygiene** are part of the macro picture—not side quests.

## Social occasions without losing the week

**Front-load protein** earlier in the day, **pre-select** your drink count, and **avoid** the “already failed” spiral that dumps you into untracked takeout—see [Restaurant & Takeout Macros](/guides/restaurant-takeout-macros) when food is part of the night.

## How to use the calculator

Set your **normal daily targets** in the **[Macro Calculator](/#calculator)** for your goal. Treat alcohol as **part of the calorie budget**—log **standard drinks** honestly, then adjust **remaining** carbs/fats. If you drink weekly, consider **averaging** intake across **7 days** instead of punishing one Monday number.

Compare hubs: [Cutting macros](/macros/cutting-macros), [Bulking macros](/macros/bulking-macros), and [Maintenance macros](/macros/maintenance-macros).

## Common mistakes

- **Ignoring liquid calories** in cocktails and beer.
- **Skipping protein** because calories “went to drinks.”
- **All-or-nothing mindset** after one night—get back to baseline **the next meal**.
- **Using alcohol to manage stress** long-term—seek support if this pattern is entrenched.

## Who this is for

This guide helps **adults who drink occasionally** and still want **macro-aware** progress. It is not medical advice; if you have **alcohol use disorder**, **pregnancy**, or **medication interactions**, follow **clinical guidance**—not macro blogs.

Pair planning with [Macro Meal Planning](/guides/macro-meal-planning) so **sober-day meals** stay simple and high in protein.

## Fat loss vs muscle gain contexts

On a **cut**, alcohol competes with **scarce calories**—smaller margins mean **tighter planning**. On a **lean bulk**, you may have more room, but **untracked weekends** can still erase a surplus advantage—see [Lean Bulk Macros](/guides/lean-bulk-macros).

## Intermittent fasting and drinking windows

If you compress eating into fewer hours—[Intermittent Fasting Macros](/guides/intermittent-fasting-macros)—be careful **stacking** alcohol into a tiny window; **blood sugar swings** and **impulse eating** can follow. Protein still needs **real meals**, not only drinks.

## Medications, health, and discretion

Some medications and conditions interact with alcohol. This article is **education**, not medical advice—follow your clinician’s guidance first.

If fat loss is the goal, **budgeting** alcohol is the same as budgeting dessert—**trade**, do not **stack** endless extras on the same day.

**One habit that works:** decide your **drink count** and **food plan** before the first sip—then execute without renegotiating mid-round.

**Bottom line:** Alcohol is **calories**—track it, **protect protein**, and manage **next-day** eating and training like any other variable.`,
  },
  {
    slug: "restaurant-takeout-macros",
    title: "Restaurant & Takeout Macros: Order Smarter, Still Hit Your Targets",
    categoryId: "basics",
    tags: ["dining-out", "takeout", "estimation"],
    excerpt:
      "Estimate macros at restaurants and for takeout: protein-first orders, oil assumptions, chain calories, travel hacks, and how to pre-log social meals.",
    metaTitle: "Restaurant & Takeout Macros | Macro Academy | Physiq",
    metaDescription:
      "Restaurant macros: protein first, estimate cooking oils, pre-log when you can—eat out weekly without erasing your Macro Calculator targets or weekly averages.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "You can eat out often and still progress—use repeatable orders, honest oil estimates, and pre-logging so hidden calories do not dominate.",
    relatedGuideSlugs: [
      "macro-meal-planning",
      "how-to-calculate-macros",
      "mediterranean-diet-macros",
      "fat-loss-plateau-macros",
      "alcohol-and-macros",
      "macros-for-fat-loss",
    ],
    relatedMacroSlugs: [
      "cutting-macros",
      "maintenance-macros",
      "meal-plan-for-2400-calories-standard",
      "macros-for-women",
      "bulking-macros",
      "high-protein-macro-calculator",
    ],
    body: `Restaurant and takeout meals are **macro-solvable** when you use **rules of thumb**, **repeatable orders**, and **honest oil estimates**. The goal is not perfect accuracy—it is **good enough to trend**.

Start with [How to Calculate Macros](/guides/how-to-calculate-macros) and [Macro Meal Planning](/guides/macro-meal-planning) for home baseline, then adapt.

## The big levers: protein, oil, and portions

- **Pick a clear protein** you can name: grilled chicken, steak, fish, tofu—not “bowl with mystery sauce.”
- **Assume extra cooking oil** unless the menu says **steamed** or **dry grilled**—add **1–2 tablespoons** of fat mentally if plates look shiny.
- **Starch portions** are often **2×** what you serve at home—split or box half **before** you are full.

## Cuisine shortcuts (approximate, not exact)

- **Mexican:** Fajitas without heavy cheese/sour cream overload; **double protein**, **single tortilla**, salsa over queso.
- **Asian:** Stir-fries—assume **sauce + oil**; choose **broth-based** soups with **lean protein** when possible.
- **Italian:** Red sauces over cream sauces; **protein-forward** mains; bread as a **budgeted** carb, not endless.
- **American diner:** Eggs, grilled chicken sandwiches **without** mayo flood; swap fries for **side salad** when fat calories are tight.

## Salads are not automatically low calorie

Dressings are **oil**. Ask for **on the side**, dip lightly, or pick **vinaigrette** with measured imagination. Add **grilled protein**—not just nuts and cheese.

## Alcohol when eating out

See [Alcohol and Macros](/guides/alcohol-and-macros). Restaurants pair drinking with **bread baskets** and **desserts**—decide your **budget** before you sit down.

## Tracking strategies that work

- **Pick the same 3–5 restaurants** and learn their macros once.
- **Pre-log** a **planned meal** before you arrive.
- **Use ranges** when unsure—**±15–20%** on fats is common; consistency beats pretending.

## Chain restaurants and published macros

Large chains often publish **calorie counts**—use them as anchors, knowing **kitchen variance** exists. Independent restaurants need **templates**: “**grilled protein + carb + veg**” beats mystery bowls.

## Airport, hotel, and gas-station food

**Protein bars**, **Greek yogurt**, **pre-made salads with grilled chicken**, and **rotisserie chicken** are travel hacks. **Pastries** for “convenience” rarely help protein targets.

## Takeout portions at home

**Split** entrees, **add** frozen vegetables, and **plate** food instead of eating from containers—visual cues reduce passive overeating.

## Vegetarian and vegan takeout

Plant-based orders can be **low protein** unless you add **tofu, tempeh, beans, or seitan** deliberately—read [Vegetarian Macros for Muscle & Fat Loss](/guides/vegetarian-macros) and [Vegan Macros](/guides/vegan-macros) for anchor foods. Fried vegan options can be **fat-heavy**; **baked or grilled** proteins help.

## Fat-loss plateaus and dining out

If scale progress stalls, **restaurants** are a common hidden variable—pair this guide with [Fat Loss Plateau: When and How to Adjust Your Macros](/guides/fat-loss-plateau-macros) after you verify **oil and weekend** accuracy.

## Kids’ menus, appetizers, and “just a bite”

**Shared plates** and **appetizer rounds** destroy estimates fast. Decide **up front** whether appetizers fit the budget—or skip them and put calories into a **protein-forward** entrée.

## Dessert: split, share, or skip

If dessert matters socially, **share** or **pick one** treat—**fat and sugar** together add calories quickly without helping protein.

## How to use the calculator

Build your **home targets** with the **[Macro Calculator](/#calculator)** first. For restaurant days, decide whether you will **borrow calories** from other meals (**front-load protein**, lighter breakfast) or accept a **maintenance day**—see [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide).

Sample programmatic meal-plan pages like [meal plan for 2400 calories standard](/macros/meal-plan-for-2400-calories-standard) illustrate how **structured meals** compare to **unstructured** dining—your job is to **anchor protein** either way.

## Common mistakes

- **Underestimating oils** in sautéed dishes and “healthy bowls.”
- **No protein anchor**—all carbs and fats.
- **Letting one meal erase the week**—bank calories sensibly or resume **tomorrow**.
- **Perfectionism:** if you cannot log exactly, log **something**.

## Who this is for

Restaurant macros help **travelers**, **social eaters**, and anyone who **eats out weekly** but still wants progress. If you eat out **nightly**, consider **simpler meals** at home most lunches to keep weekly averages aligned—see [Mediterranean Diet Macros](/guides/mediterranean-diet-macros) for flexible whole-food patterns.

**Bottom line:** Eating out is **estimation**—choose **protein first**, **budget oils**, **pre-log when possible**, and return to your calculator targets without guilt spirals.`,
  },

  // ----- Backlog article 10 -----
  {
    slug: "recomposition-intermediate-macros",
    title: "Recomposition Macros for Intermediate Lifters",
    categoryId: "body-recomposition",
    tags: ["recomposition", "intermediate", "training"],
    excerpt:
      "Intermediate body recomposition: realistic rates, protein-first macros near maintenance, when to mini-cut or lean bulk, and how to read trends beyond the scale.",
    metaTitle: "Intermediate Recomposition Macros | Macro Academy | Physiq",
    metaDescription:
      "Intermediate recomposition macros: protein-first targets near maintenance, patient adjustments, mini-cuts or lean bulks when data says—use the Macro Calculator.",
    publishedAt: "2026-04-13",
    updatedAt: "2026-04-13",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "Past the beginner phase, recomposition slows—this guide sets expectations and adjustment rules for protein, calories, and training-aligned nutrition.",
    relatedGuideSlugs: [
      "macros-for-body-recomposition",
      "lean-bulk-macros",
      "maintenance-macros-guide",
      "fat-loss-plateau-macros",
      "how-to-calculate-macros",
      "macro-meal-planning",
    ],
    relatedMacroSlugs: [
      "180-pound-male-recomp-standard-macros",
      "maintenance-macros",
      "high-protein-macros",
      "cutting-macros",
      "bulking-macros",
      "macros-for-men",
      "macros-for-women",
    ],
    body: `**Intermediate recomposition** means chasing **fat loss and muscle gain** (or at least muscle retention with visual tightening) when you are **past the “newbie” phase**—usually with **several years** of structured training behind you. At this stage, **progress is slower**, **recovery costs more**, and **macro strategy** matters more than motivation memes.

Start with the primer [Macros for Body Recomposition](/guides/macros-for-body-recomposition), then use this guide for **expectations**, **adjustment rules**, and **periodization** that match an intermediate lifter’s reality.

## How intermediate recomposition differs from beginner recomp

Beginners often recomp on **maintenance** or a **tiny deficit** because **neural gains** and **muscle protein synthesis** respond quickly. Intermediates usually need:

- **Clearer training stimulus** (progressive overload, volume management)
- **Higher protein consistency** relative to wishful thinking
- **Longer timelines**—measured in **months**, not weeks
- **Honest calorie control**—“eating clean” rarely replaces tracking when progress is subtle

If you are unsure whether you are still a beginner, assume **patience** and **data** beat ego.

## Calories: maintenance, slight deficit, or tiny surplus?

There is no single answer. Common patterns:

- **Maintenance** or **very small deficit** (often roughly **0–10%** below estimated maintenance) when you want to **stay weight-stable** while leaning out slowly.
- **Short phases** of **slight surplus** only if **hypertrophy** is genuinely stalled and you accept **some** fat gain risk—see [Lean Bulk Macros](/guides/lean-bulk-macros).

Avoid the trap of **perma-recomp**—spinning forever without ever committing to a **real deficit** or a **real surplus** when the data says so.

## Protein: non-negotiable, higher bar than “enough”

For many intermediates, **protein** is the lever that preserves lean tissue when calories are not sky-high. Practical ranges often land around **0.8–1.1g per lb** body weight daily for lifters, depending on deficit depth and preference—compare with [Protein Intake per Pound Explained](/guides/protein-per-pound) and [High Protein Diet Macros](/guides/high-protein-diet-macros).

## Training drives the outcome—macros enable it

Recomposition is not a nutrition-only trick. If you are not **progressively overloading** something—reps, sets, load, technique quality—macros cannot invent muscle. If you are **under-recovered**, more protein will not fix **junk volume**.

## Volume, fatigue, and deloads

Intermediates often **train harder** than they recover from. **Deload weeks** and **planned low-volume phases** are part of long-term recomposition—nutrition should **support** that rhythm, not fight it. See [Maintenance Macros: How to Eat at Your TDEE](/guides/maintenance-macros-guide) when you intentionally pull calories up to maintenance during deloads.

## What the scale will (and won’t) do

The scale may **move slowly** or **not** move while **waist and performance** improve. If you chase scale weight alone, you will misread **recomposition**. Track **measurements**, **photos**, and **strength trends**—not single weekly points.

## When to use a mini-cut

If you **cannot see** progress anymore and **body fat** is creeping up, a **short, controlled deficit** often clarifies the picture—pair with [Fat Loss Plateau: When and How to Adjust Your Macros](/guides/fat-loss-plateau-macros) for adjustment discipline. Mini-cuts are not failure; they are **periodization**.

## When to use a short lean bulk

If you are **lean** already **and** under-muscled for your goals, **recomposition at maintenance** may be too slow. A **lean bulk** phase can be **more honest** than pretending you are “recomping” while under-eating and under-recovering.

## Meal timing and fasting

If you prefer **fewer meals**, [Intermittent Fasting Macros](/guides/intermittent-fasting-macros) can work—**but** total protein and weekly averages still rule. IF does not replace **training stimulus**.

## How to use the calculator

Set the **[Macro Calculator](/#calculator)** to your **current stats** and choose **recomposition** (or equivalent) if available. If your app offers **maintenance** and **cut** separately, use **maintenance** as a baseline and **nudge** calories in **small steps** (often ~100–150 kcal) based on **weekly trends**, not daily weigh-ins.

Compare against a representative programmatic recomp page such as [180 pound male recomp standard macros](/macros/180-pound-male-recomp-standard-macros)—your numbers will differ, but the **structure** (protein-forward, moderate carbs/fats) should look familiar.

## Macro hubs for cross-checking

Browse [Maintenance macros](/macros/maintenance-macros), [High protein macros](/macros/high-protein-macros), and [Cutting macros](/macros/cutting-macros) depending on whether you are **near maintenance**, **protecting muscle**, or **running a short deficit**. [Macros for men](/macros/macros-for-men) and [Macros for women](/macros/macros-for-women) provide sex-specific cluster entry points.

## A simple 12-week recomposition arc (illustration only)

Think in **mesocycles**, not random weeks:

1. **Weeks 1–4:** Establish **maintenance** or **mild deficit** targets, **lock protein**, and **do not** change calories unless logging is clearly wrong.
2. **Weeks 5–8:** Adjust **once** if weight/measurements/training justify it—usually **small calorie** or **step** changes, not both at once.
3. **Weeks 9–12:** Reassess: **continue**, **mini-cut** for clarity, or **short lean bulk** if under-muscled—see [Lean Bulk Macros](/guides/lean-bulk-macros).

This is a **template**, not a prescription. Your training block might be **8 weeks**; match nutrition to **performance**, not the calendar meme.

## Carb and fat splits: performance-led

Intermediates often do best with **enough carbs** to repeat **hard sessions** week after week. If you slash carbs for no reason, **RPE climbs** and **volume drops**—then you blame “macros” instead of **fuel**. Fats stay **adequate for hormones and satiety**; after protein is set, distribute remaining calories based on **digestion** and **preference**.

## Protein distribution across the day

**3–5 protein feedings** still help many people hit high daily totals without relying on one massive meal. If you work long shifts, **front-load protein** early so late-night hunger does not erase your plan—[Macro Meal Planning](/guides/macro-meal-planning) helps.

## Stress, sleep, and “mystery plateaus”

**Sleep debt** raises hunger signals and lowers training quality for many people. If you are **under-slept**, fixing sleep sometimes moves the scale and the barbell more than another **50-calorie tweak**. Stress also shifts **water retention**—compare **monthly** trends, not daily panic.

## Reverse dieting and long-term deficits

If you are coming out of **aggressive dieting**, jumping straight into “recomp” can feel like **spinning**. [Reverse Diet Macros After a Cut](/guides/reverse-diet-macros) explains how to **raise calories** with structure. **PSMF** is a different tool entirely—see [Protein Sparing Modified Fasting (PSMF)](/guides/protein-sparing-modified-fasting) only if that context matches your situation and risk tolerance.

## Food quality without magical thinking

**Whole foods** and **high fiber** often improve satiety and consistency—see [Mediterranean Diet Macros](/guides/mediterranean-diet-macros) for flexible whole-food patterns. But **calories and protein** still determine outcomes; “clean eating” can still miss protein targets if you do not plan.

## Eating out while recomposing

Social meals are not off-limits—use [Restaurant & Takeout Macros](/guides/restaurant-takeout-macros) so **oils** and **hidden calories** do not silently erase your weekly average.

## Intermediate vs beginner: expectations at a glance

| Topic | Beginner recomp (common) | Intermediate recomp (common) |
|-------|--------------------------|-------------------------------|
| Timeline | Faster visible changes | Slower, more subtle |
| Strength | PRs may come easier | Progress needs smarter programming |
| Calories | Maintenance may work well | Often tighter control needed |
| Tracking | Helpful | Frequently necessary for clarity |

## When to stop calling it “recomp”

If you have been “recomping” for **a year** with **no measurable** change in **waist**, **strength**, or **photos**, you likely need a **true deficit** or a **true surplus** phase—pick one, run it **12–16 weeks**, then reassess.

## Common mistakes

- **Assuming beginner rates** of progress after year six in the gym.
- **Changing macros weekly** instead of letting **2–3 weeks** of trend data speak.
- **Cutting calories** while **cutting sleep**—recovery is the hidden macro.
- **Ignoring step count and NEAT**—your “maintenance” moves when life moves.
- **Calling every bulk a “recomp”** because the scale did not move—measurements exist for a reason.

## Who this is for

This guide helps **intermediate lifters** who want **body recomposition** with **realistic timelines** and **structured adjustments**. It is a weaker fit for **absolute beginners** (use [Macros for Body Recomposition](/guides/macros-for-body-recomposition) first) or for people who need **medical nutrition therapy**—work with a clinician when health conditions apply.

Women and men both recomp, but **hormonal cycles**, **bone health**, and **stress** interact with **water weight**—compare [Best Macros for Women](/guides/best-macros-for-women) and [Best Macros for Men](/guides/best-macros-for-men) when setting expectations for **monthly averages** versus **weekly noise**.

**Bottom line:** Intermediate recomposition is **patient training** plus **protein-first macros** near **maintenance or a mild deficit**, with **mini-cuts** or **lean bulks** when the data—not hope—says to switch phases.`,
  },

];
