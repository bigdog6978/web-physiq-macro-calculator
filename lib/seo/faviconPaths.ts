/**
 * All favicon / PWA icon URLs map to files under `public/favicon/`.
 * Use these paths in metadata, redirects, and docs so nothing points elsewhere.
 *
 * **Cache bust:** Browsers and CDNs cache favicons aggressively. After replacing
 * files in `public/favicon/`, bump `FAVICON_CACHE_QUERY` so `<link rel="icon">`
 * URLs change and clients fetch the new assets.
 */
export const FAVICON_PUBLIC_PREFIX = "/favicon" as const;

/** Change whenever you ship new favicon files (keep `site.webmanifest` icon `src` query in sync). */
export const FAVICON_CACHE_QUERY = "?v=chartreuse-20260406" as const;

const q = FAVICON_CACHE_QUERY;

export const faviconPaths = {
  manifest: `${FAVICON_PUBLIC_PREFIX}/site.webmanifest`,
  ico: `${FAVICON_PUBLIC_PREFIX}/favicon.ico${q}`,
  png32: `${FAVICON_PUBLIC_PREFIX}/favicon-32x32.png${q}`,
  png16: `${FAVICON_PUBLIC_PREFIX}/favicon-16x16.png${q}`,
  apple: `${FAVICON_PUBLIC_PREFIX}/apple-touch-icon.png${q}`,
  android192: `${FAVICON_PUBLIC_PREFIX}/android-chrome-192x192.png${q}`,
  android512: `${FAVICON_PUBLIC_PREFIX}/android-chrome-512x512.png${q}`,
} as const;
