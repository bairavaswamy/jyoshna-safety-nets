export function generateLocalBusinessSchema(city: string, area: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Jyoshna Safety Nets`,
    areaServed: `${area.name}, ${city}`,
    description: `Professional safety net installation in ${area.name}, ${city}.`,
  };
}

export function generateFAQSchema(faq: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}