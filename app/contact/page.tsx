
"use client";
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const BANGALORE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=S%201st%20Rd%2C%20Duravani%20Nagar%2C%20Krishnarajapuram%2C%20Bengaluru%2C%20Karnataka%20560016"

export default function ContactPage(){

const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
const form = new FormData(e.currentTarget)
const name = String(form.get("name") || "")
const phone = String(form.get("phone") || "")
const service = String(form.get("service") || "")
const message = String(form.get("message") || "")
const text = encodeURIComponent(
  `Hi, I'm ${name}. I need help with ${service}. Phone: ${phone}. ${message}`
)
window.open(`https://wa.me/919392372421?text=${text}`, "_blank", "noopener,noreferrer")
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
Let&apos;s <span className="text-orange-400">Talk</span>
</h1>

<p className="text-neutral-400 max-w-xl mx-auto">
Tell us what you need to protect and share your location. We will help you
choose the right next step before arranging a site measurement.
</p>

</motion.div>

{/* CONTACT CARDS */}

<div className="grid md:grid-cols-4 gap-6 mb-20">

{[
{icon:<Phone size={22}/>,title:"Call",text:"+91 8106420981"},
{icon:<MessageCircle size={22}/>,title:"WhatsApp",text:"+91 9392372421"},
{icon:<Mail size={22}/>,title:"Email",text:"jyoshnainvisiblegrills@gmail.com"},
{icon:<MapPin size={22}/>,title:"Bangalore address",text:"S 1st Rd, Duravani Nagar, Krishnarajapuram, Bengaluru 560016"},
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

<h2 className="text-2xl font-semibold mb-3">
Start your enquiry
</h2>

<p className="mb-8 text-sm leading-6 text-neutral-400">
Submitting this form opens WhatsApp with your details. Nothing is shown as
sent until you choose to send it there.
</p>

<form onSubmit={handleSubmit} className="space-y-6">

{/* Floating Inputs */}

<input
required
name="name"
placeholder="Your Name"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<input
required
name="phone"
type="tel"
placeholder="Phone Number"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<select
required
name="service"
defaultValue=""
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
>
<option value="" disabled>Select a service</option>
<option>Invisible grills</option>
<option>Balcony or window safety nets</option>
<option>Pigeon nets or bird spikes</option>
<option>Cat, child, or monkey safety nets</option>
<option>Sports or full-building nets</option>
<option>Ceiling cloth hangers</option>
<option>Help me choose</option>
</select>

<textarea
required
name="message"
rows={5}
placeholder="Describe the opening, problem, and your location"
className="w-full bg-neutral-900/70 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
/>

<button
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

Continue on WhatsApp

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

<div className="flex h-full min-h-[430px] flex-col justify-center p-8 md:p-12">
  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-400">
    Bangalore business address
  </p>
  <h2 className="mt-4 text-3xl font-semibold leading-tight">
    Jyoshna Invisible Grills
  </h2>
  <p className="mt-3 text-sm font-medium leading-6 text-neutral-300">
    Balcony Safety Nets, Pigeon Safety Nets & Invisible Grills for Balcony in Bangalore
  </p>
  <p className="mt-5 leading-7 text-neutral-400">
    S 1st Rd, Duravani Nagar, Krishnarajapuram, Bengaluru, Karnataka 560016.
  </p>
  <a
    href={BANGALORE_MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
  >
    <MapPin size={17} /> Get directions
  </a>
  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
    Popular Bangalore service areas
  </p>
  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300">
    {["Whitefield", "Electronic City", "HSR Layout", "Koramangala", "Hebbal", "Yelahanka"].map((area) => (
      <div key={area} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        {area}
      </div>
    ))}
  </div>
</div>

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
Need help choosing the right system?
</h2>

<p className="text-neutral-300 mb-6">
Invisible grills • Safety nets • Bird control • Cloth hangers
</p>

<a
href="https://wa.me/919392372421"
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
<Footer/>
</div>

)
}
