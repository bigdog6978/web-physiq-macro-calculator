/**
 * Consent storage with versioning, timestamp, and expiration.
 * Uses localStorage (strictly necessary for consent preference itself).
 */

import type { ConsentState } from "./consentTypes";
import {
  DEFAULT_CONSENT,
  CONSENT_STORAGE_KEY,
  CONSENT_EXPIRY_DAYS,
  CONSENT_VERSION,
} from "./consentTypes";

function isExpired(timestamp: string): boolean {
  const stored = new Date(timestamp).getTime();
  const expiry = stored + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() > expiry;
}

function isVersionMismatch(version: number): boolean {
  return version !== CONSENT_VERSION;
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (isExpired(parsed.timestamp) || isVersionMismatch(parsed.consent_version)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState): void {
  if (typeof window === "undefined") return;
  try {
    const toStore: ConsentState = {
      ...state,
      strictlyNecessary: true,
      consent_version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(toStore));
    window.dispatchEvent(new CustomEvent("consentChanged"));
  } catch {
    // Storage may be full or disabled
  }
}
