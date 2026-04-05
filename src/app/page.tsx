import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Trust } from "@/components/Trust";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Trust />
    </main>
  );
}
