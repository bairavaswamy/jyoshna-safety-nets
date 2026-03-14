type Review = {
  name: string
  review: string
  rating?: number
}

type Props = {
  title?: string
  reviews: Review[]
  max?: number
}

export default function Reviews({
  title = "What Our Customers Say",
  reviews,
  max = 3
}: Props) {

  const list = reviews.slice(0, max)

  return (

    <section className="py-28">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {list.map((r, i) => (

            <div
              key={i}
              className="
              bg-white/5
              border border-white/10
              p-8
              rounded-2xl
              backdrop-blur
              hover:bg-white/10
              transition
              "
            >

              {r.rating && (
                <div className="text-yellow-400 mb-3">
                  {"★".repeat(r.rating)}
                </div>
              )}

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{r.review}"
              </p>

              <p className="font-semibold text-white">
                {r.name}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}