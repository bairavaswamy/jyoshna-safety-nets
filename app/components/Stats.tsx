"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

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

  const sectionRef = useRef(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Count animation (same logic)
  useEffect(() => {
    if (!isInView) return;

    const intervals = stats.map((stat, i) => {
      const increment = stat.number / 50;
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
    <section
      ref={sectionRef}
      className="relative py-20 bg-black text-white overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(250,204,21,0.15), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 50%),
              linear-gradient(to bottom, #000000, #050505)
            `,
          }}
        />
      </motion.div>

      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <p className="uppercase tracking-[4px] text-yellow-400 text-sm">
          TRUST & PERFORMANCE
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Proven Results That
          <br />
          <span className="text-yellow-400">Build Confidence</span>
        </h2>

        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          Our track record speaks for itself — delivering safety,
          reliability, and trust across thousands of homes.
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6"
      >
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative group rounded-2xl p-6 text-center"
            style={{
              background: "rgba(15,15,15,0.85)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(250,204,21,0.25)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;

              e.currentTarget.style.transform = `
                rotateY(${x * 10}deg)
                rotateX(${y * -10}deg)
                scale(1.05)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotateY(0deg) rotateX(0deg) scale(1)";
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(250,204,21,0.2), transparent 70%)",
                }}
              />
            </div>

            {/* Number */}
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-yellow-400"
              animate={{
                textShadow: "0 0 18px rgba(250,204,21,0.6)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {counts[i]}+
            </motion.h3>

            {/* Label */}
            <p className="text-xs md:text-sm text-white/60 mt-2 tracking-wide uppercase">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}