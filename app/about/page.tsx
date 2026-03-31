import { Metadata } from "next";
import Script from "next/script";
import { ShieldCheck, Users, Award, Target } from "lucide-react";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "About Jyoshna Safety Nets | Trusted Safety Nets Services",
  description:
    "Learn about Jyoshna Safety Nets – experts in balcony safety nets, pigeon nets, invisible grills & child safety solutions. 5000+ installations with 100% satisfaction.",
  keywords: [
    "Safety Nets",
    "Balcony Safety Nets",
    "Pigeon Nets",
    "Invisible Grills",
    "Child Safety Nets",
    "Best Safety Nets Services",
  ],
  openGraph: {
    title: "Jyoshna Safety Nets",
    description:
      "Top-rated safety nets installation company with 5000+ projects completed.",
    url: "https://yourdomain.com/about",
    siteName: "Jyoshna Safety Nets",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      <Navbar />

      {/* JSON-LD Schema */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Jyoshna Safety Nets",
            image: "https://yourdomain.com/logo.png",
            "@id": "https://yourdomain.com",
            url: "https://yourdomain.com",
            telephone: "+91-9876543210",
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
            },
            description:
              "Professional safety nets installation services including balcony nets, pigeon nets, invisible grills and child safety nets.",
            areaServed: "India",
            serviceType: [
              "Balcony Safety Nets",
              "Pigeon Nets",
              "Invisible Grills",
              "Child Safety Nets",
            ],
          }),
        }}
      />

      {/* Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/20 blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[220px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-20 pb-28">

        {/* HERO */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            About <span className="text-orange-400">Jyoshna Safety Nets</span>
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            We are a trusted safety solutions provider specializing in high-quality safety nets
            designed to protect families, children, pets, and properties. With years of experience
            and thousands of successful installations, we deliver safety you can rely on.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          {[
            {
              icon: <ShieldCheck size={24} />,
              title: "Safety First",
              text: "Premium-grade materials for maximum durability and protection.",
            },
            {
              icon: <Users size={24} />,
              title: "Trusted Experts",
              text: "Skilled professionals with real-world installation experience.",
            },
            {
              icon: <Award size={24} />,
              title: "Quality Assurance",
              text: "Long-lasting installations backed by strong workmanship.",
            },
            {
              icon: <Target size={24} />,
              title: "Customer Focus",
              text: "Customized safety solutions tailored to your needs.",
            },
          ].map((item, i) => (
            <div
              key={i}
              
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition shadow-lg"
            >
              <div className="text-orange-400 mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-neutral-400 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          <div
            
            
            
          >
            <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>

            <p className="text-neutral-400 mb-4">
              Jyoshna Safety Nets is a leading provider of balcony safety nets, pigeon nets,
              invisible grills, and customized protection systems for residential and commercial
              spaces.
            </p>

            <p className="text-neutral-400">
              Our mission is simple — to make every home safer. We combine advanced installation
              techniques, durable materials, and affordable pricing to deliver industry-leading
              safety solutions.
            </p>
          </div>

          <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>

            <ul className="space-y-2 text-neutral-400">
              <li>• Invisible Grills</li>
              <li>• Balcony Safety Nets</li>
              <li>• Pigeon Nets</li>
              <li>• Anti Bird Nets</li>
              <li>• Children Safety Nets</li>
              <li>• Monkey Safety Nets</li>
              <li>• Cat Safety Nets</li>
              <li>• Customized Safety Solutions</li>
            </ul>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-24 text-center">
          {[
            { number: "5000+", label: "Installations Completed" },
            { number: "100%", label: "Customer Satisfaction" },
            { number: "5+ Years", label: "Experience" },
          ].map((item, i) => (
            <div
              key={i}
              
              className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-bold text-orange-400 mb-2">
                {item.number}
              </h3>
              <p className="text-neutral-400">{item.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-12 text-center rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/20 to-indigo-500/20 backdrop-blur-xl">
          <h2 className="text-3xl font-semibold mb-4">
            Protect Your Home Today
          </h2>

          <p className="text-neutral-300 mb-6">
            Get professional safety nets installation for your home or apartment.
          </p>

          <a
            href="https://wa.me/919876543210"
            className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold shadow-lg shadow-orange-500/40 transition"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
