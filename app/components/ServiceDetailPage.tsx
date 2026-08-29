import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { ServiceDetails } from "./constants/serviceCatalog";
import { serviceCatalog } from "./constants/serviceCatalog";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PHONE_NUMBER = "+918106420981";
const WHATSAPP_NUMBER = "919392372421";

type NearbyArea = {
  name: string;
  slug: string;
};

type Props = {
  service: ServiceDetails;
  location?: string;
  locationSlug?: string;
  nearbyAreas?: NearbyArea[];
};

const process = [
  {
    icon: MessageCircle,
    title: "Share photos",
    text: "Show us the full opening, corners, and surrounding surface so we can start with the right questions.",
  },
  {
    icon: Ruler,
    title: "Measure the site",
    text: "We confirm dimensions, fixing points, access, and the intended use before finalising the quotation.",
  },
  {
    icon: Wrench,
    title: "Fit the system",
    text: "The selected material is installed to the measured layout with attention to edges and finish.",
  },
  {
    icon: ShieldCheck,
    title: "Explain care",
    text: "You receive practical guidance on inspection, cleaning, and what to do if any part is damaged.",
  },
];

export default function ServiceDetailPage({
  service,
  location = "Bangalore",
  locationSlug,
  nearbyAreas = [],
}: Props) {
  const locationSuffix = location ? ` in ${location}` : "";
  const whatsappMessage = encodeURIComponent(
    `Hi, I would like a site inspection for ${service.title}${locationSuffix}.`,
  );
  const relatedServices = serviceCatalog
    .filter(({ slug }) => slug !== service.slug)
    .slice(0, 4);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title}${locationSuffix}`,
    serviceType: service.title,
    description: service.cardDescription,
    areaServed: {
      "@type": "Place",
      name: location,
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Jyoshna Invisible Grills: Balcony Safety Nets, Pigeon Safety Nets & Invisible Grills for Balcony in Bangalore",
      alternateName: "Jyoshna Invisible Grills",
      telephone: PHONE_NUMBER,
      url: "https://jyoshnainvisiblegrills.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "S 1st Rd, Duravani Nagar, Krishnarajapuram",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560016",
        addressCountry: "IN",
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=S%201st%20Rd%2C%20Duravani%20Nagar%2C%20Krishnarajapuram%2C%20Bengaluru%2C%20Karnataka%20560016",
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-5 text-sm text-white/45">
          <Link href="/" className="transition hover:text-yellow-400">Home</Link>
          <ChevronRight size={14} />
          <Link href="/#services" className="transition hover:text-yellow-400">Services</Link>
          <ChevronRight size={14} />
          {locationSlug ? (
            <>
              <Link href={`/services/${service.slug}`} className="transition hover:text-yellow-400">
                {service.title}
              </Link>
              <ChevronRight size={14} />
              <span className="text-white/75">{location}</span>
            </>
          ) : (
            <span className="text-white/75">{service.title}</span>
          )}
        </div>

        <section className="relative overflow-hidden border-y border-white/10 px-6 py-16 md:py-24">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/15 blur-[140px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-[140px]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">
                <MapPin size={14} /> Available in {location}
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">
                {service.title}
                <span className="block text-yellow-400">{locationSuffix}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
                {service.introduction}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-bold text-black transition hover:bg-yellow-300"
                >
                  <MessageCircle size={18} /> Request site visit
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/50 hover:bg-white/5"
                >
                  <Phone size={18} /> Call 81064 20981
                </a>
              </div>
            </div>

            <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <Image
                src={service.images[0]}
                alt={`${service.title} installation${locationSuffix}`}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/65 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-400">A useful starting point</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{service.recommendation}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e7] px-6 py-20 text-neutral-950 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">What we look at</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                The product is only one part of a good installation.
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Surface condition, span, edge details, exposure, access, and the
                purpose of the system all affect the final recommendation.
              </p>

              <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">Typical materials</p>
                <p className="mt-3 leading-7 text-neutral-700">{service.materials}</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl bg-neutral-950 p-7 text-white sm:col-span-2">
                <h3 className="text-xl font-semibold">Well suited for</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.idealFor.map((item) => (
                    <span key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/75">{item}</span>
                  ))}
                </div>
              </div>

              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm">
                  <span className="mt-0.5 rounded-full bg-yellow-400 p-1 text-black"><Check size={14} /></span>
                  <span className="font-medium leading-6 text-neutral-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">Installation details</p>
                <h2 className="mt-3 text-4xl font-bold md:text-5xl">See the finish up close.</h2>
              </div>
              <p className="max-w-lg text-sm leading-6 text-white/55">
                These project images show the type of work involved. Your layout
                will be measured and planned for the actual site.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {service.images.map((image, index) => (
                <div key={`${image}-${index}`} className={`relative overflow-hidden rounded-3xl border border-white/10 ${index === 0 ? "h-96 md:col-span-2" : "h-80 md:h-96"}`}>
                  <Image src={image} alt={`${service.title} example ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-2xl text-4xl font-bold md:text-5xl">How the work moves forward.</h2>
            <ol className="mt-10 grid overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4 md:gap-px">
              {process.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="bg-neutral-950 p-6">
                  <div className="flex items-center justify-between text-yellow-400">
                    <Icon size={22} />
                    <span className="text-xs font-bold text-white/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">Before you book</p>
              <h2 className="mt-4 text-4xl font-bold">Common questions.</h2>
            </div>
            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 open:border-yellow-400/30">
                  <summary className="cursor-pointer list-none pr-8 text-lg font-semibold marker:hidden">{faq.question}</summary>
                  <p className="mt-4 border-t border-white/10 pt-4 leading-7 text-white/60">{faq.answer}</p>
                </details>
              ))}
              <details className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 open:border-yellow-400/30">
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold marker:hidden">How is the price calculated?</summary>
                <p className="mt-4 border-t border-white/10 pt-4 leading-7 text-white/60">
                  Pricing depends on measurements, material, fixing surface,
                  access, and installation complexity. We confirm the quotation
                  after understanding the site instead of advertising a misleading flat price.
                </p>
              </details>
            </div>
          </div>
        </section>

        {nearbyAreas.length > 0 && (
          <section className="border-t border-white/10 bg-white/[0.025] px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-bold">Nearby service areas</h2>
              <p className="mt-3 text-white/55">Explore {service.title.toLowerCase()} availability near {location}.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyAreas.map((area) => (
                  <Link key={area.slug} href={`/services/${service.slug}/${area.slug}`} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-neutral-950 p-5 transition hover:border-yellow-400/35">
                    <span>{service.title} in {area.name}</span>
                    <ArrowRight size={17} className="text-yellow-400 transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-yellow-400 px-6 py-16 text-black">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em]">Need a recommendation?</p>
              <h2 className="mt-2 text-3xl font-bold md:text-5xl">Show us the space. We’ll help you choose.</h2>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white transition hover:bg-neutral-800">
              WhatsApp Jyoshna <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">Other services</p>
                <h2 className="mt-3 text-3xl font-bold">More ways we can help.</h2>
              </div>
              <Link href="/#services" className="hidden items-center gap-2 text-sm font-semibold text-yellow-400 sm:flex">View all <ArrowRight size={16} /></Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="relative h-40"><Image src={item.images[0]} alt={item.title} fill sizes="25vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="flex items-center justify-between p-5"><span className="font-semibold">{item.title}</span><ArrowRight size={16} className="text-yellow-400" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
