/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": [
    "muscle-retention-while-cutting-macros",
    "macro-tracking-accuracy-guide",
    "macros-for-fat-loss",
  ],
  "bulking-macros": [
    "carb-cycling-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "maintenance-macros": [
    "activity-level-neat-tdee-macros",
    "maintenance-macros-guide",
    "macros-for-body-recomposition",
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
    "fiber-and-macros",
    "high-protein-diet-macros",
    "vegetarian-macros",
  ],
  "macros-for-men": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "best-macros-for-men",
  ],
  "macros-for-women": [
    "menstrual-cycle-macros",
    "best-macros-for-women",
    "reverse-diet-macros",
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
    "muscle-retention-while-cutting-macros",
    "macro-tracking-accuracy-guide",
    "macros-for-fat-loss",
  ],
  "bulking-macro-calculator": [
    "endurance-running-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "high-protein-macro-calculator": [
    "fiber-and-macros",
    "macro-tracking-accuracy-guide",
    "high-protein-diet-macros",
  ],
};

export function getAcademyGuideSlugsForMacro(macroSlug: string): string[] {
  return MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug] ?? [];
}
