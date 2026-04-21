import React, { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "./Reveal";
import pacotesBg from "@/assets/pacotes-bg.webm";
import pngPaginaInteira from "@/assets/anuncio-pagina-inteira.png";
import pngMeiaPagina from "@/assets/anuncio-meia-pagina.png";
import pngUmQuarto from "@/assets/anuncio-um-quarto.png";

type Format = {
  name: string;
  short: string;
  description: string;
  price: string;
  monthly: string;
  highlight?: boolean;
  Icon: () => React.ReactElement;
  image: string;
};

const PageFullIcon = () => (
  <svg viewBox="0 0 40 52" className="w-10 h-12" fill="none">
    <rect x="1" y="1" width="38" height="50" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1" y="1" width="38" height="50" rx="1" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

const PageHalfIcon = () => (
  <svg viewBox="0 0 40 52" className="w-10 h-12" fill="none">
    <rect x="1" y="1" width="38" height="50" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <rect x="1" y="1" width="38" height="25" rx="1" fill="currentColor" fillOpacity="0.15" />
    <line x1="1" y1="26" x2="39" y2="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
  </svg>
);

const PageQuarterIcon = () => (
  <svg viewBox="0 0 40 52" className="w-10 h-12" fill="none">
    <rect x="1" y="1" width="38" height="50" rx="1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <rect x="1" y="1" width="19" height="25" rx="1" fill="currentColor" fillOpacity="0.15" />
    <line x1="1" y1="26" x2="39" y2="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <line x1="20" y1="1" x2="20" y2="51" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
  </svg>
);

const formats: Format[] = [
  {
    name: "PÁGINA INTEIRA",
    short: "FORMATO MASTER",
    description: "24 meses de domínio absoluto da atenção do lojista.",
    price: "R$ 15.000",
    monthly: "R$ 625/mês",
    highlight: true,
    Icon: PageFullIcon,
    image: pngPaginaInteira,
  },
  {
    name: "MEIA PÁGINA",
    short: "FORMATO TÁTICO",
    description: "Destaque tático com alta recorrência visual no PDV.",
    price: "R$ 8.000",
    monthly: "R$ 333/mês",
    Icon: PageHalfIcon,
    image: pngMeiaPagina,
  },
  {
    name: "1/4 DE PÁGINA",
    short: "FORMATO ESSENCIAL",
    description: "Garantia de marca lembrada em cada ciclo de abastecimento.",
    price: "R$ 4.500",
    monthly: "R$ 187/mês",
    Icon: PageQuarterIcon,
    image: pngUmQuarto,
  },
];

export function Pacotes() {
  return (
    <section id="pacotes" className="relative py-24 px-8 bg-bg overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.35 }}
      >
        <source src={pacotesBg} type="video/webm" />
      </video>
      {/* Lighter overlay so video shows through */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,15,30,0.25) 0%, rgba(10,15,30,0.65) 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 mb-16 items-end">
          <Reveal variant="fade-right">
            <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              ESCOLHA COMO<br />
              <span className="text-brand-red">APARECER</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-left" delay={0.15}>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              Três formatos pensados para diferentes estratégias de exposição.
              Todos com a mesma distribuição: 48K exemplares, 24 meses no campo,
              na mão de cada vendedor.
            </p>
          </Reveal>
        </div>

        <Reveal stagger staggerDelay={0.18} className="grid md:grid-cols-3 gap-6">
          {formats.map((f) => (
            <FormatCard key={f.name} format={f} />
          ))}
        </Reveal>

        <Reveal variant="fade-up" delay={0.2} className="mt-12 text-center">
          <a
            href="#cta"
            className="inline-block bg-brand-red text-white px-10 py-4 font-display tracking-widest text-sm hover:-translate-y-0.5 transition-transform"
          >
            FECHAR PARCERIA →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
