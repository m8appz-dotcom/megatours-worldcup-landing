"use client";
import { Hotel, Plane, Ticket, Shield } from "lucide-react";

export const Features = () => {
  const items = [
    { icon: <Hotel className="w-6 h-6" />, title: "Alojamiento", desc: "2 noches en Kansas City, en la categoría de hotel seleccionada." },
    { icon: <Plane className="w-6 h-6" />, title: "Traslados", desc: "Aeropuerto / Hotel / Aeropuerto y Hotel / Estadio / Hotel en Kansas City." },
    { icon: <Ticket className="w-6 h-6" />, title: "Entradas", desc: "Entradas al partido de Ecuador vs Curasao en la categoría elegida." },
    { icon: <Shield className="w-6 h-6" />, title: "Seguro de Viaje", desc: "Seguro de viaje internacional con cobertura hasta por USD. 100,000.00." },
  ];

  return (
    <section className="w-full bg-black pt-12 pb-0 relative z-30 border-t border-white/5 -mb-1">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-[family-name:var(--font-russo)] italic text-white uppercase tracking-wider mb-3">El programa incluye</h2>
          <p className="text-gray-400 text-[11px] max-w-xl mx-auto uppercase font-bold tracking-widest opacity-60">I.V.A., I.S.D., impuestos hoteleros y resort fees estadounidenses incluidos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#131313] border border-white/5 p-6 flex flex-col items-center text-center hover:border-[#0033a0]/50 transition-colors rounded-lg shadow-xl"
            >
              <div className="text-[#fcd116] mb-4 bg-white/5 p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-sm font-[family-name:var(--font-russo)] italic text-white mb-2 uppercase tracking-wide">{item.title}</h3>
              <p className="text-gray-400 text-[10px] leading-relaxed font-medium uppercase tracking-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};