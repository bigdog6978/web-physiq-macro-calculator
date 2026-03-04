/**
 * Consent types for GDPR/ePrivacy/CCPA compliance.
 * Strictly necessary = always on (consent storage only).
 * Analytics + Advertising = require explicit consent.
 */

export interface ConsentState {
  strictlyNecessary: boolean; // Always true, for storing consent preference
  analytics: boolean;
  advertising: boolean;
  consent_version: number;
  timestamp: string; // ISO string
  region_hint?: string; // Placeholder for future geolocation
}

export const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: ConsentState = {
  strictlyNecessary: true,
  analytics: false,
  advertising: false,
  consent_version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
};

export const CONSENT_STORAGE_KEY = "physiq_consent";
export const CONSENT_EXPIRY_DAYS = 180;
