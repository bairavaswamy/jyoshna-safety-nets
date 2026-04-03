import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import FloatingButtons from "@/app/components/FloatingButtons";

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
    url: "https://jyoshnainvisiblegrills.com",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://jyoshnainvisiblegrills.com/invisble-grills-installation.webp",
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
      <GoogleTagManager gtmId="GTM-MGM8HVBW" />
      <body className={`${inter.className} antialiased`}>
            {children}
            <FloatingButtons />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Jyoshna Safety Nets",
              url: "https://jyoshnainvisiblegrills.com",
              telephone: ["+918106420981", "+919392372421"],
              logo: "https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp",
               address: {
          "@type": "PostalAddress",
          addressLocality: "Visakhapatnam",
          addressRegion: "Andhra Pradesh",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.6868,
          longitude: 83.2185,
        },
        openingHours: "Mo-Su 00:00-23:59",
        areaServed: {
          "@type": "City",
          name: "Visakhapatnam",
        },
        priceRange: "20-500",
              sameAs: [
                "https://www.facebook.com/jyoshnainvisiblegrills",
                "https://www.instagram.com/jyoshnainvisiblegrills",
              ],
            }),
          }}
        />

      </body>
    </html>
  );
}