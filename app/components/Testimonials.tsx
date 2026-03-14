"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Alexander Rivera",
    role: "Apartment Owner",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    text: "Excellent invisible grill installation. The team worked professionally and ensured perfect safety for our balcony.",
  },
  {
    name: "Sophia Bennett",
    role: "Home Owner",
    location: "Whitefield",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Very reliable service. Our balcony safety net was installed quickly and the finishing was extremely clean.",
  },
  {
    name: "Daniel Carter",
    role: "Apartment Resident",
    location: "Sarjapur",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "Professional installation and great support. I feel much safer with the invisible grills installed.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // progress animation
  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.animation = "none";
    progressRef.current.offsetHeight;
    progressRef.current.style.animation = isPlaying
      ? "progress 6s linear"
      : "none";
  }, [index, isPlaying]);

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const item = testimonials[index];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">

      {/* floating background cards */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-10 top-20 w-60 h-60 bg-yellow-400 blur-3xl" />
        <div className="absolute right-10 bottom-20 w-60 h-60 bg-blue-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-yellow-500 text-sm">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
            Trusted by Homeowners
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Over <span className="font-semibold">2,500+ installations</span>{" "}
            completed with 5-star customer satisfaction.
          </p>

          <div className="flex justify-center mt-4 text-yellow-400 text-lg">
            ★★★★★
            <span className="text-gray-500 text-sm ml-2">
              4.9 / 5 from 600+ reviews
            </span>
          </div>
        </div>

        {/* carousel */}
        <div
          className="relative max-w-xl mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, x: -80 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 shadow-2xl rounded-3xl p-10 text-center min-h-[320px]"
              aria-live="polite"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-full object-cover mx-auto border-2 border-white shadow-lg"
                priority
              />

              <h4 className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">
                {item.name}
              </h4>

              <p className="text-sm text-gray-500">
                {item.role} • {item.location}
              </p>

              <div className="flex justify-center mt-2 text-yellow-400">
                ★★★★★
              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed text-base">
                “{item.text}”
              </p>

              <div className="mt-6 text-xs text-green-600 font-medium">
                ✔ Verified Customer
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrows */}
          <div className="absolute inset-y-1/2 -translate-y-1/2 flex justify-between w-full px-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-yellow-500 text-white shadow-lg"
            >
              ←
            </button>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-yellow-500 text-white shadow-lg"
            >
              →
            </button>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-yellow-500" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200">
            <div
              ref={progressRef}
              className="h-full bg-yellow-500"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}