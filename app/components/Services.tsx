"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"

const services = [
  {
    title: "Invisible Grills",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498c",
    desc: "Stainless steel wire grills that protect your balconies and windows without blocking your view.",
    tag: "Most Popular",
  },
  {
    title: "Balcony Safety Grills",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    desc: "Prevent accidental falls in high-rise apartments with our invisible balcony protection.",
    tag: "Safety First",
  },
  {
    title: "Anti Bird Nets",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    desc: "Keep pigeons and birds away from your balcony without any ugly mesh or cages.",
    tag: "Hygienic",
  },
  {
    title: "Sports Nets",
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe",
    desc: "Cricket practice nets and terrace ball-stop solutions for residential complexes.",
    tag: "Outdoor",
  },
  {
    title: "Duct Area Safety",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    desc: "Secure open shafts and duct areas in your building with durable safety nets.",
    tag: "Industrial",
  },
  {
    title: "Children Safety Grills",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
    desc: "Give parents peace of mind with child-safe grill systems for balconies and windows.",
    tag: "Child Safe",
  },
]



export default function EliteCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState<1 | -1>(1)
  const dragStartX = useRef<number>(0)
  const total = services.length

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir)
      setCurrent((prev) => (prev + dir + total) % total)
    },
    [total]
  )

  // Autoplay
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), 4500)
    return () => clearInterval(id)
  }, [paused, go])

  // Returns the service index for a given slot offset from current
  const getIndex = (offset: number) => (current + offset + total) % total

  // ─── Drag / Touch Handlers ───────────────────────────────────────────────
  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX
    setPaused(true)
  }

  const handleDragEnd = (clientX: number) => {
    const delta = dragStartX.current - clientX
    if (delta > 50) go(1)
    else if (delta < -50) go(-1)
    setPaused(false)
  }

  // Desktop mouse
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX)
  const onMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX)

  // Mobile touch
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX)

  //usescroll
  const sectionRef = useRef(null)

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
})

