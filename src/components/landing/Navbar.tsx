import { useEffect, useRef } from "react";
import logoDsr from "@/assets/logo-dsr.png";
import logoBaly from "@/assets/logo-baly.png";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let rafId = 0;
    let ticking = false;
    let lastOpacity = -1;

    const compute = () => {
      ticking = false;
      const y = window.scrollY;
      const start = 120;
      const end = 700;
      const linear = Math.max(0, Math.min(1, 1 - (y - start) / (end - start)));
      // easeInOutSine
      const fade = 0.5 - Math.cos(linear * Math.PI) / 2;

      if (Math.abs(fade - lastOpacity) < 0.005 && fade !== 0 && fade !== 1) return;
      lastOpacity = fade;

      // Mutação direta no DOM evita re-render do React a cada frame
      nav.style.opacity = String(fade);
      nav.style.pointerEvents = fade < 0.05 ? "none" : "auto";
      nav.style.visibility = fade < 0.01 ? "hidden" : "visible";
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    // Wrapper sticky de altura zero: o nav fica grudado no topo sem empurrar o conteúdo
    <div className="sticky top-0 z-[200] h-0">
      <nav
        ref={navRef}
        className="px-9 py-3.5 flex items-center justify-between md:backdrop-blur-xl border-b border-brand-blue/20"
        style={{
          background: "rgba(7,17,31,0.98)",
          // Promove a uma camada GPU para evitar jitter/repaint em Safari/Firefox
          transform: "translateZ(0)",
          willChange: "opacity",
          backfaceVisibility: "hidden",
          transition: "opacity 0.25s ease-out",
        }}
      >
        <div className="flex items-center gap-3.5">
          <img src={logoDsr} alt="Distribuidora São Roque" className="h-28 md:h-32 object-contain" />
        </div>
        <div className="flex items-center gap-3.5">
          <img src={logoBaly} alt="Baly" className="h-11 md:h-14 object-contain" />
        </div>
      </nav>
    </div>
  );
}
