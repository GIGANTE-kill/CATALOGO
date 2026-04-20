const items = [
  "Maior distribuidora do Nordeste",
  "+12.000 PDVs ativos",
  "Baly #1 em energéticos no Brasil",
  "26% de market share nacional",
  "50% crescimento ao ano",
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
            <span className="text-brand-gold text-xl rotate-45 inline-block">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
