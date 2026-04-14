export const CATEGORY_IMAGE_MAP: Partial<Record<string, string>> = {
  basics: "/images/guides/cards/bascis1.png",
  "fat-loss": "/images/guides/cards/fatloss.png",
  "muscle-gain": "/images/guides/cards/musclegain.png",
  "body-recomposition": "/images/guides/cards/recomp.png",
  "diet-strategies": "/images/guides/cards/dietstrategies.png",
  men: "/images/guides/cards/men.png",
  women: "/images/guides/cards/women.png",
  comparisons: "/images/guides/cards/comparisson.png",
};

export const CATEGORY_HERO_CONFIG: Partial<Record<string, { flipHero: boolean }>> = {
  basics: { flipHero: true },
  "muscle-gain": { flipHero: true },
  "body-recomposition": { flipHero: true },
  women: { flipHero: true },
};
