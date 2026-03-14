"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumCTA from "./PremiumCTA";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070",
    company: "Jyoshna Invisible Grill",
    title: "Premium Invisible Grills",
    desc: "Luxury balcony protection with high-tensile stainless steel invisible grills.",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    company: "Jyoshna Invisible Grill",
    title: "Safe Balcony Living",
    desc: "Protect children and pets without blocking your beautiful balcony view.",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2070",
    company: "Jyoshna Invisible Grill",
    title: "Modern Safety Solutions",
    desc: "Elegant safety systems designed for apartments and villas.",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const variants = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.35 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0 },
    },
  };

  return (
    <section
      className="relative h-[92vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero carousel showcasing Jyoshna Invisible Grills"
      role="region"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Optimized duration for performance
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -100) nextSlide();
            if (info.offset.x > 100) prevSlide();
          }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].image}
            alt={slides[index].title} // Added alt text for accessibility and SEO
            className="w-full h-full object-cover"
            loading="lazy" // Added lazy loading for performance
            onError={(e) => {
              e.currentTarget.src = "/fallback-image.jpg"; // Added error handling
            }}
          />
          {/* Lighter overlay with subtle blur for premium feel */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              variants={variants.container}
              initial="hidden"
              animate="show"
              className="max-w-3xl text-center px-6 text-white"
            >
              <motion.p
                variants={variants.item}
                className="uppercase tracking-[4px] text-sm mb-4 text-yellow-400"
              >
                {slides[index].company}
              </motion.p>
              <motion.h1
                variants={variants.item}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                {slides[index].title}
              </motion.h1>
              <motion.p
                variants={variants.item}
                className="text-lg md:text-xl text-gray-200 mb-10"
              >
                {slides[index].desc}
              </motion.p>
              <motion.div variants={variants.item}>
                <PremiumCTA />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Navigation arrows with improved accessibility */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
        type="button"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Next slide"
        type="button"
      >
        ›
      </button>
      {/* Dots with improved accessibility */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3" role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${
              index === i ? "w-8 h-3 bg-yellow-400" : "w-3 h-3 bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={index === i}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </section>
  );
}