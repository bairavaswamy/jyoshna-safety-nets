import Image from "next/image";
import Link from "next/link";
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

export const servicesData: Record<string, string> = {
  "invisible-grills": "Invisible Grills",
  "balcony-safety-nets": "Balcony Safety Nets",
  "pigeon-safety-nets": "Pigeon Safety Nets",
  "anti-bird-nets": "Anti Bird Nets",
  "duct-area-safety-nets": "Duct Area Safety Nets",
  "safety-net-installation": "Safety Net Installation",
  "windows-safety-nets": "Windows Safety Nets",
  "invisible-safety-nets": "Transparent Safety Nets",
  "monkey-safety-nets": "Monkey Safety Nets",
  "sports-nets": "Sports Nets",
  "children-safety-nets": "Children Safety Nets",
};

const ServicesCards = () => {
  const services = Object.entries(servicesData);

  return (
    <div className="bg-black min-h-screen p-6">
      <div className="relative z-10 text-center mb-16 px-6">
    {/* <p className="uppercase tracking-[4px] text-yellow-400 text-sm mb-3">
      JYOSHA
    </p> */}

    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
      Premium Safety Products
      <br />
      <span className="text-yellow-400">For Modern Living</span>
    </h2>

    {/* <p className="text-white/60 mt-4 max-w-xl mx-auto">
      Invisible protection systems crafted for high-rise apartments,
      blending safety with elegance.
    </p> */}
  </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        

{services.map(([key, title], index) => (
  <Link
    key={key}
    href={`/services/${key === "invisible-safety-nets" ? "balcony-safety-nets" : key}`}
    className="block bg-[#1f2a33] rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300"
  >
    {/* Image */}
    <div className="rounded-xl overflow-hidden">
      <Image
        src={images[index % images.length]}
        alt={title}
        width={400}
        height={250}
        className="w-full h-[180px] object-cover"
      />
    </div>

    {/* Title (Clickable) */}
    <div className="mt-4 bg-[#3a444d] rounded-xl py-4 text-center">
      <h3 className="text-white text-lg font-medium">{title}</h3>
    </div>
  </Link>
))}
      </div>
    </div>
  );
};

export default ServicesCards;
