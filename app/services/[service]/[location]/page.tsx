import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/app/components/constants/services";
import { locations } from "@/app/components/constants/locations";
import { images } from "./images";
import { seededIndex } from "./seed";

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
  // ✅ unwrap params
  const { service, location } = await params;

  // ✅ validation
  if (!services.includes(service) || !locations.includes(location)) {
    notFound();
  }

  // ✅ content variants
  const hero = heroVariants[
    seededIndex(service + location, heroVariants.length)
  ];

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
    ctaVariants[seededIndex(location + "cta", ctaVariants.length)];

  const faqs =
    faqSets[seededIndex(service + location, faqSets.length)];

  // ✅ stable image selection
  const serviceImages = images[service] || [];
  const heroImage =
    serviceImages[
      seededIndex(service + location + "img", serviceImages.length)
    ];

  return (<>
  <Navbar />
    <main className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {hero({ service, location })}
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            {description({ service, location })}
          </p>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Get Free Inspection
          </button>
        </div>

        <div className="relative w-full h-[400px]">
          <Image
            src={heroImage}
            alt={`${service} ${location}`}
            fill
            className="object-cover rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            About Jyoshna Invisible Grills
          </h2>
          <p className="text-gray-600">{about()}</p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Pricing Information
          </h2>
          <p className="text-gray-600">{pricing({ service })}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          {faqs.map((f: any, i: number) => (
            <div key={f+i} className="mb-6 border-b pb-4">
              <h3 className="font-semibold text-lg">{f.q}</h3>
              <p className="text-gray-600 mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          {cta({ location })}
        </h2>

        <button className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold">
          Call Now
        </button>
      </section>

    </main>
          <Footer />
    </>
  );
}