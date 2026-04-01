"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PremiumCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const rippleId = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    buttonRef.current!.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const resetMagnet = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0px,0px)";
    }
  };

  useEffect(() => () => setRipples([]), []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = rippleId.current++;
    setRipples((prev) => [...prev.slice(-2), { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    // 📞 CALL
    window.location.href = "tel:+918106420981";
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMagnet}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      aria-label="Get free quote"
      className="
        relative group inline-flex items-center justify-center

        /* 📱 Mobile */
        w-full sm:w-auto
        px-6 py-3 text-sx

        /* 💻 Desktop */
        md:px-10 md:py-4 md:text-lg

        rounded-full font-semibold text-white
        bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500
        bg-[length:200%_200%]
        animate-[gradientMove_6s_linear_infinite]

        shadow-lg md:shadow-xl hover:shadow-2xl
        overflow-hidden transition-all duration-300
        will-change-transform
      "
    >
      {/* ✨ Shimmer */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-40 top-0 h-full w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.2s_linear]" />
      </span>

      {/* 💥 Ripple */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 pointer-events-none animate-[ripple_0.6s_ease-out]"
          style={{
            left: r.x,
            top: r.y,
            width: 12,
            height: 12,
          }}
        />
      ))}

      {/* 🔥 Text */}
      <span className="flex items-center gap-2 md:gap-3 relative z-10">
        Get Free Quote

        <motion.span
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.span>
      </span>

      {/* 🌟 Glow */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 bg-yellow-400/20 blur-xl" />
    </motion.button>
  );
}