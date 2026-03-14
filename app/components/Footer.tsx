"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress for back-to-top indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-300 py-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 via-transparent to-yellow-400/10 blur-3xl" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-700 z-50">
        <motion.div
          className="h-full bg-yellow-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white dark:text-gray-100 tracking-wide">
              Jyoshna Invisible Grills
            </h3>
            <p className="text-sm leading-relaxed">
              Expert in luxury balcony protection with high-tensile stainless steel invisible grills for safety and elegance. Trusted distributors across locations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/services/bird-nets" className="hover:text-yellow-400 transition-colors">
                  Bird Nets
                </a>
              </li>
              <li>
                <a href="/services/pigeon-nets" className="hover:text-yellow-400 transition-colors">
                  Pigeon Nets
                </a>
              </li>
              <li>
                <a href="/services/safety-nets" className="hover:text-yellow-400 transition-colors">
                  Safety Nets
                </a>
              </li>
              <li>
                <a href="/services/invisible-grills" className="hover:text-yellow-400 transition-colors">
                  Invisible Grills
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/projects" className="hover:text-yellow-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-yellow-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white dark:text-gray-100">
              Stay Updated
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 dark:bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                required
                suppressHydrationWarning={true}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
                suppressHydrationWarning={true}
              >
                <Send size={16} className="mr-2" />
                Subscribe
              </button>
            </form>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-400" />
                <a href="mailto:info@jyoshnagrills.com" className="hover:text-yellow-400 transition-colors">
                  info@jyoshnagrills.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-400" />
                <a href="tel:+1234567890" className="hover:text-yellow-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-yellow-400" />
                <span>Your City, State</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Jyoshna Invisible Grills. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-full shadow-lg transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
        suppressHydrationWarning={true}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}