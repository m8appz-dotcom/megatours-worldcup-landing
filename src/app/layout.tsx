import type { Metadata } from "next";
import { Inter, Russo_One } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const russo = Russo_One({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-russo" 
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Paquetes Mundial 2026 | Ecuador vs Curazao en Kansas City | Megatours",
  description: "Reserva tu paquete oficial al Mundial 2026 con Megatours. Entradas Ecuador vs Curazao, hotel en Kansas City, traslados y seguro incluidos. ¡La mejor agencia de viajes para el mundial!",
  keywords: ["entradas mundial 2026 ecuador", "paquetes mundial 2026", "ecuador vs curazao entradas", "viaje mundial 2026 kansas city", "agencia de viajes mundial 2026 ecuador", "megatours mundial"],
  authors: [{ name: "Megatours" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${russo.variable}`}>
      <body className="antialiased min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
