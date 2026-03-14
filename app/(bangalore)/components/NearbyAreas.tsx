import Link from "next/link"

type Area = {
  name: string
  slug: string
}

type Service = {
  name: string
  slug: string
}

type Props = {
  areaName: string
  service: Service
  areas: Area[]
}

export default function NearbyAreas({
  areaName,
  service,
  areas
}: Props) {

  return (

    <section className="py-24 bg-[#0b0b0c]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-12">
          Areas We Serve Near {areaName}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {areas.map((area) => (

            <Link
              key={area.slug}
              href={`/${service.slug}-in-${area.slug}`}
              className="
              bg-white/5
              border border-white/10
              p-6
              rounded-xl
              hover:bg-white/10
              hover:-translate-y-1
              transition
              "
            >

              {service.name} in {area.name}

            </Link>

          ))}

        </div>

      </div>

    </section>

  )

}