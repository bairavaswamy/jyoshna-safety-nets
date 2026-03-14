"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Shield, Feather, Bird, EyeOff, Mail, Phone, Moon, Sun } from "lucide-react";

import { services } from "../components/constants/services";
import { locations } from "../components/constants/locations";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MenuClient({ open, onClose }: Props) {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Cool Feature: Dark Mode State

  const iconMap: Record<string, any> = {
    "bird-nets": Feather, // Better icon for bird nets
    "pigeon-nets": Bird, // Distinct for pigeon nets
    "safety-nets": Shield, // Kept for safety
    "invisible-grills": EyeOff, // Better for invisible grills
  };

  // Cool Feature: Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  /* autofocus when menu opens */
  // useEffect(() => {
  // if(open){
  // setTimeout(() => inputRef.current?.focus(), 200);
  // }
  // }, [open]);

  /* COMMAND PALETTE */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* SEARCH SUGGESTIONS */
  const suggestions = useMemo(() => {
    if (!search) return [];
    const results: { label: string; url: string }[] = [];
    services.forEach((service) => {
      if (service.title.toLowerCase().includes(search.toLowerCase())) {
        results.push({
          label: service.title,
          url: `/services/${service.slug}`,
        });
      }
      locations.forEach((loc) => {
        if (loc.toLowerCase().includes(search.toLowerCase())) {
          results.push({
            label: `${service.title} in ${loc}`,
            url: `/services/${service.slug}/${loc.toLowerCase().replace(/\s+/g, "-")}`,
          });
        }
      });
    });
    return results.slice(0, 10);
  }, [search]);

  /* KEYBOARD NAVIGATION */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!suggestions.length) return;
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      }
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
      }
      if (e.key === "Enter") {
        window.location.href = suggestions[selectedIndex].url;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [suggestions, selectedIndex]);

  return (
    <>
      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-xl z-[999]"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -420 }}
        animate={{ x: open ? 0 : -420 }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] md:w-[380px] z-[999]"
      >
        <div className="h-full flex flex-col bg-white/[0.05] dark:bg-gray-900/95 backdrop-blur-2xl border-r border-white/10 shadow-[0_20px_120px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* AMBIENT GLOW LIGHTS */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-orange-500/10 dark:bg-indigo-500/20 blur-[120px]"
              animate={{ x: ["-20%", "30%", "-10%"], y: ["-10%", "20%", "0%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-blue-500/10 dark:bg-yellow-400/20 blur-[140px]"
              animate={{ x: ["20%", "-20%", "10%"], y: ["30%", "-10%", "10%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* GLASS REFLECTION */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

          {/* HEADER */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-white dark:text-gray-100 tracking-wide">
                Jyoshna Safety Nets
              </h2>
              <div className="flex items-center gap-2">
                {/* Cool Feature: Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="text-neutral-400 hover:text-yellow-400 transition"
                  aria-label="Toggle dark mode"
                  suppressHydrationWarning={true}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-orange-400 dark:hover:text-yellow-400 text-lg sm:text-xl transition"
                  suppressHydrationWarning={true}
                >
                  ✕
                </button>
              </div>
            </div>
            <p className="text-xs text-neutral-400 dark:text-gray-400 mt-1">
              Safety Nets & Invisible Grills Distribution
            </p>
          </div>

          {/* SEARCH */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-neutral-400 dark:text-gray-400" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services or locations..."
                className="w-full bg-white/[0.06] dark:bg-gray-800/70 backdrop-blur-xl border border-white/10 text-white dark:text-gray-100 placeholder-neutral-400 dark:placeholder-gray-400 rounded-xl py-2.5 pl-9 sm:pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400 transition text-sm sm:text-base"
              />
              {/* Cool Feature: Search Progress Indicator */}
              {search && (
                <div className="absolute right-3 top-3 w-2 h-2 bg-orange-500 dark:bg-yellow-400 rounded-full animate-pulse" />
              )}
            </div>

            {/* SUGGESTIONS */}
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-white/[0.06] dark:bg-gray-800/70 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-lg"
              >
                {suggestions.map((item, i) => (
                  <Link
                    key={i}
                    href={item.url}
                    onClick={onClose}
                    className={`block px-3 sm:px-4 py-2 text-sm transition ${
                      i === selectedIndex
                        ? "bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900"
                        : "text-neutral-300 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <nav className="flex flex-col gap-3 sm:gap-4 font-medium">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`transition-all duration-200 text-sm sm:text-base ${
                      active
                        ? "text-orange-400 dark:text-yellow-400"
                        : "text-white dark:text-gray-100 hover:text-orange-400 dark:hover:text-yellow-400 hover:translate-x-1 hover:scale-[1.02]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* SERVICES */}
            <div>
              <h3 className="text-xs uppercase text-neutral-400 dark:text-gray-400 mb-3 sm:mb-4 tracking-widest">
                Services
              </h3>
              {services.map((service) => {
                const Icon = iconMap[service.slug] || Shield;
                const isActive = activeService === service.slug;
                return (
                  <div key={service.slug} className="border-b border-white/10 pb-3 mb-3">
                    <button
                      onClick={() => setActiveService(isActive ? null : service.slug)}
                      className="w-full flex items-center justify-between text-white dark:text-gray-100 font-semibold hover:text-orange-400 dark:hover:text-yellow-400 transition hover:translate-x-1 text-sm sm:text-base"
                      suppressHydrationWarning={true}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon size={18} className="text-orange-400 dark:text-yellow-400" />
                        {service.title}
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          isActive ? "rotate-180 text-orange-400 dark:text-yellow-400" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3 pl-6 sm:pl-7 space-y-2"
                        >
                          {locations.map((loc) => (
                            <Link
                              key={loc}
                              href={`/services/${service.slug}/${loc.toLowerCase().replace(/\s+/g, "-")}`}
                              onClick={onClose}
                              className="block text-sm text-neutral-300 dark:text-gray-300 hover:text-orange-400 dark:hover:text-yellow-400 transition"
                            >
                              {service.title} in {loc}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/10 p-3 sm:p-4 text-xs text-neutral-400 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Jyoshna Safety Nets
            {/* Cool Feature: Quick Contact Buttons */}
            <button
              onClick={() => window.open("mailto:info@jyoshnagrills.com", "_blank")}
              className="ml-3 sm:ml-4 text-orange-400 dark:text-yellow-400 hover:text-orange-500 dark:hover:text-yellow-500 transition"
              aria-label="Quick email"
              suppressHydrationWarning={true}
            >
              <Mail size={16} />
            </button>
            <button
              onClick={() => window.open("tel:+1234567890", "_blank")}
              className="ml-2 text-orange-400 dark:text-yellow-400 hover:text-orange-500 dark:hover:text-yellow-500 transition"
              aria-label="Quick call"
              suppressHydrationWarning={true}
            >
              <Phone size={16} />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}