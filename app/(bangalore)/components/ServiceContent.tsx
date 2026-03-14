type Props = {
  serviceName: string
  areaName: string
  paragraphs?: string[]
}

export default function ServiceContent({
  serviceName,
  areaName,
  paragraphs
}: Props) {

  const defaultContent = [
    `If you are searching for reliable ${serviceName.toLowerCase()} in ${areaName}, our professional team provides high quality safety net installations for apartments, balconies and residential buildings.`,

    `Our safety nets are designed to protect open spaces while maintaining airflow and visibility. We use durable UV stabilized materials that are strong, weather resistant and long lasting.`,

    `Hundreds of homes and apartments in ${areaName} trust our expert installation team for safe, affordable and professional safety net solutions.`
  ]

  const content = paragraphs ?? defaultContent

  return (

    <section className="bg-[#111113] py-28">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-6">
          {serviceName} Installation in {areaName}
        </h2>

        {content.map((text, i) => (

          <p
            key={i}
            className="text-gray-300 leading-relaxed mb-6"
          >
            {text}
          </p>

        ))}

      </div>

    </section>

  )

}