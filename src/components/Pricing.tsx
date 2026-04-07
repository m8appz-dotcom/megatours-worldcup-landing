"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { 
 Plane, Hotel, Ticket, Users, Info, Calculator, 
 CheckCircle2, HelpCircle, ArrowRight, Mail, Phone, 
 User, ShieldCheck, MapPin, Calendar, Star, ChevronLeft, Send, MinusCircle,
 RefreshCw
} from 'lucide-react';

const GlobalStyles = () => (
 <style dangerouslySetInnerHTML={{ __html: `
 @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
 .font-lexend { font-family: 'Lexend', sans-serif; }
 .custom-scrollbar::-webkit-scrollbar { width: 4px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: #0A0C12; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: #2A2E37; border-radius: 10px; }
 `}} />
);

const MATCHES = [
 { 
 id: 1, 
 rival: "Costa de Marfil", 
 sede: "Philadelphia", 
 fecha: "14 Jun", 
 configKey: "phl",
 ticketKey: "m1",
 details: "4 Noches + Traslados + Entrada" 
 },
 { 
 id: 2, 
 rival: "Curazao", 
 sede: "Kansas City", 
 fecha: "20 Jun", 
 configKey: "kansas",
 ticketKey: "m2",
 details: "4 Noches + Traslados + Entrada" 
 },
 { 
 id: 3, 
 rival: "Alemania", 
 sede: "New Jersey", 
 fecha: "25 Jun", 
 configKey: "nj",
 ticketKey: "m3",
 details: "5 Noches + Traslados + Entrada" 
 }
];

const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => {
 const [show, setShow] = useState(false);
 return (
 <div className="relative inline-block w-full" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
 {children}
 {show && (
 <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#1A1D24] text-[10px] text-[#6B75A1] rounded-xl shadow-2xl border border-[#2A2E37] leading-tight animate-in fade-in slide-in-from-bottom-1">
 {text}
 <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1A1D24]" />
 </div>
 )}
 </div>
 );
};

