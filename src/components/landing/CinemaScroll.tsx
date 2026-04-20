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
  const snapLockRef = useRef(false);
  const snapTimeoutRef = useRef<number | null>(null);
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
        const idx = Math.min(
          scenes.length - 1,
          Math.max(0, Math.round(scrolled / Math.max(window.innerHeight, 1))),
        );
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

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionEnd = sectionTop + el.offsetHeight - window.innerHeight;
      const currentY = window.scrollY;
      const insideStickyRange = currentY >= sectionTop && currentY <= sectionEnd;

      if (!insideStickyRange || event.deltaY === 0) return;

      const currentStep = Math.min(
        scenes.length - 1,
        Math.max(0, Math.round((currentY - sectionTop) / Math.max(window.innerHeight, 1))),
      );
      const nextStep = event.deltaY > 0 ? currentStep + 1 : currentStep - 1;

      if (nextStep < 0 || nextStep > scenes.length - 1) return;

      event.preventDefault();
      if (snapLockRef.current) return;

      snapLockRef.current = true;
      window.scrollTo({
        top: sectionTop + nextStep * window.innerHeight,
        behavior: "smooth",
      });

      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }

      snapTimeoutRef.current = window.setTimeout(() => {
        snapLockRef.current = false;
        snapTimeoutRef.current = null;
      }, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    // Touch/swipe support for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let touchActive = false;

    const onTouchStart = (event: TouchEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionEnd = sectionTop + el.offsetHeight - window.innerHeight;
      const currentY = window.scrollY;
      const insideStickyRange = currentY >= sectionTop && currentY <= sectionEnd;
      if (!insideStickyRange) return;
      touchActive = true;
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!touchActive) return;
      const deltaY = touchStartY - event.touches[0].clientY;
      const deltaX = touchStartX - event.touches[0].clientX;
      // Only block scroll if vertical swipe is dominant
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchActive) return;
      touchActive = false;

      const el = sectionRef.current;
      if (!el) return;

      const touch = event.changedTouches[0];
      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;

      // Ignore horizontal swipes or tiny gestures
      if (Math.abs(deltaY) < 50 || Math.abs(deltaX) > Math.abs(deltaY)) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionEnd = sectionTop + el.offsetHeight - window.innerHeight;
      const currentY = window.scrollY;
      const insideStickyRange = currentY >= sectionTop && currentY <= sectionEnd;
      if (!insideStickyRange) return;

      const currentStep = Math.min(
        scenes.length - 1,
        Math.max(0, Math.round((currentY - sectionTop) / Math.max(window.innerHeight, 1))),
      );
      const nextStep = deltaY > 0 ? currentStep + 1 : currentStep - 1;

      if (nextStep < 0 || nextStep > scenes.length - 1) return;
      if (snapLockRef.current) return;

      snapLockRef.current = true;
      window.scrollTo({
        top: sectionTop + nextStep * window.innerHeight,
        behavior: "smooth",
      });

      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
      snapTimeoutRef.current = window.setTimeout(() => {
        snapLockRef.current = false;
        snapTimeoutRef.current = null;
      }, 700);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Keyboard navigation (Arrow Up/Down, Page Up/Down, Space, Home, End)
    const onKeyDown = (event: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionEnd = sectionTop + el.offsetHeight - window.innerHeight;
      const currentY = window.scrollY;
      const insideStickyRange = currentY >= sectionTop && currentY <= sectionEnd;
      if (!insideStickyRange) return;

      const currentStep = Math.min(
        scenes.length - 1,
        Math.max(0, Math.round((currentY - sectionTop) / Math.max(window.innerHeight, 1))),
      );

      let nextStep: number | null = null;
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          nextStep = currentStep + 1;
          break;
        case "ArrowUp":
        case "PageUp":
          nextStep = currentStep - 1;
          break;
        case "Home":
          nextStep = 0;
          break;
        case "End":
          nextStep = scenes.length - 1;
          break;
        default:
          return;
      }

      if (nextStep === null || nextStep < 0 || nextStep > scenes.length - 1) return;
      if (nextStep === currentStep) return;

      event.preventDefault();
      if (snapLockRef.current) return;

      snapLockRef.current = true;
      window.scrollTo({
        top: sectionTop + nextStep * window.innerHeight,
        behavior: "smooth",
      });

      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
      snapTimeoutRef.current = window.setTimeout(() => {
        snapLockRef.current = false;
        snapTimeoutRef.current = null;
      }, 700);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (snapTimeoutRef.current !== null) {
        window.clearTimeout(snapTimeoutRef.current);
      }
    };
  }, []);

  const current = scenes[activeScene];

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${scenes.length * 100}vh` }}>
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
