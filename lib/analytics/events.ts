export type AnalyticsEventName =
  | "calculator_submitted"
  | "app_cta_clicked"
  | "sticky_cta_clicked"
  | "newsletter_submitted"
  | "legal_page_viewed"
  | "ad_slot_rendered";

export type AnalyticsPayload = Record<string, string | number | boolean>;
