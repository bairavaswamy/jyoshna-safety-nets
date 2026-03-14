type Feature = {
  title: string
  desc: string
}

type Props = {
  serviceName: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    title: "UV Resistant Nets",
    desc: "High quality nylon nets built to withstand sunlight and weather."
  },
  {
    title: "Expert Installation",
    desc: "Our trained professionals ensure safe and precise installation."
  },
  {
    title: "Affordable Pricing",
    desc: "Premium materials with competitive pricing."
  },
  {
    title: "Strong Durability",
    desc: "Long lasting materials designed for years of reliable use."
  },
  {
    title: "Clean Aesthetic",
    desc: "Safety nets installed without blocking your balcony view."
  },
  {
    title: "Fast Service",
    desc: "Most installations completed within a few hours."
  }
]

export default function Features({
  serviceName,
  features = defaultFeatures
}: Props) {

  return (

    <section className="py-28">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Our {serviceName}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {features.map((feature, i) => (

            <div
              key={i}
              className="
              bg-gradient-to-b
              from-white/10
              to-white/5
              border border-white/10
              p-8
              rounded-2xl
              hover:-translate-y-2
              hover:border-indigo-400/40
              transition
              shadow-lg
              "
            >

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}