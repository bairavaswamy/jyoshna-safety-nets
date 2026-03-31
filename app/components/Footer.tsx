"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import { services } from "./constants/services";

/* ---------- FORMAT ---------- */
const formatName = (slug: string): string =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------- SERVICES ---------- */
function FooterServices() {
  return (
    <div className="space-y-4">
      <h4 className="text-white font-semibold mb-2">Services</h4>
      <ul className="space-y-2 max-h-52 overflow-y-auto pr-2 scrollbar-none">
        {services.map((service) => (
          <li key={service}>
            <Link
              href={`/services/${service}`}
              className="text-neutral-400 hover:text-orange-500 transition-colors duration-200"
            >
              {formatName(service)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- PREMIUM CTA BUTTON ---------- */
function PremiumCTA() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
  };

  const resetMagnet = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0px, 0px)";
  };

  // return (
  //   <motion.button
  //     ref={buttonRef}
  //     onMouseMove={handleMouseMove}
  //     onMouseLeave={resetMagnet}
  //     whileHover={{ scale: 1.05 }}
  //     whileTap={{ scale: 0.95 }}
  //     className="px-10 py-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
  //   >
  //     Get Free Quote
  //   </motion.button>
  // );
}

/* ---------- FOOTER ---------- */
export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visitors, setVisitors] = useState<number | null>(null);

  /* ---------- YEAR ---------- */
  useEffect(() => setYear(new Date().getFullYear()), []);

  /* ---------- VISITOR COUNTER ---------- */
  useEffect(() => setVisitors(3), []);
  useEffect(() => {
    if (visitors === null) return;
    const interval = setInterval(() => {
      setVisitors((v) => Math.max(2, (v ?? 3) + Math.floor(Math.random() * 3 - 1)));
    }, 4000);
    return () => clearInterval(interval);
  }, [visitors]);

  /* ---------- SCROLL PROGRESS ---------- */
  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress((window.scrollY / total) * 100);
  }, []);

  const scrollTop = ():void => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-neutral-950 text-neutral-300 pt-20 pb-14 border-t border-white/10 overflow-hidden">

      {/* SCROLL PROGRESS */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <motion.div
          className="h-full bg-orange-500 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* CTA BANNER */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-orange-500/10 to-indigo-500/10 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Protect Your Balcony Today
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Free inspection available in your area.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:+919000000000"
              className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/919000000000"
              className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div className="space-y-5">
            <h3 className="text-xl md:text-2xl font-bold text-white">Jyoshna Invisible Grills</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium invisible grill installations designed for safety, durability, and modern living.
            </p>

            {/* TRUST */}
            <div className="flex flex-wrap gap-2 text-xs mt-2">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">10+ Years Experience</span>
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">2800+ Installations</span>
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center gap-1"><Star size={12} /> 4.9 Rating</span>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-orange-500 hover:text-white transition"
                  href="#"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <FooterServices />

          {/* AREAS */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {["whitefield","sarjapur","varthur","marathahalli","hsr-layout","electronic-city"].map(area => (
                <li key={area}>
                  <Link
                    href={`/services/invisible-grills/${area}`}
                    className="text-neutral-400 hover:text-orange-500 transition"
                  >
                    {formatName(area)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Phone size={16} className="text-orange-400" /> +91 90000 00000</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-orange-400" /> info@jyoshnagrills.com</div>
              <div className="flex items-center gap-2"><MapPin size={16} className="text-orange-400" /> Bangalore, India</div>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
          <p>© {year ?? 2026} Jyoshna Invisible Grills</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-orange-500">Privacy</Link>
            <Link href="/terms" className="hover:text-orange-500">Terms</Link>
          </div>
        </div>

      </div>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/919000000000"
        className="fixed bottom-6 left-6 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl z-50 transition"
      >
        <MessageCircle size={22} />
      </a>

      {/* VISITOR COUNTER */}
      {visitors !== null && (
        <div className="fixed bottom-24 left-6 text-xs bg-black/80 border border-white/10 px-3 py-2 rounded-lg shadow-md">
          {visitors} people viewing
        </div>
      )}

      {/* BACK TO TOP */}
      {/* <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-xl transition"
      >
        <ArrowUp size={20} />
      </motion.button> */}

       {/* <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
 className="fixed bottom-6 right-6 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-xl transition"
        aria-label="Back to top"
      >
     <ArrowUp size={20} />
      </motion.button> */}
    </footer>
  );
}