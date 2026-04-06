/**
 * Canonical site origin for metadataBase, Open Graph, and absolute URLs.
 * In local dev without NEXT_PUBLIC_BASE_URL, use localhost so assets (e.g. favicons)
 * load from the dev server instead of production.
 */
export function getSiteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://physiqmacros.com";
}
