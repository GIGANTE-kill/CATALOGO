import logoDsr from "@/assets/logo-dsr.png";

export function Footer() {
  return (
    <footer className="py-10 px-8 border-t border-brand-blue/20 bg-bg">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logoDsr} alt="Distribuidora São Roque" className="h-20 md:h-20 object-contain" />
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="text-brand-muted text-xs font-condensed uppercase tracking-widest text-center md:text-right">
            Distribuidora São Roque · Catálogo de Produtos 2026
          </div>
          <div className="text-[10px] text-brand-muted/50 max-w-[300px] text-center md:text-right leading-tight">
            * Imagens meramente ilustrativas. O resultado final pode variar de acordo com a edição.
          </div>
        </div>
      </div>
    </footer>
  );
}
