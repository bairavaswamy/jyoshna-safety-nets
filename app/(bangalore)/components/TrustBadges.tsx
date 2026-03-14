type Props = {
  badges?: string[]
}

const defaultBadges = [
  "UV Resistant Materials",
  "Professional Installation",
  "Affordable Pricing",
  "Same Day Service"
]

export default function TrustBadges({ badges = defaultBadges }: Props) {

  return (

    <section className="py-16 border-y border-white/10">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {badges.map((badge, i) => (

            <div
              key={i}
              className="
              text-gray-300
              font-medium
              bg-white/[0.03]
              border border-white/10
              rounded-xl
              py-5
              px-4
              backdrop-blur
              hover:bg-white/[0.06]
              transition
              "
            >

              {badge}

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}