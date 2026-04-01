"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="relative max-w-[1400px] mx-auto py-24 px-6 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      {/* BACKGROUND IMAGE (TEST VERSION) */}
<div className="absolute inset-0 ">
  <img
    src="/invisble-grills-installation.webp"
    alt="background"
    className="w-full h-full object-cover opacity-20"
  />
</div>

{/* overlay */}
{/* <div className="absolute inset-0 -z-10 bg-white/20" /> */}

      {/* LIGHT OVERLAY (balanced) */}
      {/* <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-sm" /> */}

      {/* decorative background */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"
      /> */}

      <div className="grid md:grid-cols-3 gap-12 items-center">

        {/* LEFT VISUAL STACK */}
       <div className="relative flex flex-col items-center gap-8">

  <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-[6px] border-white">
    <Image
      src="https://eversafesafetynets.com/service/balcony-5.webp"
      alt="Balcony invisible grill installation"
      width={240}
      height={240}
      sizes="(max-width:768px) 160px, 240px"
      className="object-cover"
    />
  </div>

  {/* design accent */}
  {/* <div
    aria-hidden
    className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-t-[110px] border-t-yellow-500/90 drop-shadow-xl"
  /> */}

  {/* small image + text */}
  <div className="absolute -bottom-12 left-8 w-36 h-36 rounded-xl overflow-hidden shadow-2xl border-4 border-white relative">
    <Image
      src="/cards/transparant-balcony-safety-nets.webp"
      alt="Modern apartment balcony view"
      width={220}
      height={180}
      sizes="(max-width:768px) 120px, 200px"
      className="object-cover w-full h-full"
    />

    <p className="absolute bottom-0 left-0 w-full text-center text-white text-sm font-semibold bg-black/50 py-1 z-50">
      Balcony Net
    </p>
  </div>

</div>

        {/* FEATURE IMAGE */}
        <div className="relative h-[380px] group">

          <div className="absolute -left-7 md:left-0 lg:left-0 inset-0 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
            <Image
              src="/cards/invisble-grills-installation-near-me.webp"
              alt="Luxury balcony protected with invisible grills"
              fill
              sizes="(max-width:760px) 100vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
             <p className="absolute bottom-0 left-0 w-full text-center text-white text-sm font-semibold bg-black/50 py-5 z-50">
      INVISIBLE GRILLS
    </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
        </div>

        {/* CONTENT */}
        <article className="relative -left-4 md:-left-0 lg:-left-0 p-10 bg-white/90 backdrop-blur-xl border border-yellow-400/40 shadow-[0_25px_50px_rgba(0,0,0,0.15)] rounded-2xl">

          <span className="text-sm uppercase tracking-[4px] text-yellow-500 font-semibold">
            About Our Company
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 leading-tight">
            Premium Invisible Grills & Balcony Safety Nets
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            We specialize in installing high-quality invisible grills and
            balcony safety nets that protect your family while preserving
            the open view of your home. Our stainless-steel safety systems
            combine durability, elegance, and modern engineering for
            apartments and villas.
          </p>

          {/* trust indicators */}
          <div className="flex gap-6 text-sm text-gray-700 mb-8">

            <div>
              <span className="block text-xl font-bold text-yellow-500">
                2500+
              </span>
              Installations
            </div>

            <div>
              <span className="block text-xl font-bold text-yellow-500">
                10+
              </span>
              Years Experience
            </div>

            <div>
              <span className="block text-xl font-bold text-yellow-500">
                5★
              </span>
              Customer Rating
            </div>

          </div>

          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-black text-white font-semibold overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Learn More
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>

            <span className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition" />
          </Link>

        </article>

      </div>

    </section>
  );
}