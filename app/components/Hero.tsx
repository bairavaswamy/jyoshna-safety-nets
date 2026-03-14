import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full" aria-label="Hero section for Jyoshna Invisible Grills">
      <div className="relative w-full h-[520px] sm:h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-indigo-50 to-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          alt="Modern balcony with invisible grills for safety and style"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Expert in <br className="hidden sm:block" /> Invisible Grills
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-gray-100 mb-6 text-sm sm:text-base md:text-lg"
          >
            Luxury balcony protection with high-tensile stainless steel invisible grills for safety and elegance.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Register for more information"
          >
            REGISTER
          </motion.button>
        </div>
      </div>
    </section>
  );
}