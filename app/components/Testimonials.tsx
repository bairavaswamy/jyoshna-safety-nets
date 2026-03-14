"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Alexander Rivera",
    role: "Apartment Owner",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
    text: "Excellent invisible grill installation. The team worked professionally and ensured perfect safety for our balcony.",
  },
  {
    name: "Sophia Bennett",
    role: "Home Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Very reliable service. Our balcony safety net was installed quickly and the finishing was extremely clean.",
  },
  {
    name: "Daniel Carter",
    role: "Apartment Resident",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    text: "Professional installation and great support. I feel much safer with the invisible grills installed.",
  },
  {
    name: "Emily Watson",
    role: "Interior Client",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text: "Highly recommend their safety net service. Quality materials and excellent workmanship.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto slide every 6 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      } else if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="uppercase tracking-[4px] text-yellow-500 text-sm">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Hundreds of happy customers trust our safety nets and invisible grill installations for their homes.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {testimonials.map((item, i) =>
              i === index && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl text-center max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
                  onMouseEnter={() => setIsPlaying(false)} // Pause on hover
                  onMouseLeave={() => setIsPlaying(true)} // Resume on leave
                >
                  <div className="relative">
                    <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 text-yellow-400 text-4xl sm:text-5xl">
                      “
                    </div>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md mx-auto mb-4"
                    />

                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.role}</p>

                    <div className="flex justify-center gap-1 mt-2 text-yellow-400 text-sm animate-pulse">
                      ★★★★★
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-6 leading-relaxed text-sm sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 flex gap-2 sm:gap-4">
            <motion.button
              onClick={prevTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              suppressHydrationWarning={true}
            >
              ←
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              suppressHydrationWarning={true}
            >
              →
            </motion.button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute top-4 right-4">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              suppressHydrationWarning={true}
            >
              {isPlaying ? "⏸" : "▶"}
            </motion.button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === i ? "bg-yellow-500 w-4 sm:w-6" : "bg-gray-300 dark:bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                suppressHydrationWarning={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}