import Link from "next/link"

type Props = {
  serviceName: string
  areaName: string
}

export default function Hero({ serviceName, areaName }: Props) {

  return (

    <section className="relative">

      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">

          {serviceName}

          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            in {areaName}
          </span>

        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
          Premium {serviceName.toLowerCase()} installation in {areaName}.
          Durable UV resistant safety nets designed to protect balconies,
          windows and open spaces.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">

          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Free Quote
          </Link>

          <Link
            href="tel:+919000000000"
            className="px-8 py-4 rounded-xl border border-gray-700 hover:bg-white/10 transition"
          >
            Call Now
          </Link>

          <a
            href="https://wa.me/919000000000"
            className="px-8 py-4 rounded-xl bg-green-500 font-semibold hover:scale-105 transition"
          >
            WhatsApp
          </a>

        </div>

      </div>

    </section>

  )

}