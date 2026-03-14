"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
  const handleScroll = () => {
    const scrolled =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;

    if (scrolled > 75) {
      window.gtag?.("event", "scroll_75");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return null;
}