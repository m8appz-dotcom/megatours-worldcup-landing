"use client";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-white/10 pointer-events-auto"
    >
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center text-center md:text-left">
        <div className="flex items-center">
          <img src="/logos/4.png" alt="Megatours Logo Oficial" className="h-16 md:h-20 object-contain invert brightness-0 hover:brightness-100 transition-all" />
        </div>
        <div className="hidden md:flex gap-8 items-center font-bold text-[10px] uppercase tracking-[0.2em] text-white">
          <a href="#paquetes" className="hover:text-[#fcd116] transition-colors">Paquetes</a>
          <a 
            href="https://wa.me/593979115473" 
            target="_blank"
            className="bg-[#fcd116] text-black px-5 py-2 border border-[#fcd116] hover:bg-transparent hover:text-[#fcd116] transition-colors font-black"
          >
            RESERVAR
          </a>
        </div>
      </div>
    </motion.header>
  );
};
