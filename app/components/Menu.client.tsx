"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  ChevronDown,
  Shield,
  Feather,
  Bird,
  EyeOff,
  Mail,
  Phone,
  Moon,
  Sun,
} from "lucide-react";

import { services } from "../components/constants/services";
import { locations } from "../components/constants/locations";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Suggestion = {
  label: string;
  url: string;
};

/* ✅ Convert slug → readable title */
const formatServiceTitle = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function MenuClient({ open, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  /* ICON MAP */

  const iconMap: Record<string, React.ElementType> = {
    "anti-bird-nets": Feather,
    "pigeon-safety-nets": Bird,
    "balcony-safety-nets": Shield,
    "invisible-grills": EyeOff,
  };

  /* DARK MODE SYNC */

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* ✅ SEARCH INDEX */

  const searchIndex: Suggestion[] = useMemo(() => {
    const index: Suggestion[] = [];

    services.forEach((service) => {
      const title = formatServiceTitle(service);

      index.push({
        label: title,
        url: `/services/${service}`,
      });

      locations.forEach((loc) => {
        const slug = loc.toLowerCase().replace(/\s+/g, "-");

        index.push({
          label: `${title} in ${loc}`,
          url: `/services/${service}/${slug}`,
        });
      });
    });

    return index;
  }, []);

  /* SEARCH RESULTS */

  const suggestions = useMemo(() => {
    if (!search) return [];

    const q = search.toLowerCase();

    return searchIndex
      .filter((item) => item.label.toLowerCase().includes(q))
      .slice(0, 10);
  }, [search, searchIndex]);

  /* KEYBOARD NAVIGATION */

  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        setSelectedIndex((p) => (p + 1) % suggestions.length);
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex((p) =>
          p === 0 ? suggestions.length - 1 : p - 1
        );
      }

      if (e.key === "Enter") {
        router.push(suggestions[selectedIndex].url);
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [suggestions, selectedIndex, open, router, onClose]);

  /* AUTOFOCUS */

  useEffect(() => {
    if (!open) return;

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(
      navigator.userAgent
    );

    if (!isMobile) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

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
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[999]"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 130, damping: 20 }}
        className="fixed top-0 left-0 h-full w-[320px] z-[1000]"
      >
        <div className="h-full flex flex-col bg-gray-900/90 backdrop-blur-3xl border-r border-white/10 shadow-2xl">
          {/* HEADER */}
          <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Jyoshna Safety Nets
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="text-gray-400 hover:text-yellow-400"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-orange-400 text-lg"
              >
                ✕
              </button>
            </div>
          </div>

          {/* SEARCH */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />

              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full bg-gray-800 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-3 bg-gray-800 rounded-lg border border-white/10 overflow-hidden">
                {suggestions.map((item, i) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    onClick={onClose}
                    className={`block px-4 py-2 text-sm ${
                      i === selectedIndex
                        ? "bg-yellow-400 text-gray-900"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {[
                { name: "Home", href: "/" },
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
                    className={
                      active
                        ? "text-yellow-400"
                        : "text-white hover:text-yellow-400"
                    }
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* SERVICES */}
            <div>
              <h3 className="text-xs uppercase text-gray-400 mb-4 tracking-wider">
                Services
              </h3>

              {services.map((service) => {
                const title = formatServiceTitle(service);
                const Icon = iconMap[service] || Shield;
                const isActive = activeService === service;

                return (
                  <div key={service} className="mb-4">
                    <button
                      onClick={() =>
                        setActiveService(isActive ? null : service)
                      }
                      className="flex items-center justify-between w-full text-white hover:text-yellow-400"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {title}
                      </div>

                      <ChevronDown
                        size={18}
                        className={`transition-transform ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-6 mt-2 space-y-1"
                        >
                          {locations.map((loc) => {
                            const slug = loc
                              .toLowerCase()
                              .replace(/\s+/g, "-");

                            return (
                              <Link
                                key={loc}
                                href={`/services/${service}/${slug}`}
                                onClick={onClose}
                                className="block text-sm text-gray-400 hover:text-yellow-400"
                              >
                                {title} in {loc}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-white/10 p-4 text-xs text-gray-400 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Jyoshna</span>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  window.open("mailto:info@jyoshnagrills.com")
                }
              >
                <Mail size={16} />
              </button>

              <button
                onClick={() => window.open("tel:+1234567890")}
              >
                <Phone size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}