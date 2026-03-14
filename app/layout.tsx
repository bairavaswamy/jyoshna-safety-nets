import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider"; // New: Global theme provider
import { AnalyticsProvider } from "./components/AnalyticsProvider"; // New: For tracking user behavior
import NewsletterPopup from "./components/NewsletterPopup"; // New: Lead capture popup
import { Suspense } from "react";
import Loading from "./components/Loading"; // New: Loading spinner for better UX

const inter = Inter({ subsets: ["latin"] }); // Better font for readability

export const metadata: Metadata = {
  title: "Jyoshna Invisible Grills & Safety Nets | Premium Balcony Protection",
  description: "Expert installation of invisible grills and safety nets for balconies, windows, and ducts. Protect your family with durable, elegant solutions. Get a free quote today!",
  keywords: "invisible grills, safety nets, balcony protection, bird nets, anti-fall nets, apartment safety",
  authors: [{ name: "Jyoshna Safety Nets" }],
  openGraph: {
    title: "Jyoshna Invisible Grills & Safety Nets",
    description: "Premium safety solutions for homes and apartments. Free consultation available.",
    url: "https://jyoshnagrills.com",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687644-c7171b42498c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Invisible grills installation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyoshna Invisible Grills & Safety Nets",
    description: "Protect your balcony with premium invisible grills. Free quote now!",
    images: ["https://images.unsplash.com/photo-1600607687644-c7171b42498c?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Google Analytics Script (for tracking user time spent) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        {/* Structured Data for SEO (leads via better search visibility) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Jyoshna Safety Nets",
              url: "https://jyoshnagrills.com",
              logo: "https://jyoshnagrills.com/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9900000000",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.facebook.com/jyoshnagrills",
                "https://www.instagram.com/jyoshnagrills",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider> {/* New: Global dark mode support */}
          <AnalyticsProvider> {/* New: Track user interactions for engagement insights */}
            <Suspense fallback={<Loading />}> {/* New: Loading state to reduce bounce rate */}
              {children}
              <NewsletterPopup /> {/* New: Popup for lead capture (appears after 5s or on scroll) */}
            </Suspense>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}