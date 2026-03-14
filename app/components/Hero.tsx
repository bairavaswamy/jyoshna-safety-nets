"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Hero section for Jyoshna Invisible Grills"
    >
      <div className="relative w-full h-[520px] sm:h-[620px] md:h-[720px] lg:h-[820px]">

        {/* Optimized Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2000&auto=format&fit=crop"
          alt="Modern balcony with invisible grills for safety and style"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover will-change-transform"
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-xl"
            >
              Premium <span className="text-yellow-400">Invisible Grills</span>
              <br />
              For Modern Balconies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 max-w-xl mx-auto text-gray-200 text-base md:text-lg leading-relaxed"
            >
              High-tensile stainless steel grills designed for safety,
              durability, and unobstructed views.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-8 flex justify-center gap-4 flex-wrap"
            >
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-7 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Get Free Quote
              </button>

              <button className="border border-white/40 text-white px-7 py-3 rounded-lg backdrop-blur-sm hover:bg-white/10 transition">
                View Installations
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}