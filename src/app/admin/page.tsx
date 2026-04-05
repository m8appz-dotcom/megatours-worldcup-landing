"use client";
import React, { useState, useEffect } from 'react';
import { 
 Settings, Save, RefreshCw, DollarSign, 
 Hotel, Plane, Ticket, Users, ShieldCheck, 
 ArrowRightLeft, AlertCircle, Info, Calculator,
 Edit3, Type, Eye, Layers, Lock, Unlock, Key
} from 'lucide-react';

const GlobalStyles = () => (
 <style dangerouslySetInnerHTML={{ __html: `
 @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
 .font-lexend { font-family: 'Lexend', sans-serif; }
 .input-light:focus { border-color: #0033A0; ring-color: #0033A0; outline: none; }
 .label-edit:focus { color: #0033A0; outline: none; background: #eff6ff; border-radius: 4px; }
 `}} />
);

const AdminDashboard = () => {
 const [data, setData] = useState<any>(null);
 const [isSaving, setIsSaving] = useState(false);
 const [showToast, setShowToast] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
 
 // Auth State
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [passwordInput, setPasswordInput] = useState('');
 const [authError, setAuthError] = useState(false);

 useEffect(() => {
  // Check session storage for existing auth
  const sessionAuth = typeof window !== 'undefined' ? sessionStorage.getItem('admin_auth') : null;
  if (sessionAuth === 'true') {
    setIsAuthenticated(true);
  }

  fetch('/api/pricing')
   .then(res => res.json())
   .then(json => {
    if (!json.error) setData(json);
   })
   .catch(err => console.error("Error loading config:", err))
   .finally(() => setIsLoading(false));
 }, []);

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('/api/pricing');
  const config = await response.json();
  
  if (passwordInput === config.adminPassword) {
    setIsAuthenticated(true);
    sessionStorage.setItem('admin_auth', 'true');
    setAuthError(false);
  } else {
    setAuthError(true);
    setTimeout(() => setAuthError(false), 2000);
  }
 };

 const updateVal = (sec: string, key: string, v: string) => {
  setData((prev: any) => ({
    ...prev,
    [sec]: { ...prev[sec], [key]: { ...prev[sec][key], value: parseFloat(v) || 0 } }
  }));
 };

 const updateLab = (sec: string, key: string, t: string) => {
  setData((prev: any) => ({
    ...prev,
    [sec]: { ...prev[sec], [key]: { ...prev[sec][key], label: t } }
  }));
 };

 const handleSave = async () => {
  setIsSaving(true);
  try {
   const response = await fetch('/api/pricing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
   });
   
   if (response.ok) {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
   } else {
    alert("Error al guardar los cambios.");
   }
  } catch (error) {
   console.error("Save error:", error);
   alert("Error de conexión.");
  } finally {
   setIsSaving(false);
  }
 };

 if (isLoading) {
  return (
   <section className="min-h-screen flex items-center justify-center bg-slate-50 font-lexend">
    <div className="flex flex-col items-center gap-4">
     <RefreshCw className="animate-spin text-blue-600" size={48} />
     <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sincronizando...</p>
    </div>
   </section>
  );
 }

 if (!isAuthenticated) {
  return (
   <div className="min-h-screen bg-[#0A0C12] flex items-center justify-center p-6 font-lexend">
    <GlobalStyles />
    <div className="max-w-md w-full bg-[#1A1D24] rounded-[2.5rem] p-10 border border-[#2A2E37] shadow-2xl text-center">
     <div className="w-20 h-20 bg-blue-600/10 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
      <Lock size={40} />
     </div>
     <h2 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h2>
     <p className="text-[#6B75A1] text-sm mb-8">Introduce la clave de administrador para continuar</p>
     
     <form onSubmit={handleLogin} className="space-y-4">
      <div className="relative">
       <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B75A1]">
        {authError ? <AlertCircle size={20} className="text-red-500" /> : <Key size={20} />}
       </span>
       <input 
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Contraseña"
        className={`w-full bg-[#0A0C12] border ${authError ? 'border-red-500/50' : 'border-[#2A2E37]'} rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#FCD116] transition-all`}
       />
      </div>
      <button 
       type="submit"
       className="w-full bg-white text-[#0A0C12] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#FCD116] transition-all"
      >
       Desbloquear Panel
      </button>
     </form>
    </div>
   </div>
  );
 }

 return (
 <div className="min-h-screen p-4 md:p-10 font-lexend text-slate-900 bg-slate-50">
 <GlobalStyles />
 
 <div className="max-w-6xl mx-auto">
 {showToast && (
 <div className="fixed top-6 right-6 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
 <ShieldCheck size={20} />
 <span className="font-bold text-sm">Configuración guardada con éxito</span>
 </div>
 )}

 <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
 <div className="flex items-center gap-4">
 <div className="bg-blue-600 p-3 rounded-2xl text-white">
 <Settings size={24} />
 </div>
 <div>
 <h1 className="text-2xl font-black tracking-tight">Administrador de Precios</h1>
 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Modo Edición en Vivo</p>
 </div>
 </div>
 <div className="flex gap-3">
 <button 
  onClick={() => {
   if(confirm("¿Seguro que quieres volver a cerrar sesión?")) {
    sessionStorage.removeItem('admin_auth');
    window.location.reload();
   }
  }}
  className="bg-slate-100 text-slate-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
 <Unlock size={16} /> Cerrar Sesión
 </button>
 <button 
  onClick={handleSave}
  className="bg-[#0033A0] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-blue-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
  disabled={isSaving}
 >
 {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
 {isSaving ? "Guardando..." : "Guardar Cambios"}
 </button>
 </div>
 </header>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 
 <div className="lg:col-span-5 space-y-8">
 <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
 <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
 <Plane size={18} className="text-blue-600" />
 <input 
  value={data.main.title.label} 
  onChange={(e) => updateLab('main', 'title', e.target.value)}
  className="bg-transparent font-black text-xs uppercase tracking-widest text-slate-400 label-edit w-full"
 />
 </div>

 <div className="space-y-10">
 {['charterBase', 'charterFlight'].map(key => (
 <div key={key} className="group">
 <input 
  value={data.main[key].label}
  onChange={(e) => updateLab('main', key, e.target.value)}
  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 label-edit w-full block"
 />
 <div className="relative">
 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold">$</span>
 <input 
  type="number"
  step="0.01"
  value={data.main[key].value}
  onChange={(e) => updateVal('main', key, e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-10 pr-6 text-xl font-black text-slate-900 input-light transition-all shadow-inner"
 />
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <div className="flex items-center gap-3 mb-6 text-slate-900">
 <ArrowRightLeft size={18} className="text-blue-600" />
 <h3 className="text-xs font-black uppercase tracking-widest">Multiplicadores y Reglas</h3>
 </div>
 <div className="grid grid-cols-2 gap-6">
 {Object.keys(data.rules).map(key => (
 <div key={key} className="space-y-2">
 <input 
  value={data.rules[key].label}
  onChange={(e) => updateLab('rules', key, e.target.value)}
  className="bg-transparent text-[9px] font-black text-slate-400 uppercase label-edit w-full"
 />
 <input 
  type="number"
  step="0.01"
  value={data.rules[key].value}
  onChange={(e) => updateVal('rules', key, e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-black text-slate-900 input-light"
 />
 </div>
 ))}
 </div>
 </section>
 </div>

 <div className="lg:col-span-7 space-y-8">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <div className="flex items-center gap-3 mb-8 text-slate-900">
 <Hotel size={18} className="text-blue-600" />
 <h3 className="text-xs font-black uppercase tracking-widest">Solo Paquete Terrestre</h3>
 </div>
 <div className="space-y-6">
 {Object.keys(data.individual).map(key => (
 <div key={key}>
 <input 
  value={data.individual[key].label}
  onChange={(e) => updateLab('individual', key, e.target.value)}
  className="bg-transparent text-[10px] font-black text-slate-400 uppercase label-edit w-full mb-2"
 />
 <div className="relative">
 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">$</span>
 <input 
  type="number"
  step="0.01"
  value={data.individual[key].value}
  onChange={(e) => updateVal('individual', key, e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-10 pr-4 text-sm font-black text-slate-900 input-light shadow-inner"
 />
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <div className="flex items-center gap-3 mb-8 text-slate-900">
 <Ticket size={18} className="text-blue-600" />
 <h3 className="text-xs font-black uppercase tracking-widest">Deducción por Estadio</h3>
 </div>
 <div className="space-y-6">
 {Object.keys(data.tickets).map(key => (
 <div key={key}>
 <input 
  value={data.tickets[key].label}
  onChange={(e) => updateLab('tickets', key, e.target.value)}
  className="bg-transparent text-[10px] font-black text-slate-400 uppercase label-edit w-full mb-2"
 />
 <div className="relative">
 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">$</span>
 <input 
  type="number"
  step="0.01"
  value={data.tickets[key].value}
  onChange={(e) => updateVal('tickets', key, e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-10 pr-4 text-sm font-black text-slate-900 input-light shadow-inner"
 />
 </div>
 </div>
 ))}
 </div>
 </section>
 </div>

 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex gap-8 items-start shadow-sm">
 <div className="bg-blue-50 p-4 rounded-3xl text-blue-600 shrink-0">
 <Info size={32} />
 </div>
 <div className="space-y-3">
 <h4 className="text-sm font-black uppercase text-slate-900">Lógica de Sincronización Automática</h4>
 <p className="text-xs text-slate-500 font-medium leading-relaxed">
 Si modificas una <strong className="text-slate-700">Etiqueta</strong> (haciendo clic en el texto gris), el nombre cambiará en el cotizador del cliente.
 Si modificas un <strong className="text-slate-700">Valor</strong>, el precio se recalculará. El sistema usa los "Valores de Entrada" para restar dinero si el cliente decide no ir al partido pero se queda con el grupo en el Chárter.
 </p>
 <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
 <ShieldCheck size={14} /> Seguridad de Datos Activa
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default AdminDashboard;
