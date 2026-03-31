"use client";

import React, { useRef } from "react";

interface Service {
  title: string;
  desc: string;
  img: string;
}

// SEO-friendly descriptions
const services: Service[] = [
  {
    title: "Invisible Grills",
    desc: "Enhance balcony safety with high-quality invisible grills that provide maximum protection without blocking your view or aesthetics.",
    img: "/balcony-1.webp",
  },
  {
    title: "Balcony Safety Nets",
    desc: "Premium balcony safety nets designed to protect children, pets, and belongings while maintaining airflow and visibility.",
    img: "/balcony-5.webp",
  },
  {
    title: "Pigeon Safety Nets",
    desc: "Effective anti-pigeon netting solutions to keep your space clean, hygienic, and free from bird disturbances.",
    img: "/balcony-6.webp",
  },
  {
    title: "Anti Bird Nets",
    desc: "Durable bird protection nets that prevent unwanted entry while ensuring long-lasting performance.",
    img: "/balcony-7.webp",
  },
  {
    title: "Duct Area Safety Nets",
    desc: "Secure open duct areas with strong and reliable safety nets to prevent accidents and ensure safety compliance.",
    img: "/balcony-9.webp",
  },
  {
    title: "Safety Net Installation",
    desc: "Professional safety net installation services ensuring proper fitting, durability, and long-term reliability.",
    img: "/balcony-1.webp",
  },
  {
    title: "Windows Safety Nets",
    desc: "Protect open windows with nearly invisible yet strong safety nets for homes, apartments, and offices.",
    img: "/balcony-5.webp",
  },
  {
    title: "Monkey Safety Nets",
    desc: "Specialized monkey protection nets designed to prevent entry and ensure complete safety in affected areas.",
    img: "/balcony-6.webp",
  },
  {
    title: "Sports Nets",
    desc: "High-quality sports nets suitable for cricket, football, and multi-purpose grounds with superior durability.",
    img: "/balcony-7.webp",
  },
  {
    title: "Children Safety Nets",
    desc: "Child safety nets designed for balconies and open spaces to provide maximum protection and peace of mind.",
    img: "/balcony-9.webp",
  },
];

export default function PremiumSlider(): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050510] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[160px] rounded-full" />

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-6 py-10 w-full max-w-[1200px] snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {services.map((service, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[85%] sm:w-[340px] h-[460px] rounded-[30px] relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_80px_rgba(168,85,247,0.35)]"
          >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />

            {/* Image */}
            <div className="h-[45%] w-full rounded-t-[30px] overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover opacity-70"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-white flex flex-col justify-between h-[55%]">
              <h3 className="text-xl font-semibold leading-tight">
                {service.title}
              </h3>

              <p className="text-sm text-white/70 mt-3 leading-relaxed">
                {service.desc}
              </p>

              <button className="mt-4 w-fit px-5 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// add this in globals.css
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
