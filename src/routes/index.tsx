import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { CinemaScroll } from "@/components/landing/CinemaScroll";
import { Ticker } from "@/components/landing/Ticker";
import { Stats } from "@/components/landing/Stats";
import { WhyAdvertise } from "@/components/landing/WhyAdvertise";
import { Pacotes } from "@/components/landing/Pacotes";
import { Quote } from "@/components/landing/Quote";
import { CTAFinal } from "@/components/landing/CTAFinal";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/components/landing/useReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DSR × Baly — Catálogo que Move o Mercado" },
      {
        name: "description",
        content:
          "Proposta exclusiva da Distribuidora São Roque para a Baly: anuncie no catálogo que chega a +12.000 PDVs no Nordeste.",
      },
      { property: "og:title", content: "DSR × Baly — Catálogo que Move o Mercado" },
      {
        property: "og:description",
        content:
          "Sua marca no catálogo que vende. +12K PDVs, 4 estados, 48K exemplares por edição.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <Navbar />
      <main>
        <Hero />
        <CinemaScroll />
        <Ticker />
        <Stats />
        <WhyAdvertise />
        <Pacotes />
        <Quote />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
