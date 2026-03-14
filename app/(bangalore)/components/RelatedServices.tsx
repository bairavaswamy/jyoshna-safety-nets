import Link from "next/link"

type Service = {
  name: string
  slug: string
}

type Props = {
  service: Service // main service page
  relatedServices: Service[] // array of other services
  areaSlug: string
  areaName: string
}

export default function RelatedServices({
  service,
  relatedServices,
  areaSlug,
  areaName
}: Props) {
  if (!relatedServices.length) return null

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">
          Other Safety Net Services in {areaName}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {relatedServices.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}-in-${areaSlug}`}
              className="
                bg-gradient-to-b from-white/10 to-white/5
                border border-white/10
                p-6
                rounded-xl
                hover:-translate-y-1
                transition
              "
            >
              {s.name} in {areaName}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}