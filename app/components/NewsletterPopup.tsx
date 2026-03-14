"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const subscribed = localStorage.getItem("newsletter_subscribed");

    if (!subscribed) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShow(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("newsletter_subscribed", "true");

    // replace with API
    console.log("Subscribed:", email);

    setShow(false);
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };

    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-md rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close popup"
              onClick={closePopup}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Get Free Balcony Safety Tips
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Join our newsletter to receive expert advice on invisible grills,
              pigeon nets, and balcony protection.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white py-2 font-medium transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}