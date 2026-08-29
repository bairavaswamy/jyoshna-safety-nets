import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCatalog } from "./constants/serviceCatalog";

export default function ServicesCards() {
  return (
    <section id="services" className="bg-black px-6 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-400">
            What we install
          </p>
          <h2 className="text-4xl font-bold leading-tight md:text-6xl">
            The right protection for every opening.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
            From discreet balcony protection to bird control, pet-safe netting,
            sports nets, and space-saving cloth hangers, every job starts with
            the actual space—not a one-size-fits-all package.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCatalog.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-white/[0.07] ${
                index === 0 || index === serviceCatalog.length - 1
                  ? "lg:col-span-2"
                  : ""
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.images[0]}
                  alt={`${service.title} installation by Jyoshna`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                {service.slug === "cloth-hangers" && (
                  <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                    Newly added
                  </span>
                )}
              </div>

              <div className="flex min-h-44 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <ArrowUpRight className="mt-1 shrink-0 text-yellow-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                </div>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {service.cardDescription}
                </p>
                <span className="mt-auto pt-5 text-sm font-semibold text-yellow-400">
                  See details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
