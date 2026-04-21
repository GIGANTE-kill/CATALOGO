const items = [
  "Distribuidora estratégica na nossa área de atuação",
  "+12.000 PDVs ativos",
  "Sua marca no ponto de decisão",
  "Catálogo que move o varejo",
  "48K exemplares por edição",
  "Catálogo em 4 estados",
  "Sua marca onde decide a compra",
];

export function Ticker() {
  const list = [...items, ...items];
  return (
    <div className="bg-brand-red overflow-hidden py-5 border-y border-black/20">
      <div className="flex animate-ticker whitespace-nowrap">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 shrink-0">
            <span className="font-condensed font-bold uppercase tracking-[2px] text-white text-lg">
              {item}
            </span>
            <span className="text-white/70 text-xl rotate-45 inline-block">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
