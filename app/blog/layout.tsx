import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Safety Nets & Invisible Grills Blog | Jyoshna Safety Nets",
  description:
    "Explore expert guides on invisible grills, balcony safety nets, and bird protection systems. Learn installation tips, safety benefits, and solutions for modern homes.",

  keywords: [
    "invisible grills blog",
    "safety nets blog",
    "balcony safety tips",
    "pigeon nets guide",
    "home safety solutions",
  ],

  metadataBase: new URL("https://jyoshnainvisiblegrills.com"),

  alternates: {
    canonical: "https://jyoshnainvisiblegrills.com/blog",
  },

  openGraph: {
    title: "Safety Nets & Invisible Grills Blog",
    description:
      "Expert guides and tips for balcony safety, invisible grills, and bird nets.",
    url: "https://jyoshnainvisiblegrills.com/blog",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://jyoshnainvisiblegrills.com/cards/invisble-grills-installation-near-me.webp",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Safety Nets Blog",
    description: "Guides on safety nets and invisible grills.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogs = [
    {
      slug: "/services/invisible-grills",
      title: "Complete Guide to Invisible Grills for Modern Homes",
      desc: "Learn how invisible grills improve safety while keeping your home stylish.",
      img: "/cards/invisble-grills-installation-near-me.webp",
    },
    {
      slug: "/services/balcony-safety-nets",
      title: "Why Balcony Safety Nets Are Essential for Apartments",
      desc: "Protect your family with balcony safety net solutions.",
      img: "/cards/balcony-safety-nets-near-me.webp",
    },
    {
      slug: "/services/anti-bird-nets",
      title: "Best Anti Bird Net Solutions for Homes",
      desc: "Stop pigeons and birds effectively.",
      img: "/cards/anti-bird-net.webp",
    },
  ];

  const schema = [
    // ✅ Blog
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Jyoshna Safety Nets Blog",
      url: "https://jyoshnainvisiblegrills.com/blog",
    },

    // ✅ Articles
    ...blogs.map((b) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: b.title,
      description: b.desc,
      image: `https://jyoshnainvisiblegrills.com${b.img}`,
      author: {
        "@type": "Organization",
        name: "Jyoshna Safety Nets",
      },
      publisher: {
        "@type": "Organization",
        name: "Jyoshna Safety Nets",
        logo: {
          "@type": "ImageObject",
          url: "https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://jyoshnainvisiblegrills.com${b.slug}`,
      },
    })),

    // ✅ Breadcrumb
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://jyoshnainvisiblegrills.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://jyoshnainvisiblegrills.com/blog",
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}