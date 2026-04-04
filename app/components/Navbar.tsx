"use client";

import { useState, useMemo, useEffect, useRef, memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, Moon, Sun, Mic } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { services } from "./constants/services";
import { locations } from "./constants/locations";

const MenuClient = dynamic(() => import("./Menu.client"), { ssr: false });
const DropdownClient = dynamic(() => import("./Dropdown.client"), { ssr: false });

type SearchItem = {
  label: string;
  url: string;
};

const slugToTitle = (slug: string) => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
};

const toSlug = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ---------------- Scroll ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (height > 0) {
        setProgress((window.scrollY / height) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Prefetch ---------------- */
  useEffect(() => {
    router.prefetch("/projects");
    router.prefetch("/about");
    router.prefetch("/contact");
  }, [router]);

  /* ---------------- CMD + K ---------------- */
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

  /* ---------------- Dark Mode ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  /* ---------------- Debounce ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  /* ---------------- Search Index ---------------- */
  const searchIndex: SearchItem[] = useMemo(() => {
    const index: SearchItem[] = [];

    services.forEach((serviceRaw) => {
      const service = toSlug(serviceRaw);

      index.push({
        label: slugToTitle(service),
        url: `/services/${service}`,
      });

      locations.forEach((locRaw) => {
        const location = toSlug(locRaw);

        index.push({
          label: `${slugToTitle(service)} in ${slugToTitle(location)}`,
          url: `/services/${service}/${location}`,
        });
      });
    });

    return index;
  }, []);

  /* ---------------- Suggestions ---------------- */
  const suggestions = useMemo(() => {
    if (!debouncedQuery) return [];

    const q = debouncedQuery.toLowerCase();

    return searchIndex
      .map((item) => {
        const label = item.label.toLowerCase();
        let score = 0;

        if (label.startsWith(q)) score += 3;
        if (label.includes(q)) score += 1;

        return { ...item, score };
      })
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [debouncedQuery, searchIndex]);

  /* Reset selected if suggestions change */
  useEffect(() => {
    setSelected(0);
  }, [debouncedQuery]);

  /* ---------------- Keyboard Nav ---------------- */
  useEffect(() => {
    if (!focus) return;

    const handler = (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        setSelected((p) => (p + 1) % suggestions.length);
      }

      if (e.key === "ArrowUp") {
        setSelected((p) =>
          p === 0 ? suggestions.length - 1 : p - 1
        );
      }

      if (e.key === "Enter") {
        router.push(suggestions[selected].url);
        setFocus(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focus, selected, suggestions, router]);

  /* ---------------- Focus Handling ---------------- */
  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setFocus(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setFocus(false);
    }, 150);
  };

  /* ---------------- Nav Links ---------------- */
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-yellow-400 z-[999]"
        style={{ width: `${progress}%` }}
      />

      <div className="fixed top-4 left-0 w-full z-[666] flex justify-center">
        <header
          className={`w-[95%] lg:w-[1200px] rounded-2xl border border-white/10 transition-all ${
            scrolled
              ? "bg-gray-900/85 backdrop-blur-xl shadow-lg"
              : "bg-gray-900/50 backdrop-blur-lg"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/jyoshna-invisible-grills-logo.webp"
                alt="Jyoshna Invisible Grills Logo"
                width={50}
                height={50}
                className="object-contain rounded-full border-2 border-yellow-400 shadow-lg bg-white"
              />
              <div>
                <p className="text-white font-semibold">Jyoshna</p>
                <p className="text-xs text-gray-400">
                  Invisible Grills
                </p>
              </div>
            </Link>

            {/* NAV */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition ${
                      active
                        ? "text-yellow-400"
                        : "text-gray-200 hover:text-yellow-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <DropdownClient />
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* SEARCH */}
              <div className="hidden lg:block relative">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Search services..."
                  className="bg-gray-800 border border-white/10 rounded-lg text-sm text-white pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-[220px]"
                />

                <button
                  aria-label="Voice Search"
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-yellow-400"
                >
                  <Mic size={14} />
                </button>

                {focus && suggestions.length > 0 && (
                  <div className="absolute top-10 w-full bg-gray-900 border border-white/10 rounded-xl shadow-lg overflow-hidden">
                    {suggestions.map((item, i) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className={`block px-4 py-2 text-sm transition ${
                          i === selected
                            ? "bg-yellow-400 text-gray-900"
                            : "text-gray-300 hover:bg-gray-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* DARK MODE */}
              <button
                onClick={toggleDark}
                className="hidden sm:block text-gray-400 hover:text-yellow-400"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* CTA */}
              <Link
                href="/contact"
                className="hidden sm:block bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-semibold px-5 py-2 rounded-md"
              >
                Enquiry
              </Link>

              {/* MOBILE */}
              <button
                onClick={() => setOpen((p) => !p)}
                className="lg:hidden text-white"
              >
                ☰
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className="pt-24" />

      <div className="lg:hidden">
        <MenuClient open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default memo(Navbar);