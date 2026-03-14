"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Send,
  MessageCircle,
  Star,
} from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visitors, setVisitors] = useState(3);

  /* ---------- Hydration Safe Year ---------- */

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  /* ---------- Visitor Counter Psychology ---------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((v) => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(2, v + change);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* ---------- Scroll Progress ---------- */

  const handleScroll = useCallback(() => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = (window.scrollY / totalHeight) * 100;

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-black text-gray-300 pt-24 pb-14 overflow-hidden">

      {/* Aurora Background */}

      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30 blur-3xl"
          style={{
            background:
              "linear-gradient(120deg,#facc15,#6366f1,#22c55e,#facc15)",
            backgroundSize: "300% 300%",
          }}
        />

      </div>

      {/* Scroll Progress */}

      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gray-800 z-50">

        <motion.div
          className="h-full bg-yellow-400"
          style={{ width: `${scrollProgress}%` }}
        />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Lead Banner */}

        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-indigo-500/10 border border-yellow-400/20 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h2 className="text-xl font-semibold text-white">
              Protect Your Balcony Today
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Free inspection available in Bangalore.
            </p>

          </div>

          <div className="flex gap-4">

            <a
              href="tel:+919000000000"
              className="px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919000000000"
              className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition"
            >
              WhatsApp
            </a>

          </div>

        </div>

        {/* GRID */}

        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="space-y-6">

            <h3 className="text-xl font-bold text-white">
              Jyoshna Invisible Grills
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Premium invisible grill installations protecting modern
              apartments without blocking the view.
            </p>

            {/* Trust */}

            <div className="flex flex-wrap gap-2 text-xs">

              <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                10+ Years Experience
              </span>

              <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                2800+ Installations
              </span>

              <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center gap-1">
                <Star size={12} /> 4.9 Rating
              </span>

            </div>

            {/* Social */}

            <div className="flex gap-4">

              {[Facebook, Instagram, Twitter].map((Icon, i) => (

                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                  href="#"
                >
                  <Icon size={18} />
                </motion.a>

              ))}

            </div>

          </div>

          {/* Services */}

          <div>

            <h4 className="text-white font-semibold mb-4">
              Services
            </h4>

            <ul className="space-y-3 text-sm">

              <li><a href="/services/invisible-grills" className="hover:text-yellow-400">Invisible Grills</a></li>
              <li><a href="/services/pigeon-nets" className="hover:text-yellow-400">Pigeon Nets</a></li>
              <li><a href="/services/balcony-safety-nets" className="hover:text-yellow-400">Balcony Nets</a></li>
              <li><a href="/services/bird-nets" className="hover:text-yellow-400">Bird Nets</a></li>

            </ul>

          </div>

          {/* Locations SEO */}

          <div>

            <h4 className="text-white font-semibold mb-4">
              Service Areas
            </h4>

            <ul className="grid grid-cols-2 gap-2 text-sm">

              <li><a href="/invisible-grills-whitefield" className="hover:text-yellow-400">Whitefield</a></li>
              <li><a href="/invisible-grills-sarjapur" className="hover:text-yellow-400">Sarjapur</a></li>
              <li><a href="/pigeon-nets-varthur" className="hover:text-yellow-400">Varthur</a></li>
              <li><a href="/nets-marathahalli" className="hover:text-yellow-400">Marathahalli</a></li>
              <li><a href="/nets-hsr-layout" className="hover:text-yellow-400">HSR Layout</a></li>
              <li><a href="/nets-electronic-city" className="hover:text-yellow-400">Electronic City</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div className="space-y-6">

            <h4 className="text-white font-semibold">
              Newsletter
            </h4>

            <form
              onSubmit={submitNewsletter}
              className="flex gap-2"
            >

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-yellow-400 text-sm"
                required
              />

              <button
                className="px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
              >
                <Send size={16} />
              </button>

            </form>

            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-yellow-400"/>
                +91 90000 00000
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-400"/>
                info@jyoshnagrills.com
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-yellow-400"/>
                Bangalore, India
              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>
            © {year ?? 2026} Jyoshna Invisible Grills
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-yellow-400">Privacy</a>
            <a href="/terms" className="hover:text-yellow-400">Terms</a>
          </div>

        </div>

      </div>

      {/* Floating WhatsApp */}

      <a
        href="https://wa.me/919000000000"
        className="fixed bottom-6 left-6 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl z-50"
      >
        <MessageCircle size={22}/>
      </a>

      {/* Visitors */}

      <div className="fixed bottom-24 left-6 text-xs bg-black/80 border border-gray-700 px-3 py-2 rounded-lg">
        {visitors} people viewing
      </div>

      {/* Back to top */}

      <motion.button
        onClick={scrollTop}
        whileHover={{ scale:1.1 }}
        whileTap={{ scale:0.9 }}
        className="fixed bottom-6 right-6 p-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-xl"
      >
        <ArrowUp size={20}/>
      </motion.button>

    </footer>
  );
}