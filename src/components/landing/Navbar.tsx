import { useEffect, useState } from "react";
import logoDsr from "@/assets/logo-dsr.png";

export function Navbar() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Começa a esmaecer após 80px e some completamente em 360px
      const fade = Math.max(0, Math.min(1, 1 - (y - 80) / 280));
      setOpacity(fade);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[200] px-9 py-3.5 flex items-center justify-between md:backdrop-blur-xl border-b border-brand-blue/20"
      style={{
        background: `rgba(7,17,31,${0.98 * opacity})`,
        opacity,
        pointerEvents: opacity < 0.05 ? "none" : "auto",
        transition: "opacity 0.2s linear",
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
