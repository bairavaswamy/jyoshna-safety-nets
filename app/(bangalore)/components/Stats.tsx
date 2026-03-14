type Stat = {
  value: string
  label: string
}

type Props = {
  stats?: Stat[]
  title?: string
}

const defaultStats: Stat[] = [
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "24h", label: "Fast Installation" },
  { value: "100%", label: "Customer Satisfaction" }
]

export default function Stats({ stats = defaultStats ,title}: Props) {

  return (

    <section className="relative py-24">

      <div className="max-w-6xl mx-auto px-6">

        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((stat, i) => (

            <div
              key={i}
              className="
              group
              bg-white/[0.04]
              border border-white/10
              backdrop-blur-xl
              rounded-2xl
              p-10
              text-center
              transition
              duration-300
              hover:-translate-y-2
              hover:bg-white/[0.07]
              hover:border-indigo-400/40
              "
            >

              <p className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                {stat.value}
              </p>

              <p className="text-gray-400 mt-3 text-sm tracking-wide uppercase">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )
}