"use client";

import {
  useState,
  useEffect,
  useCallback
} from "react";

import Image from "next/image";

import {
  motion,
  useMotionValue,
  useTransform,
  useScroll
} from "framer-motion";

import PremiumCTA from "./PremiumCTA";

const AUTOPLAY = 8000;

const slides = [
  {
    image:
      "/invisble-grills-installation.webp",
    title: "Open views. Safer edges.",
    subtitle: "Invisible grills",
    desc: "Made-to-measure stainless-steel cable systems for balconies and windows."
  },
  {
    image:
      "/transparabt-net-installation.webp",
    title: "Protection shaped around your home.",
    subtitle: "Balcony safety nets",
    desc: "Neatly fitted netting for children, pets, birds, and open residential spaces."
  },
  {
    image: "/cloth-hanger-2.webp",
    title: "Make room for everyday living.",
    subtitle: "Ceiling cloth hangers",
    desc: "Lift-and-lower drying rods that use overhead space and keep your balcony floor clear."
  },
  {
    image: "/bird-spike-6.webp",
    title: "Stop the perch. Keep the space clean.",
    subtitle: "Bird-control solutions",
    desc: "Bird spikes and exclusion nets selected for the exact ledge, opening, or building area."
  }
];

export default function CinematicHeroV3() {
  const [index, setIndex] = useState(0);
  const progress = useMotionValue(0);

  /* mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const px = useTransform(mouseX, [-1, 1], [-40, 40]);
  const py = useTransform(mouseY, [-1, 1], [-30, 30]);

  /* scroll cinematic zoom */
  const { scrollYProgress } = useScroll();
  const zoom = useTransform(scrollYProgress, [0, 0.6], [1, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* navigation */
  const next = useCallback(() => {
    setIndex((p) => (p + 1) % slides.length);
    progress.set(0);
  }, [progress]);

  const prev = useCallback(() => {
    setIndex((p) => (p - 1 + slides.length) % slides.length);
    progress.set(0);
  }, [progress]);

  /* autoplay FIXED */
  useEffect(() => {
    let start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const value = elapsed / AUTOPLAY;

      if (value >= 1) {
        next();
        start = Date.now(); // ✅ reset timer
        progress.set(0);
      } else {
        progress.set(value);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [next, progress]);

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section className="relative -mt-28 h-[82vh] min-h-[620px] w-full overflow-hidden md:h-screen">

      {/* BACKGROUND SLIDES (NO UNMOUNT = NO BLINK) */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 will-change-opacity"
        >
          <motion.div
            style={{ scale: zoom, x: px, y: py }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        </motion.div>
      ))}

      {/* CONTENT */}
      <motion.div
        key={index}
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center px-5 pt-20"
      >
        <div className="max-w-3xl rounded-3xl border border-white/10 bg-black/30 p-7 text-center text-white shadow-2xl backdrop-blur-lg md:p-12">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-yellow-400 md:text-lg">
            {slides[index].subtitle}
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-7xl">
            {slides[index].title}
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-base leading-7 text-gray-200 md:text-xl">
            {slides[index].desc}
          </p>

          <PremiumCTA />
        </div>
      </motion.div>

      {/* arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white opacity-70 hover:opacity-100 md:left-8"
      >
        ‹
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white opacity-70 hover:opacity-100 md:right-8"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              i === index
                ? "w-8 h-3 bg-yellow-400"
                : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-yellow-400 origin-left"
        style={{ scaleX: progress }}
      />
    </section>
  );
}
