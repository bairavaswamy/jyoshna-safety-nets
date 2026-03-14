"use client";

import { useState, memo, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, Bell, Moon, Sun, Mic } from "lucide-react";
import { usePathname } from "next/navigation";

import { services } from "./constants/services";
import { locations } from "./constants/locations";

const MenuClient = dynamic(() => import("./Menu.client"), { ssr: false });
const DropdownClient = dynamic(() => import("./Dropdown.client"), { ssr: false });

// Growth Feature: Analytics Hook (enable by adding GA script)
const useAnalytics = () => {
  const trackEvent = (event: string, data?: any) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, data);
    }
  };
  return { trackEvent };
};

const Navbar: React.FC = () => {
    const [mounted, setMounted] = useState(false);
      useEffect(() => {
    setMounted(true);
  }, []);
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Growth Feature: Dark Mode

  const inputRef = useRef<HTMLInputElement>(null);

  // SCROLL SHRINK
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // COMMAND SEARCH
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        trackEvent("search_opened", { method: "shortcut" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trackEvent]);

  // SEARCH RESULTS
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
            url: `/services/${service.slug}/${loc}`,
          });
        }
      });
    });
    return results.slice(0, 8);
  }, [search]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (!suggestions.length) return;
      if (e.key === "ArrowDown") setSelected((prev) => (prev + 1) % suggestions.length);
      if (e.key === "ArrowUp") setSelected((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
      if (e.key === "Enter") {
        trackEvent("search_selected", { url: suggestions[selected].url });
        window.location.href = suggestions[selected].url;
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [suggestions, selected, trackEvent]);

  // Growth Feature: Dark Mode Toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    trackEvent("dark_mode_toggled", { enabled: !darkMode });
    // Implement theme switching logic here (e.g., via context or CSS variables)
  };

    if (!mounted) {
    return (
      <div className="fixed top-0 left-0 w-full z-[998]">
        {/* optional skeleton or blank header so server/client match */}
      </div>
    );
  }

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-[2px] w-full bg-yellow-400 z-[999]" />

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[998] flex justify-center pt-4 sm:pt-6">
        <header
          className={`
            relative w-[95%] sm:w-[90%] md:w-[1000px] lg:w-[1200px] xl:w-[1400px]
            rounded-2xl border border-white/10 transition-all duration-500
            ${scrolled
              ? "bg-gray-900/80 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
              : "bg-gray-900/50 backdrop-blur-xl"}
          `}
        >
          {/* GRADIENT BORDER */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/20 via-transparent to-yellow-400/20" />
          </div>

          {/* AMBIENT GLOW */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/15 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400/10 blur-[140px]" />
          </div>

          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 relative z-10">
            {/* LOGO */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-yellow-400 font-bold text-2xl sm:text-3xl tracking-wider">JG</div>
              <div className="leading-tight">
                <p className="font-semibold text-gray-100">Jyoshna</p>
                <p className="text-xs sm:text-sm text-gray-400">Invisible Grills</p>
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-4 sm:gap-6">
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
                    className={`
                      relative px-2 sm:px-3 py-2 text-sm font-medium transition group
                      ${active ? "text-yellow-400" : "text-gray-200 hover:text-yellow-400"}
                    `}
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                    {active && <span className="absolute inset-0 blur-lg opacity-20 bg-yellow-400" />}
                  </Link>
                );
              })}
              <DropdownClient />
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Growth Feature: Notification Bell */}
              <button
                aria-label="Notifications"
                className="hidden sm:block p-2 text-gray-400 hover:text-yellow-400 transition"
                onClick={() => trackEvent("notification_clicked")}
              >
                <Bell size={18} />
              </button>

              {/* SEARCH */}
              <div className="hidden lg:block relative">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setTimeout(() => setFocus(false), 200)}
                  placeholder="Search services..."
                  className="bg-gray-800/70 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[200px] sm:w-[230px] backdrop-blur-lg"
                />
                {/* Growth Feature: Voice Search */}
                <button
                  aria-label="Voice search"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-yellow-400"
                  onClick={() => trackEvent("voice_search_clicked")}
                >
                  <Mic size={14} />
                </button>

                {/* Suggestions */}
                {focus && suggestions.length > 0 && (
                  <div className="absolute top-10 w-full bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {suggestions.map((item, i) => (
                      <Link
                        key={i}
                        href={item.url}
                        className={`block px-4 py-2 text-sm transition ${
                          i === selected ? "bg-yellow-400 text-gray-900" : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Growth Feature: Dark Mode Toggle */}
              <button
                aria-label="Toggle dark mode"
                onClick={toggleDarkMode}
                className="hidden sm:block p-2 text-gray-400 hover:text-yellow-400 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Growth Feature: Social Links */}
              <div className="hidden md:flex gap-2">
                <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>

              {/* CTA */}
              <button
                className="hidden sm:inline-block relative px-4 sm:px-5 py-2 text-sm font-semibold text-white rounded-md bg-yellow-400 hover:bg-yellow-500 shadow-lg shadow-yellow-400/40 transition"
                onClick={() => trackEvent("enquiry_clicked")}
              >
                <span className="relative z-10">Enquiry</span>
                <span className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-yellow-400 to-yellow-600 blur-lg transition" />
              </button>

              {/* MOBILE BUTTON */}
              <button
                aria-label="Menu"
                onClick={() => setOpen(!open)}
                className="block lg:hidden p-2 hover:text-yellow-400 transition"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="pt-24 sm:pt-28" />

      {/* MOBILE MENU */}
      <div className="block lg:hidden">
        <MenuClient open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default memo(Navbar);