import Link from "next/link"

type Props = {
  serviceName: string
  areaName: string
}

export default function CTA({ serviceName, areaName }: Props) {
  return (
    <section className="py-28">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Protect Your Balcony Today
        </h2>

        <p className="text-gray-400 mb-10">
          Contact our team for professional installation of{" "}
          <span className="font-semibold">{serviceName.toLowerCase()}</span> in{" "}
          {areaName}.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl font-semibold shadow-xl hover:scale-105 transition"
          >
            Request Free Consultation
          </Link>

          <Link
            href="tel:+919000000000"
            className="px-10 py-5 border border-white/20 rounded-xl hover:bg-white/10 transition"
          >
            Call Now
          </Link>

          <a
            href="https://wa.me/919000000000"
            className="px-10 py-5 bg-green-500 rounded-xl font-semibold hover:scale-105 transition"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}