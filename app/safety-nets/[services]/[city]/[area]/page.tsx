import { locations } from "@/lib/locationsData";
import { notFound } from "next/navigation";
import { generateAreaContent } from "@/lib/contentGenerator";
import { generateMetadataContent } from "@/lib/seoGenerator";
import { generateFAQ } from "@/lib/faqGenerator";
import {
  generateLocalBusinessSchema,
  generateFAQSchema,
} from "@/lib/schemaGenerator";
import { getRelatedAreas } from "@/lib/internalLinks";
import Link from "next/link";

export async function generateStaticParams() {
  const paths = [];

  for (const cityKey of Object.keys(locations)) {
    const city = locations[cityKey as keyof typeof locations];

    for (const areaKey of Object.keys(city.areas)) {
      paths.push({
        city: cityKey,
        area: areaKey,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: any) {
  const { city, area } = await params;

  const cityData = locations[city as keyof typeof locations];
  const areaData = cityData?.areas[area as keyof typeof cityData.areas];

  if (!cityData || !areaData) return {};

  return generateMetadataContent(cityData.name, areaData);
}

export default async function AreaPage({ params }: any) {
  const { city, area } = await params;

  const cityData = locations[city as keyof typeof locations];
  if (!cityData) return notFound();

  const areaData = cityData.areas[area as keyof typeof cityData.areas];
  if (!areaData) return notFound();

  const content = generateAreaContent(cityData.name, areaData);
  const faq = generateFAQ(cityData.name, areaData);
  const related = getRelatedAreas(city, area);

  const localSchema = generateLocalBusinessSchema(cityData.name, areaData);
  const faqSchema = generateFAQSchema(faq);

  return (
    <main className="bg-gray-50">

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          {content.hero}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg opacity-90">
          Professional balcony, child and pigeon safety nets in {areaData.name}, {cityData.name}.
        </p>

        <div className="mt-8">
          <a
            href="tel:8100000000"
            className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Call Now for Free Inspection
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Safety Nets Services in {areaData.name}
        </h2>

        <p className="text-lg leading-8 text-gray-700 mb-6">
          {content.intro}
        </p>

        <p className="text-lg leading-8 text-gray-700">
          {content.localProblem}
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Our Safety Net Services in {areaData.name}
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            {content.services}
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Our Installation Process
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            {content.process}
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            {content.materialQuality}
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Us in {areaData.name}?
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            {content.whyChooseUs}
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Pricing of Safety Nets in {areaData.name}
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            {content.pricingInfo}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer group"
            >
              <summary className="font-semibold text-lg flex justify-between items-center">
                {item.question}
                <span className="group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-7">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED AREAS */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Nearby Areas in {cityData.name}
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {related.map((item: any) => (
              <Link
                key={item.slug}
                href={`/safety-nets/${city}/${item.slug}`}
                className="bg-blue-100 text-blue-800 px-5 py-2 rounded-full hover:bg-blue-200 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-900 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Book Safety Net Installation in {areaData.name} Today
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg opacity-90">
          Protect your family with durable balcony and child safety nets in {areaData.name}, {cityData.name}.
        </p>

        <div className="mt-8">
          <a
            href="tel:8100000000"
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Call Now
          </a>
        </div>
      </section>
            <a
            href="https://wa.me/916301838456"
            target="_blank"
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
          >
            WhatsApp
          </a>
    </main>
  );
}