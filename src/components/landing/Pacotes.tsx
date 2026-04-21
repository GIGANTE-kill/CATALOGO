type Pkg = {
  name: string;
  price: string;
  items: { label: string; on: boolean }[];
  highlight?: boolean;
};

const pkgs: Pkg[] = [
  {
    name: "ENTRADA NO CATÁLOGO",
    price: "R$ 2.900",
    items: [
      { label: "1 página simples", on: true },
      { label: "Distribuição em 4 estados", on: true },
      { label: "48K exemplares", on: true },
      { label: "Logo na contracapa", on: true },
      { label: "Página dupla", on: false },
      { label: "Posição premium", on: false },
    ],
  },
  {
    name: "MARCA EM EVIDÊNCIA",
    price: "R$ 5.800",
    highlight: true,
    items: [
      { label: "Página dupla central", on: true },
      { label: "Distribuição em 4 estados", on: true },
      { label: "48K exemplares", on: true },
      { label: "Destaque na capa", on: true },
      { label: "Posição premium garantida", on: true },
      { label: "Relatório de resultado", on: true },
    ],
  },
  {
    name: "MARCA EVERYWHERE",
    price: "R$ 9.500",
    items: [
      { label: "Capa + contracapa + miolo", on: true },
      { label: "Distribuição em 4 estados", on: true },
      { label: "48K exemplares", on: true },
      { label: "Material em PDV", on: true },
      { label: "Ações digitais combinadas", on: true },
      { label: "Atendimento dedicado", on: true },
    ],
  },
];

function Check({ on, highlight }: { on: boolean; highlight?: boolean }) {
  if (on) {
    return (
      <span
        className="w-4 h-4 inline-flex items-center justify-center text-[10px] font-bold rounded-sm shrink-0"
        style={{
          background: highlight ? "var(--brand-red)" : "var(--brand-blue)",

          color: "white",
        }}
      >
        ✓
      </span>
    );
  }
  return <span className="w-4 h-4 inline-block rounded-sm border border-brand-muted/40 shrink-0" />;
}

export function Pacotes() {
  return (
    <section id="pacotes" className="py-24 px-8 bg-bg2">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="reveal font-display text-white text-5xl sm:text-6xl md:text-7xl mb-14 leading-[0.9]">
          ESCOLHA COMO<br /><span className="text-brand-red">APARECER</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pkgs.map((p) => (
            <div
              key={p.name}
              className={`reveal relative bg-bg p-8 border-l-4 hover:-translate-y-1 transition-transform ${
                p.highlight ? "border-brand-red md:scale-105 shadow-[0_20px_60px_-15px_rgba(224,30,43,0.5)]" : "border-brand-blue"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 right-6 bg-white text-bg px-3 py-1 text-xs font-bold uppercase tracking-widest font-condensed rounded">
                  Recomendado
                </div>
              )}
              <h3 className="font-display text-2xl text-white tracking-widest">{p.name}</h3>
              <div className="font-display text-6xl mt-4 text-white">
                {p.price}
              </div>
              <div className="text-brand-muted text-xs uppercase tracking-widest mt-1 font-condensed">
                por edição
              </div>
              <ul className="mt-8 space-y-3">
                {p.items.map((it) => (
                  <li key={it.label} className={`flex items-center gap-3 text-sm ${it.on ? "text-white" : "text-brand-muted/60 line-through"}`}>
                    <Check on={it.on} highlight={p.highlight} />
                    {it.label}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 block text-center py-3 rounded font-bold tracking-wider text-sm transition-all hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-brand-red text-white"
                    : "border-2 border-brand-blue text-white hover:bg-brand-blue/20"
                }`}
              >
                {p.highlight ? "FECHAR PARCERIA →" : "QUERO ESTE"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
