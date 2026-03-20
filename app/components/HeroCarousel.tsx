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
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    title: "Premium Invisible Grills",
    subtitle: "Jyoshna Invisible Grill",
    desc: "Luxury balcony protection with high-tensile stainless steel invisible grills."
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    title: "Safe Balcony Living",
    subtitle: "Modern Protection",
    desc: "Protect children and pets without blocking your balcony view."
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2070",
    title: "Modern Safety Systems",
    subtitle: "Elegant Design",
    desc: "Minimalistic safety solutions for modern apartments."
  }
];

export default function CinematicHeroV3() {
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

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
    if (pause) return;

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
  }, [pause, next, progress]);

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
    <section className="relative -mt-28 h-[100vh] w-full overflow-hidden">

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
              priority
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
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center text-white backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">

          <p className="tracking-[4px] uppercase text-yellow-400 mb-4">
            {slides[index].subtitle}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {slides[index].title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            {slides[index].desc}
          </p>

          <PremiumCTA />
        </div>
      </motion.div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white text-4xl opacity-70 hover:opacity-100"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
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