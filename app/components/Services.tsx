"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const services = [
{
title:"Invisible Grills",
image:"https://images.unsplash.com/photo-1600607687644-c7171b42498c",
desc:"Invisible grills use stainless steel wires to protect balconies and windows."
},
{
title:"Balcony Safety Invisible Grills",
image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
desc:"Balcony grills prevent accidental falls in high-rise apartments."
},
{
title:"Anti Bird Invisible Grills",
image:"https://images.unsplash.com/photo-1600210492493-0946911123ea",
desc:"Stops pigeons and birds entering balconies."
},
{
title:"Sports Nets",
image:"https://images.unsplash.com/photo-1593349480506-8433634cdcbe",
desc:"Cricket practice nets and terrace ball protection."
},
{
title:"Duct Area Safety",
image:"https://images.unsplash.com/photo-1600566752355-35792bedcfea",
desc:"Protects open shafts and duct areas."
},
{
title:"Children Safety Grills",
image:"https://images.unsplash.com/photo-1600573472550-8090b5e0745e",
desc:"Protect children around balconies and windows."
}
]

export default function Services(){

const [index,setIndex]=useState(0)
const [playing,setPlaying]=useState(true)
const [progress,setProgress]=useState(0)
const [mounted,setMounted]=useState(false)

const containerRef=useRef<HTMLDivElement>(null)

useEffect(()=>setMounted(true),[])

const next=useCallback(()=>{
setIndex((p)=>(p+1)%services.length)
setProgress(0)
},[])

const prev=()=>{
setIndex((p)=>(p-1+services.length)%services.length)
setProgress(0)
}

/* autoplay progress */

useEffect(()=>{

if(!playing) return

const interval=setInterval(()=>{

setProgress((p)=>{

if(p>=100){
next()
return 0
}

return p+1.5

})

},80)

return()=>clearInterval(interval)

},[playing,next])


/* pause when tab inactive */

useEffect(()=>{

const visibility=()=>{
if(document.hidden) setPlaying(false)
}

document.addEventListener("visibilitychange",visibility)

return()=>document.removeEventListener("visibilitychange",visibility)

},[])


/* swipe gestures */

useEffect(()=>{

let startX=0

const touchStart=(e:TouchEvent)=>{
startX=e.touches[0].clientX
}

const touchEnd=(e:TouchEvent)=>{
const diff=e.changedTouches[0].clientX-startX

if(diff>60) prev()
if(diff<-60) next()
}

const el=containerRef.current

el?.addEventListener("touchstart",touchStart)
el?.addEventListener("touchend",touchEnd)

return()=>{
el?.removeEventListener("touchstart",touchStart)
el?.removeEventListener("touchend",touchEnd)
}

},[])


/* cursor spotlight */

useEffect(()=>{

const el=containerRef.current

if(!el) return

const move=(e:MouseEvent)=>{

const rect=el.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

el.style.setProperty("--x",`${x}px`)
el.style.setProperty("--y",`${y}px`)

}

el.addEventListener("mousemove",move)

return()=>el.removeEventListener("mousemove",move)

},[])


if(!mounted) return null

const service=services[index]

return(

<section
ref={containerRef}
className="relative max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center overflow-hidden"
>

{/* spotlight effect */}

<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.15),transparent_40%)]"/>

{/* LEFT CONTENT */}

<AnimatePresence mode="wait">

<motion.div
key={service.title}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:-30}}
transition={{duration:.5}}
>

<span className="text-yellow-500 uppercase tracking-[4px] text-sm font-semibold">
Our Services
</span>

<h2 className="text-4xl font-bold mt-3 mb-6 text-gray-900 dark:text-white">
{service.title}
</h2>

<p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
{service.desc}
</p>

<div className="flex gap-4">

<a
href="tel:+919900000000"
className="px-6 py-3 rounded-full bg-black text-white hover:scale-105 transition"
>
Call Now
</a>

<a
href="https://wa.me/919900000000"
className="px-6 py-3 rounded-full bg-green-600 text-white hover:scale-105 transition"
>
WhatsApp
</a>

</div>

</motion.div>

</AnimatePresence>


{/* RIGHT CARD STACK */}

<div className="relative h-[460px] flex items-center justify-center perspective-1000">

{services.map((s,i)=>{

const position=(i-index+services.length)%services.length

if(position>3) return null

return(

<motion.div
key={s.title}
className="absolute w-[340px] h-[420px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
animate={{
scale:1-position*.08,
y:position*40,
opacity:1-position*.25,
zIndex:10-position
}}
whileHover={{
rotateX:6,
rotateY:-6,
scale:1.02
}}
style={{
transformStyle:"preserve-3d",
willChange:"transform"
}}
transition={{duration:.5}}
onMouseEnter={()=>setPlaying(false)}
onMouseLeave={()=>setPlaying(true)}
>

<Image
src={`${s.image}?auto=format&fit=crop&w=1400&q=80`}
alt={s.title}
fill
sizes="(max-width:768px) 100vw, 340px"
className="object-cover"
priority={i===0}
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

<div className="absolute bottom-6 left-6 text-white text-lg font-semibold">
{s.title}
</div>

</motion.div>

)

})}


{/* progress bar */}

<div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200">

<motion.div
className="h-full bg-yellow-500"
style={{width:`${progress}%`}}
/>

</div>


{/* arrows */}

<button
onClick={prev}
className="absolute left-0 text-4xl text-gray-500 hover:text-black transition"
>
‹
</button>

<button
onClick={next}
className="absolute right-0 text-4xl text-gray-500 hover:text-black transition"
>
›
</button>

</div>

</section>
)
}