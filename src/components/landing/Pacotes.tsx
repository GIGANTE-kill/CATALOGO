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

function buildFormats(images?: { paginaInteira?: string; meiaPagina?: string; umQuarto?: string }): Format[] {
  return [
    {
      name: "PÁGINA INTEIRA",
      short: "FORMATO MASTER",
      description: "Domínio total da categoria e autoridade máxima por 24 meses.",
      price: "R$ 15.000",
      monthly: "R$ 625/mês",
      highlight: true,
      Icon: PageFullIcon,
      image: images?.paginaInteira ?? pngPaginaInteira,
    },
    {
      name: "MEIA PÁGINA",
      short: "FORMATO TÁTICO",
      description: "O melhor equilíbrio entre custo e visibilidade no PDV.",
      price: "R$ 10.000",
      monthly: "R$ 416/mês",
      Icon: PageHalfIcon,
      image: images?.meiaPagina ?? pngMeiaPagina,
    },
    {
      name: "1/4 DE PÁGINA",
      short: "FORMATO ESSENCIAL",
      description: "Presença garantida no radar de compras a cada ciclo.",
      price: "R$ 7.000",
      monthly: "R$ 291/mês",
      Icon: PageQuarterIcon,
      image: images?.umQuarto ?? pngUmQuarto,
    },
  ];
}

function InlineFormatCard({ format }: { format: Format }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const isTouch =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    if (!isTouch) return;

    // Fallback computation: card is "active" when its center is in the
    // middle 60% of the viewport. Runs on scroll/resize and is also used
    // as the source of truth when IntersectionObserver isn't available
    // or fails to fire (some mobile browsers / iframes).
    const evaluate = () => {
      const card = el.parentElement; // the RevealItem card itself
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = rect.top + rect.height / 2;
      const inBand = center > vh * 0.2 && center < vh * 0.8;
      setActive((prev) => (prev === inBand ? prev : inBand));
    };

    let obs: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.55) setActive(true);
          else if (entry.intersectionRatio < 0.2) setActive(false);
          else evaluate();
        },
        { threshold: [0, 0.2, 0.55, 0.75, 1] }
      );
      obs.observe(el);
    }

    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate);
    window.addEventListener("touchmove", evaluate, { passive: true });

    return () => {
      obs?.disconnect();
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
      window.removeEventListener("touchmove", evaluate);
    };
  }, []);

  return (
    <RevealItem
      variant="zoom-in"
      className={`group relative rounded-2xl p-10 md:p-12 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 ${
        format.highlight
          ? "bg-white/[0.08] border-brand-red/40 shadow-[0_8px_32px_rgba(224,30,43,0.2)]"
          : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
      } ${active ? "is-active" : ""}`}
      style={{
        boxShadow: format.highlight
          ? "0px -16px 24px 0px rgba(224,30,43,0.15) inset, 0 8px 32px rgba(0,0,0,0.3)"
          : "0px -16px 24px 0px rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none" />

      <img
        src={format.image}
        alt={format.name}
        className="pointer-events-none absolute left-1/2 -top-8 w-[106%] max-w-[400px] -translate-x-1/2 opacity-0 scale-75 translate-y-6 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-[55%] group-hover:rotate-[-4deg] [.is-active_&]:opacity-100 [.is-active_&]:scale-100 [.is-active_&]:-translate-y-[55%] [.is-active_&]:rotate-[-4deg] z-20 drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]"
      />

      {format.highlight && (
        <div className="absolute top-6 right-6 font-display text-brand-red text-xs tracking-[0.3em] z-10">
          RECOMENDADO
        </div>
      )}

      <div className={format.highlight ? "text-brand-red" : "text-white/40"}>
        <format.Icon />
      </div>

      <div className="mt-8 font-display text-white/40 text-xs tracking-[0.3em]">
        {format.short}
      </div>

      <h3 className="mt-2 font-display text-white text-3xl md:text-4xl tracking-wide">
        {format.name}
      </h3>

      <p className="mt-6 text-white/60 text-sm md:text-base leading-relaxed font-light">
        {format.description}
      </p>

      <div className="mt-10 pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-white/40 text-xs tracking-[0.25em] shrink-0">
            INVESTIMENTO
          </span>
          <span className={`font-display text-2xl sm:text-3xl whitespace-nowrap ${format.highlight ? "text-brand-red" : "text-white"}`}>
            {format.price}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-white/40 text-xs tracking-[0.25em] shrink-0">
            EQUIVALE A
          </span>
          <span className="font-display text-base text-white/70 whitespace-nowrap">{format.monthly}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 pt-2 border-t border-white/5">
          <span className="font-display text-white/40 text-xs tracking-[0.25em] shrink-0">
            EXPOSIÇÃO
          </span>
          <span className="font-display text-sm text-white/70 tracking-wider whitespace-nowrap">
            24 MESES
          </span>
        </div>
      </div>
    </RevealItem>
  );
}

type PacotesProps = {
  images?: { paginaInteira?: string; meiaPagina?: string; umQuarto?: string };
};

export function Pacotes({ images }: PacotesProps = {}) {
  const formats = buildFormats(images);
  return (
    <section id="pacotes" className="relative py-24 px-8 bg-bg overflow-hidden">
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
              Três formatos para diferentes estratégias de exposição. Todos com a mesma distribuição:
              9.000 clientes impactados, 24 meses no campo (físico + digital), e 100% do seu mix
              divulgado sem custo adicional.
            </p>
          </Reveal>
        </div>

        <Reveal stagger staggerDelay={0.18} className="grid md:grid-cols-3 gap-6">
          {formats.map((format) => (
            <InlineFormatCard key={format.name} format={format} />
          ))}
        </Reveal>

        <Reveal variant="fade-up" delay={0.2} className="mt-12 text-center">
          <p className="text-white/50 text-sm font-light mb-6 max-w-2xl mx-auto">
            <span className="text-brand-red font-display tracking-wider">DICA:</span>{" "}
            Vai anunciar mais de uma marca ou categoria? Fale conosco para negociar um
            desconto progressivo.
          </p>
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
