import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import FloatingButtons from "@/app/components/FloatingButtons";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jyoshnainvisiblegrills.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Jyoshna Invisible Grills & Safety Nets | Premium Balcony Protection",
    template: "%s | Jyoshna Invisible Grills",
  },

  description:
    "Expert installation of invisible grills and safety nets for balconies, windows, and ducts in Visakhapatnam. Protect your family with durable, elegant balcony safety solutions.",

  keywords: [
    "invisible grills",
    "safety nets",
    "balcony safety nets",
    "bird nets",
    "pigeon nets",
    "anti fall nets",
    "invisible grills in Visakhapatnam",
    "balcony safety nets in Vizag",
  ],

  authors: [{ name: "Jyoshna Invisible Grills" }],
  creator: "Jyoshna Invisible Grills",
  publisher: "Jyoshna Invisible Grills",

  applicationName: "Jyoshna Invisible Grills",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: ["/favicon.ico"],
  },

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Jyoshna Invisible Grills & Safety Nets",
    description:
      "Premium invisible grills and safety net installation for balconies, windows, ducts, and apartments in Visakhapatnam.",
    url: siteUrl,
    siteName: "Jyoshna Invisible Grills",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Jyoshna Invisible Grills and Safety Nets installation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jyoshna Invisible Grills",
    description:
      "Premium invisible grills and balcony safety net solutions in Visakhapatnam.",
    images: ["/opengraph-image.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: "Jyoshna Invisible Grills",
  alternateName: "Jyoshna Safety Nets",
  url: siteUrl,
  telephone: ["+918106420981", "+919392372421"],
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/opengraph-image.webp`,
  description:
    "Jyoshna Invisible Grills provides invisible grills, balcony safety nets, pigeon nets, children safety nets, duct nets, and apartment safety solutions in Visakhapatnam.",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Visakhapatnam",
    },
    {
      "@type": "Place",
      name: "Vizag",
    },
  ],
  priceRange: "₹₹",
  sameAs: [
    "https://www.facebook.com/share/1bcXPJGhhL/",
    "https://www.instagram.com/jyoshnainvisiblegrills",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-MGM8HVBW" />

      <body className={`${inter.className} antialiased`}>
        {children}
        <FloatingButtons />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}