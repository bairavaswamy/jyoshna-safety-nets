import type { Metadata } from "next";
import Link from "next/link";
import { Home, MessageCircle, Phone, SearchX } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Jyoshna Invisible Grills",
  description: "The requested Jyoshna service or location page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      <main className="relative overflow-hidden border-y border-white/10 px-6 py-20 md:py-28">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/15 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-[150px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-yellow-400/25 bg-yellow-400/10 text-yellow-400">
            <SearchX size={36} />
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Error 404
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-7xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            The service or location may have moved, or the address may contain a
            typing mistake. Choose a safe route below or contact Jyoshna directly.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-bold text-black transition hover:bg-yellow-300"
            >
              <Home size={18} /> Return home
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/50 hover:bg-white/5"
            >
              Explore services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:border-white/50 hover:bg-white/5"
            >
              Contact us
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
            <a
              href="tel:+918106420981"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-yellow-400/35"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-black">
                <Phone size={19} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/45">Call Jyoshna</span>
                <span className="mt-1 block font-semibold">+91 81064 20981</span>
              </span>
            </a>
            <a
              href="https://wa.me/919392372421"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-green-400/35"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                <MessageCircle size={19} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-white/45">WhatsApp</span>
                <span className="mt-1 block font-semibold">+91 93923 72421</span>
              </span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
