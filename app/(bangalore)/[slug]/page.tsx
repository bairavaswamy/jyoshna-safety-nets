import { services } from "@/app/data/services"
import { bangaloreAreas } from "@/app/data/bangaloreAreas"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import Hero from "../components/Hero"
import Stats from "../components/Stats"
import TrustBadges from "../components/TrustBadges"
import ProblemSolution from "../components/ProblemSolution"
import Features from "../components/Features"
import Gallery from "../components/Gallery"
import ServiceContent from "../components/ServiceContent"
import Reviews from "../components/Reviews"
import NearbyAreas from "../components/NearbyAreas"
import RelatedServices from "../components/RelatedServices"
import CTA from "../components/CTA"
import Schemas from "../components/Schemas"
import { ProductSchema } from "../components/ProductSchema"
import { ThumbnailSchema } from "../components/ThumbnailSchema"

type Params = {
  slug: string
}

type PageProps = {
  params: Promise<Params>
}

/* ---------------- LIMIT CONTROLS ---------------- */

const MAX_NEARBY_AREAS = 6
const MAX_RELATED_SERVICES = 6
const MAX_GALLERY_IMAGES = 6
const MAX_REVIEWS = 3

/* ---------------- GALLERY QUERIES ---------------- */

const galleryQueries = [
  "balcony safety net",
  "pigeon safety net balcony",
  "bird net balcony",
  "balcony protection net",
  "apartment balcony safety net",
  "building balcony exterior"
]

/* ---------------- REVIEWS ---------------- */

const reviews = [
  {
    name: "Rahul Sharma",
    review:
      "Excellent installation service. The team installed pigeon safety nets quickly and the quality is very strong."
  },
  {
    name: "Priya Reddy",
    review:
      "Very professional service. Our balcony is now completely safe for our children."
  },
  {
    name: "Arjun Patel",
    review:
      "Affordable price and fast installation. Highly recommended for safety nets."
  }
]

/* ---------------- SLUG PARSER ---------------- */

function parseSlug(slug: string) {
  if (!slug) return { serviceSlug: "", areaSlug: "" }

  const parts = slug.split("-in-")

  return {
    serviceSlug: parts[0],
    areaSlug: parts[1]
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const { slug } = await params

  const { serviceSlug, areaSlug } = parseSlug(slug)

  const service = services.find(s => s.slug === serviceSlug)
  const area = bangaloreAreas.find(a => a.slug === areaSlug)

  if (!service || !area) return {}

  const title = `${service.name} in ${area.name} | Balcony Safety Nets Installation`

  const description = `Looking for ${service.name.toLowerCase()} in ${area.name}? Our professional team installs UV resistant safety nets for balconies, apartments and buildings with fast installation and affordable pricing.`

  const url = `https://www.dummy.com/${service.slug}-in-${area.slug}`

  return {

    title,

    description,

    alternates: {
      canonical: url
    },

    openGraph: {
      title,
      description,
      url,
      type: "website"
    },

    twitter: {
      card: "summary_large_image",
      title,
      description
    }

  }

}

export default async function Page({ params }: PageProps): Promise<ReactNode> {

  const { slug } = await params

  const { serviceSlug, areaSlug } = parseSlug(slug)

  const service = services.find((s) => s.slug === serviceSlug)
  const area = bangaloreAreas.find((a) => a.slug === areaSlug)

  if (!service || !area) notFound()

  /* ---------------- NEARBY AREAS ---------------- */

  const nearbyAreas = bangaloreAreas
    .filter((a) => a.slug !== areaSlug)
    .filter((a) => a.zone === area.zone)
    .slice(0, MAX_NEARBY_AREAS)

  /* ---------------- RELATED SERVICES ---------------- */

  const relatedServices = services
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, MAX_RELATED_SERVICES)

  return (
    <main className="bg-[#0b0b0c] text-white overflow-hidden">

      {/* ---------------- BREADCRUMBS ---------------- */}

      <nav className="max-w-7xl mx-auto px-6 pt-10 text-sm text-gray-400">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/services">Services</Link>
        <span className="mx-2">/</span>
        <span>{service.name} in {area.name}</span>
      </nav>


      {/* ---------------- HERO ---------------- */}
        <Hero serviceName={service.name} areaName={area.name} />
      {/* ---------------- STATS ---------------- */}
        <Stats  title="Our Installation Experience"
  stats={[
    { value: "1200+", label: "Pigeon Nets Installed" },
    { value: "8+", label: "Years Experience" },
    { value: "24h", label: "Quick Installation" },
    { value: "100%", label: "Customer Satisfaction" }
  ]} />
      {/* ---------------- TRUST BADGES ---------------- */}
        <TrustBadges />
        {/* Problem Solution */}
        <ProblemSolution serviceName={service.name} areaName={area.name} />
      {/* ---------------- FEATURES ---------------- */}
        <Features serviceName={service.name} />
      {/* ---------------- GALLERY ---------------- */}
        <Gallery serviceName={service.name} areaName={area.name} queries={galleryQueries} maxImages={6} />
      {/* ---------------- CONTENT ---------------- */}
        <ServiceContent serviceName={service.name} areaName={area.name}/>
      {/* ---------------- REVIEWS ---------------- */}
        <Reviews reviews={reviews} max={3}/>
      {/* ---------------- NEARBY AREAS ---------------- */}
        <NearbyAreas  areaName={area.name} service={service} areas={nearbyAreas}/>
      {/* ---------------- RELATED SERVICES ---------------- */}
        <RelatedServices  service={service} relatedServices={relatedServices} areaSlug={area.slug} areaName={area.name} />
      {/* ---------------- CTA ---------------- */}
      <CTA serviceName={service.name} areaName={area.name} />
      {/* ---------------- SCHEMA ---------------- */}
       <Schemas 
        name="Jyoshna Safety Nets"
        area={area.name}
        service={service.name}
        url={`https://www.example.com/${service.slug}-in-${area.slug}`}
        phone="+919000000000"
        email="officail@jyoshnasafetynets.com"
       />
        {/* Product Schema */}
      <ProductSchema
        name={service.name}
        description={`Professional ${service.name.toLowerCase()} installation in ${area.name}. UV resistant, durable and safe.`}
        image={`https://source.unsplash.com/800x600/?${service.name}`}
        brand="Jyoshna Safety Nets"
        price="1500"
        url={`https://www.example.com/${service.slug}-in-${area.slug}`}
      />
       {/* Thumbnail / WebPage Schema */}
      <ThumbnailSchema
        pageTitle={`${service.name} in ${area.name}`}
        pageDescription={`Install premium ${service.name.toLowerCase()} in ${area.name}. Protect your balcony with Jyoshna Safety Nets.`}
        pageUrl={`https://www.example.com/${service.slug}-in-${area.slug}`}
        logoUrl="https://www.example.com/logo.png"
        thumbnailUrl={`https://source.unsplash.com/800x600/?${service.name}`}
      />

    </main>
  )
}