/**
 * All favicon / PWA icon URLs map to files under `public/favicon/`.
 * Use these paths in metadata, redirects, and docs so nothing points elsewhere.
 */
export const FAVICON_PUBLIC_PREFIX = "/favicon" as const;

export const faviconPaths = {
  manifest: `${FAVICON_PUBLIC_PREFIX}/site.webmanifest`,
  ico: `${FAVICON_PUBLIC_PREFIX}/favicon.ico`,
  png32: `${FAVICON_PUBLIC_PREFIX}/favicon-32x32.png`,
  png16: `${FAVICON_PUBLIC_PREFIX}/favicon-16x16.png`,
  apple: `${FAVICON_PUBLIC_PREFIX}/apple-touch-icon.png`,
  android192: `${FAVICON_PUBLIC_PREFIX}/android-chrome-192x192.png`,
  android512: `${FAVICON_PUBLIC_PREFIX}/android-chrome-512x512.png`,
} as const;
