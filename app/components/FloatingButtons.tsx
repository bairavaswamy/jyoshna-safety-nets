"use client";

import { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineArrowUp } from "react-icons/hi";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`group backdrop-blur-md bg-white/70 hover:bg-white text-black p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <HiOutlineArrowUp className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />
      </button>

      {/* Call Button */}
      <a
        href="tel:+918106420981"
        className="group relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
        aria-label="Call Now"
      >
        <FiPhoneCall className="text-xl transition-transform duration-300 group-hover:rotate-12" />

        {/* Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-xl group-hover:opacity-40 transition duration-300"></span>
      </a>
    </div>
  );
}