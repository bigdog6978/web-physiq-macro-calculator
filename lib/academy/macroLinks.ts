/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": [
    "women-fat-loss-stall-real-reasons",
    "women-cardio-not-enough-macros-strength",
    "macro-mistakes-stalling-fat-loss",
  ],
  "bulking-macros": [
    "carb-cycling-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "maintenance-macros": [
    "macro-tracker-burnout-guide",
    "what-i-eat-day-hit-macros-template",
    "activity-level-neat-tdee-macros",
  ],
  "keto-macros": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "keto-macros-explained",
  ],
  "carnivore-macros": [
    "intermittent-fasting-macros",
    "carnivore-macros-guide",
    "high-protein-diet-macros",
  ],
  "high-protein-macros": [
    "high-protein-grocery-list-ranked",
    "protein-hacks-no-cooking",
    "high-protein-diet-macros",
  ],
  "macros-for-men": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "best-macros-for-men",
  ],
  "macros-for-women": [
    "women-scale-up-fat-down-explained",
    "women-fat-loss-hormone-myths",
    "best-macros-for-women",
  ],
  "keto-macro-calculator": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "keto-macros-explained",
  ],
  "carnivore-macro-calculator": [
    "intermittent-fasting-macros",
    "carnivore-macros-guide",
    "high-protein-diet-macros",
  ],
  "cutting-macro-calculator": [
    "women-fat-loss-stall-real-reasons",
    "women-scale-up-fat-down-explained",
    "macros-for-fat-loss",
  ],
  "bulking-macro-calculator": [
    "endurance-running-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "high-protein-macro-calculator": [
    "high-protein-grocery-list-ranked",
    "protein-hacks-no-cooking",
    "high-protein-diet-macros",
  ],
};

export function getAcademyGuideSlugsForMacro(macroSlug: string): string[] {
  return MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug] ?? [];
}
