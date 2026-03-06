import { AppConversionCTA } from "@/components/cta/AppConversionCTA";

/**
 * Backward-compatible wrapper.
 * Prefer AppConversionCTA directly for placement-specific variants.
 */
export function AppCTA() {
  return <AppConversionCTA placement="bottom_page" pageType="seo" className="my-10" />;
}
