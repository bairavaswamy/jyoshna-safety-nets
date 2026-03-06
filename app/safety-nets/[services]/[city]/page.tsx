import { locations } from "@/lib/locationsData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generateLocalBusinessSchema } from "@/lib/schemaGenerator";

export async function generateStaticParams() {
  return Object.keys(locations).map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: any) {
  const { city } = await params;
  const cityData = locations[city as keyof typeof locations];

  if (!cityData) return {};

  return {
    title: `Safety Nets in ${cityData.name} | Balcony & Child Safety Nets`,
    description: `Professional balcony, child, and pigeon safety nets installation services in ${cityData.name}. Affordable pricing and expert fitting.`,
  };
}

export default async function CityPage({ params }: any) {
  const { city } = await params;

  const cityData = locations[city as keyof typeof locations];
  if (!cityData) return notFound();

  const areas = Object.values(cityData.areas);

  const localSchema = generateLocalBusinessSchema(cityData.name, {
    name: cityData.name,
  });

  return (
    <main className="bg-gray-50">

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Safety Nets in {cityData.name}
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg opacity-90">
          Professional balcony safety nets, child protection nets, and pigeon
          safety net installation services across {cityData.name}.
        </p>

        <div className="mt-8">
          <a
            href="tel:8100000000"
            className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Call Now
          </a>
        </div>
      </section>

      {/* INTRO CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6">
          Trusted Safety Net Installation in {cityData.name}
        </h2>

        <p className="text-lg leading-8 text-gray-700 mb-6">
          {cityData.name} is one of the fastest growing residential cities.
          With increasing apartment culture and high-rise buildings, balcony
          and window safety has become essential. We provide professional safety
          net installation across all major residential and commercial areas.
        </p>

        <p className="text-lg leading-8 text-gray-700">
          Our team installs high-quality UV protected nylon safety nets that
          ensure complete protection for children, pets, and elderly family
          members. We cover every major locality in {cityData.name}.
        </p>
      </section>

      {/* AREAS GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Areas We Serve in {cityData.name}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {areas.map((area: any) => (
              <Link
                key={area.slug}
                href={`/safety-nets/${city}/${area.slug}`}
                className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Safety Nets in {area.name}
                </h3>

                <p className="text-gray-600">
                  Professional balcony and child safety nets installation in{" "}
                  {area.name}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose Us in {cityData.name}?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-xl">Experienced Team</h3>
              <p className="mt-4 text-gray-600">
                Skilled professionals with years of installation experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-xl">Premium Quality Nets</h3>
              <p className="mt-4 text-gray-600">
                Durable, UV-protected and long-lasting materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-xl">Affordable Pricing</h3>
              <p className="mt-4 text-gray-600">
                Transparent and competitive pricing across all areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-900 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Book Safety Net Installation in {cityData.name}
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg opacity-90">
          Contact us today for fast and reliable safety net installation
          anywhere in {cityData.name}.
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

    </main>
  );
}