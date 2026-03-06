"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/client";
import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics/events";

interface TrackEventOnMountProps {
  event: AnalyticsEventName;
  payload?: AnalyticsPayload;
}

/**
 * Fires a single analytics event on first mount only.
 *
 * The payload is captured via ref so callers that pass an inline object literal
 * (e.g. `payload={{ page: "privacy" }}`) don't cause the effect to re-run on
 * every render due to a new object reference.
 */
export function TrackEventOnMount({ event, payload }: TrackEventOnMountProps) {
  const firedRef = useRef(false);
  const payloadRef = useRef(payload);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackEvent(event, payloadRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return null;
}
