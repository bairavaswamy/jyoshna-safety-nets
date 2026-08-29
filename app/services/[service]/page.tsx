import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/app/components/ServiceDetailPage";
import {
  serviceBySlug,
  serviceCatalog,
} from "@/app/components/constants/serviceCatalog";

type Props = {
  params: Promise<{ service: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCatalog.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = serviceBySlug[slug];

  if (!service) return {};

  const title = `${service.title} in Bangalore | Jyoshna`;
  const description = `${service.cardDescription} See suitable applications, materials, project photos, and request a measured site quotation from Jyoshna.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://jyoshnainvisiblegrills.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://jyoshnainvisiblegrills.com/services/${slug}`,
      images: [{ url: service.images[0], alt: service.title }],
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { service: slug } = await params;
  const service = serviceBySlug[slug];

  if (!service) notFound();

  return <ServiceDetailPage service={service} location="Bangalore" />;
}