const yParallax = useTransform(scrollYProgress, [0, 1], [80, -80])
const scaleParallax = useTransform(scrollYProgress, [0, 1], [0.95, 1])

  return (
    // Replace ONLY the return JSX styling parts with below improvements

<section ref={sectionRef}
  className="relative py-24 overflow-hidden bg-black text-white"
  style={{ fontFamily: "'Inter', sans-serif" }}
>
    <motion.div
  style={{ y: yParallax }}
  className="absolute inset-0 -z-10 transition-all duration-700"
>
  <div
    className="w-full h-full"
    style={{
      background: `
        radial-gradient(circle at 20% 30%, rgba(250,204,21,0.15), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08), transparent 50%),
        linear-gradient(to bottom, #000000, #050505)
      `,
    }}
  />
</motion.div>

  {/* Premium gradient glow */}
  <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full" />
  <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full" />

  {/* HEADER */}
  <div className="relative z-10 text-center mb-16 px-6">
    <p className="uppercase tracking-[4px] text-yellow-400 text-sm mb-3">
      JYOSHA
    </p>

    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
      Premium Safety
      <br />
      <span className="text-yellow-400">For Modern Living</span>
    </h2>

    <p className="text-white/60 mt-4 max-w-xl mx-auto">
      Invisible protection systems crafted for high-rise apartments,
      blending safety with elegance.
    </p>
  </div>

  {/* DESKTOP */}
  <div
    className="hidden md:block relative z-10 select-none"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    <div className="flex items-center justify-center gap-8 px-10 h-[520px]">
      {[-1, 0, 1].map((offset) => {
        const idx = getIndex(offset)
        const service = services[idx]
        const isCenter = offset === 0

        return (
          <motion.div
  key={`${idx}-${current}`}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(${isCenter ? 1 : 0.9})`
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)"
  }}
  animate={{
  scale: isCenter ? 1.05 : 0.82,
  opacity: isCenter ? 1 : 0.35,
  y: isCenter ? 0 : 60,
  filter: isCenter ? "blur(0px)" : "blur(2px)",
}}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="relative rounded-2xl overflow-hidden group"
  style={{
    width: isCenter ? 390 : 300,
    height: isCenter ? 520 : 420,
    background: "rgba(15,15,15,0.85)",
    backdropFilter: "blur(20px)",
    border: isCenter
      ? "1px solid rgba(250,204,21,0.7)"
      : "1px solid rgba(255,255,255,0.08)",
    boxShadow: isCenter
      ? "0 40px 100px rgba(0,0,0,0.9)"
      : "0 10px 30px rgba(0,0,0,0.5)",
  }}
>
  {/* BRAND BADGE */}
  <div className="absolute top-4 right-4 z-20 text-[10px] px-3 py-1 rounded-full bg-white/10 backdrop-blur text-yellow-400 border border-yellow-400/40 tracking-widest">
    JYOSHA
  </div>

  {/* IMAGE */}
  <div className="relative h-[60%] overflow-hidden">
    <Image
      src={`${service.image}?auto=format&fit=crop&w=800&q=80`}
      alt={service.title}
      fill
      className="object-cover transition duration-700 group-hover:scale-110"
      draggable={false}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

    {/* TAG */}
    <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-yellow-400 text-black font-semibold">
      {service.tag}
    </span>
  </div>

  {/* CONTENT */}
  <div className="p-6 flex flex-col justify-between h-[40%]">
    <div>
      <h3 className="text-lg font-semibold tracking-wide">
        {service.title}
      </h3>
      <p className="text-sm text-white/60 mt-2 leading-relaxed">
        {service.desc}
      </p>
    </div>

    {isCenter && (
      <div className="flex items-center justify-between mt-5">
        <button className="text-yellow-400 text-sm font-semibold hover:underline">
          Explore →
        </button>

        <button className="text-xs px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:scale-110 transition">
          Call Now
        </button>
      </div>
    )}
  </div>
</motion.div>
        )
      })}
    </div>

    {/* ARROWS */}
    <button
      onClick={() => go(-1)}
      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur hover:bg-yellow-400 hover:text-black transition"
    >
      ‹
    </button>

    <button
      onClick={() => go(1)}
      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur hover:bg-yellow-400 hover:text-black transition"
    >
      ›
    </button>

    {/* DOTS */}
    <div className="flex justify-center gap-2 mt-10">
      {services.map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setDirection(i > current ? 1 : -1)
            setCurrent(i)
          }}
          className="rounded-full transition-all"
          style={{
            width: i === current ? 28 : 8,
            height: 8,
            background: i === current ? "#facc15" : "#555",
          }}
        />
      ))}
    </div>
  </div>

  {/* MOBILE */}
  <div className="md:hidden relative z-10 px-2">
  <div className="flex justify-center overflow-hidden">

    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={(e, info) => {
          if (info.offset.x < -80 || info.velocity.x < -500) go(1)
          if (info.offset.x > 80 || info.velocity.x > 500) go(-1)
        }}
        initial={{ x: 80, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: -80, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[70%] rounded-2xl overflow-hidden"
        style={{
          background: "rgba(15,15,15,0.9)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(250,204,21,0.4)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        }}
      >

        {/* JYOSHA BADGE */}
        <div className="absolute top-3 right-3 z-20 text-[10px] px-3 py-1 rounded-full bg-white/10 backdrop-blur text-yellow-400 border border-yellow-400/40 tracking-widest">
          JYOSHA
        </div>

        {/* IMAGE */}
        <div className="relative h-[230px]">
          <Image
            src={`${services[current].image}?auto=format&fit=crop&w=800&q=80`}
            alt={services[current].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <h3 className="text-lg font-semibold tracking-wide">
            {services[current].title}
          </h3>

          <p className="text-sm text-white/60 mt-2 leading-relaxed">
            {services[current].desc}
          </p>

          <div className="flex justify-between items-center mt-5">
            <button className="text-yellow-400 text-sm font-semibold">
              Explore →
            </button>

            <button
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translate(0px,0px)"
  }}
  className="text-xs px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold transition"
>
  Call Now
</button>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>

  </div>

  {/* SIDE PREVIEW FADE (gives premium hint of next card) */}
  <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-black to-transparent"/>
  <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-black to-transparent"/>

  {/* MOBILE BUTTONS */}
  <div className="flex justify-center items-center gap-6 mt-6">

    <button
      onClick={() => go(-1)}
      className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border border-white/10 active:scale-90 transition"
    >
      ‹
    </button>

    <div className="text-xs text-white/50">
      {current + 1} / {total}
    </div>

    <button
      onClick={() => go(1)}
      className="w-11 h-11 rounded-full flex items-center justify-center bg-yellow-400 text-black active:scale-90 transition"
    >
      ›
    </button>

  </div>

  {/* DOTS */}
  <div className="flex justify-center gap-2 mt-4">
    {services.map((_, i) => (
      <button
        key={i}
        onClick={() => {
          setDirection(i > current ? 1 : -1)
          setCurrent(i)
        }}
        className="rounded-full transition-all"
        style={{
          width: i === current ? 22 : 7,
          height: 7,
          background: i === current ? "#facc15" : "#555",
        }}
      />
    ))}
  </div>
</div>


</section>
  )
}
