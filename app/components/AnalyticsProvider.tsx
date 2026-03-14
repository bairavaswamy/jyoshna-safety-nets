"use client";

import { createContext, useContext, useMemo } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type AnalyticsContextValue = {
  trackEvent: (event: string, data?: any) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  trackEvent: () => {
    // no-op by default
  },
});

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo<AnalyticsContextValue>(
    () => ({
      trackEvent(event, data) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", event, data);
        }
      },
    }),
    []
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export const useAnalytics = () => useContext(AnalyticsContext);