export const Pricing = () => {
 const [config, setConfig] = useState<any>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [wizardStep, setWizardStep] = useState(0);
 const [activeMatchIds, setActiveMatchIds] = useState([1, 2, 3]);
 const [includeCharter, setIncludeCharter] = useState(true);
 const [hotelQuality, setHotelQuality] = useState<'Gold' | 'Silver' | 'Bronze'>('Gold');
 const [ticketCat, setTicketCat] = useState(0);
 const [quantity, setQuantity] = useState(1);
 const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

 useEffect(() => {
  fetch('/api/pricing')
   .then(res => res.json())
   .then(json => {
    if (!json.error) setConfig(json);
   })
   .catch(err => console.error("Error loading pricing config:", err))
   .finally(() => setIsLoading(false));
 }, []);

 const currentPrice = useMemo(() => {
  if (!config) return 0;

  let total = 0;
  
  if (includeCharter) {
   total = config.main.charterBase.value + config.main.charterFlight.value;
   const inactiveIds = [1, 2, 3].filter(id => !activeMatchIds.includes(id));
   inactiveIds.forEach(id => {
    const match = MATCHES.find(m => m.id === id);
    if (match) {
     total -= config.individual[match.configKey].value;
     total -= config.tickets[match.ticketKey].value;
    }
   });
  } else {
   total = activeMatchIds.reduce((acc, id) => {
    const match = MATCHES.find(m => m.id === id);
    if (!match) return acc;
    return acc + config.individual[match.configKey].value + config.tickets[match.ticketKey].value;
   }, 0);
  }

  const hotelMultiplier = hotelQuality === 'Gold' ? 1 : 
                         hotelQuality === 'Silver' ? config.rules.silver.value : 
                         config.rules.bronze.value;
  
  total = total * hotelMultiplier;
  const TICKET_DISCOUNTS = [0, -400, -600]; 
  total += (activeMatchIds.length * TICKET_DISCOUNTS[ticketCat]);
  if (activeMatchIds.length === 3) total *= 0.95;

  return Math.max(total, 0);
 }, [config, activeMatchIds, includeCharter, hotelQuality, ticketCat]);

 const formatPrice = (value: number) => {
  return value.toLocaleString('en-US', { 
   minimumFractionDigits: 1, 
   maximumFractionDigits: 1 
  });
 };

 if (isLoading) {
  return (
   <section className="min-h-screen bg-[#0A0C12] flex items-center justify-center font-lexend">
    <div className="flex flex-col items-center gap-4">
     <RefreshCw className="animate-spin text-[#FCD116]" size={48} />
     <p className="text-[#6B75A1] font-bold text-xs uppercase tracking-[0.3em]">Sincronizando Precios...</p>
    </div>
   </section>
  );
 }

 const DESCRIPTIONS = {
  Gold: "Hoteles 5* Superior. Ubicación Premium.",
  Silver: config?.rules?.silver?.label || "Hoteles 4*",
  Bronze: config?.rules?.bronze?.label || "Hoteles 3*",
  Charter: config?.main?.charterFlight?.label || "Vuelo Privado",
  Cat1: "Laterales Bajos. Visión de campo completa.",
  Cat2: "Laterales Altos. Perspectiva táctica.",
  Cat3: "Cabeceras. El corazón de la hinchada."
 };

 if (wizardStep === 1) {
 return (
 <section id="paquetes" className="min-h-screen bg-[#0A0C12] flex items-center justify-center p-4 md:p-6 font-lexend text-white">
 <GlobalStyles />
 <div className="bg-[#1A1D24] max-w-xl w-full rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-[#2A2E37] shadow-2xl">
 <button onClick={() => setWizardStep(0)} className="text-[#6B75A1] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 flex items-center gap-2">
 <ChevronLeft size={16}/> Revisar Selección
 </button>
 <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">Finalizar Reserva</h2>
 <div className="space-y-4 md:space-y-6">
 <input 
 placeholder="Nombre y Apellido"
 className="w-full bg-[#0A0C12] border border-[#2A2E37] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none focus:border-[#FCD116] transition-all font-medium text-white text-sm"
 onChange={e => setFormData({...formData, name: e.target.value})}
 />
 <input 
 placeholder="Email"
 className="w-full bg-[#0A0C12] border border-[#2A2E37] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none focus:border-[#FCD116] transition-all font-medium text-white text-sm"
 onChange={e => setFormData({...formData, email: e.target.value})}
 />
 <input 
 placeholder="WhatsApp"
 className="w-full bg-[#0A0C12] border border-[#2A2E37] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none focus:border-[#FCD116] transition-all font-medium text-white text-sm"
 onChange={e => setFormData({...formData, phone: e.target.value})}
 />
 <button 
 onClick={() => setWizardStep(2)}
 disabled={!formData.name || !formData.email}
 className="w-full bg-white text-[#0A0C12] py-5 md:py-6 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#FCD116] transition-all disabled:opacity-20"
 >
 Generar Proforma Oficial
 </button>
 </div>
 </div>
 </section>
 );
 }

 if (wizardStep === 2) {
 return (
 <section id="paquetes" className="min-h-screen bg-[#0A0C12] flex items-center justify-center p-4 md:p-6 font-lexend text-white">
 <GlobalStyles />
 <div className="bg-[#1A1D24] max-w-lg w-full rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center border border-[#2A2E37]">
 <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0033A0] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl text-[#FCD116]">
 <ShieldCheck size={32} className="md:w-10 md:h-10" />
 </div>
 <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Solicitud Enviada</h2>
 <p className="text-[#6B75A1] text-xs md:text-sm mb-8 md:mb-10 leading-relaxed font-medium">
 Tu configuración personalizada ha sido procesada. Recibirás el detalle en tu correo en pocos minutos.
 </p>
 <button onClick={() => setWizardStep(0)} className="text-[#FCD116] font-bold uppercase text-[10px] md:text-xs tracking-widest">Volver al Inicio</button>
 </div>
 </section>
 );
 }

 return (
 <section id="paquetes" className="min-h-screen bg-[#0A0C12] p-4 md:p-12 font-lexend text-white relative z-30 overflow-x-hidden">
 <GlobalStyles />
 <div className="max-w-7xl mx-auto">
 
 <header className="mb-10 md:mb-16 border-b border-[#2A2E37] pb-8 md:pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
 <div className="space-y-3 w-full md:w-auto">
 <div className="flex items-center gap-2">
 <span className="bg-[#0033A0] px-2 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white">Premium Choice</span>
 <div className="h-3 w-px bg-[#2A2E37] mx-1" />
 <span className="text-[8px] md:text-[9px] font-bold text-[#6B75A1] uppercase tracking-[0.15em] md:tracking-[0.2em]">Configurador Deconstructivo</span>
 </div>
 <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none text-white">
 Mundial <span className="text-[#FCD116]">2026</span>
 </h1>
 </div>
 <div className="bg-[#1A1D24] border border-[#2A2E37] p-4 md:p-6 rounded-2xl md:rounded-[2rem] flex items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-start">
 <div className="flex flex-col items-center md:items-start">
 <span className="text-[8px] md:text-[10px] font-bold text-[#6B75A1] uppercase tracking-widest mb-1">{config?.main?.title?.value || "Inversión x Persona"}</span>
 <span className="text-3xl md:text-4xl font-bold tracking-tighter text-white">${formatPrice(currentPrice)}</span>
 </div>
 </div>
 </header>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
 <div className="lg:col-span-7 space-y-10 md:space-y-14">
 
 {/* VUELO CHÁRTER */}
 <section className="bg-gradient-to-r from-[#0033A0]/20 to-transparent p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 border-[#0033A0]/30 relative overflow-hidden">
 <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-center md:text-left">
 <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
 <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all ${includeCharter ? 'bg-[#FCD116] text-[#0A0C12]' : 'bg-slate-800 text-slate-500 opacity-50'}`}>
 <Plane size={28} className="md:w-8 md:h-8" />
 </div>
 <div>
 <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{config?.main?.charterFlight?.label || "Vuelo Chárter Directo"}</h3>
 <p className="text-xs md:text-sm text-[#6B75A1] font-medium">Logística Integral GYE - USA - GYE</p>
 </div>
 </div>
 <button 
 onClick={() => setIncludeCharter(!includeCharter)}
 className={`w-full md:w-auto px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all ${includeCharter ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-[#0033A0] text-white'}`}
 >
 {includeCharter ? "Eliminar Chárter" : "Incluir Chárter"}
 </button>
 </div>
 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden md:block">
 <Plane size={120} />
 </div>
 </section>

 {/* PARTIDOS (CIUDAD COMPLETA) */}
 <section>
 <div className="flex items-center gap-3 mb-6 md:mb-8">
 <div className="bg-[#FCD116] text-[#0A0C12] w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center text-xs md:text-sm font-black">01</div>
 <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#6B75A1]">Módulos de Ciudad (Sede + Estadio)</h3>
 </div>
 <div className="space-y-4">
 {MATCHES.map(match => (
 <div 
 key={match.id}
 className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] border-2 transition-all flex flex-col sm:flex-row justify-between items-center gap-4 ${
 activeMatchIds.includes(match.id) 
 ? 'border-[#2A2E37] bg-[#1A1D24]' 
 : 'border-transparent bg-slate-900/20 opacity-40'
 }`}
 >
 <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
 <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-sm md:text-base ${activeMatchIds.includes(match.id) ? 'bg-[#0033A0] text-white' : 'bg-slate-800'}`}>
 {match.id}
 </div>
 <div className="min-w-0">
 <div className="text-[8px] md:text-[10px] font-bold text-[#6B75A1] uppercase tracking-widest">{match.sede}</div>
 <div className="text-base md:text-xl font-bold leading-tight text-white truncate">vs {match.rival}</div>
 <div className="text-[8px] md:text-[9px] font-bold text-[#FCD116] uppercase mt-1 tracking-wider">
  {config?.individual[match.configKey]?.label || match.details}
 </div>
 </div>
 </div>
 <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-end">
 <span className="text-[10px] md:text-xs font-bold text-slate-500">{match.fecha}</span>
 <button 
 onClick={() => setActiveMatchIds(prev => prev.includes(match.id) ? prev.filter(m => m !== match.id) : [...prev, match.id].sort())}
 className={`p-2.5 md:p-3 rounded-full transition-all ${activeMatchIds.includes(match.id) ? 'text-red-500 hover:bg-red-500/10' : 'text-[#FCD116] hover:bg-[#FCD116]/10'}`}
 >
 {activeMatchIds.includes(match.id) ? <MinusCircle size={24} /> : <CheckCircle2 size={24} />}
 </button>
 </div>
 </div>
 ))}
 </div>
 </section>

      {/* CONFIGURACIÓN ADICIONAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#6B75A1]">Calidad de Hoteles</div>
          <div className="flex bg-[#1A1D24] rounded-xl md:rounded-2xl p-1 md:p-1.5 border border-[#2A2E37]">
            {(['Gold', 'Silver', 'Bronze'] as const).map(cat => (
              <Tooltip key={cat} text={DESCRIPTIONS[cat as keyof typeof DESCRIPTIONS]}>
                <button
                  onClick={() => setHotelQuality(cat)}
                  className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold transition-all uppercase tracking-widest ${
                    hotelQuality === cat ? 'bg-[#0033A0] text-white shadow-xl' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              </Tooltip>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#6B75A1]">Nivel de Ticket</div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {['CAT 1', 'CAT 2', 'CAT 3'].map((cat, idx) => (
              <Tooltip key={cat} text={DESCRIPTIONS[`Cat${idx+1}` as keyof typeof DESCRIPTIONS]}>
                <button
                  onClick={() => setTicketCat(idx)}
                  className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl border-2 text-[9px] md:text-[10px] font-bold transition-all uppercase tracking-widest ${
                    ticketCat === idx ? 'border-[#FCD116] bg-[#FCD116]/10 text-[#FCD116]' : 'border-[#2A2E37] text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {cat}
                </button>
              </Tooltip>
            ))}
          </div>
        </section>
      </div>
    </div>

    {/* TOTALES */}
    <div className="lg:col-span-5">
      <div className="static lg:sticky lg:top-12 bg-white rounded-3xl md:rounded-[3.5rem] p-8 md:p-12 text-[#0A0C12] shadow-2xl border-t-[8px] md:border-t-[12px] border-[#FCD116] mt-8 lg:mt-0">
        <h4 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#6B75A1] mb-4 md:mb-6 text-center">Inversión Final</h4>
        
        <div className="text-center mb-8 md:mb-10">
          <div className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-2 text-[#0A0C12]">
            <span className="text-2xl md:text-4xl align-top mr-1 font-semibold text-[#0033A0]">$</span>
            {formatPrice(currentPrice * quantity)}
          </div>
          <div className="bg-[#0A0C12] text-[#FCD116] inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Neto Proyectado</div>
        </div>

 {/* PASAJEROS */}
 <div className="bg-[#0A0C12] text-white rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 mb-6 md:mb-8 flex items-center justify-between shadow-xl">
 <div className="flex flex-col">
 <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-[#6B75A1] mb-1">Pasajeros</span>
 <div className="flex items-center gap-2 md:gap-3">
 <Users size={18} className="text-[#FCD116] md:w-5 md:h-5" />
 <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">{quantity} Pax</span>
 </div>
 </div>
 <div className="flex items-center gap-3 md:gap-4 bg-white/5 p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-white/10">
 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-[#6B75A1] hover:text-white transition-all">-</button>
 <span className="font-bold text-lg md:text-xl w-4 text-center text-white">{quantity}</span>
 <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-[#6B75A1] hover:text-white transition-all">+</button>
 </div>
 </div>

 <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 max-h-[200px] md:max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
 <div className="flex justify-between items-start text-[10px] md:text-[11px] font-bold uppercase tracking-tight border-b border-slate-100 pb-3">
 <span className="text-[#6B75A1]">{config?.main?.charterFlight?.label || "Vuelo GYE-USA-GYE"}</span>
 <span className={includeCharter ? "text-[#0033A0]" : "text-slate-300"}>
 {includeCharter ? "Confirmado" : "Removido"}
 </span>
 </div>
 
 {activeMatchIds.map(id => {
 const m = MATCHES.find(match => match.id === id);
 if (!m) return null;
 return (
 <div key={id} className="flex justify-between items-start text-[10px] md:text-[11px] font-bold uppercase tracking-tight border-b border-slate-100 pb-3">
 <div className="flex flex-col min-w-0 pr-4">
 <span className="text-slate-900 leading-none mb-1 truncate">Módulo {m.sede}</span>
 <span className="text-[7px] md:text-[8px] text-[#6B75A1] font-black uppercase tracking-widest">
  {config?.individual[m.configKey]?.label || m.details}
 </span>
 </div>
 <span className="text-slate-400 font-black tracking-widest uppercase text-[8px] md:text-[9px] flex-shrink-0">{hotelQuality}</span>
 </div>
 );
 })}

 {activeMatchIds.length === 0 && (
 <div className="p-4 bg-red-50 text-red-500 rounded-xl text-[9px] md:text-[10px] font-bold text-center">
 Error: Debe incluir al menos una ciudad.
 </div>
 )}
 </div>

 <button 
 onClick={() => setWizardStep(1)}
 disabled={activeMatchIds.length === 0}
 className="group w-full bg-[#0A0C12] text-white py-6 md:py-8 rounded-2xl md:rounded-[2.5rem] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-[11px] hover:bg-[#0033A0] transition-all flex items-center justify-center gap-3 md:gap-4 disabled:opacity-20"
 >
 Proceder a Reserva <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform text-[#FCD116] md:w-[18px] md:h-[18px]" />
 </button>
 
 <p className="mt-6 md:mt-8 text-[8px] md:text-[9px] text-[#6B75A1] text-center leading-relaxed font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] italic opacity-50">
 * El descuento de paquete completo (5%) se pierde al deconstruir el programa de 3 sedes.
 </p>
 </div>
 </div>

 </div>
 </div>
 </section>
 );
};
