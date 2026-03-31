"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Bangalore",
    date: "Jan 2026",
    highlight: "Installation was clean and completed in just 2 hours.",
    text: "Got invisible grills installed for my 12th floor apartment. The team came on time, explained everything clearly, and completed the work neatly without any mess.",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    date: "Feb 2026",
    highlight: "Now I feel completely safe for my kids.",
    text: "We were worried about balcony safety for our child. After installing the safety net, it feels secure and doesn’t affect the view at all.",
  },
  {
    name: "Arjun Mehta",
    location: "Whitefield",
    date: "Mar 2026",
    highlight: "Professional team and solid quality materials.",
    text: "Compared multiple vendors before choosing Jyosha. Their quality and finishing were clearly better. Worth the price.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  // const [mounted, setMounted] = useState(false);

  // // Ensure we only render after client mount
  // useState(() => setMounted(true));

  const next = ():void => setIndex((p) => (p + 1) % testimonials.length);
  const prev = ():void => setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  // scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const item = testimonials[index];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-black text-white overflow-hidden"
    >
      {/* background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(250,204,21,0.12), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 50%),
              linear-gradient(to bottom, #000000, #050505)
            `,
          }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* heading */}
        <div className="mb-16">
          <p className="uppercase tracking-[4px] text-yellow-400 text-sm">
            REAL CUSTOMER VOICES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Trusted by Families
            <br />
            <span className="text-yellow-400">Across Cities</span>
          </h2>

          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Genuine feedback from real customers who chose safety for their homes.
          </p>
        </div>

        {/* testimonial */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) next();
                if (info.offset.x > 80) prev();
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-10 text-left"
              style={{
                background: "rgba(15,15,15,0.9)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(250,204,21,0.2)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
              }}
            >
              {/* highlight */}
              <p className="text-xl md:text-2xl font-semibold text-yellow-400 leading-snug">
                “{item.highlight}”
              </p>

              {/* full text */}
              <p className="text-white/70 mt-5 leading-relaxed">
                {item.text}
              </p>

              {/* meta */}
              <div className="mt-8 flex flex-wrap justify-between items-center text-sm text-white/50">
                <div>
                  {item.name} • {item.location}
                </div>

                <div className="flex items-center gap-3">
                  <span>{item.date}</span>
                  <span className="text-green-400">
                    ✔ Verified Customer
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrows */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:bg-yellow-400 hover:text-black transition"
            >
             {"‹"}
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-yellow-400 text-black hover:scale-110 transition"
            >
            {" ›"}
            </button>
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="rounded-full"
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  background: i === index ? "#facc15" : "#555",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}