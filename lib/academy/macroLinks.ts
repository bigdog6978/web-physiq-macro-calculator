/**
 * Maps programmatic SEO macro page slugs → related Macro Academy guide slugs.
 * Edit here instead of hardcoding strips on every macro page.
 */
export const MACRO_SLUG_TO_ACADEMY_GUIDES: Record<string, string[]> = {
  "cutting-macros": [
    "psmf-fast-fat-loss-guide",
    "psmf-vs-carnivore-fat-loss",
    "beer-belly-visible-abs-strategy",
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
    "carnivore-cutting-macros",
    "carnivore-fat-loss-plateau-fixes",
    "carnivore-macros-guide",
  ],
  "high-protein-macros": [
    "how-to-set-psmf-macros",
    "psmf-fast-fat-loss-guide",
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
    "carnivore-cutting-macros",
    "carnivore-fat-loss-plateau-fixes",
    "carnivore-macros-guide",
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
    "how-to-set-psmf-macros",
    "psmf-refeed-strategy",
    "high-protein-diet-macros",
  ],
};

export function getAcademyGuideSlugsForMacro(macroSlug: string): string[] {
  return MACRO_SLUG_TO_ACADEMY_GUIDES[macroSlug] ?? [];
}
