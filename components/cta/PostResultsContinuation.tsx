import { AppConversionCTA } from "@/components/cta/AppConversionCTA";

/**
 * Shown after a calculator result is received.
 * Single cohesive block — no duplicate messaging between text card + CTA.
 * The AppConversionCTA post_results variant owns all the copy.
 */
export function PostResultsContinuation() {
  return <AppConversionCTA placement="post_results" pageType="home" />;
}
