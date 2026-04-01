import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Contact Jyoshna Safety Nets | Call for Free Inspection",
  description:
    "Contact Jyoshna Safety Nets for balcony safety nets, pigeon nets, and invisible grills installation in Visakhapatnam. Call now for free inspection and fast service.",

  keywords: [
    "contact safety nets",
    "safety nets Visakhapatnam contact",
    "balcony safety nets phone number",
    "pigeon nets near me contact",
    "invisible grills contact",
  ],

  metadataBase: new URL("https://jyoshnainvisiblegrills.com"),

  alternates: {
    canonical: "https://jyoshnainvisiblegrills.com/contact",
  },

  openGraph: {
    title: "Contact Jyoshna Safety Nets",
    description:
      "Call or message Jyoshna Safety Nets for expert installation services.",
    url: "https://jyoshnainvisiblegrills.com/contact",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://jyoshnainvisiblegrills.com/invisble-grills-installation.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Jyoshna Safety Nets",
    description: "Get in touch for safety nets installation.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Jyoshna Safety Nets",
      url: "https://jyoshnainvisiblegrills.com/contact",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Jyoshna Safety Nets",
      url: "https://jyoshnainvisiblegrills.com",
      logo: "https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp",
      telephone: ["+918106420981", "+919392372421"],
      email: "jyoshainvisiblegrills@gmail.com",
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
      priceRange: "20-500",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jyoshna Safety Nets",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+918106420981",
          contactType: "customer service",
          availableLanguage: ["English", "Telugu"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Action",
      name: "Contact via WhatsApp",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://wa.me/918106420981",
      },
    },
  ];

  return (
    <>
      {/* ✅ JSON-LD Schema */}
      <Script
        id="contact-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {children}
    </>
  );
}