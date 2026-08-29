import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/app/components/ServiceDetailPage";
import {
  serviceBySlug,
  serviceCatalog,
} from "@/app/components/constants/serviceCatalog";
import {
  bangaloreLocations,
  locations,
} from "@/app/components/constants/locations";
import { locationSlug } from "@/app/components/constants/commons";

type Props = {
  params: Promise<{ service: string; location: string }>;
};

export const dynamicParams = false;

const uniqueLocations = Array.from(
  new Map(locations.map((name) => [locationSlug(name), name])).entries(),
).map(([slug, name]) => ({ slug, name }));

const bangaloreLocationSlugs = new Set(
  bangaloreLocations.map((name) => locationSlug(name)),
);

export function generateStaticParams() {
  return serviceCatalog.flatMap(({ slug: service }) =>
    uniqueLocations.map(({ slug: location }) => ({ service, location })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceSlug, location: requestedLocation } = await params;
  const service = serviceBySlug[serviceSlug];
  const location = uniqueLocations.find(({ slug }) => slug === requestedLocation);

  if (!service || !location) return {};

  const title = `${service.title} in ${location.name} | Jyoshna`;
  const description = `${service.cardDescription} View materials, suitable uses, installation details, and request a measured quotation in ${location.name}.`;
  const url = `https://jyoshnainvisiblegrills.com/services/${serviceSlug}/${location.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: service.images[0], alt: `${service.title} in ${location.name}` }],
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { service: serviceSlug, location: requestedLocation } = await params;
  const service = serviceBySlug[serviceSlug];
  const locationIndex = uniqueLocations.findIndex(({ slug }) => slug === requestedLocation);

  if (!service || locationIndex < 0) notFound();

  const location = uniqueLocations[locationIndex];
  const isBangaloreArea = bangaloreLocationSlugs.has(location.slug);
  const locationGroup = uniqueLocations.filter(({ slug }) =>
    isBangaloreArea
      ? bangaloreLocationSlugs.has(slug)
      : !bangaloreLocationSlugs.has(slug),
  );
  const groupIndex = locationGroup.findIndex(({ slug }) => slug === location.slug);
  const nearbyAreas = Array.from(
    { length: Math.min(6, locationGroup.length - 1) },
    (_, offset) => locationGroup[(groupIndex + offset + 1) % locationGroup.length],
  );

  return (
    <ServiceDetailPage
      service={service}
      location={location.name}
      locationSlug={location.slug}
      nearbyAreas={nearbyAreas}
    />
  );
}
