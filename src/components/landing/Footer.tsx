import logoDsr from "@/assets/logo-dsr.png";

export function Footer() {
  return (
    <footer className="py-10 px-8 border-t border-brand-blue/20 bg-bg">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logoDsr} alt="Distribuidora São Roque" className="h-25 md:h-10 object-contain" />
        </div>
        <div className="text-brand-muted text-xs font-condensed uppercase tracking-widest text-center md:text-right">
          Distribuidora São Roque · Catálogo de Anúncios 2026
        </div>
      </div>
    </footer>
  );
}
