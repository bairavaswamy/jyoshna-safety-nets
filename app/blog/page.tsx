"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* BLOG DATA */
const blogs = [
  {
    slug: "invisible-grills-guide",
    title: "Complete Guide to Invisible Grills for Modern Homes",
    category: "Grills",
    img: "/cards/invisble-grills-installation-near-me.webp",
    desc: "Learn how invisible grills improve safety while keeping your home stylish and open.",
  },
  {
    slug: "balcony-safety-nets",
    title: "Why Balcony Safety Nets Are Essential for Apartments",
    category: "Safety Nets",
    img: "/cards/balcony-safety-nets-near-me.webp",
    desc: "Protect your family and pets with durable balcony safety net solutions.",
  },
  {
    slug: "anti-bird-net",
    title: "Best Anti Bird Net Solutions for Homes",
    category: "Bird Nets",
    img: "/cards/anti-bird-net.webp",
    desc: "Stop pigeons and birds from damaging your space with effective net solutions.",
  },
];

const categories = ["All", "Grills", "Safety Nets", "Bird Nets"];

export default function Blog() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? blogs
      : blogs.filter((b) => b.category === filter);

  const featured = blogs[0];

  return (
    <>
      <Navbar />

      <main className="bg-black text-white -mt-20">

        {/* HERO */}
        <section className="py-28 text-center">
          <p className="text-yellow-400 tracking-[4px] text-sm">OUR BLOG</p>

          <h1 className="text-5xl font-bold mt-4">
            Safety Guides & Insights
          </h1>

          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Expert tips, installation guides, and safety solutions
            for modern homes and apartments.
          </p>
        </section>

        {/* FEATURED BLOG */}
        <section className="px-6 mb-20">
          <Link href={`/blog/${featured.slug}`}>
            <div className="grid md:grid-cols-2 gap-10 items-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">

              {/* IMAGE */}
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div>
                <p className="text-yellow-400 text-sm mb-2">
                  Featured Article
                </p>

                <h2 className="text-3xl font-bold mb-3">
                  {featured.title}
                </h2>

                <p className="text-white/60 mb-4">
                  {featured.desc}
                </p>

                <span className="text-sm text-yellow-400">
                  Read More →
                </span>
              </div>

            </div>
          </Link>
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

        {/* BLOG LIST */}
        <section className="px-6 pb-24">

          <div className="grid md:grid-cols-3 gap-8">
            {filtered.map((b, i) => (
              <Link key={i} href={`/blog/${b.slug}`}>

                <div className="group">

                  {/* IMAGE */}
                  <div className="relative h-[220px] rounded-xl overflow-hidden">
                    <Image
                      src={b.img}
                      alt={b.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="mt-4">
                    <p className="text-yellow-400 text-sm">
                      {b.category}
                    </p>

                    <h3 className="font-semibold mt-1 leading-snug group-hover:text-yellow-400 transition">
                      {b.title}
                    </h3>

                    <p className="text-white/60 text-sm mt-2">
                      {b.desc}
                    </p>
                  </div>

                </div>

              </Link>
            ))}
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}