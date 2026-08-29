import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroCarousel from "./components/HeroCarousel";
import About from "./components/About";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import ServicesCards from "./components/HeroCards";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-gray-100 text-gray-900 font-sans antialiased transition-all duration-500 ease-in-out">
      <div className="flex flex-col">
        
        <main className="flex-1 ">
          <Navbar />
          <HeroCarousel />
          <div className="space-y-0">
            <ServicesCards />
            <About />
            <Projects />
            <Stats />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
