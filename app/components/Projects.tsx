"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498c?auto=format&fit=crop&w=1400&q=80",
    title: "Balcony Invisible Grill Installation",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    title: "High Rise Balcony Safety Nets",
  },
  {
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    title: "Apartment Duct Area Protection",
  },
  {
    img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80",
    title: "Children Safety Balcony Nets",
  },
  {
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    title: "Luxury Apartment Balcony Safety",
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowLeft") {
        setActive((prev) => (prev === 0 ? projects.length - 1 : (prev || 0) - 1));
      } else if (e.key === "ArrowRight") {
        setActive((prev) => (prev === projects.length - 1 ? 0 : (prev || 0) + 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active]);

  return (
    <section className="bg-gradient-to-b from-[#2d2d2d] dark:from-gray-900 to-black dark:to-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-14 text-white">
          <div>
            <p className="uppercase text-sm tracking-[4px] text-yellow-400 dark:text-yellow-500">
              Our Projects
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">
              Recent Safety Net Installations
            </h2>
          </div>
          <motion.button
            className="border border-white/30 px-4 sm:px-6 py-2 rounded-full hover:bg-white hover:text-black dark:hover:bg-gray-700 dark:hover:text-white transition mt-4 sm:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            suppressHydrationWarning={true}
          >
            View All →
          </motion.button>
        </div>

        {/* Horizontal Gallery */}
        <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              className="relative min-w-[280px] sm:min-w-[320px] h-[350px] sm:h-[420px] rounded-2xl overflow-hidden group cursor-pointer snap-center transform hover:-translate-y-2 transition duration-500 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
              onClick={() => setActive(i)}
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-gray-900/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Title */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <h3 className="text-base sm:text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 dark:bg-gray-900/95 flex items-center justify-center z-50 p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl h-[70vh] sm:h-[80vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Image
                src={projects[active].img}
                alt={projects[active].title}
                fill
                className="object-contain rounded-lg"
              />

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 dark:bg-gray-700/50 rounded-full flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-gray-600/50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(null);
                }}
                suppressHydrationWarning={true}
              >
                ✕
              </button>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {projects[active].title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}