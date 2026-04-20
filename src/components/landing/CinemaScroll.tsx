import { useEffect, useRef, useState } from "react";
import { CanPlaceholder } from "./CanPlaceholder";

type Scene = {
  kicker: string;
  kickerColor: string;
  title: React.ReactNode;
  text: string;
  extra: React.ReactNode;
  canStyle: { rotate: number; scale: number; glow: string };
};

const scenes: Scene[] = [
  {
    kicker: "A maior do Brasil",
    kickerColor: "var(--brand-red)",
    title: <>BALY É<br /><span className="text-brand-red">LÍDER</span><br />NACIONAL</>,
    text: "Em 2025, a Baly ultrapassou a Red Bull e se tornou a maior marca brasileira de energéticos em volume de vendas.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-red">26%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Market share nacional</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-gold">50%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Crescimento médio ao ano</div>
        </div>
      </div>
    ),
    canStyle: { rotate: 2, scale: 1, glow: "rgba(224,30,43,0.6)" },
  },
  {
    kicker: "Força de vendas DSR",
    kickerColor: "var(--brand-gold)",
    title: <>12 MIL<br /><span className="text-brand-gold">PONTOS</span><br />DE VENDA</>,
    text: "Nossa malha de distribuição cobre o Nordeste com capilaridade de bairro, garantindo presença real onde a Baly precisa estar.",
    extra: (
      <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-bg3 border border-brand-gold/30">
        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse-dot" />
        <span className="font-condensed font-bold tracking-widest text-sm uppercase">Catálogo ativo em 4 estados</span>
      </div>
    ),
    canStyle: { rotate: -6, scale: 1.08, glow: "rgba(255,214,0,0.6)" },
  },
  {
    kicker: "Decisão de compra",
    kickerColor: "var(--brand-blue)",
    title: <>O LUGAR<br />CERTO NA<br /><span className="text-brand-red">HORA CERTA</span></>,
    text: "O catálogo DSR chega na mão do dono do PDV no exato momento em que ele monta o próximo pedido — sua lata na frente da decisão.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-blue">48K</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Exemplares por edição</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-red">3×</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Edições por ano</div>
        </div>
      </div>
    ),
    canStyle: { rotate: 6, scale: 0.95, glow: "rgba(28,63,143,0.7)" },
  },
  {
    kicker: "A proposta",
    kickerColor: "var(--brand-gold)",
    title: <>VAMOS<br />FAZER <span className="text-brand-gold">ISSO</span><br />JUNTOS?</>,
    text: "Pacotes a partir de R$ 2.900 por edição. Coloque a Baly no centro da decisão de compra do varejo nordestino.",
    extra: (
      <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-bg3 border border-brand-gold/30">
        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse-dot" />
        <span className="font-condensed font-bold tracking-widest text-sm uppercase">Próxima edição saindo em breve</span>
      </div>
    ),
    canStyle: { rotate: 0, scale: 1.12, glow: "rgba(255,214,0,0.8)" },
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
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
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

          {/* CAN */}
          <div className="hidden md:flex justify-center items-center relative">
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] rounded-full transition-all duration-700"
              style={{ background: current.canStyle.glow, filter: "blur(70px)" }}
            />
            <div
              className="relative z-10 transition-all duration-700 ease-out"
              style={{
                transform: `rotate(${current.canStyle.rotate}deg) scale(${current.canStyle.scale})`,
              }}
            >
              <CanPlaceholder />
            </div>
          </div>
        </div>

        {/* Scene dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border-2 border-white transition-all"
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
