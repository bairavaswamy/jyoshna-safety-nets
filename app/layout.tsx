import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import FloatingButtons from "@/app/components/FloatingButtons";

const siteUrl = "https://jyoshnainvisiblegrills.com";
const bangaloreMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=S%201st%20Rd%2C%20Duravani%20Nagar%2C%20Krishnarajapuram%2C%20Bengaluru%2C%20Karnataka%20560016";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Jyoshna Invisible Grills & Safety Nets | Premium Balcony Protection",
    template: "%s | Jyoshna Invisible Grills",
  },

  description:
    "Invisible grills, safety nets, bird-control systems, sports nets, and ceiling cloth hanger installation across Bangalore, with service also available in Visakhapatnam and selected Andhra Pradesh areas.",

  keywords: [
    "invisible grills",
    "safety nets",
    "balcony safety nets",
    "bird nets",
    "pigeon nets",
    "anti fall nets",
    "invisible grills in Bangalore",
    "balcony safety nets in Bangalore",
    "safety nets in Visakhapatnam",
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
      "Measured invisible grills, safety nets, bird-control systems, sports nets, and cloth hanger installation across Bangalore.",
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
      "Invisible grills, safety nets, bird control, sports nets, and ceiling cloth hangers across Bangalore.",
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
  name: "Jyoshna Invisible Grills: Balcony Safety Nets, Pigeon Safety Nets & Invisible Grills for Balcony in Bangalore",
  alternateName: "Jyoshna Invisible Grills",
  url: siteUrl,
  telephone: ["+918106420981", "+919392372421"],
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/opengraph-image.webp`,
  description:
    "Jyoshna Invisible Grills provides invisible grills, balcony safety nets, pigeon nets, children safety nets, duct nets, sports nets, and ceiling cloth hangers across Bangalore and Visakhapatnam.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "S 1st Rd, Duravani Nagar, Krishnarajapuram",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560016",
    addressCountry: "IN",
  },
  hasMap: bangaloreMapsUrl,
  areaServed: [
    {
      "@type": "City",
      name: "Visakhapatnam",
    },
    {
      "@type": "City",
      name: "Bangalore",
    },
    {
      "@type": "Place",
      name: "Vizag",
    },
  ],
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

      <body className="antialiased">
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
