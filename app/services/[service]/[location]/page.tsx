import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/app/components/constants/services";
import { locations } from "@/app/components/constants/locations";
import { images } from "./images";
import { seededIndex } from "./seed";
import Link from "next/link";

export const servicesData: Record<string, string> = {
  "invisible-grills": "Invisible Grills",
  "balcony-safety-nets": "Balcony Safety Nets",
  "pigeon-safety-nets": "Pigeon Safety Nets",
  "anti-bird-nets": "Anti Bird Nets",
  "duct-area-safety-nets": "Duct Area Safety Nets",
  "safety-net-installation": "Safety Net Installation",
  "windows-safety-nets": "Windows Safety Nets",
  "balcon-safety-nets": "Balcony Safety Nets", // typo kept if needed
  "monkey-safety-nets": "Monkey Safety Nets",
  "sports-nets": "Sports Nets",
  "children-safety-nets": "Children Safety Nets",
};

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

type Props = {
  params: Promise<{
    service: string;
    location: string;
  }>;
};

const slugToTitle = (slug: string) =>
  slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const dynamicParams = false;

export async function generateStaticParams() {
  return services.flatMap((service) =>
    locations.map((location) => ({
      service,
      location,
    }))
  );
}

export default async function Page({ params }: Props) {
  const { service, location } = await params;
const serviceTitle = slugToTitle(service);

  if (!services.includes(service) || !locations.includes(location)) {
    notFound();
  }

  

  const hero =
    heroVariants[
      seededIndex(service + location, heroVariants.length)
    ];

  const description =
    descriptionVariants[
      seededIndex(location, descriptionVariants.length)
    ];

  const about =
    aboutVariants[
      seededIndex(service, aboutVariants.length)
    ];

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

  // ✅ RANDOM NEARBY LOCATIONS
  const nearby = [...locations]
    .filter((l) => l !== location)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <>
     

      <main className="bg-neutral-950 text-white">
         <Navbar />

    {/* HERO */}
    <section className="relative py-24 border-b border-white/10 bg-neutral-950 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-500/20 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* BADGE */}
          <span className="
            inline-block
            text-xs
            bg-orange-500/10
            text-orange-400
            px-3 py-1
            rounded-full
            mb-4
          ">
            Trusted Service in {location}
          </span>

          {/* HEADING */}
          <h1 className="
            text-4xl md:text-5xl font-bold leading-tight
          ">
            {hero({ service: slugToTitle(service), location })}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 text-neutral-400 text-lg max-w-lg">
            {description({ service: slugToTitle(service), location })}
          </p>

          {/* TRUST POINTS */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-neutral-300">
            <span>✔ Free Inspection</span>
            <span>✔ Affordable Pricing</span>
            <span>✔ Expert Installation</span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button className="
              bg-orange-500
              hover:bg-orange-600
              px-8 py-3
              rounded-lg
              font-medium
              shadow-lg shadow-orange-500/30
              transition
            ">
              Get Free Inspection
            </button>

            <a
              href="tel:+919876543210"
              className="
                px-8 py-3
                rounded-lg
                border border-white/10
                hover:bg-white/10
                transition
              "
            >
              Call Now
            </a>

          </div>

          {/* SOCIAL PROOF */}
          <p className="text-xs text-neutral-500 mt-6">
            ⭐ Rated by customers across {location}
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[420px]">

          <Image
            src={heroImage}
            alt={`${serviceTitle} installation in ${location}`}
            fill
            priority
            className="
              object-cover
              rounded-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
            "
          />

          {/* FLOATING BADGE */}
          <div className="
            absolute bottom-4 left-4
            bg-black/70
            backdrop-blur-md
            px-4 py-2
            rounded-lg
            text-sm
            border border-white/10
          ">
            ✔ 500+ Installations
          </div>

        </div>

      </div>
    </section>

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


       {/* NEARBY AREAS */}
      <section className="py-20 border-t border-white/10 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADING */}
          <div className="text-center mb-12">
            <h2 className="
              text-3xl md:text-4xl font-bold
              bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
            ">
              Areas We Serve Near {location}
            </h2>

            <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
              We provide {serviceTitle.toLowerCase()} services across {location} and nearby areas with fast installation and affordable pricing.
            </p>
          </div>

          {/* AREAS GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {nearby.map((area, i) => (
              <Link
                key={i}
                href={`/services/${service}/${area}`}
                className="
                  group
                  p-4
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  flex items-center justify-between
                  hover:bg-white/10
                  hover:-translate-y-1
                  transition duration-300
                "
              >

                {/* TEXT */}
                <div className="text-left">
                  <p className="text-sm text-neutral-400">
                    {serviceTitle}
                  </p>
                  <h3 className="font-semibold text-white">
                    {area}
                  </h3>
                </div>

                {/* ARROW */}
                <span className="
                  text-orange-400
                  transform transition
                  group-hover:translate-x-1
                ">
                  →
                </span>

              </Link>
            ))}

          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-neutral-400 mb-4">
              Looking for {serviceTitle.toLowerCase()} in your area?
            </p>

            <button className="
              bg-orange-500
              hover:bg-orange-600
              px-8 py-3
              rounded-lg
              font-medium
              transition-colors
            ">
              Contact for Nearby Service
            </button>
          </div>

        </div>
      </section>

      {/* PROCESS */}
    <section className="py-20 border-t border-white/10 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="
            text-3xl md:text-4xl font-bold
            bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
          ">
            Our Installation Process in {location}
          </h2>

          <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
            Simple, fast, and professional {serviceTitle.toLowerCase()} installation designed for safety and durability.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Book Inspection",
              desc: `Schedule a free inspection for ${serviceTitle.toLowerCase()} in ${location}. Our team will understand your requirements.`,
            },
            {
              title: "Site Measurement",
              desc: `We take accurate measurements and suggest the best solution for your balcony or windows.`,
            },
            {
              title: "Installation",
              desc: `Our experts complete installation quickly with high-quality materials ensuring long-lasting safety.`,
            },
          ].map((step, i) => (
            <div
              key={i}
              className="
                relative
                p-8
                bg-white/5
                border border-white/10
                rounded-2xl
                text-left
                transition
                hover:bg-white/10
                hover:-translate-y-1
                duration-300
              "
            >

              {/* STEP NUMBER */}
              <div className="
                absolute -top-4 -left-4
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-orange-500
                text-white
                font-bold
                shadow-lg
              ">
                {i + 1}
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-3 mt-2">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {step.desc}
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
            Book Free Inspection
          </button>
        </div>

      </div>
    </section>

      {/* MAP */}
        <section className="py-20 border-t border-white/10 bg-neutral-950">
          <div className="max-w-6xl mx-auto px-6">

            {/* HEADING */}
            <div className="text-center mb-10">
              <h2 className="
                text-3xl md:text-4xl font-bold
                bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
              ">
                {serviceTitle} Service in {location}
              </h2>

              <p className="text-neutral-400 mt-3 max-w-xl mx-auto">
                We provide professional {serviceTitle.toLowerCase()} installation services across {location} and nearby areas. Find our service coverage below.
              </p>
            </div>

            {/* MAP + INFO */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">

                  {/* MAP CARD */}
                  <div className="
                    rounded-2xl
                    overflow-hidden
                    border border-white/10
                    bg-white/5
                    shadow-lg
                  ">
                    <iframe
                      loading="lazy"
                      src={`https://maps.google.com/maps?q=${location}&z=13&output=embed`}
                      className="w-full h-[400px] border-0"
                    />
                  </div>

                  {/* INFO PANEL */}
                  <div className="
                    p-8
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                  ">

                    <h3 className="text-xl font-semibold mb-4">
                      Serving {location} & Nearby Areas
                    </h3>

                    <p className="text-neutral-400 mb-6 leading-relaxed">
                      Our team offers reliable and affordable {serviceTitle.toLowerCase()} services in {location}. We ensure safe installation for balconies, windows, and open spaces using high-quality materials.
                    </p>

                    {/* FEATURES */}
                    <ul className="space-y-3 text-sm text-neutral-300 mb-6">
                      <li>✔ Fast Installation</li>
                      <li>✔ Durable Materials</li>
                      <li>✔ Affordable Pricing</li>
                      <li>✔ Experienced Technicians</li>
                    </ul>

                    {/* CTA */}
                    <button className="
                      bg-orange-500
                      hover:bg-orange-600
                      px-6 py-3
                      rounded-lg
                      font-medium
                      transition-colors
                    ">
                      Get Location Service
                    </button>

                  </div>

                </div>
                
          </div>
        </section>

            {/* TESTIMONIALS */}
            <section className="py-20 border-t border-white/10 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-6 text-center">

                {/* HEADING */}
                <h2 className="
                  text-3xl md:text-4xl font-bold mb-4
                  bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
                ">
                  Customer Reviews in {location}
                </h2>

                <p className="text-neutral-400 max-w-xl mx-auto mb-12">
                  Trusted by hundreds of customers for {serviceTitle.toLowerCase()} installation in {location} and nearby areas.
                </p>

                {/* GRID */}
                <div className="grid md:grid-cols-3 gap-6">

                  {[
                    {
                      name: "Ravi Kumar",
                      text: `Excellent ${serviceTitle} service in ${location}. Installation was quick, clean, and very professional. Highly satisfied with the quality.`,
                    },
                    {
                      name: "Sneha Reddy",
                      text: `Best choice for balcony safety in ${location}. The materials are strong and the team was very responsive.`,
                    },
                    {
                      name: "Arjun Patel",
                      text: `Affordable pricing and great durability. If you're looking for ${serviceTitle.toLowerCase()} in ${location}, this is the right service.`,
                    },
                    {
                      name: "Kiran Rao",
                      text: `Very reliable service in ${location}. Installation was completed on time and looks very premium.`,
                    },
                    {
                      name: "Pooja Sharma",
                      text: `Safe and secure solution for kids and pets. Highly recommend ${serviceTitle.toLowerCase()} installation.`,
                    },
                    {
                      name: "Manoj Verma",
                      text: `Professional team with great attention to detail. One of the best services available in ${location}.`,
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="
                        p-6
                        bg-white/5
                        border border-white/10
                        rounded-2xl
                        text-left
                        transition
                        hover:bg-white/10
                        hover:-translate-y-1
                        duration-300
                      "
                    >

                      {/* ⭐ RATING */}
                      <div className="flex text-orange-400 mb-3 text-sm">
                        ★★★★★
                      </div>

                      {/* REVIEW TEXT */}
                      <p className="text-neutral-300 text-sm leading-relaxed mb-5">
                        "{r.text}"
                      </p>

                      {/* USER */}
                      <div className="flex items-center justify-between">

                        <div>
                          <h4 className="font-semibold text-white">{r.name}</h4>
                          <p className="text-xs text-neutral-500">
                            {location}
                          </p>
                        </div>

                        {/* VERIFIED BADGE */}
                        <span className="
                          text-xs
                          bg-green-500/10
                          text-green-400
                          px-2 py-1
                          rounded-md
                        ">
                          Verified
                        </span>

                      </div>

                    </div>
                  ))}

                </div>

              </div>
            </section>

       {/* FAQ */}
          <section className="bg-neutral-900 py-20 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6">

              <h2 className="
                text-3xl md:text-4xl font-bold text-center mb-12
                bg-gradient-to-r from-orange-400 to-indigo-400 bg-clip-text text-transparent
              ">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">

                {faqs.map((f: any, i: number) => (
                  <details
                    key={i}
                    className="
                      group
                      bg-white/5
                      border border-white/10
                      rounded-xl
                      p-5
                      transition
                      hover:bg-white/10
                    "
                  >
                    {/* QUESTION */}
                    <summary className="
                      flex justify-between items-center
                      cursor-pointer
                      list-none
                    ">

                      <span className="font-semibold text-lg">
                        {f.q}
                      </span>

                      {/* ICON */}
                      <span className="
                        ml-4
                        text-orange-400
                        transition-transform duration-300
                        group-open:rotate-180
                      ">
                        ▼
                      </span>
                    </summary>

                    {/* ANSWER */}
                    <p className="
                      mt-4
                      text-neutral-400
                      leading-relaxed
                      border-t border-white/10 pt-4
                    ">
                      {f.a}
                    </p>

                  </details>
                ))}

              </div>
            </div>
          </section>

        {/* CTA */}
        <section className="
          py-16 text-center
          bg-gradient-to-r
          from-orange-500/10
          via-transparent
          to-indigo-500/10
          border-t border-white/10
        ">
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