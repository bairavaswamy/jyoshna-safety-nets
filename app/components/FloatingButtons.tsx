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

      {/* 🔼 Scroll To Top */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group backdrop-blur-md bg-white/80 hover:bg-white 
        text-black p-4 rounded-full shadow-xl 
        transition-all duration-300 transform hover:scale-110 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <HiOutlineArrowUp className="text-xl transition-transform duration-300 group-hover:-translate-y-1" />
      </button>

      {/* 📞 Call Button */}
      <div className="relative group">
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 
          bg-black text-white text-xs px-3 py-1 rounded-lg 
          opacity-0 group-hover:opacity-100 
          transition whitespace-nowrap">
          Call us now 📞
        </div>

        {/* Button */}
        <a
          href="tel:+918106420981"
          aria-label="Call Now"
          className="relative flex items-center justify-center 
          w-14 h-14 rounded-full 
          bg-red-600 hover:bg-red-700 
          shadow-2xl hover:scale-110 
          transition-all duration-300"
        >
          {/* Pulse Ring */}
          <span className="absolute w-14 h-14 rounded-full bg-red-400 animate-ping opacity-30"></span>

          <FiPhoneCall size={26} className="text-white relative z-10" />
        </a>
      </div>
    </div>
  );
}