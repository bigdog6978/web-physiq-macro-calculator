/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": [
    "beer-belly-visible-abs-strategy",
    "dad-bod-recomp-blueprint",
    "beer-belly-macros-for-men",
  ],
  "bulking-macros": [
    "lean-mass-strategy-busy-dads",
    "macros-for-muscle-gain",
    "carb-cycling-macros",
  ],
  "maintenance-macros": [
    "men-under-recovered-rebuild-energy",
    "men-macro-mistakes-low-energy",
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
    "dad-bod-recomp-blueprint",
    "skinny-fat-recomp-men-30-plus",
    "dad-bod-myths-men-stuck",
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
    "beer-belly-macros-for-men",
    "dad-bod-to-athletic-truth",
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
