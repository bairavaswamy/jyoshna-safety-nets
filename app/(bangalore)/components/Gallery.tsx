import Image from "next/image"

type Props = {
  serviceName: string
  areaName: string
  queries?: string[]
  maxImages?: number
}

const defaultQueries = [
  "balcony safety net",
  "pigeon safety net balcony",
  "bird net balcony",
  "balcony protection net",
  "apartment balcony safety net",
  "building balcony exterior"
]

export default function Gallery({
  serviceName,
  areaName,
  queries = defaultQueries,
  maxImages = 6
}: Props) {

  const images = queries.slice(0, maxImages)

  return (

    <section className="py-28 bg-[#111113]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 text-center">
          Our Recent {serviceName} Installations
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((query, i) => (

            <div
              key={i}
              className="
              overflow-hidden
              rounded-2xl
              border border-white/10
              group
              "
            >

              <Image
                src={`https://source.unsplash.com/800x600/?${query}`}
                alt={`${serviceName} installation in ${areaName}`}
                width={800}
                height={600}
                className="
                w-full
                h-64
                object-cover
                transition
                duration-500
                group-hover:scale-110
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}