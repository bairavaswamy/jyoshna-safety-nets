import Image from "next/image";

export default function About() {
  return (
    <section className="relative max-w-[1200px] mx-auto py-24 px-6">

      {/* subtle background decoration */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"></div>

      <div className="grid md:grid-cols-3 gap-12 items-center">

        {/* left visual stack */}

        <div className="relative flex flex-col items-center gap-8">

          <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-[6px] border-white">
            <Image
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800"
              alt="balcony invisible grill"
              width={240}
              height={240}
              className="object-cover"
            />
          </div>

          <div className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-t-[110px] border-t-yellow-500/90 drop-shadow-xl" />

          <div className="absolute -bottom-12 left-8 w-36 h-36 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800"
              alt="balcony apartment"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>

        </div>

        {/* middle premium feature image */}

        <div className="relative h-[380px] group">

          <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)]">

            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400"
              alt="luxury balcony view"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />

          </div>

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>

        </div>

        {/* right content */}

        <div className="relative p-10 bg-white/90 backdrop-blur-xl border border-yellow-400/40 shadow-[0_25px_50px_rgba(0,0,0,0.15)] rounded-2xl">

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
            combine strength, durability, and elegant design for modern
            apartments and villas.
          </p>

          <button className="group relative px-8 py-3 rounded-full bg-black text-white font-semibold overflow-hidden">

            <span className="relative z-10 flex items-center gap-2">
              Learn More
              <span className="group-hover:translate-x-1 transition">→</span>
            </span>

            <span className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition"></span>

          </button>

        </div>

      </div>

    </section>
  );
}