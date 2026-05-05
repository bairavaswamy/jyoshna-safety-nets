"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Star,
} from "lucide-react";
import Link from "next/link";
import { services } from "./constants/services";
import { locations } from "./constants/locations";
import { FaWhatsapp } from "react-icons/fa";

/* ---------- FORMAT ---------- */
const formatName = (slug: string): string =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------- SERVICES ---------- */
function FooterServices() {
  return (
    <div className="space-y-4">
      <h4 className="mb-2 font-semibold text-white">Services</h4>

      <ul className="hide-scrollbar max-h-52 space-y-2 overflow-y-auto pr-2">
        {services.map((service) => (
          <li key={service}>
            <Link
              href={`/services/${service}`}
              className="text-neutral-400 transition-colors duration-200 hover:text-orange-500"
            >
              {formatName(service)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- PARTNER WEBSITES ---------- */
function PartnerWebsites() {
  const partners = [
    {
      name: "Rohini Invisible Grills",
      href: "https://rohiniinvisiblegrills.com",
      description:
        "A trusted partner for premium invisible grills, balcony safety grills, window grills, and modern home safety installations with a clean, view-friendly finish.",
    },
    {
      name: "Eversafe Safety Nets",
      href: "https://eversafesafetynets.com",
      description:
        "Professional safety net service provider for balcony safety nets, pigeon nets, children safety nets, duct area nets, and terrace safety net solutions.",
    },
    {
  name: "Srinu Vasulu Safety Nets",
  href: "https://www.srinuvasulusafetynets.com",
  description:
    "Reliable safety net installation partner for balcony safety nets, pigeon protection nets, children safety nets, duct nets, terrace nets, and apartment safety solutions.",
},
     
  ];

  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-white">Partner Websites</h4>

      <div className="space-y-4 text-sm">
        {partners.map((partner) => (
          <Link
            key={partner.href}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-500/40 hover:bg-orange-500/10"
          >
            <span className="block font-semibold text-orange-400">
              {partner.name}
            </span>

            <span className="mt-1 block leading-relaxed text-neutral-400">
              {partner.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- FOOTER ---------- */
export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visitors, setVisitors] = useState<number | null>(null);

  /* ---------- YEAR ---------- */
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  /* ---------- VISITOR COUNTER ---------- */
  useEffect(() => {
    setVisitors(3);
  }, []);

  useEffect(() => {
    if (visitors === null) return;

    const interval = setInterval(() => {
      setVisitors((value) =>
        Math.max(2, (value ?? 3) + Math.floor(Math.random() * 1 - 1))
      );
    }, 40000);

    return () => clearInterval(interval);
  }, [visitors]);

  /* ---------- SCROLL PROGRESS ---------- */
  const handleScroll = useCallback(() => {
    const total =
      document.documentElement.scrollHeight - window.innerHeight;

    if (total <= 0) {
      setScrollProgress(0);
      return;
    }

    setScrollProgress((window.scrollY / total) * 100);
  }, []);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1bcXPJGhhL/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/jyoshnainvisiblegrills?igsh=MTQ0dTllanZlZWozdA==",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://x.com/jyoshnainvisibl",
      label: "Twitter",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950 pb-14 pt-20 text-neutral-300">
      {/* SCROLL PROGRESS */}
      <div className="fixed bottom-0 left-0 z-50 h-1 w-full bg-neutral-800">
        <motion.div
          className="h-full origin-left bg-orange-500"
          style={{ scaleX: scrollProgress / 100 }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-3xl font-bold text-transparent md:text-2xl">
              Jyoshna Invisible Grills
            </h3>

            <p className="text-sm leading-relaxed text-neutral-400">
              Redefining balcony safety with sleek, high-strength invisible
              grills that blend seamlessly into modern architecture. We
              specialize in durable, rust-resistant installations that protect
              your loved ones without blocking your view.
            </p>

            <p className="text-sm leading-relaxed text-neutral-500">
              Trusted by homeowners for quality craftsmanship, precision
              fitting, and long-lasting safety solutions designed for today’s
              urban lifestyle.
            </p>

            {/* TRUST */}
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">
                10+ Years Experience
              </span>

              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">
                2800+ Installations
              </span>

              <span className="flex items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1">
                <Star size={12} /> 4.9 Rating
              </span>
            </div>

            {/* SOCIAL */}
            <div className="mt-3 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 transition duration-300 hover:bg-orange-500 hover:text-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <FooterServices />

          {/* AREAS */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Areas We Serve</h4>

            <ul className="hide-scrollbar grid h-48 grid-cols-2 gap-2 overflow-y-auto pr-2 text-sm lg:h-60">
              {locations.map((area) => {
                const slug = area.toLowerCase().replace(/\s+/g, "-");

                return (
                  <li key={area}>
                    <Link
                      href={`/services/invisible-grills/${slug}`}
                      className="text-neutral-400 transition hover:text-orange-500"
                    >
                      {formatName(area)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* PARTNER WEBSITES */}
          <PartnerWebsites />

          {/* CONTACT */}
          <div className="space-y-5">
            <h4 className="font-semibold text-white">Contact</h4>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+918106420981"
                className="flex items-center gap-2 transition hover:text-orange-500"
              >
                <Phone size={16} className="text-orange-400" />
                +91 8106420981
              </a>

              <a
                href="mailto:jyoshnainvisiblegrills@gmail.com"
                className="flex items-center gap-2 transition hover:text-orange-500"
              >
                <Mail size={16} className="text-orange-400" />
                jyoshnainvisiblegrills@gmail.com
              </a>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-400" />
                Vizag, India
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-neutral-400 md:flex-row">
          <p>© {year ?? 2026} Jyoshna Invisible Grills</p>

          <Link
            href="https://gbrixtechlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0"
          >
            <p>
              Designed by{" "}
              <span className="text-orange-400">GBrix Tech Labs</span>
            </p>
          </Link>

          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/" className="hover:text-orange-500">
              Privacy Policy
            </Link>

            <Link href="/" className="hover:text-orange-500">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* WHATSAPP BUTTON */}
      <div className="group fixed bottom-8 left-6 z-50">
        <div className="absolute bottom-6 left-16 whitespace-nowrap rounded-lg bg-black px-3 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Chat with us on WhatsApp 👋
        </div>

        <a
          href="https://wa.me/9392372421"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-green-500 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-600"
        >
          <FaWhatsapp size={28} className="text-white" />
        </a>
      </div>

      {/* VISITOR COUNTER */}
      {visitors !== null && (
        <div className="fixed bottom-24 left-6 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-xs shadow-md">
          {visitors} people viewing
        </div>
      )}
    </footer>
  );
}