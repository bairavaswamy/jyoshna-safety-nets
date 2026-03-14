
type Props = {
  name: string       // Business name
  area: string       // Area served
  service: string    // Service name
  url: string        // Page URL
  phone?: string     // Optional
  email?: string     // Optional
}

export default function Schemas({ name, area, service, url, phone, email }: Props) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    areaServed: area,
    serviceType: service,
    url,
    ...(phone && { telephone: phone }),
    ...(email && { email })
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: url.split("/")[0] + "/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${url.split("/")[0]}/services`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service,
        item: url
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}