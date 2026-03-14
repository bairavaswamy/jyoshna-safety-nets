type ProductProps = {
  name: string
  description: string
  image: string
  brand?: string
  price?: string
  currency?: string
  url: string
}

export function ProductSchema({ name, description, image, brand, price, currency = "INR", url }: ProductProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    offers: price ? {
      "@type": "Offer",
      url,
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock"
    } : undefined
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}