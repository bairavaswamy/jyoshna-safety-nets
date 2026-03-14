"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Invisible Grills",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498c?auto=format&fit=crop&w=1400&q=80",
    desc: "Invisible grills are strong stainless steel safety wires fixed on balconies and windows. They protect children and pets while keeping your view open.",
  },
  {
    title: "Balcony Safety Invisible Grills",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
    desc: "Balcony safety invisible grills prevent accidental falls and protect families living in high-rise apartments.",
  },
  {
    title: "Anti Bird Invisible Grills",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1400",
    desc: "Anti bird invisible grills stop pigeons and birds from entering balconies while keeping airflow and sunlight.",
  },
  {
    title: "Sports Nets",
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?auto=format&fit=crop&w=1400&q=80",
    desc: "Sports nets are used for cricket practice areas, terraces and indoor courts to stop balls leaving the area.",
  },
  {
    title: "Duct Area Safety Invisible Grills",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1400",
    desc: "Duct area invisible grills cover open shafts and prevent birds or accidental falls.",
  },
  {
    title: "Children Safety Invisible Grills",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1400",
    desc: "Children safety invisible grills protect kids around balconies and windows without blocking the outside view.",
  },
];

export default function Services() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = () => setIndex((prev) => (prev + 1) % services.length);
  const prev = () => setIndex((prev) => (prev - 1 + services.length) % services.length);

  // Auto slide every 6 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const service = services[index];

  return (
    <section className="max-w-7xl mx-auto py-16 sm:py-28 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
      {/* LEFT TEXT CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm uppercase tracking-[4px] text-yellow-500 dark:text-yellow-400 font-semibold">
            Our Services
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold mt-3 mb-6 text-gray-900 dark:text-white">
            {service.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-sm sm:text-base">
            {service.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919900000000"
              className="px-6 py-3 rounded-full bg-black dark:bg-gray-800 text-white hover:scale-105 transition text-center"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919900000000"
              className="px-6 py-3 rounded-full bg-green-600 text-white hover:scale-105 transition text-center"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* RIGHT STACKED CARDS */}
      <div className="relative h-[350px] sm:h-[450px] flex items-center justify-center">
        {services.map((s, i) => {
          const position = (i - index + services.length) % services.length;
          if (position > 3) return null;

          return (
            <motion.div
              key={s.title}
              className="absolute w-[280px] sm:w-[340px] h-[320px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              initial={false}
              animate={{
                scale: 1 - position * 0.08,
                y: position * 35,
                opacity: 1 - position * 0.25,
                zIndex: 10 - position,
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotateX: 6, rotateY: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              onMouseEnter={() => setIsPlaying(false)} // Pause on hover
              onMouseLeave={() => setIsPlaying(true)} // Resume on leave
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-gray-900/80 via-black/20 to-transparent" />

              {/* Title */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white dark:text-gray-100 text-base sm:text-lg font-semibold">
                {s.title}
              </div>
            </motion.div>
          );
        })}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 text-2xl sm:text-4xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          suppressHydrationWarning={true}
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-0 text-2xl sm:text-4xl text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          suppressHydrationWarning={true}
        >
          ›
        </button>

        {/* Play/Pause Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
            suppressHydrationWarning={true}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === i ? "bg-yellow-500 w-4 sm:w-6" : "bg-gray-300 dark:bg-gray-600"
              }`}
              suppressHydrationWarning={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}