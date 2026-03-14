type ThumbnailSchemaProps = {
  pageTitle: string
  pageDescription: string
  pageUrl: string
  logoUrl: string
  thumbnailUrl?: string
}

export function ThumbnailSchema({ pageTitle, pageDescription, pageUrl, logoUrl, thumbnailUrl }: ThumbnailSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: pageUrl,
    description: pageDescription,
    ...(thumbnailUrl && { image: thumbnailUrl }),
    publisher: {
      "@type": "Organization",
      name: pageTitle,
      logo: {
        "@type": "ImageObject",
        url: logoUrl
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}