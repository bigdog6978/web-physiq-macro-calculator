/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "macros-for-fat-loss",
  ],
  "bulking-macros": [
    "vegetarian-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "maintenance-macros": [
    "reverse-diet-macros",
    "intermittent-fasting-macros",
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
    "vegetarian-macros",
    "intermittent-fasting-macros",
    "high-protein-diet-macros",
  ],
  "macros-for-men": [
    "intermittent-fasting-macros",
    "vegetarian-macros",
    "best-macros-for-men",
  ],
  "macros-for-women": [
    "intermittent-fasting-macros",
    "reverse-diet-macros",
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
    "intermittent-fasting-macros",
    "reverse-diet-macros",
    "macros-for-fat-loss",
  ],
  "bulking-macro-calculator": [
    "vegetarian-macros",
    "intermittent-fasting-macros",
    "macros-for-muscle-gain",
  ],
  "high-protein-macro-calculator": [
    "vegetarian-macros",
    "intermittent-fasting-macros",
    "high-protein-diet-macros",
  ],
};

export function getAcademyGuideSlugsForMacro(macroSlug: string): string[] {
  return MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug] ?? [];
}
