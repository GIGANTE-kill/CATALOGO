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

function FormatCard({ format: f }: { format: Format }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;

    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio > 0.55),
      { threshold: [0, 0.55, 0.75, 1] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <RevealItem
      variant="zoom-in"
      className={`group relative rounded-2xl p-10 md:p-12 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 ${
        f.highlight
          ? "bg-white/[0.08] border-brand-red/40 shadow-[0_8px_32px_rgba(224,30,43,0.2)]"
          : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
      } ${active ? "is-active" : ""}`}
      style={{
        boxShadow: f.highlight
          ? "0px -16px 24px 0px rgba(224,30,43,0.15) inset, 0 8px 32px rgba(0,0,0,0.3)"
          : "0px -16px 24px 0px rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none" />

      <img
        src={f.image}
        alt={f.name}
        className="pointer-events-none absolute left-1/2 -top-8 w-[106%] max-w-[400px] -translate-x-1/2 opacity-0 scale-75 translate-y-6 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-[55%] group-hover:rotate-[-4deg] [.is-active_&]:opacity-100 [.is-active_&]:scale-100 [.is-active_&]:-translate-y-[55%] [.is-active_&]:rotate-[-4deg] z-20 drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
      />

      {f.highlight && (
        <div className="absolute top-6 right-6 font-display text-brand-red text-xs tracking-[0.3em] z-10">
          RECOMENDADO
        </div>
      )}

      <div className={f.highlight ? "text-brand-red" : "text-white/40"}>
        <f.Icon />
      </div>

      <div className="mt-8 font-display text-white/40 text-xs tracking-[0.3em]">
        {f.short}
      </div>

      <h3 className="mt-2 font-display text-white text-3xl md:text-4xl tracking-wide">
        {f.name}
      </h3>

      <p className="mt-6 text-white/60 text-sm md:text-base leading-relaxed font-light">
        {f.description}
      </p>

      <div className="mt-10 pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-white/40 text-xs tracking-[0.25em]">
            INVESTIMENTO
          </span>
          <span
            className={`font-display text-3xl ${
              f.highlight ? "text-brand-red" : "text-white"
            }`}
          >
            {f.price}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-white/40 text-xs tracking-[0.25em]">
            EQUIVALE A
          </span>
          <span className="font-display text-base text-white/70">
            {f.monthly}
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
          <span className="font-display text-white/40 text-xs tracking-[0.25em]">
            EXPOSIÇÃO
          </span>
          <span className="font-display text-sm text-white/70 tracking-wider">
            24 MESES
          </span>
        </div>
      </div>
    </RevealItem>
  );
}

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
