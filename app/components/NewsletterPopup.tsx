// filepath: c:\Users\mohan\OneDrive\Desktop\jyoshna-website\app\components/NewsletterPopup.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000); // Show after 5s for engagement
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`); // Replace with API call for leads
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setShow(false)} className="float-right">
              <X size={20} />
            </button>
            <h3 className="text-lg font-bold mb-4">Get Free Safety Tips!</h3>
            <p className="mb-4">Subscribe for expert advice on balcony safety.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 border rounded mb-4"
                required
              />
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}