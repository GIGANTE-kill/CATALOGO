import React, { useEffect, useRef, useState } from "react";
import { Reveal, RevealItem } from "./Reveal";
import pacotesBg from "@/assets/pacotes-bg.webm";

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
      description: "Domínio total da categoria e autoridade máxima.",
      price: "R$ 15.000",
      monthly: "R$ 625/mês",
      highlight: true,
      Icon: PageFullIcon,
      image: images?.paginaInteira ?? "/fornecedores/baly/inteira.png",
    },
    {
      name: "MEIA PÁGINA",
      short: "FORMATO TÁTICO",
      description: "O melhor equilíbrio entre custo e visibilidade no PDV.",
      price: "R$ 10.000",
      monthly: "R$ 416/mês",
      Icon: PageHalfIcon,
      image: images?.meiaPagina ?? "/fornecedores/baly/meia.png",
    },
    {
      name: "1/4 DE PÁGINA",
      short: "FORMATO ESSENCIAL",
      description: "Presença garantida no radar de compras a cada ciclo.",
      price: "R$ 7.000",
      monthly: "R$ 291/mês",
      Icon: PageQuarterIcon,
      image: images?.umQuarto ?? "/fornecedores/baly/quarto.png",
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

    const evaluate = () => {
      const card = el.parentElement;
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
      className={`group relative rounded-2xl p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2.5 flex flex-col h-full ${
        format.highlight
          ? "bg-black/40 led-highlight"
          : "bg-black/30 led-normal hover:bg-black/40"
      } ${active ? "is-active" : ""}`}
    >
      <div ref={ref} aria-hidden className="absolute inset-0 pointer-events-none" />

      <img
        src={format.image}
        alt={format.name}
        className="pointer-events-none absolute left-1/2 -top-12 w-[110%] max-w-[420px] -translate-x-1/2 opacity-0 scale-90 translate-y-10 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-[55%] group-hover:rotate-[-2deg] [.is-active_&]:opacity-100 [.is-active_&]:scale-100 [.is-active_&]:-translate-y-[55%] [.is-active_&]:rotate-[-2deg] z-30 drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
      />

      {format.highlight && (
        <div className="absolute top-6 right-6 font-display text-brand-red text-xs tracking-[0.3em] z-10 font-bold">
          RECOMENDADO
        </div>
      )}

      <div className={`transition-opacity duration-300 group-hover:opacity-20 [.is-active_&]:opacity-20 ${format.highlight ? "text-brand-red" : "text-white/40"}`}>
        <format.Icon />
      </div>

      <div className="mt-8 font-display text-white/60 text-xs tracking-[0.3em]">
        {format.short}
      </div>

      <h3 className="mt-2 font-display text-white text-3xl md:text-4xl tracking-wide font-medium">
        {format.name}
      </h3>

      <p className="mt-4 text-white/90 text-sm md:text-base leading-relaxed font-light flex-grow">
        {format.description}
      </p>

      <div className="mt-8 pt-6 border-t border-white/10 space-y-5 relative z-40 bg-transparent">
        <div className="flex flex-col gap-2">
          <span className="font-display text-white/50 text-xs tracking-[0.25em]">
            INVESTIMENTO
          </span>
          <div className="relative inline-flex self-start">
            {format.highlight && (
              <div className="absolute inset-0 bg-brand-red blur-md opacity-30 animate-pulse rounded-lg" />
            )}
            <span 
              className={`relative flex items-center justify-center px-8 py-3 font-display font-black text-2xl sm:text-4xl whitespace-nowrap rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-default text-white ${
                format.highlight 
                  ? "bg-brand-red border-white/20 shadow-[0_0_30px_rgba(224,30,43,0.6)]" 
                  : "bg-brand-red/90 border-white/10 shadow-[0_0_20px_rgba(224,30,43,0.3)] hover:bg-brand-red"
              }`}
              style={{ animation: "float-price 3s ease-in-out infinite" }}
            >
              {format.price}
            </span>
          </div>
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
    <section id="pacotes" className="relative pt-12 pb-24 px-8 bg-bg overflow-hidden">
      <style>{`
        @keyframes float-price {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.03); }
        }
        @keyframes rgb-glow-highlight {
          0% { box-shadow: 0 0 20px rgba(255,0,50,0.8), inset 0 0 15px rgba(255,0,50,0.4); border: 2px solid rgba(255,0,50,1); }
          33% { box-shadow: 0 0 35px rgba(255,100,0,1), inset 0 0 25px rgba(255,100,0,0.6); border: 2px solid rgba(255,100,0,1); }
          66% { box-shadow: 0 0 25px rgba(255,0,150,0.8), inset 0 0 20px rgba(255,0,150,0.5); border: 2px solid rgba(255,0,150,1); }
          100% { box-shadow: 0 0 20px rgba(255,0,50,0.8), inset 0 0 15px rgba(255,0,50,0.4); border: 2px solid rgba(255,0,50,1); }
        }
        @keyframes rgb-glow-normal {
          0% { box-shadow: 0 0 15px rgba(0,200,255,0.5), inset 0 0 10px rgba(0,200,255,0.2); border: 1px solid rgba(0,200,255,0.7); }
          33% { box-shadow: 0 0 25px rgba(0,100,255,0.7), inset 0 0 15px rgba(0,100,255,0.4); border: 1px solid rgba(0,100,255,0.9); }
          66% { box-shadow: 0 0 20px rgba(150,0,255,0.6), inset 0 0 12px rgba(150,0,255,0.3); border: 1px solid rgba(150,0,255,0.8); }
          100% { box-shadow: 0 0 15px rgba(0,200,255,0.5), inset 0 0 10px rgba(0,200,255,0.2); border: 1px solid rgba(0,200,255,0.7); }
        }
        .led-highlight {
          animation: rgb-glow-highlight 3s linear infinite;
        }
        .led-normal {
          animation: rgb-glow-normal 4s linear infinite;
        }
      `}</style>
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
              9.000 clientes impactados e 100% do seu mix divulgado sem custo adicional.
            </p>
          </Reveal>
        </div>

        <Reveal stagger staggerDelay={0.18} className="grid md:grid-cols-3 gap-6">
          {formats.map((format) => (
            <InlineFormatCard key={format.name} format={format} />
          ))}
        </Reveal>

        <Reveal variant="fade-up" delay={0.2} className="mt-16 text-center">
          <a
            href="https://wa.me/5575999223810?text=Oi!%20Vi%20a%20proposta%20do%20Cat%C3%A1logo%20DSR%20e%20quero%20reservar%20um%20espa%C3%A7o%20para%20minha%20marca.%20Quais%20s%C3%A3o%20os%20pr%C3%B3ximos%20passos?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-red text-white px-12 py-5 font-display font-bold tracking-[0.2em] text-base hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(224,30,43,0.3)] transition-all duration-300 rounded-sm"
          >
            FECHAR PARCERIA →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
