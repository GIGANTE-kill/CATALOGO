export function Footer() {
  return (
    <footer className="py-10 px-8 border-t border-brand-blue/20 bg-bg">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 font-display text-lg tracking-widest text-white border border-brand-blue/40 rounded">
            DSR
          </div>
          <div className="w-px h-6 bg-brand-blue/50" />
          <img
            src="https://cdn.prod.website-files.com/67a512ae2e2cf2d14d55b83b/67a573e2df1a27d6e6b5f927_baly-logo.svg"
            alt="Baly"
            className="h-4 opacity-60"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="text-brand-muted text-xs font-condensed uppercase tracking-widest text-center md:text-right">
          Distribuidora São Roque · Catálogo de Anúncios 2025 · Proposta Baly Energéticos
        </div>
      </div>
    </footer>
  );
}
