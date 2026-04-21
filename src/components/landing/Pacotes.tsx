import React from "react";

type Format = {
  name: string;
  short: string;
  description: string;
  highlight?: boolean;
  Icon: () => React.ReactElement;
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
    highlight: true,
    Icon: PageFullIcon,
  },
  {
    name: "MEIA PÁGINA",
    short: "FORMATO TÁTICO",
    description: "Destaque tático com alta recorrência visual no PDV.",
    Icon: PageHalfIcon,
  },
  {
    name: "1/4 DE PÁGINA",
    short: "FORMATO ESSENCIAL",
    description: "Garantia de marca lembrada em cada ciclo de abastecimento.",
    Icon: PageQuarterIcon,
  },
];

export function Pacotes() {
  return (
    <section id="pacotes" className="py-24 px-8 bg-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 mb-16 items-end">
          <h2 className="reveal font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
            ESCOLHA COMO<br />
            <span className="text-brand-red">APARECER</span>
          </h2>
          <p className="reveal text-white/50 text-base md:text-lg leading-relaxed font-light">
            Três formatos pensados para diferentes estratégias de exposição.
            Todos com a mesma distribuição: 48K exemplares, 24 meses no campo,
            na mão de cada vendedor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {formats.map((f) => (
            <div
              key={f.name}
              className={`reveal relative bg-bg p-10 md:p-12 transition-colors hover:bg-bg2 ${
                f.highlight ? "md:bg-bg2" : ""
              }`}
            >
              {f.highlight && (
                <div className="absolute top-6 right-6 font-display text-brand-red text-xs tracking-[0.3em]">
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

              <div className="mt-10 pt-6 border-t border-white/10 flex items-baseline justify-between">
                <span className="font-display text-white/40 text-xs tracking-[0.25em]">
                  EXPOSIÇÃO
                </span>
                <span
                  className={`font-display text-2xl ${
                    f.highlight ? "text-brand-red" : "text-white"
                  }`}
                >
                  24 MESES
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <a
            href="#cta"
            className="inline-block bg-brand-red text-white px-10 py-4 font-display tracking-widest text-sm hover:-translate-y-0.5 transition-transform"
          >
            FECHAR PARCERIA →
          </a>
        </div>
      </div>
    </section>
  );
}
