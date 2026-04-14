#!/usr/bin/env python3
"""Inject 10 Macro Academy articles from scripts/batch10/*.md into lib/academy/articles.ts"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_TS = ROOT / "lib" / "academy" / "articles.ts"
BATCH_DIR = ROOT / "scripts" / "batch10"

DATE = "2026-04-13"

ARTICLES: list[dict] = [
    {
        "slug": "muscle-retention-while-cutting-macros",
        "title": "How to Keep Muscle While Cutting: Macros That Protect Lean Mass",
        "categoryId": "fat-loss",
        "tags": ["cutting", "muscle-retention", "protein"],
        "excerpt": "Keep muscle in a deficit: protein ranges, deficit sizing, lifting stimulus, recovery, and weekly adjustments without bro-science.",
        "metaTitle": "Muscle Retention While Cutting Macros | Macro Academy | Physiq",
        "metaDescription": "Muscle-sparing cut macros: high protein, moderate deficit, lift with intent. Set targets in the Macro Calculator; adjust using weekly trends. Great for lifters.",
        "heroIntro": "Fat loss should not cost you the muscle you trained for. This guide anchors protein, training, and sane deficits so strength and shape stay with you.",
        "relatedGuideSlugs": [
            "macros-for-fat-loss",
            "protein-per-pound",
            "how-to-calculate-macros",
            "fat-loss-plateau-macros",
            "lean-bulk-macros",
            "high-protein-diet-macros",
            "macro-meal-planning",
            "macro-tracking-accuracy-guide",
        ],
        "relatedMacroSlugs": [
            "cutting-macros",
            "cutting-macro-calculator",
            "high-protein-macros",
            "high-protein-macro-calculator",
            "150-pound-female-cutting-standard-macros",
            "180-pound-male-cutting-standard-macros",
            "macros-for-men",
            "macros-for-women",
        ],
    },
    {
        "slug": "activity-level-neat-tdee-macros",
        "title": "Activity Level, NEAT, and TDEE: Why Your Macro Targets Move",
        "categoryId": "basics",
        "tags": ["tdee", "neat", "activity"],
        "excerpt": "TDEE and NEAT in plain language: why maintenance shifts when steps, jobs, and training change, and how to update macro targets without guesswork spirals.",
        "metaTitle": "Activity Level, NEAT & TDEE Macros | Macro Academy | Physiq",
        "metaDescription": "TDEE and NEAT explained: why maintenance calories move with steps and jobs, when to update macro targets, and how to use calculator inputs honestly. Use trends.",
        "heroIntro": "Your calorie needs are not fixed. Steps, jobs, and daily movement change NEAT, so maintenance and macro targets should evolve with real life.",
        "relatedGuideSlugs": [
            "how-to-calculate-macros",
            "what-are-macros",
            "macro-calculator-vs-calorie-calculator",
            "maintenance-macros-guide",
            "fat-loss-plateau-macros",
            "why-macros-matter",
            "macro-tracking-accuracy-guide",
        ],
        "relatedMacroSlugs": [
            "maintenance-macros",
            "cutting-macros",
            "bulking-macros",
            "180-pound-male-maintenance-standard-macros",
            "macros-for-women",
            "macros-for-men",
            "bulking-macro-calculator",
        ],
    },
    {
        "slug": "carb-cycling-macros",
        "title": "Carb Cycling: When It Helps and How to Set Macros",
        "categoryId": "diet-strategies",
        "tags": ["carb-cycling", "performance", "structure"],
        "excerpt": "Carb cycling for lifters: high-low patterns, weekly calorie discipline, protein anchors, and when simple flat macros beat rotation.",
        "metaTitle": "Carb Cycling Macros Guide | Macro Academy | Physiq",
        "metaDescription": "Carb cycling macros: rotate daily carbs for training, keep protein steady, hit weekly calories. Optional structure for lifters, not magic fat-loss timing.",
        "heroIntro": "Carb cycling is optional structure, not magic. Use it when harder training days need fuel and you can keep weekly calories honest.",
        "relatedGuideSlugs": [
            "how-to-calculate-macros",
            "macro-meal-planning",
            "macros-for-muscle-gain",
            "macros-for-fat-loss",
            "keto-macros-explained",
            "endurance-running-macros",
            "protein-per-pound",
            "muscle-retention-while-cutting-macros",
        ],
        "relatedMacroSlugs": [
            "bulking-macros",
            "cutting-macros",
            "cutting-macro-calculator",
            "bulking-macro-calculator",
            "high-protein-macros",
            "170-pound-female-cutting-standard-macros",
            "maintenance-macros",
            "macros-for-women",
        ],
    },
    {
        "slug": "fiber-and-macros",
        "title": "Fiber and Macros: Targets Without Blowing Your Calories",
        "categoryId": "basics",
        "tags": ["fiber", "satiety", "digestion"],
        "excerpt": "Fiber with macro targets: fullness on a cut, gradual increases, high-protein pairings, and keto or high-volume strategies without GI surprises.",
        "metaTitle": "Fiber and Macros Guide | Macro Academy | Physiq",
        "metaDescription": "Fiber with macro targets: satiety bands, gradual increases, keto-friendly planning, and logging tips that protect protein and digestion on a cut. Skimmable.",
        "heroIntro": "Fiber changes fullness and meal volume, not your calorie math. Learn practical bands, logging habits, and pairings that keep protein and adherence high.",
        "relatedGuideSlugs": [
            "what-are-macros",
            "high-protein-diet-macros",
            "keto-macros-explained",
            "macro-tracking-accuracy-guide",
            "vegetarian-macros",
            "how-to-calculate-macros",
            "intermittent-fasting-macros",
        ],
        "relatedMacroSlugs": [
            "high-protein-macros",
            "high-protein-macro-calculator",
            "cutting-macros",
            "keto-macros",
            "meal-plan-for-2000-calories-vegetarian",
            "macros-for-women",
            "maintenance-macros",
        ],
    },
    {
        "slug": "paleo-diet-macros",
        "title": "Paleo Macros: Protein, Carbs, and Fat on a Paleo Template",
        "categoryId": "diet-strategies",
        "tags": ["paleo", "whole-foods", "template"],
        "excerpt": "Paleo eating with macro targets: protein density without dairy, carb sources beyond grains, fat moderation, and cuts or bulks that stay honest.",
        "metaTitle": "Paleo Diet Macros | Macro Academy | Physiq",
        "metaDescription": "Paleo macros for cuts or bulks: anchor protein, add tubers or fruit for carbs, portion fats. Whole-food template plus calculator-backed grams. Practical tips.",
        "heroIntro": "Paleo is a food template; macros still decide fat loss or muscle gain. Here is how to hit protein and carbs without defaulting to accidental high-fat days.",
        "relatedGuideSlugs": [
            "mediterranean-diet-macros",
            "how-to-calculate-macros",
            "carnivore-macros-guide",
            "high-protein-diet-macros",
            "endurance-running-macros",
            "fiber-and-macros",
            "restaurant-takeout-macros",
            "intermittent-fasting-macros",
        ],
        "relatedMacroSlugs": [
            "high-protein-macro-calculator",
            "cutting-macro-calculator",
            "bulking-macros",
            "190-pound-male-cutting-standard-macros",
            "carnivore-macros",
            "maintenance-macros",
            "macros-for-men",
        ],
    },
    {
        "slug": "endurance-running-macros",
        "title": "Macros for Endurance and Running (Without Wrecking Recovery)",
        "categoryId": "muscle-gain",
        "tags": ["endurance", "running", "fueling"],
        "excerpt": "Fueling lifting plus running: calorie needs, carb timing ideas, protein for muscle repair, and mistakes that underfuel mileage or strength.",
        "metaTitle": "Endurance & Running Macros | Macro Academy | Physiq",
        "metaDescription": "Running and lifting macros: fuel glycogen, keep protein adequate, adjust calories by weekly trends. General endurance fueling education, not medical advice.",
        "heroIntro": "Add miles without wiping out the gym. This guide balances carbs and protein when endurance work stacks on top of strength training.",
        "relatedGuideSlugs": [
            "macros-for-muscle-gain",
            "maintenance-macros-guide",
            "carb-cycling-macros",
            "macros-for-fat-loss",
            "muscle-retention-while-cutting-macros",
            "intermittent-fasting-macros",
            "protein-per-pound",
            "vegan-macros",
        ],
        "relatedMacroSlugs": [
            "maintenance-macros",
            "bulking-macros",
            "bulking-macro-calculator",
            "160-pound-female-bulking-standard-macros",
            "high-protein-macros",
            "cutting-macros",
            "macros-for-women",
        ],
    },
    {
        "slug": "macro-tracking-accuracy-guide",
        "title": "Macro Tracking Accuracy: Scales, Labels, and Logging Mistakes",
        "categoryId": "basics",
        "tags": ["tracking", "accuracy", "logging"],
        "excerpt": "Log macros closer to reality: raw vs cooked weights, label tricks, restaurant oil, alcohol, and when to tighten tracking versus zoom out to trends.",
        "metaTitle": "Macro Tracking Accuracy Guide | Macro Academy | Physiq",
        "metaDescription": "Macro tracking accuracy: weigh consistently, catch hidden oils, log alcohol honestly. Make your Macro Calculator targets match real life with weekly averages.",
        "heroIntro": "Small logging errors add up. This guide tightens the basics (scales, servings, oils) so your targets and your results stop arguing.",
        "relatedGuideSlugs": [
            "how-to-calculate-macros",
            "restaurant-takeout-macros",
            "alcohol-and-macros",
            "keto-macros-explained",
            "why-macros-matter",
            "fat-loss-plateau-macros",
            "macro-meal-planning",
            "menstrual-cycle-macros",
        ],
        "relatedMacroSlugs": [
            "cutting-macros",
            "high-protein-macros",
            "protein-intake-for-200-pound-male",
            "maintenance-macros",
            "macros-for-women",
            "bulking-macros",
            "cutting-macro-calculator",
        ],
    },
    {
        "slug": "skinny-fat-recomp-macros",
        "title": "Skinny-Fat Recomp: Macros for Beginners With Low Muscle Mass",
        "categoryId": "body-recomposition",
        "tags": ["skinny-fat", "beginner", "recomp"],
        "excerpt": "Skinny-fat beginners: protein-first macros, maintenance vs mild deficit, lifting priorities, and why panic cardio rarely fixes shape.",
        "metaTitle": "Skinny-Fat Recomp Macros | Macro Academy | Physiq",
        "metaDescription": "Skinny-fat macro plan: high protein, patient calories, consistent lifting. Beginner recomp habits using the Macro Calculator and realistic timelines. Practical.",
        "heroIntro": "If you are thin but soft, the fix is usually muscle and patience, not a crash diet. This guide sets protein, calories, and training-first habits.",
        "relatedGuideSlugs": [
            "macros-for-body-recomposition",
            "lean-bulk-macros",
            "fat-loss-macros",
            "protein-per-pound",
            "best-macros-for-women",
            "best-macros-for-men",
            "macro-tracking-accuracy-guide",
            "activity-level-neat-tdee-macros",
        ],
        "relatedMacroSlugs": [
            "maintenance-macros",
            "180-pound-male-recomp-standard-macros",
            "bulking-macros",
            "high-protein-macro-calculator",
            "macros-for-women",
            "macros-for-men",
            "cutting-macros",
            "bulking-macro-calculator",
        ],
    },
    {
        "slug": "sugar-desserts-and-macros",
        "title": "Sugar, Desserts, and Fitting Sweets Into Macro Targets",
        "categoryId": "diet-strategies",
        "tags": ["sugar", "desserts", "flexible-dieting"],
        "excerpt": "Fit desserts into macro plans: sugar as carbs, budgeting tricks, deficit vs surplus behavior, and mistakes that turn treats into invisible overages.",
        "metaTitle": "Sugar & Desserts Macros | Macro Academy | Physiq",
        "metaDescription": "Sugar and dessert macros: budget carbs and fats, protect protein, log treats on cuts or bulks. Flexible eating without pretending calories vanish. Log honestly.",
        "heroIntro": "You do not need a sugar phobia to get lean. Learn how sweets fit the same macro budget as any other carb, with logging habits that stay honest.",
        "relatedGuideSlugs": [
            "macro-meal-planning",
            "why-macros-matter",
            "lean-bulk-macros",
            "macros-for-fat-loss",
            "alcohol-and-macros",
            "fiber-and-macros",
            "keto-macros-explained",
            "fat-loss-plateau-macros",
        ],
        "relatedMacroSlugs": [
            "cutting-macros",
            "bulking-macros",
            "meal-plan-for-1800-calories-standard",
            "high-protein-macros",
            "maintenance-macros",
            "macros-for-women",
            "high-protein-macro-calculator",
        ],
    },
    {
        "slug": "menstrual-cycle-macros",
        "title": "Macros Across Your Menstrual Cycle (Energy, Appetite, Training)",
        "categoryId": "women",
        "tags": ["women", "cycle", "hormones"],
        "excerpt": "Cycle-aware macro basics: common appetite and scale patterns, steady protein, when tweaks beat chaos, and when to see a clinician, not medical advice.",
        "metaTitle": "Menstrual Cycle Macros | Macro Academy | Physiq",
        "metaDescription": "Cycle-aware macros for women: expect scale noise, keep protein steady, tweak carbs if helpful. Fitness education; see a clinician for pain or amenorrhea.",
        "heroIntro": "Hunger and scale weight shift across the month for many people. Here is how to keep macro habits stable without overreacting to short-term noise.",
        "relatedGuideSlugs": [
            "best-macros-for-women",
            "protein-per-pound",
            "carb-cycling-macros",
            "how-to-calculate-macros",
            "reverse-diet-macros",
            "fat-loss-plateau-macros",
            "activity-level-neat-tdee-macros",
            "macro-tracking-accuracy-guide",
        ],
        "relatedMacroSlugs": [
            "macros-for-women",
            "cutting-macros",
            "maintenance-macros",
            "150-pound-female-cutting-standard-macros",
            "high-protein-macro-calculator",
            "bulking-macros",
            "macros-for-men",
            "protein-intake-for-150-pound-female",
        ],
    },
]


def ts_escape_body(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def format_article(meta: dict, body: str) -> str:
    tags = ", ".join(f'"{t}"' for t in meta["tags"])
    guides = ",\n      ".join(f'"{g}"' for g in meta["relatedGuideSlugs"])
    macros = ",\n      ".join(f'"{m}"' for m in meta["relatedMacroSlugs"])
    return f"""  {{
    slug: "{meta["slug"]}",
    title: "{meta["title"]}",
    categoryId: "{meta["categoryId"]}",
    tags: [{tags}],
    excerpt:
      "{meta["excerpt"]}",
    metaTitle: "{meta["metaTitle"]}",
    metaDescription:
      "{meta["metaDescription"]}",
    publishedAt: "{DATE}",
    updatedAt: "{DATE}",
    author: "Physiq",
    featured: false,
    status: "published",
    heroIntro:
      "{meta["heroIntro"]}",
    relatedGuideSlugs: [
      {guides}
    ],
    relatedMacroSlugs: [
      {macros}
    ],
    body: `{ts_escape_body(body)}`,
  }}"""


def main() -> None:
    chunks: list[str] = []
    for meta in ARTICLES:
        md_path = BATCH_DIR / f"{meta['slug']}.md"
        body = md_path.read_text(encoding="utf-8").strip()
        chunks.append(format_article(meta, body))
        mlen = len(meta["metaDescription"])
        assert 150 <= mlen <= 160, (meta["slug"], mlen, meta["metaDescription"])

    insert = "  },\n\n" + ",\n\n".join(chunks) + "\n\n];"
    text = ARTICLES_TS.read_text(encoding="utf-8")
    needle = "  },\n\n];"
    idx = text.rfind(needle)
    if idx == -1:
        raise SystemExit("Could not find closing pattern in articles.ts")
    new_text = text[:idx] + insert
    ARTICLES_TS.write_text(new_text, encoding="utf-8")
    print("Injected", len(ARTICLES), "articles into", ARTICLES_TS.relative_to(ROOT))


if __name__ == "__main__":
    main()
