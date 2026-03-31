"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* IMAGES */
const images = [
  "/cards/invisble-grills-installation-near-me.webp",
  "/cards/balcony-safety-nets-near-me.webp",
  "/cards/transparant-balcony-safety-nets.webp",
  "/cards/anti-bird-net.webp",
  "/cards/duct-area-safety-nets-near-me.webp",
  "/cards/window-safety-nets.webp",
];

/* PROJECT DATA */
const projects = [
  { img: images[0], title: "Invisible Grill Installation", category: "Grills" },
  { img: images[1], title: "Balcony Safety Nets", category: "Safety Nets" },
  { img: images[2], title: "Luxury Balcony Protection", category: "Premium" },
  { img: images[3], title: "Anti Bird Net Solution", category: "Bird Nets" },
  { img: images[4], title: "Duct Area Safety", category: "Safety Nets" },
  { img: images[5], title: "Window Safety Nets", category: "Safety Nets" },
];

const categories = ["All", "Grills", "Safety Nets", "Bird Nets", "Premium"];

export default function ProjectsPage() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  /* FILTER */
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  /* SCROLL PROGRESS */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const p = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setProgress(p);
    };

    el.addEventListener("scroll", update);
    return () => el.removeEventListener("scroll", update);
  }, []);

  return ( <>
  <Navbar />
 
    <main className="bg-black -mt-20 mb-1 text-white">

      {/* HERO */}
      <section className="py-28 pt-20 text-center">
        <p className="text-yellow-400 tracking-[4px] text-sm">OUR PROJECTS</p>

        <h1 className="text-5xl font-bold mt-4 leading-tight">
          Premium Installations
          <br />
          Across Modern Homes
        </h1>

        <p className="text-white/60 mt-6 max-w-xl mx-auto">
          Explore our recent work featuring safety nets, invisible grills, and
          custom protection solutions for apartments and villas.
        </p>
      </section>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full border ${
              filter === c
                ? "bg-yellow-400 text-black"
                : "border-white/20 text-white/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* HORIZONTAL CINEMATIC SCROLL */}
      <section className="px-6 mb-20">

        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {filteredProjects.map((p, i) => (
            <TiltCard key={i} project={p} i={i} setActive={setActive} />
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full h-[3px] bg-white/20 mt-6">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

      </section>

      {/* GRID SECTION */}
      <section className="px-6 pb-24">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((p, i) => (
            <div
              key={i}
              className="relative h-[300px] rounded-xl overflow-hidden group"
              onClick={() => setActive(i)}
            >
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-110 transition"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute bottom-4 left-4">
                <p className="text-sm text-yellow-400">{p.category}</p>
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div className="relative w-[90vw] max-w-5xl h-[80vh]">

              <Image
                src={filteredProjects[active].img}
                alt={filteredProjects[active].title}
                fill
                className="object-contain"
              />

              <button
                className="absolute top-6 right-6 text-3xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(null);
                }}
              >
                ✕
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
    <Footer />
     </>
  );
}

/* TILT CARD */
function TiltCard({ project, i, setActive }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    x.set((px - 0.5) * 20);
    y.set((py - 0.5) * 20);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => setActive(i)}
      style={{ rotateY: x, rotateX: y }}
      className="min-w-[320px] h-[420px] rounded-2xl overflow-hidden relative cursor-pointer"
    >
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-6 left-6 text-lg font-semibold">
        {project.title}
      </div>
    </motion.div>
  );
}