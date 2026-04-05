import { MapPin, Phone, Mail, Globe, Send } from "lucide-react";

export const Trust = () => {
  return (
    <footer className="w-full bg-black text-white pt-16 pb-8 border-t border-white/5 relative z-30">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        
        {/* Column 1: Branding */}
        <div className="flex flex-col">
          <img src="/logos/4.png" alt="Megatours Logo Oficial" className="h-16 md:h-20 object-contain object-left invert brightness-0 mb-6" />
          <p className="text-[10px] text-gray-500 leading-relaxed uppercase font-bold tracking-widest">
            <span className="text-[#fcd116]">Egencia Global Alliance Partner, Ecuador.</span><br/><br/>
            Agencia oficial para el Mundial 2026. Los mejores paquetes de viaje desde Ecuador con respaldo corporativo global.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#fcd116] hover:text-black transition-all rounded-sm border border-white/10"><Globe size={18}/></a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-[#0033a0] transition-all rounded-sm border border-white/10"><Globe size={18}/></a>
            <a href="https://adrianyepez.com" target="_blank" className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white hover:text-black transition-all rounded-sm border border-white/10"><Globe size={18}/></a>
          </div>
        </div>
        
        {/* Column 2: Ubicación & Map */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 italic">OFICINA CENTRAL</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#fcd116] shrink-0" />
              <p className="text-[11px] font-bold uppercase leading-tight tracking-wider text-gray-300">
                Ed. Xima, Piso 1, Oficina 123.<br/>Km. 1.5 Vía Samborondón<br/>Samborondón, Ecuador.
              </p>
            </div>
          </div>
          <div className="h-32 w-full rounded-sm overflow-hidden border border-white/10 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.0543666579624!2d-79.8707164!3d-2.1332062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6d00160b7211%3A0xf65089f2575ef21e!2sEdificio%20Xima!5e0!3m2!1sen!2sec!4v1712095000000!5m2!1sen!2sec" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" 
            ></iframe>
          </div>
        </div>

        {/* Column 3: Contacto */}
        <div className="flex flex-col">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fcd116] mb-6 italic">RESERVAS E INFORMACIÓN</h4>
          
          <div className="space-y-2">
            <a href="tel:+59343725340" className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-[#fcd116] transition-all rounded-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-black opacity-40 uppercase">Ecuador</span>
                <span className="text-sm font-black italic tracking-tighter">+593-4-372-5340</span>
              </div>
              <Phone size={16} className="text-white/20 group-hover:text-[#fcd116] transition-colors" />
            </a>

            <a href="tel:+13053497600" className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-[#0033a0] transition-all rounded-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-black opacity-40 uppercase">USA VOIP</span>
                <span className="text-sm font-black italic tracking-tighter">+1-305-349-7600</span>
              </div>
              <Phone size={16} className="text-white/20 group-hover:text-[#0033a0] transition-colors" />
            </a>

            <a href="https://wa.me/593979115473" target="_blank" className="group flex items-center justify-between p-4 bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all rounded-sm">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase">WhatsApp Oficial</span>
                <span className="text-lg font-black italic tracking-tighter">0979115473</span>
              </div>
              <Send size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-20 text-center md:text-left">
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">© 2026 MEGATOURS TRAVEL GROUP AGENCY. PAQUETES MUNDIAL 2026.</p>
        <div className="flex gap-8 text-[8px] font-black uppercase tracking-widest">
          <a href="#" className="hover:text-white">TÉRMINOS</a>
          <a href="#" className="hover:text-white">PRIVACIDAD</a>
        </div>
      </div>
    </footer>
  );
};