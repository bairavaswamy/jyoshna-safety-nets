"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PremiumCTA() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 rounded-full overflow-hidden font-semibold text-white bg-orange-500 dark:bg-yellow-500 border border-white/20 dark:border-gray-700/20 shadow-xl hover:shadow-2xl transition-all"
      onClick={handleClick}
      suppressHydrationWarning={true}
      aria-label="Get a free quote"
    >
      {/* Shimmer Sweep */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-40 top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-100/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.2s_linear]" />
      </span>

      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 dark:bg-gray-200/30 animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}

      {/* Button Text */}
      <span className="relative flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
        Get Free Quote
        <motion.span
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="text-lg sm:text-xl"
        >
          →
        </motion.span>
      </span>

      {/* Glow */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-yellow-400/10 dark:bg-yellow-500/20 blur-xl" />
    </motion.button>
  );
}