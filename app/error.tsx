"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, MessageCircle, RefreshCw } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[75vh] items-center overflow-hidden bg-neutral-950 px-6 py-20 text-white">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-500/15 blur-[150px]" />
      <div className="relative mx-auto w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl md:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
          <AlertTriangle size={30} />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-orange-400">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">
          This page couldn&apos;t load properly.
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-white/60">
          Your enquiry has not been submitted or charged. Try loading the page
          again, return home, or contact Jyoshna through WhatsApp.
        </p>

        {error.digest && (
          <p className="mt-5 text-xs text-white/35">Reference: {error.digest}</p>
        )}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-bold text-black transition hover:bg-yellow-300"
          >
            <RefreshCw size={18} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/5"
          >
            <Home size={18} /> Return home
          </Link>
          <a
            href="https://wa.me/919392372421"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/5"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
