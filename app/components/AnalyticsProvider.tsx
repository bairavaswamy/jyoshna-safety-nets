"use client";

import { createContext, useContext, useMemo, useCallback } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

type AnalyticsContextType = {
  track: (event: string, params?: EventParams) => void;
  trackLead: (source?: string) => void;
  trackCall: () => void;
  trackWhatsApp: () => void;
  trackCTA: (name: string) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  
  const track = useCallback((event: string, params?: EventParams) => {
    if (typeof window === "undefined") return;

    if (window.gtag) {
      window.gtag("event", event, params);
    }

    // Debug log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", event, params);
    }
  }, []);

  const trackLead = useCallback((source?: string) => {
    track("generate_lead", { source });
  }, [track]);

  const trackCall = useCallback(() => {
    track("click_call", { method: "phone" });
  }, [track]);

  const trackWhatsApp = useCallback(() => {
    track("click_whatsapp", { method: "whatsapp" });
  }, [track]);

  const trackCTA = useCallback((name: string) => {
    track("cta_click", { cta_name: name });
  }, [track]);

  const value = useMemo(
    () => ({
      track,
      trackLead,
      trackCall,
      trackWhatsApp,
      trackCTA,
    }),
    [track, trackLead, trackCall, trackWhatsApp, trackCTA]
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);

  if (!ctx) {
    throw new Error("useAnalytics must be used inside AnalyticsProvider");
  }

  return ctx;
}