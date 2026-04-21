import { useCountUp } from "./useCountUp";
import { Reveal, RevealItem } from "./Reveal";

type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  highlight?: boolean;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  {
    value: 9000,
    prefix: "+",
    suffix: "",
    label: "ALCANCE DIRETO",
    sub: "Clientes ativos impactados diretamente no momento do pedido.",
  },
  {
    value: 94,
    suffix: "%",
    label: "DOMÍNIO TERRITORIAL",
    sub: "De cobertura em todo o estado da Bahia, chegando onde o digital não alcança.",
  },
  {
    value: 2,
    suffix: " ANOS",
    highlight: true,
    label: "CICLO DE VIDA",
    sub: "De exposição garantida. Um único investimento para 24 meses de visibilidade no PDV.",
  },
  {
    value: 100,
    suffix: "%",
    label: "CONVERSÃO EM CAMPO",
    sub: "Do time de vendas utiliza o catálogo como guia obrigatório em cada visita.",
  },
];

function formatNumber(n: number) {
  return n >= 1000 ? n.toLocaleString("pt-BR") : String(n);
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div
      ref={ref}
      className="group relative bg-bg p-10 hover:-translate-y-1 transition-transform h-full flex flex-col"
    >
      <div
        className={`font-display text-6xl md:text-7xl leading-none ${
          stat.highlight ? "text-brand-red" : "text-white"
        }`}
      >
        {stat.prefix ?? ""}
        {formatNumber(Math.round(value))}
        {stat.suffix}
      </div>
      <div className="text-white/90 text-xs uppercase tracking-[0.25em] mt-6 font-condensed min-h-[2.75rem]">
        {stat.label}
      </div>
      <div className="text-white/50 text-sm mt-2 font-light leading-relaxed">
        {stat.sub}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="numeros" className="py-24 px-8 bg-bg2">
      <div className="max-w-[1400px] mx-auto">
        <Reveal variant="fade-up">
          <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl mb-12 leading-[0.9]">
            NOSSOS NÚMEROS,<br /><span className="text-brand-red">SEU RESULTADO</span>
          </h2>
        </Reveal>
        <Reveal stagger staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {stats.map((s) => (
            <RevealItem key={s.label} variant="zoom-in" className="h-full">
              <StatCard stat={s} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
