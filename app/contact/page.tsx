"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import Navbar from "../components/Navbar"

export default function ContactPage(){

const [loading,setLoading] = useState(false)

const handleSubmit=(e:any)=>{
e.preventDefault()
setLoading(true)

setTimeout(()=>{
alert("Message sent successfully!")
setLoading(false)
},1200)
}

return(

<div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
    <Navbar/>

{/* Background Glows */}

<div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/20 blur-[200px]" />
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[220px]" />

<div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-40 pb-28">

{/* HERO */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.6}}
className="text-center mb-24"
>

<h1 className="text-5xl font-bold mb-6">
Let's <span className="text-orange-400">Talk</span>
</h1>

<p className="text-neutral-400 max-w-xl mx-auto">
Need balcony safety nets or pigeon protection?  
Our experts are ready to help you.
</p>

</motion.div>

{/* CONTACT CARDS */}

<div className="grid md:grid-cols-4 gap-6 mb-20">

{[
{icon:<Phone size={22}/>,title:"Phone",text:"+91 98765 43210"},
{icon:<Mail size={22}/>,title:"Email",text:"support@jyoshnasafetynets.com"},
{icon:<MapPin size={22}/>,title:"Location",text:"Hyderabad, India"},
{icon:<Clock size={22}/>,title:"Hours",text:"Mon–Sat 9AM – 10PM"}
].map((item,i)=>(

<motion.div
key={i}
whileHover={{y:-6}}
className="
p-6
rounded-2xl
border border-white/10
bg-white/5
backdrop-blur-xl
hover:bg-white/10
transition
shadow-lg
"
>

<div className="text-orange-400 mb-3">
{item.icon}
</div>

<h3 className="font-semibold mb-1">
{item.title}
</h3>

<p className="text-neutral-400 text-sm">
{item.text}
</p>

</motion.div>

))}

</div>

{/* FORM + MAP */}

<div className="grid lg:grid-cols-2 gap-14">

{/* CONTACT FORM */}

<motion.div
initial={{opacity:0,x:-30}}
animate={{opacity:1,x:0}}
transition={{duration:.6}}
className="
p-8
rounded-2xl
border border-white/10
bg-white/5
backdrop-blur-xl
shadow-[0_30px_80px_rgba(0,0,0,0.6)]
"
>

<h2 className="text-2xl font-semibold mb-8">
Send a Message
</h2>

<form onSubmit={handleSubmit} className="space-y-6">

{/* Floating Inputs */}

<input
required
placeholder="Your Name"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<input
required
type="email"
placeholder="Email Address"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<input
required
placeholder="Phone Number"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<textarea
rows={5}
placeholder="Your Message"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<button
disabled={loading}
className="
w-full
bg-orange-500
hover:bg-orange-600
transition
py-3
rounded-lg
font-medium
shadow-lg
shadow-orange-500/30
"
>

{loading ? "Sending..." : "Send Message"}

</button>

</form>

</motion.div>

{/* MAP */}

<motion.div
initial={{opacity:0,x:30}}
animate={{opacity:1,x:0}}
transition={{duration:.6}}
className="
rounded-2xl
border border-white/10
overflow-hidden
bg-white/5
backdrop-blur-xl
"
>

<iframe
src="https://maps.google.com/maps?q=Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
className="w-full h-[430px] border-0"
/>

</motion.div>

</div>

{/* CTA */}

<div
className="
mt-28
p-12
text-center
rounded-2xl
border border-white/10
bg-gradient-to-r
from-orange-500/20
to-indigo-500/20
backdrop-blur-xl
"
>

<h2 className="text-3xl font-semibold mb-4">
Need Safety Nets Installation?
</h2>

<p className="text-neutral-300 mb-6">
Balcony • Pigeon • Child Protection Nets
</p>

<a
href="https://wa.me/919876543210"
className="
inline-block
px-8 py-3
bg-orange-500
hover:bg-orange-600
rounded-lg
font-semibold
shadow-lg
shadow-orange-500/40
transition
"
>

Contact on WhatsApp

</a>

</div>

</div>

</div>

)
}