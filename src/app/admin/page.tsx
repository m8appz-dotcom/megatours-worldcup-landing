"use client";
import React, { useState, useEffect } from 'react';
import { 
 Settings, Save, RefreshCw, DollarSign, 
 Hotel, Plane, Ticket, Users, ShieldCheck, 
 ArrowRightLeft, AlertCircle, Info, Calculator,
 Edit3, Type, Eye, Layers, Lock, Unlock, Key
} from 'lucide-react';

const GlobalStyles = () => (
 <<stylestyle dangerouslySetInnerHTML={{ __html: `
 @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
 .font-lexend { font-family: 'Lexend', sans-serif; }
 .input-light:focus { border-color: #0033A0; ring-color: #0033A0; outline: none; }
 .label-edit:focus { color: #0033A0; outline: none; background: #eff6ff; border-radius: 4px; }
 `}} />
);

const AdminDashboard = () => {
 const [data, setData] = useState<<anyany>(null);
 const [isSaving, setIsSaving] = useState(false);
 const [showToast, setShowToast] = useState(false);
 const [isLoading, setIsLoading] = useState(true);
 
 // Auth State
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [passwordInput, setPasswordInput] = useState('');
 const [authError, setAuthError] = useState(false);

 useEffect(() => {
  // Check session storage for existing auth
  const sessionAuth = sessionStorage.getItem('admin_auth');
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
  // In a real app, this would be a call to an auth API
  // For now, we check against the config we just updated
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
   <<sectionsection className="min-h-screen flex items-center justify-center bg-slate-50 font-lexend">
    <<divdiv className="flex flex-col items-center gap-4">
     <<RefreshRefreshCw className="animate-spin text-blue-600" size={48} />
     <<pp className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sincronizando...</p>
    </div>
   </section>
  );
 }

 // AUTH SCREEN
 if (!isAuthenticated) {
  return (
   <<divdiv className="min-h-screen bg-[#0A0C12] flex items-center justify-center p-6 font-lexend">
    <<GlobalGlobalStyles />
    <<divdiv className="max-w-md w-full bg-[#1A1D24] rounded-[2.5rem] p-10 border border-[#2A2E37] shadow-2xl text-center">
     <<divdiv className="w-20 h-20 bg-blue-600/10 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
      <<LockLock size={40} />
     </div>
     <<hh2 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h2>
     <<pp className="text-[#6B75A1] text-sm mb-8">Introduce la clave de administrador para continuar</p>
     
     <<formform onSubmit={handleLogin} className="space-y-4">
      <<divdiv className="relative">
       <<spanspan className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B75A1]">
        {authError ? <<AlertAlertCircle size={20} className="text-red-500" /> : <<KeyKey size={20} />}
       </span>
       <<inputinput 
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Contraseña"
        className={`w-full bg-[#0A0C12] border ${authError ? 'border-red-500/50' : 'border-[#2A2E37]'} rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#FCD116] transition-all`}
       />
      </div>
      <<buttonbutton 
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
 <<divdiv className="min-h-screen p-4 md:p-10 font-lexend text-slate-900 bg-slate-50">
 <<GlobalGlobalStyles />
 
 <<divdiv className="max-w-6xl mx-auto">
 {showToast && (
 <<divdiv className="fixed top-6 right-6 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
 <<ShieldShieldCheck size={20} />
 <<spanspan className="font-bold text-sm">Configuración guardada con éxito</span>
 </div>
 )}

 <<headerheader className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
 <<divdiv className="flex items-center gap-4">
 <<divdiv className="bg-blue-600 p-3 rounded-2xl text-white">
 <<SettingsSettings size={24} />
 </div>
 <<divdiv>
 <<hh1 className="text-2xl font-black tracking-tight">Administrador de Precios</h1>
 <<pp className="text-slate-400 text-xs font-bold uppercase tracking-widest">Modo Edición en Vivo</p>
 </div>
 </div>
 <<divdiv className="flex gap-3">
 <<buttonbutton 
  onClick={() => {
   if(confirm("¿Seguro que quieres volver a cerrar sesión?")) {
    sessionStorage.removeItem('admin_auth');
    window.location.reload();
   }
  }}
  className="bg-slate-100 text-slate-500 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
 <<UnlockUnlock size={16} /> Cerrar Sesión
 </button>
 <<buttonbutton 
  onClick={handleSave}
  className="bg-[#0033A0] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-blue-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
  disabled={isSaving}
 >
 {isSaving ? <<RefreshRefreshCw size={16} className="animate-spin" /> : <<SaveSave size={16} />}
 {isSaving ? "Guardando..." : "Guardar Cambios"}
 </button>
 </div>
 </header>

 <<divdiv className="grid grid-cols-1 lg:grid-cols-12 gap-8">
 
 <<divdiv className="lg:col-span-5 space-y-8">
 <<sectionsection className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
 <<divdiv className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
 <<PlanePlane size={18} className="text-blue-600" />
 <<inputinput 
  value={data.main.title.label} 
  onChange={(e) => updateLab('main', 'title', e.target.value)}
  className="bg-transparent font-black text-xs uppercase tracking-widest text-slate-400 label-edit w-full"
 />
 </div>

 <<divdiv className="space-y-10">
 {['charterBase', 'charterFlight'].map(key => (
 <<divdiv key={key} className="group">
 <<inputinput 
  value={data.main[key].label}
  onChange={(e) => updateLab('main', key, e.target.value)}
  className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 label-edit w-full block"
 />
 <<divdiv className="relative">
 <<spanspan className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 font-bold">$</span>
 <<inputinput 
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

 <<sectionsection className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <<divdiv className="flex items-center gap-3 mb-6 text-slate-900">
 <<ArrowArrowRightLeft size={18} className="text-blue-600" />
 <<hh3 className="text-xs font-black uppercase tracking-widest">Multiplicadores y Reglas</h3>
 </div>
 <<divdiv className="grid grid-cols-2 gap-6">
 {Object.keys(data.rules).map(key => (
 <<divdiv key={key} className="space-y-2">
 <<inputinput 
  value={data.rules[key].label}
  onChange={(e) => updateLab('rules', key, e.target.value)}
  className="bg-transparent text-[9px] font-black text-slate-400 uppercase label-edit w-full"
 />
 <<inputinput 
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

 <<divdiv className="lg:col-span-7 space-y-8">
 <<divdiv className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <<sectionsection className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <<divdiv className="flex items-center gap-3 mb-8 text-slate-900">
 <<HotelHotel size={18} className="text-blue-600" />
 <<hh3 className="text-xs font-black uppercase tracking-widest">Solo Paquete Terrestre</h3>
 </div>
 <<divdiv className="space-y-6">
 {Object.keys(data.individual).map(key => (
 <<divdiv key={key}>
 <<inputinput 
  value={data.individual[key].label}
  onChange={(e) => updateLab('individual', key, e.target.value)}
  className="bg-transparent text-[10px] font-black text-slate-400 uppercase label-edit w-full mb-2"
 />
 <<divdiv className="relative">
 <<spanspan className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">$</span>
 <<inputinput 
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

 <<sectionsection className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
 <<divdiv className="flex items-center gap-3 mb-8 text-slate-900">
 <<TicketTicket size={18} className="text-blue-600" />
 <<hh3 className="text-xs font-black uppercase tracking-widest">Deducción por Estadio</h3>
 </div>
 <<divdiv className="space-y-6">
 {Object.keys(data.tickets).map(key => (
 <<divdiv key={key}>
 <<inputinput 
  value={data.tickets[key].label}
  onChange={(e) => updateLab('tickets', key, e.target.value)}
  className="bg-transparent text-[10px] font-black text-slate-400 uppercase label-edit w-full mb-2"
 />
 <<divdiv className="relative">
 <<spanspan className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs">$</span>
 <<inputinput 
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

 <<divdiv className="bg-white p-10 rounded-[3rem] border border-slate-200 flex gap-8 items-start shadow-sm">
 <<divdiv className="bg-blue-50 p-4 rounded-3xl text-blue-600 shrink-0">
 <<InfoInfo size={32} />
 </div>
 <<divdiv className="space-y-3">
 <<hh4 className="text-sm font-black uppercase text-slate-900">Lógica de Sincronización Automática</h4>
 <<pp className="text-xs text-slate-500 font-medium leading-relaxed">
 Si modificas una <<strongstrong className="text-slate-700">Etiqueta</strong> (haciendo clic en el texto gris), el nombre cambiará en el cotizador del cliente.
 Si modificas un <<strongstrong className="text-slate-700">Valor</strong>, el precio se recalculará. El sistema usa los "Valores de Entrada" para restar dinero si el cliente decide no ir al partido pero se queda con el grupo en el Chárter.
 </p>
 <<divdiv className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
 <<ShieldShieldCheck size={14} /> Seguridad de Datos Activa
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
