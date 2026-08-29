import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck, Eye, Ruler, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Jyoshna Invisible Grills & Safety Nets",
  description:
    "Learn how Jyoshna plans and installs invisible grills, safety nets, bird-control systems, sports nets, and ceiling cloth hangers for homes and buildings.",
  alternates: {
    canonical: "https://jyoshnainvisiblegrills.com/about",
  },
};

const values = [
  {
    icon: Ruler,
    title: "Measure the actual site",
    text: "Dimensions, fixing surfaces, access, and edge conditions are checked before the final quotation.",
  },
  {
    icon: Eye,
    title: "Explain the trade-offs",
    text: "We help you compare netting, invisible grills, spikes, and other options based on the problem—not a sales script.",
  },
  {
    icon: ShieldCheck,
    title: "Fit for the intended use",
    text: "A child-safety opening, cat balcony, bird problem, and sports area require different materials and details.",
  },
  {
    icon: ClipboardCheck,
    title: "Leave practical guidance",
    text: "We explain what to inspect, how to care for the installation, and when damaged parts should be replaced.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 md:py-28">
          <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/15 blur-[150px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-yellow-400">About Jyoshna</p>
              <h1 className="mt-5 text-5xl font-bold leading-[1.05] md:text-7xl">
                Safer spaces begin with a better look at the space.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
                Jyoshna installs invisible grills, residential and commercial
                safety nets, bird-control systems, sports nets, and ceiling
                cloth hangers. We begin with the opening, the people or animals
                using it, and the conditions the installation will face.
              </p>
            </div>

            <div className="relative min-h-[500px] overflow-hidden rounded-[2rem]">
              <Image
                src="/invisible-grills-for-balcony.webp"
                alt="Invisible grill installation across a residential balcony"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/15 bg-black/60 p-5 backdrop-blur-md">
                <p className="font-semibold text-yellow-400">Our aim is simple</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Recommend a practical system, fit it neatly, and make sure you
                  understand how to use and inspect it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0e7] px-6 py-20 text-neutral-950 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-orange-600">What matters to us</p>
                <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Clear advice you can evaluate.</h2>
                <p className="mt-5 leading-7 text-neutral-600">
                  We prefer useful details over unverifiable numbers. These are
                  the standards our process is built around.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {values.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-3xl bg-white p-7 shadow-sm">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400"><Icon size={21} /></span>
                    <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-80 overflow-hidden rounded-3xl"><Image src="/cloth-hanger-3.webp" alt="Ceiling cloth hanger installation" fill sizes="25vw" className="object-cover" /></div>
              <div className="relative mt-12 h-80 overflow-hidden rounded-3xl"><Image src="/bird-spike-2.webp" alt="Bird spike installation" fill sizes="25vw" className="object-cover" /></div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-yellow-400">A broader service range</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Protection, bird control, play areas, and everyday utility.</h2>
              <p className="mt-6 text-lg leading-8 text-white/60">
                Our services now include ceiling cloth hangers, bird spikes,
                cat safety nets, and full-building safety nets alongside
                invisible grills and residential netting. Each service page
                explains where the product fits—and where another option may be better.
              </p>
              <Link href="/#services" className="mt-8 inline-flex rounded-full bg-yellow-400 px-7 py-3.5 font-bold text-black transition hover:bg-yellow-300">
                Explore all services
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-yellow-400 px-6 py-16 text-black">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em]">Start with photos</p>
              <h2 className="mt-2 text-3xl font-bold md:text-5xl">Tell us what you need to protect.</h2>
            </div>
            <a href="https://wa.me/919392372421?text=Hi%2C%20I%20would%20like%20help%20choosing%20the%20right%20installation." target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-black px-8 py-4 font-bold text-white transition hover:bg-neutral-800">
              WhatsApp Jyoshna
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
