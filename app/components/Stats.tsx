import { Camera, ClipboardCheck, Drill, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: Camera,
    number: "01",
    title: "Share the space",
    text: "Send clear photos and your location so we can understand the opening and suggest the right first step.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Site measurement",
    text: "We check dimensions, mounting surfaces, access, and the purpose of the installation before confirming a solution.",
  },
  {
    icon: Drill,
    number: "03",
    title: "Careful fitting",
    text: "The selected system is fitted to the measured layout, with attention to edges, corners, tension, and finish.",
  },
  {
    icon: MessageCircle,
    number: "04",
    title: "Use and care",
    text: "We explain basic inspection and care, including when to contact us if a net, cable, fitting, or rope is damaged.",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-24 text-white md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-yellow-400">
              From enquiry to fitting
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              A straightforward installation process.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-white/60">
              Clear information is more useful than inflated counters. This is
              what you can expect when you contact Jyoshna.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {steps.map(({ icon: Icon, number, title, text }) => (
              <li key={number} className="bg-neutral-950 p-7 md:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="text-yellow-400" size={24} />
                  <span className="text-sm font-bold text-white/25">{number}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
