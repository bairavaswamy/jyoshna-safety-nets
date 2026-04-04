import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/app/components/constants/services";
import { images } from "./[location]/images";
import { seededIndex } from "./[location]/seed";
import Link from "next/link";
import { Metadata } from "next";

import {
  heroVariants,
  descriptionVariants,
  aboutVariants,
  pricingVariants,
  ctaVariants,
  faqSets,
} from "./content";

import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

// ✅ FIXED LOCATION
const LOCATION = "Visakhapatnam";

export const servicesData: Record<string, string> = {
  "invisible-grills": "Invisible Grills",
  "balcony-safety-nets": "Balcony Safety Nets",
  "pigeon-safety-nets": "Pigeon Safety Nets",
  "anti-bird-nets": "Anti Bird Nets",
  "duct-area-safety-nets": "Duct Area Safety Nets",
  "safety-net-installation": "Safety Net Installation",
  "windows-safety-nets": "Windows Safety Nets",
  "balcon-safety-nets": "Balcony Safety Nets",
  "monkey-safety-nets": "Monkey Safety Nets",
  "sports-nets": "Sports Nets",
  "children-safety-nets": "Children Safety Nets",
};

type Props = {
  params: Promise<{
    service: string;
  }>;
};

const slugToTitle = (slug: string) =>
  slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const dynamicParams = false;

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export async function generateStaticParams() {
  return services.map((service) => ({
    service: toSlug(service),
  }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;

  const serviceTitle =
    servicesData[service] || slugToTitle(service);

  const location = "Visakhapatnam";

  const title = `${serviceTitle} in ${location} | Jyoshna Safety Nets`;
  const description = `Looking for ${serviceTitle.toLowerCase()} in ${location}? We provide professional installation with affordable pricing, durable materials, and fast service across ${location}. Call now for free inspection.`;

  const keywords = [
    `${serviceTitle} in ${location}`,
    `${serviceTitle} price ${location}`,
    `${serviceTitle} near me`,
    "safety nets Visakhapatnam",
    "balcony safety nets Vizag",
    "pigeon nets Vizag",
    "invisible grills Vizag",
  ];

  return {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      url: `https://jyoshnainvisiblegrills.com/services/${service}`,
      siteName: "Jyoshna Safety Nets",
      images: [
        {
          url: "https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp",
          width: 1200,
          height: 630,
          alt: `${serviceTitle} in ${location}`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp"],
    },

    alternates: {
      canonical: `https://jyoshnainvisiblegrills.com/services/${service}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { service } = await params;
  const location = LOCATION;

  const serviceTitle = servicesData[service] || slugToTitle(service);

  if (!services.includes(service)) {
    notFound();
  }

  const hero =
    heroVariants[seededIndex(service + location, heroVariants.length)];

  const description =
    descriptionVariants[
      seededIndex(location, descriptionVariants.length)
    ];

  const about =
    aboutVariants[seededIndex(service, aboutVariants.length)];

  const pricing =
    pricingVariants[
      seededIndex(service + "price", pricingVariants.length)
    ];

  const cta =
    ctaVariants[
      seededIndex(location + "cta", ctaVariants.length)
    ];

  const faqs =
    faqSets[
      seededIndex(service + location, faqSets.length)
    ];

  const serviceImages = images[service] || [];
  const heroImage =
    serviceImages[
      seededIndex(service + location + "img", serviceImages.length)
    ];

  // ✅ STATIC AREAS (for SEO internal linking)
  const nearby = [
    "MVP Colony",
    "Gajuwaka",
    "Madhurawada",
    "Dwaraka Nagar",
    "Seethammadhara",
    "Rushikonda",
  ];




  return (
    <>
      <main className="bg-neutral-950 text-white">
        <Navbar />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Jyoshna Safety Nets",
      image: "https://jyoshnainvisiblegrills.com/jyoshna-invisible-grills-logo.webp",
      "@id": "https://jyoshnainvisiblegrills.com",
      url: "https://jyoshnainvisiblegrills.com",
      telephone: "+919876543210",
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
      areaServed: {
        "@type": "City",
        name: "Visakhapatnam",
      },
      serviceArea: {
        "@type": "Place",
        name: "Visakhapatnam",
      },
      description: `${serviceTitle} services in Visakhapatnam with expert installation and affordable pricing.`,
      priceRange: "20-500",
    }),
  }}
/>
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: serviceTitle,
      provider: {
        "@type": "LocalBusiness",
        name: "Jyoshna Safety Nets",
      },
      areaServed: {
        "@type": "City",
        name: "Visakhapatnam",
      },
      description: `Professional ${serviceTitle.toLowerCase()} installation in Visakhapatnam with affordable pricing and expert service.`,
    }),
  }}
/>

        {/* HERO */}
        <section className="relative py-24 border-b border-white/10 bg-neutral-950 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-500/20 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[180px]" />

          <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full mb-4">
                Trusted Service in {location}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {hero({ service: serviceTitle, location })}
              </h1>

              <p className="mt-6 text-neutral-400 text-lg max-w-lg">
                {description({ service: serviceTitle, location })}
              </p>

              <div className="flex flex-wrap gap-4 mt-6 text-sm text-neutral-300">
                <span>✔ Free Inspection</span>
                <span>✔ Affordable Pricing</span>
                <span>✔ Expert Installation</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-medium shadow-lg shadow-orange-500/30 transition">
                  Get Free Inspection
                </button>

                <a
                  href="tel:+919876543210"
                  className="px-8 py-3 rounded-lg border border-white/10 hover:bg-white/10 transition"
                >
                  Call Now
                </a>
              </div>

              <p className="text-xs text-neutral-500 mt-6">
                ⭐ Rated by customers across {location}
              </p>
            </div>

            <div className="relative w-full h-[420px]">
              <Image
                src={heroImage}
                alt={`${serviceTitle} installation in ${location}`}
                fill
                priority
                className="object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />

              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg text-sm border border-white/10">
                ✔ 500+ Installations
              </div>
            </div>
          </div>
        </section>

        {/* KEEP ALL OTHER SECTIONS SAME */}

        
              {/* ABOUT */}
              <section className="py-20 border-y border-white/10 bg-neutral-900">
                <div className="max-w-6xl mx-auto px-6">
        
                  {/* HEADING */}
                  <div className="text-center mb-12">
                    <h2 className="
                      text-3xl md:text-4xl font-bold
                      bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
                    ">
                      About Jyoshna {serviceTitle}
                    </h2>
        
                    <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
                      Trusted {servicesData[service]} experts serving {location} with high-quality installation and reliable service.
                    </p>
                  </div>
        
                  {/* CONTENT */}
                  <div className="grid md:grid-cols-2 gap-10 items-center">
        
                    {/* TEXT */}
                    <div className="text-neutral-400 leading-relaxed space-y-4">
                      <p>{about()}</p>
        
                      <p>
                        We focus on safety, durability, and modern design to ensure your home remains secure while maintaining a premium look.
                      </p>
                    </div>
        
                    {/* FEATURES CARD */}
                    <div className="
                      p-6
                      rounded-2xl
                      border border-white/10
                      bg-white/5
                    ">
                      <h3 className="text-lg font-semibold mb-4 text-white">
                        Why Customers Trust Us
                      </h3>
        
                      <ul className="space-y-3 text-sm text-neutral-300">
                        <li>✔ 5+ Years Experience</li>
                        <li>✔ High-Quality Materials</li>
                        <li>✔ Skilled Installation Team</li>
                        <li>✔ Affordable Pricing</li>
                        <li>✔ Service Across {location}</li>
                      </ul>
                    </div>
        
                  </div>
        
                </div>
              </section>
        
        {/* PRICING */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6">
        
                {/* HEADING */}
                <div className="text-center mb-12">
                  <h2 className="
                    text-3xl md:text-4xl font-bold
                    bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
                  ">
                    {serviceTitle} Price in {location}
                  </h2>
        
                  <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
                    Transparent and affordable pricing for {serviceTitle.toLowerCase()} installation in {location}.
                  </p>
                </div>
        
                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
        
                  {/* LEFT CONTENT */}
                  <div className="text-neutral-400 leading-relaxed space-y-4">
                    <p>{pricing({ service: servicesData[service] })}</p>
        
                    <p>
                      Pricing depends on area size, material type, and installation complexity. 
                      We provide customized quotes to ensure the best value for your needs.
                    </p>
        
                    <ul className="space-y-2 text-sm text-neutral-300">
                      <li>✔ No hidden charges</li>
                      <li>✔ Free inspection available</li>
                      <li>✔ Best price in {location}</li>
                      <li>✔ Quality guaranteed</li>
                    </ul>
                  </div>
        
                  {/* PRICE CARD */}
                  <div className="
                    p-8
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    text-center
                    hover:bg-white/10
                    transition
                  ">
        
                    <h3 className="text-lg font-semibold mb-3">
                      Starting Price
                    </h3>
        
                    <p className="text-4xl font-bold text-orange-400 mb-3">
                      ₹ Affordable
                    </p>
        
                    <p className="text-neutral-400 text-sm mb-6">
                      Contact us for exact pricing based on your requirements.
                    </p>
        
                    {/* CTA */}
                    <button className="
                      w-full
                      bg-orange-500
                      hover:bg-orange-600
                      py-3
                      rounded-lg
                      font-medium
                      shadow-lg shadow-orange-500/30
                      transition
                    ">
                      Get Free Quote
                    </button>
        
                    {/* EXTRA TRUST */}
                    <p className="text-xs text-neutral-500 mt-4">
                      ⚡ Quick response • Same day inspection available
                    </p>
        
                  </div>
        
                </div>
        
              </div>
            </section>
        
              {/* SEO CONTENT BLOCK */}
                <section className="py-20 border-t border-white/10 bg-neutral-900">
                  <div className="max-w-5xl mx-auto px-6">
        
                    {/* HEADING */}
                    <div className="text-center mb-10">
                      <h2 className="
                        text-3xl md:text-4xl font-bold
                        bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
                      ">
                        Best {serviceTitle} in {location}
                      </h2>
        
                      <p className="text-neutral-400 mt-3 max-w-2xl mx-auto">
                        Trusted experts providing high-quality {serviceTitle.toLowerCase()} services across {location} with safety, durability, and affordability.
                      </p>
                    </div>
        
                    {/* CONTENT GRID */}
                    <div className="grid md:grid-cols-2 gap-8">
        
                      {/* LEFT CONTENT */}
                      <div className="space-y-4 text-neutral-400 leading-relaxed">
                        <p>
                          Looking for reliable {serviceTitle.toLowerCase()} in {location}? Our team offers professional installation services designed to enhance safety and improve the appearance of your space.
                        </p>
        
                        <p>
                          We specialize in balcony safety nets, pigeon protection systems, and invisible grills suitable for homes, apartments, and commercial buildings in {location}.
                        </p>
        
                        <p>
                          With experienced technicians and high-quality materials, we ensure long-lasting performance and complete customer satisfaction.
                        </p>
                      </div>
        
                      {/* RIGHT FEATURES */}
                      <div className="
                        p-6
                        rounded-2xl
                        border border-white/10
                        bg-white/5
                      ">
                        <h3 className="font-semibold text-lg mb-4 text-white">
                          Why Our Service Stands Out
                        </h3>
        
                        <ul className="space-y-3 text-sm text-neutral-300">
                          <li>✔ Premium Quality Materials</li>
                          <li>✔ Expert Installation Team</li>
                          <li>✔ Affordable Pricing</li>
                          <li>✔ Fast Service Across {location}</li>
                          <li>✔ Suitable for Homes & Apartments</li>
                        </ul>
                      </div>
        
                    </div>
        
                    {/* CTA */}
                    <div className="text-center mt-12">
                      <p className="text-neutral-400 mb-4">
                        Get the best {serviceTitle.toLowerCase()} service in {location} today.
                      </p>
        
                      <button className="
                        bg-orange-500
                        hover:bg-orange-600
                        px-8 py-3
                        rounded-lg
                        font-medium
                        transition-colors
                      ">
                        Get Free Quote
                      </button>
                    </div>
        
                  </div>
                </section>
        
          {/* WHY CHOOSE US */}
                <section className="py-20 border-t border-white/10 bg-neutral-950">
                  <div className="max-w-6xl mx-auto px-6">
        
                    {/* HEADING */}
                    <div className="text-center mb-14">
                      <h2 className="
                        text-3xl md:text-4xl font-bold
                        bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
                      ">
                        Why Choose Our {serviceTitle} in {location}
                      </h2>
        
                      <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
                        We provide trusted and professional {serviceTitle.toLowerCase()} installation services with a focus on safety, quality, and customer satisfaction.
                      </p>
                    </div>
        
                    {/* GRID */}
                    <div className="grid md:grid-cols-3 gap-8">
        
                      {[
                        {
                          title: "Premium Quality Materials",
                          desc: `We use durable and high-strength materials for long-lasting ${serviceTitle.toLowerCase()} solutions in ${location}.`,
                          icon: "🛡️",
                        },
                        {
                          title: "Expert Installation Team",
                          desc: `Our skilled professionals ensure safe and precise installation tailored to your space.`,
                          icon: "👷",
                        },
                        {
                          title: "Affordable Pricing",
                          desc: `Get the best ${serviceTitle.toLowerCase()} services in ${location} at competitive and transparent pricing.`,
                          icon: "💰",
                        },
                        {
                          title: "Fast Service",
                          desc: `Quick response and same-day inspection available across ${location}.`,
                          icon: "⚡",
                        },
                        {
                          title: "Customized Solutions",
                          desc: `We provide tailored solutions for balconies, windows, and open spaces.`,
                          icon: "📐",
                        },
                        {
                          title: "Trusted by Customers",
                          desc: `Hundreds of satisfied customers trust our services for safety and reliability.`,
                          icon: "⭐",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="
                            p-6
                            rounded-2xl
                            border border-white/10
                            bg-white/5
                            text-left
                            transition
                            hover:bg-white/10
                            hover:-translate-y-1
                            duration-300
                          "
                        >
        
                          {/* ICON */}
                          <div className="text-2xl mb-3">
                            {item.icon}
                          </div>
        
                          {/* TITLE */}
                          <h3 className="text-lg font-semibold mb-2">
                            {item.title}
                          </h3>
        
                          {/* DESCRIPTION */}
                          <p className="text-neutral-400 text-sm leading-relaxed">
                            {item.desc}
                          </p>
        
                        </div>
                      ))}
        
                    </div>
        
                    {/* CTA */}
                    <div className="text-center mt-14">
                      <button className="
                        bg-orange-500
                        hover:bg-orange-600
                        px-8 py-3
                        rounded-lg
                        font-medium
                        transition-colors
                      ">
                        Get Free Inspection
                      </button>
                    </div>
        
                  </div>
                </section>

        {/* ONLY CHANGE BELOW (Nearby links fix) */}

        {/* NEARBY AREAS */}
        <section className="py-20 border-t border-white/10 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent">
                Areas We Serve Near {location}
              </h2>

              <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
                We provide {serviceTitle.toLowerCase()} services across {location} and nearby areas with fast installation and affordable pricing.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nearby.map((area, i) => (
                <Link
                  key={i}
                  href={`/services/${service}`}
                  className="group p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between hover:bg-white/10 hover:-translate-y-1 transition duration-300"
                >
                  <div className="text-left">
                    <p className="text-sm text-neutral-400">
                      {serviceTitle}
                    </p>
                    <h3 className="font-semibold text-white">{area}</h3>
                  </div>

                  <span className="text-orange-400 transform transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 text-center bg-gradient-to-r from-orange-500/10 via-transparent to-indigo-500/10 border-t border-white/10">
          <h2 className="text-3xl font-bold">
            {cta({ location })}
          </h2>

          <button className="mt-6 bg-orange-500 px-8 py-3 rounded-lg font-semibold shadow-lg shadow-orange-500/40 hover:bg-orange-600 transition">
            Call Now
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}