"use client";

import Script from "next/script";

export default function GoogleAds() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
      strategy="afterInteractive"
    />
  );
}