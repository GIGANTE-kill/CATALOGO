import { useEffect, useState } from "react";
import logoDsr from "@/assets/logo-dsr.png";

export function Navbar() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;
    let lastOpacity = 1;

    const compute = () => {
      ticking = false;
      const y = window.scrollY;
      // Distância de fade bem maior para uma transição realmente suave
      const start = 120;
      const end = 700;
      const linear = Math.max(0, Math.min(1, 1 - (y - start) / (end - start)));
      // easeInOutSine: começa devagar, acelera no meio, termina devagar
      const fade = 0.5 - Math.cos(linear * Math.PI) / 2;
      // Evita re-renders se a mudança for imperceptível
      if (Math.abs(fade - lastOpacity) > 0.01 || fade === 0 || fade === 1) {
        lastOpacity = fade;
        setOpacity(fade);
      }
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
    <nav
      className="fixed top-0 left-0 right-0 z-[200] px-9 py-3.5 flex items-center justify-between md:backdrop-blur-xl border-b border-brand-blue/20"
      style={{
        background: `rgba(7,17,31,${0.98 * opacity})`,
        opacity,
        pointerEvents: opacity < 0.05 ? "none" : "auto",
        transition: "opacity 0.4s ease-out, background-color 0.4s ease-out",
      }}
    >
      <div className="flex items-center gap-3.5">
        <img src={logoDsr} alt="Distribuidora São Roque" className="h-28 md:h-32 object-contain" />
      </div>
      <a
        href="#cta"
        className="font-bold text-xs bg-brand-red text-white px-5 py-2.5 rounded hover:-translate-y-px transition-all"
        style={{ textDecoration: "none" }}
      >
        VER PROPOSTA
      </a>
    </nav>
  );
}
