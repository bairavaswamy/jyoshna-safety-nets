import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./components/ThemeProvider";
import { AnalyticsProvider } from "./components/AnalyticsProvider";

import GA from "./components/analytics/GoogleAnalytics";
import Clarity from "./components/analytics/Clarity";
import PageTracker from "./components/analytics/PageTracker";

import NewsletterPopup from "./components/NewsletterPopup";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jyoshna Invisible Grills & Safety Nets | Premium Balcony Protection",
  description:
    "Expert installation of invisible grills and safety nets for balconies, windows, and ducts. Protect your family with durable, elegant solutions.",
  keywords: [
    "invisible grills",
    "safety nets",
    "balcony safety nets",
    "bird nets",
    "anti fall nets",
  ],
  authors: [{ name: "Jyoshna Safety Nets" }],

  openGraph: {
    title: "Jyoshna Invisible Grills & Safety Nets",
    description:
      "Premium safety solutions for balconies and apartments.",
    url: "https://jyoshnagrills.com",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498c",
        width: 1200,
        height: 630,
        alt: "Invisible grills installation",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jyoshna Invisible Grills",
    description: "Premium balcony safety solutions.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>

        <ThemeProvider>

          <AnalyticsProvider>

            {/* Page analytics tracking */}
            <PageTracker />

            {children}

            {/* Lead capture */}
            <NewsletterPopup />

          </AnalyticsProvider>

        </ThemeProvider>

        {/* Analytics scripts load AFTER page interactive */}
        <GA />
        <Clarity />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Jyoshna Safety Nets",
              url: "https://jyoshnagrills.com",
              telephone: "+91-9900000000",
              logo: "https://jyoshnagrills.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/jyoshnagrills",
                "https://www.instagram.com/jyoshnagrills",
              ],
            }),
          }}
        />

      </body>
    </html>
  );
}