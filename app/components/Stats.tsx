"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: 10, label: "Years Experience" },
  { number: 7, label: "Awards Won" },
  { number: 20, label: "Branch Offices" },
  { number: 102, label: "Clients" },
];

export default function Stats() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Animate numbers on scroll
  useEffect(() => {
    if (!isInView) return;
    const intervals = stats.map((stat, i) => {
      const increment = stat.number / 50; // Smooth increment
      let current = 0;
      return setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(intervals[i]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(current);
          return newCounts;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, [isInView]);

  return (
    <section className="bg-gray-800 dark:bg-gray-900 text-white py-12 sm:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 via-transparent to-yellow-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center gap-6 sm:gap-8"
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm border border-white/10 dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <motion.h3
                className="text-yellow-400 text-3xl sm:text-4xl font-bold mb-2"
                animate={{ textShadow: "0 0 10px rgba(255, 193, 7, 0.5)" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                {counts[i]}+
              </motion.h3>
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 uppercase tracking-wide">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}