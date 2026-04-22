import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const items = [
  {
    title: "Reforço de autoridade da marca",
    desc: "Destaque seus dados de mercado.",
  },
  {
    title: "Quebra de objeções no ato",
    desc: "Argumento pronto para o lojista.",
  },
  {
    title: "Destaque visual na categoria",
    desc: "Saia da tabela de preços comum.",
  },
  {
    title: "Padronização do argumento",
    desc: "O vendedor fala o que você quer.",
  },
  {
    title: "Fixação de marca no lojista",
    desc: "Sua marca sempre no radar.",
  },
  {
    title: "Foco total em Sell-Out",
    desc: "Garantia de giro no ponto de venda.",
  },
];

export function Checklist() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-check-item]");
    if (!els || els.length === 0) return;

    const seen = new Set<number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            seen.add(idx);
            obs.unobserve(e.target);
          }
        });
        if (seen.size > 0) {
          setVisibleCount((c) => Math.max(c, Math.max(...seen) + 1));
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative py-24 md:py-32 bg-bg overflow-hidden"
      aria-label="Por que sua marca precisa estar aqui"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <header className="text-center mb-14 md:mb-20">
          <div className="inline-block text-brand-gold text-xs md:text-sm font-condensed uppercase tracking-[3px] mb-4">
            Benefícios estratégicos
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95]">
            POR QUE SUA MARCA
            <br />
            <span className="text-brand-red">PRECISA ESTAR AQUI</span>
          </h2>
        </header>

        <ul ref={containerRef} className="space-y-5 md:space-y-6">
          {items.map((item, i) => {
            const isVisible = i < visibleCount;
            return (
              <li
                key={i}
                data-check-item
                data-idx={i}
                className="group flex items-start gap-4 md:gap-6 p-5 md:p-7 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-700 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-red flex items-center justify-center shadow-[0_0_24px_rgba(224,30,43,0.45)] transition-transform duration-500"
                  style={{
                    transform: isVisible ? "scale(1)" : "scale(0.4)",
                    transitionDelay: isVisible ? `${i * 80 + 120}ms` : "0ms",
                  }}
                  aria-hidden="true"
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={3} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-condensed font-bold uppercase tracking-wide text-white text-lg md:text-2xl leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-brand-muted text-sm md:text-base mt-1.5">
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
