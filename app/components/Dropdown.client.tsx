"use client";

import { useState, useEffect, useRef } from "react";
import { services } from "./constants/services";
import { locations } from "./constants/locations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";


const slugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DropdownClient() {

  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* close on navigation */
  useEffect(() => {
    setOpen(false);
    setActiveService(null);
  }, [pathname]);

  /* click outside */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveService(null);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* esc key */
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveService(null);
      }
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      {/* button */}
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className="relative px-4 py-2 font-medium text-white hover:text-orange-500 transition"
      >
        Services

        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-500 transition-all group-hover:w-full" />
      </button>

      {/* main dropdown */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-3 w-[300px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 z-50"
          >

            {services.map((service) => (

              <div
                key={slugToTitle(service)}
                onMouseEnter={() => setActiveService(service)}
                className="relative"
              >

                <Link
                  href={`/services/${service}`}
                  className="block px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {slugToTitle(service)}
                </Link>

                {/* submenu */}
                <AnimatePresence>

                  {activeService === service && (

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-0 left-full ml-2 w-[320px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 max-h-[420px] overflow-y-auto"
                    >

                      <div className="p-3 border-b text-xs font-semibold text-gray-500 uppercase">
                        Locations
                      </div>

                      {locations.map((location) => (

                        <Link
                          key={`${slugToTitle(service)}-${location}`}
                          href={`/services/${service}/${location}`}
                          className="block px-5 py-3 text-sm hover:bg-orange-50 dark:hover:bg-gray-700 transition"
                        >
                          {slugToTitle(service)} in {slugToTitle(location)}
                        </Link>

                      ))}

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}