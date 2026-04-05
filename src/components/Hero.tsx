"use client";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-black pt-16">
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/dd9335156313683.6367c9d5206d8.gif" alt="World Cup Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10"></div>
      
      <div className="relative z-30 text-center px-6 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center w-full"
        >
          <div className="bg-[#fcd116] text-black px-3 py-1 font-black text-[10px] md:text-sm uppercase tracking-tighter mb-4 italic transform -skew-x-12">
            KANSAS CITY 2026
          </div>
          <h1 className="text-4xl md:text-[12rem] font-[family-name:var(--font-russo)] italic leading-[1] md:leading-[0.9] tracking-tighter uppercase text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            EMOCIÓN <br/>
            <span className="text-[#fcd116]">TOTAL</span>
          </h1>
          <p className="mt-4 text-[10px] md:text-2xl text-white font-bold uppercase tracking-tight max-w-xl leading-snug px-4">
            Ecuador vs Curazao | 19 - 21 de Junio <br/>
            <span className="text-[#0033a0] block mt-1">VIVE LA EXPERIENCIA MUNDIALISTA DEFINITIVA.</span>
          </p>
          
          <div className="mt-8">
            <a href="#paquetes" className="bg-white text-black px-8 py-4 text-lg md:text-2xl font-black italic uppercase tracking-tighter hover:bg-[#fcd116] transition-all hover:scale-105 active:scale-95 block shadow-[6px_6px_0px_0px_rgba(0,51,160,1)]">
              VER PAQUETES
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};