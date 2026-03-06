import { locations } from "@/lib/locationsData";
import Link from "next/link";

export const metadata = {
  title: "Safety Nets in Andhra Pradesh | Balcony & Child Safety Nets",
  description:
    "Professional balcony safety nets, child safety nets, and pigeon nets installation services across Andhra Pradesh cities.",
};

export default function SafetyNetsMainPage() {
  const cities = Object.values(locations);

  return (
    <main className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Andhra’s Trusted Safety Nets Installation Experts
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg opacity-90">
          We provide professional balcony safety nets, child protection nets,
          pigeon nets, and duct area safety nets installation services across
          major cities in Andhra Pradesh.
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

      {/* INTRO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">
          Professional Balcony & Child Safety Nets Services
        </h2>

        <p className="text-lg leading-8 text-gray-700 mb-6">
          With increasing apartment culture and high-rise residential buildings,
          balcony safety has become essential. Our safety nets ensure complete
          protection for children, pets, and elderly family members.
        </p>

        <p className="text-lg leading-8 text-gray-700">
          We install UV-protected, durable nylon nets with professional
          drilling and strong knotless fitting for long-lasting safety.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Safety Net Services
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Balcony Safety Nets
              </h3>
              <p className="text-gray-600">
                Prevent accidental falls and ensure balcony safety in high-rise apartments.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Child Safety Nets
              </h3>
              <p className="text-gray-600">
                Extra strength protection for children and pets at home.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Pigeon Safety Nets
              </h3>
              <p className="text-gray-600">
                Prevent birds from entering balconies and ducts effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES GRID */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cities We Serve in Andhra Pradesh
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {cities.map((city: any) => (
              <Link
                key={city.slug}
                href={`/safety-nets/${city.slug}`}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Safety Nets in {city.name}
                </h3>

                <p className="text-gray-600">
                  Professional safety net installation services in {city.name}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose Our Safety Nets Services?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl">Expert Installation</h3>
              <p className="mt-4 text-gray-600">
                Professional team with years of experience.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl">Premium Materials</h3>
              <p className="mt-4 text-gray-600">
                High-quality UV-resistant nylon nets.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-2xl shadow-md">
              <h3 className="font-semibold text-xl">Affordable Pricing</h3>
              <p className="mt-4 text-gray-600">
                Transparent and competitive pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-900 text-white py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Book Professional Safety Nets Installation Today
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-lg opacity-90">
          Call now to protect your family with high-quality safety nets across Andhra Pradesh.
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