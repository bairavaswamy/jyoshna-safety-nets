"use client";

import { useState, useEffect, useRef } from "react";
import { services } from "./constants/services";
import Link from "next/link";
import { locations } from "./constants/locations";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DropdownClient() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown after navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Button */}
      <button
        className="relative px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-white dark:text-gray-100 transition-all duration-300 hover:text-orange-500 dark:hover:text-yellow-400 group"
        suppressHydrationWarning={true}
      >
        Services
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 dark:bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
      </button>

      {/* First Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 mt-3 w-64 sm:w-72 bg-white dark:bg-gray-800 shadow-xl bg-gradient-to-r from-amber-50 dark:from-gray-700 via-yellow-50 dark:via-gray-600 to-white dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden z-50"
          >
            {services.map((service, index) => (
              <ServiceItem
                key={service.slug}
                service={service}
                index={index}
                closeMenu={() => setOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ========================= */
/* Sub Component */
/* ========================= */

function ServiceItem({ service, index, closeMenu }: { service: any; index: number; closeMenu: () => void }) {
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div
      className="relative bg-gradient-to-r from-amber-50 dark:from-gray-700 via-yellow-50 dark:via-gray-600 to-white dark:to-gray-800"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      {/* Service Link */}
      <Link
        href={`/services/${service.slug}`}
        onClick={closeMenu}
        className="block relative px-4 sm:px-5 py-3 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 transition-all duration-300 hover:text-orange-500 dark:hover:text-yellow-400 group"
      >
        {service.title}
        <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-orange-500 dark:bg-yellow-400 transition-all z-10 duration-300 group-hover:w-full"></span>
      </Link>

      {/* Second Dropdown */}
      <AnimatePresence>
        {subOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-full top-0 w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-xl bg-gradient-to-r from-amber-50 dark:from-gray-700 via-yellow-50 dark:via-gray-600 to-white dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg max-h-[50vh] sm:max-h-[57vh] overflow-y-auto z-50"
          >
            {locations.map((location: string) => (
              <Link
                key={`${service.slug}-${location}`}
                href={`/services/${service.slug}/${location}`}
                onClick={closeMenu}
                className="block px-4 sm:px-5 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors duration-300"
              >
                {service.title} in {location}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}