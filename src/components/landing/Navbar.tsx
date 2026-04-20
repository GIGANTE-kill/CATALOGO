export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] px-9 py-3.5 flex items-center justify-between backdrop-blur-xl border-b border-brand-blue/20" style={{ background: "rgba(7,17,31,0.92)" }}>
      <div className="flex items-center gap-3.5">
        <div className="h-[34px] px-3 flex items-center font-display text-xl tracking-widest text-white border border-brand-blue/40 rounded">
          DSR
        </div>
        <div className="w-px h-[26px] bg-brand-blue/50" />
        <img
          src="https://cdn.prod.website-files.com/67a512ae2e2cf2d14d55b83b/67a573e2df1a27d6e6b5f927_baly-logo.svg"
          alt="Baly"
          className="h-5 object-contain opacity-65"
          style={{ filter: "brightness(0) invert(1)" }}
        />
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
