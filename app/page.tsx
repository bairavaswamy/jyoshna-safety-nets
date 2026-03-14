import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-gray-100 text-gray-900 font-sans antialiased transition-all duration-500 ease-in-out">
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroCarousel />
          <section className="py-16 px-4 md:px-8 lg:px-16 space-y-20">
            <About />
            <Services />
            <Projects />
            <Stats />
            <Testimonials />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}