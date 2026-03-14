type Item = {
  problem: string
  solution: string
}

type Props = {
  serviceName: string
  areaName: string
  items?: Item[]
}

const defaultItems: Item[] = [
  {
    problem: "Birds entering balconies and creating nests",
    solution: "Our durable safety nets prevent birds from entering while allowing fresh air and light."
  },
  {
    problem: "Risk of children or pets leaning over balconies",
    solution: "Strong balcony safety nets create a protective barrier ensuring complete safety."
  },
  {
    problem: "Mess caused by pigeons and birds",
    solution: "Anti bird nets stop pigeons from entering balconies and keep spaces clean."
  }
]

export default function ProblemSolution({
  serviceName,
  areaName,
  items = defaultItems
}: Props) {

  return (

    <section className="py-28 bg-[#111113]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why {serviceName} is Important in {areaName}
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {items.map((item, i) => (

            <div
              key={i}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur hover:bg-white/[0.07] transition"
            >

              <h3 className="text-xl font-semibold mb-4 text-red-400">
                Problem
              </h3>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {item.problem}
              </p>

              <h3 className="text-xl font-semibold mb-4 text-green-400">
                Solution
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {item.solution}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}