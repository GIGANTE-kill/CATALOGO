import { useEffect, useRef, useState } from "react";
import paginaInteira from "@/assets/anuncio-pagina-inteira.png";
import meiaPagina from "@/assets/anuncio-meia-pagina.png";
import umQuarto from "@/assets/anuncio-um-quarto.png";

type Scene = {
  kicker: string;
  kickerColor: string;
  title: React.ReactNode;
  text: string;
  extra: React.ReactNode;
  image: string;
  imageAlt: string;
  glow: string;
  rotate: number;
  scale: number;
};

const scenes: Scene[] = [
  {
    kicker: "Formato premium",
    kickerColor: "var(--brand-red)",
    title: <>PÁGINA<br /><span className="text-brand-red">INTEIRA</span></>,
    text: "Domínio visual absoluto. Sua marca ocupa toda a página do catálogo, sem concorrência por atenção. Ideal para lançamentos e campanhas de impacto.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-red">100%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página para sua marca</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-gold">MAX</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Impacto visual</div>
        </div>
      </div>
    ),
    image: paginaInteira,
    imageAlt: "Anúncio página inteira no catálogo DSR",
    glow: "rgba(224,30,43,0.6)",
    rotate: 2,
    scale: 1,
  },
  {
    kicker: "Formato equilibrado",
    kickerColor: "var(--brand-gold)",
    title: <>MEIA<br /><span className="text-brand-gold">PÁGINA</span></>,
    text: "Excelente custo-benefício com forte presença. Espaço suficiente para destacar produto, preço e chamada — divide a página com conteúdo editorial relevante.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-gold">50%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página em destaque</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-blue">★★★</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Custo-benefício</div>
        </div>
      </div>
    ),
    image: meiaPagina,
    imageAlt: "Anúncio meia página no catálogo DSR",
    glow: "rgba(255,214,0,0.6)",
    rotate: -4,
    scale: 1.02,
  },
  {
    kicker: "Formato estratégico",
    kickerColor: "var(--brand-blue)",
    title: <>UM QUARTO<br />DE <span className="text-brand-red">PÁGINA</span></>,
    text: "Entrada inteligente no catálogo. Posicionamento estratégico para reforço de marca, sazonais e ofertas pontuais — presença garantida com investimento enxuto.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-blue">25%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página, alto giro</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-red">$</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Entrada acessível</div>
        </div>
      </div>
    ),
    image: umQuarto,
    imageAlt: "Anúncio um quarto de página no catálogo DSR",
    glow: "rgba(28,63,143,0.7)",
    rotate: 4,
    scale: 0.98,
  },
];

export function CinemaScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const idx = Math.min(scenes.length - 1, Math.floor(p * scenes.length));
        setActiveScene(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const current = scenes[activeScene];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-bg">
        <div className="absolute inset-0 grid-bg opacity-50" />

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div key={activeScene} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div
              className="font-condensed font-bold tracking-[0.3em] text-sm uppercase"
              style={{ color: current.kickerColor }}
            >
              ◆ {current.kicker}
            </div>
            <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85]">
              {current.title}
            </h2>
            <p className="text-brand-muted text-lg max-w-xl leading-relaxed pt-2">
              {current.text}
            </p>
            {current.extra}
          </div>

          {/* AD FORMAT IMAGES (all preloaded, fade between) */}
          <div className="hidden md:flex justify-center items-center relative h-[91vh]">
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full transition-all duration-700"
              style={{ background: current.glow, filter: "blur(80px)" }}
            />
            {scenes.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 flex justify-center items-center transition-all duration-700 ease-out"
                style={{
                  opacity: i === activeScene ? 1 : 0,
                  transform: `rotate(${i === activeScene ? s.rotate : 0}deg) scale(${i === activeScene ? s.scale : 0.92})`,
                  pointerEvents: i === activeScene ? "auto" : "none",
                }}
              >
                <img
                  src={s.image}
                  alt={s.imageAlt}
                  className="max-h-[91vh] w-auto object-contain drop-shadow-2xl"
                  loading="eager"
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scene dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border-2 transition-all"
              style={{
                background: i === activeScene ? "var(--brand-red)" : "transparent",
                borderColor: i === activeScene ? "var(--brand-red)" : "rgba(255,255,255,0.3)",
                transform: i === activeScene ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg3">
          <div
            className="h-full bg-brand-red transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
