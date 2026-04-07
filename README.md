# Proyecto: Megatours World Cup Landing

## Descripción
Landing page de alto impacto para la venta de paquetes premium del Mundial 2026 (Ecuador vs Curazao). Utiliza un enfoque de "Journey Builder" para permitir a los usuarios personalizar su experiencia de viaje de forma interactiva.

## Stack Tecnológico
- **Framework:** Next.js 16.2.2
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Iconografía:** Lucide React
- **Fuentes:** Lexend, Russo One
- **Despliegue:** Vercel

## Despliegue
- **Plataforma:** Vercel
- **URL de Producción:** [https://megatours.m8apps.com](https://megatours.m8apps.com)
- **URL de Preview/Vercel:** [https://megatours-concierge.vercel.app](https://megatours-concierge.vercel.app)

## Estructura de Archivos Clave
- **Componente de Precios:** `src/components/Pricing.tsx` (Contiene la lógica del Journey Builder y el motor de cálculo).
- **Configuración de Next.js:** `next.config.ts` (Configurado con `allowedDevOrigins` para HMR de OpenClaw).

## Lógica de Negocio (Pricing Engine)
El cálculo de precios es dinámico y se alimenta de un endpoint `/api/pricing`.

### 1. Componentes de Costo
- **Vuelo Chárter:** Base fija + costo de vuelo (GYE-USA-GYE).
- **Módulos de Ciudad (Sede + Estadio):** Precios base por ciudad (Philadelphia, Kansas City, New Jersey).
- **Categorías de Tickets:** 
    - CAT 1: Sin descuento.
    - CAT 2: -$400 por ticket.
    - CAT 3: -$600 por ticket.

### 2. Modificadores
- **Calidad de Hotel (Multiplicador):** 
    - **Gold:** 1.0 (Base).
    - **Silver:** `config.rules.silver.value`
    - **Bronze:** `config.rules.bronze.value`
- **Descuento de Paquete Completo (3 Sedes):** 5% de descuento sobre el total final si se seleccionan las 3 sedes.

### 3. Flujo de Usuario (Wizard)
1. **Selección:** Elegir partidos, vuelo, hotel y categoría.
2. **Personalización:** Ajuste de pasajeros y detalles de viaje.
3. **Cierre:** Formulario de contacto para generación de proforma oficial.

## Notas de Auditoría
- **Estado del Proyecto:** Producción / Demo avanzada.
- **Conectividad:** El frontend es dependiente de la API `/api/pricing` para la carga de la configuración de precios.
- **Ruta de Trabajo:** `/Users/m8apps/Projects/megatours-worldcup-landing/`
