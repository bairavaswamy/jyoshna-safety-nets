import Image from "next/image";
import Link from "next/link";
import { Check, Ruler, ShieldCheck, Wrench } from "lucide-react";

const promises = [
  "A recommendation based on the opening and how you use it",
  "Materials explained before you choose",
  "A clear quotation based on site measurements",
  "Neat fitting with practical care guidance",
];

export default function About() {
  return (
    <section className="bg-[#f4f1e8] px-6 py-24 text-neutral-950 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[520px]">
          <div className="absolute inset-x-0 top-0 h-[440px] overflow-hidden rounded-[2rem]">
            <Image
              src="/cards/invisble-grills-installation-near-me.webp"
              alt="Invisible grill fitted across an apartment balcony"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[70%] rounded-3xl border-8 border-[#f4f1e8] bg-black p-6 text-white shadow-2xl md:w-[58%]">
            <div className="flex items-center gap-3 text-yellow-400">
              <Ruler size={22} />
              <span className="font-semibold">Measured before quoted</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Width, height, fixing surface, access, and intended use all affect
              the safest practical installation.
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">
            How we work
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Advice first. Installation second.
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            A balcony edge, pigeon problem, pet enclosure, and cloth-drying
            area do not need the same product. Jyoshna inspects the space,
            explains the available options, and installs the solution that fits
            the opening and purpose.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {promises.map((promise, index) => (
              <div key={promise} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black">
                  {index < 2 ? <ShieldCheck size={15} /> : index === 2 ? <Check size={15} /> : <Wrench size={15} />}
                </span>
                <p className="text-sm font-medium leading-6 text-neutral-700">{promise}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/about" className="rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-neutral-800">
              About Jyoshna
            </Link>
            <Link href="/contact" className="rounded-full border border-black/20 px-7 py-3 font-semibold transition hover:border-black">
              Request a site visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
