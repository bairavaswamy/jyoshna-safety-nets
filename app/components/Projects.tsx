"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

const images = [
  "/cards/invisble-grills-installation-near-me.webp",
  "/cards/balcony-safety-nets-near-me.webp",
  "/cards/transparant-balcony-safety-nets.webp",
  "/cards/anti-bird-net.webp",
  "/cards/duct-area-safety-nets-near-me.webp",
  "/cards/safety-nets.webp",
  "/cards/window-safety-nets.webp",
  "/cards/transparant-balcony-safety-nets.webp",
  "/cards/mokey-safety-nets-installation.webp",
  "/cards/sports-nets-instllation.webp",
  "/cards/balcony-safety-nets-near-me.webp",
];

const projects = [
  {
    img: images[0],
    title: "Balcony Invisible Grill Installation",
  },
  {
    img: images[1],
    title: "High Rise Balcony Safety Nets",
  },
  {
    img: images[4],
    title: "Apartment Duct Area Protection",
  },
  {
    img: images[6],
    title: "Children Safety Balcony Nets",
  },
  {
    img: images[2],
    title: "Luxury Apartment Balcony Safety",
  },
];

export default function CinematicProjects() {

  const [active, setActive] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [progress,setProgress]=useState(0)

  /* scroll progress */
  useEffect(()=>{
    const el=scrollRef.current
    if(!el)return

    const update=()=>{
      const p=el.scrollLeft/(el.scrollWidth-el.clientWidth)
      setProgress(p)
    }

    el.addEventListener("scroll",update)
    return()=>el.removeEventListener("scroll",update)

  },[])


  /* keyboard nav */
  useEffect(()=>{

    const key=(e:KeyboardEvent)=>{

      if(active===null)return

      if(e.key==="Escape") setActive(null)

      if(e.key==="ArrowRight"){
        setActive(p=>p===projects.length-1?0:(p??0)+1)
      }

      if(e.key==="ArrowLeft"){
        setActive(p=>p===0?projects.length-1:(p??0)-1)
      }

    }

    window.addEventListener("keydown",key)
    return()=>window.removeEventListener("keydown",key)

  },[active])


  /* drag scroll */

  const isDown=useRef(false)
  const startX=useRef(0)
  const scrollLeft=useRef(0)

  const onMouseDown=(e:any)=>{
    isDown.current=true
    startX.current=e.pageX-scrollRef.current!.offsetLeft
    scrollLeft.current=scrollRef.current!.scrollLeft
  }

  const onMouseLeave=()=>isDown.current=false
  const onMouseUp=()=>isDown.current=false

  const onMouseMove=(e:any)=>{
    if(!isDown.current)return
    e.preventDefault()

    const x=e.pageX-scrollRef.current!.offsetLeft
    const walk=(x-startX.current)*2

    scrollRef.current!.scrollLeft=scrollLeft.current-walk
  }


  return (

<section className="bg-black text-white py-24 overflow-hidden">

<div className="max-w-7xl mx-auto px-6">

{/* hero */}

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:.8}}
className="mb-16"
>

<p className="uppercase tracking-[4px] text-yellow-400 text-sm">
OUR WORK
</p>

<h2 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
Premium Installations
<br/>
Across Luxury Apartments
</h2>

<p className="text-white/60 mt-4 max-w-xl">
Explore some of our latest safety net and invisible grill
installations designed for modern homes and high-rise apartments.
</p>

</motion.div>


{/* gallery */}

<div
ref={scrollRef}
onMouseDown={onMouseDown}
onMouseLeave={onMouseLeave}
onMouseUp={onMouseUp}
onMouseMove={onMouseMove}
className="flex gap-10 overflow-x-auto pb-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
>

{projects.map((p,i)=>(

<TiltCard
key={p.img}
project={p}
i={i}
setActive={setActive}
/>

))}

</div>


{/* progress bar */}

<div className="w-full h-[3px] bg-white/20 rounded overflow-hidden">

<div
className="h-full bg-yellow-400 transition-all duration-300"
style={{width:`${progress*100}%`}}
/>

</div>


</div>


{/* lightbox */}

<AnimatePresence>

{active!==null&&(

<motion.div
className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50"
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
onClick={()=>setActive(null)}
>

<motion.div
initial={{scale:.8}}
animate={{scale:1}}
exit={{scale:.8}}
className="relative w-[90vw] max-w-6xl h-[80vh]"
>

<Image
src={projects[active].img}
alt={projects[active].title}
fill
sizes="100vw"
className="object-contain rounded-xl"
/>

<button
className="absolute top-6 right-6 text-3xl"
onClick={(e)=>{
e.stopPropagation()
setActive(null)
}}
>
✕
</button>

<button
className="absolute left-6 top-1/2 text-4xl"
onClick={(e)=>{
e.stopPropagation()
setActive(active===0?projects.length-1:active-1)
}}
>
‹
</button>

<button
className="absolute right-6 top-1/2 text-4xl"
onClick={(e)=>{
e.stopPropagation()
setActive(active===projects.length-1?0:active+1)
}}
>
›
</button>

<div className="absolute bottom-6 left-6 text-xl font-semibold">
{projects[active].title}
</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>


</section>

  )

}



/* 3D tilt card */

function TiltCard({project,i,setActive}:any){

const x=useMotionValue(0)
const y=useMotionValue(0)

const handleMove=(e:any)=>{

const rect=e.currentTarget.getBoundingClientRect()

const px=(e.clientX-rect.left)/rect.width
const py=(e.clientY-rect.top)/rect.height

x.set((px-.5)*20)
y.set((py-.5)*20)

}

const reset=()=>{

x.set(0)
y.set(0)

}

return(

<motion.div
onMouseMove={handleMove}
onMouseLeave={reset}
onClick={()=>setActive(i)}
style={{rotateY:x,rotateX:y}}
className="relative min-w-[340px] h-[440px] rounded-2xl overflow-hidden group cursor-pointer snap-center shadow-2xl"
>

<Image
src={project.img}
alt={project.title}
fill
sizes="320px"
priority={i<2}
className="object-cover transition duration-700 group-hover:scale-110"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"/>

<div className="absolute bottom-6 left-6 right-6 text-white text-lg font-semibold">
{project.title}
</div>

</motion.div>

)

}