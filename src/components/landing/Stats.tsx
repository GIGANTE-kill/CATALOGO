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
    value: 77,
    suffix: "%",
    label: "DECISÃO NO FÍSICO",
    sub: "Dos lojistas decidem o estoque baseados em materiais físicos como o catálogo.",
  },
  {
    value: 2.5,
    suffix: "x",
    highlight: true,
    label: "TICKET MÉDIO",
    sub: "É quanto o uso do catálogo aumenta o volume de compra por pedido.",
  },
  {
    value: 24,
    suffix: "h",
    label: "E-COMMERCE INTEGRADO",
    sub: "Catálogo virtual integrado ao nosso e-commerce, facilitando o pedido imediato.",
  },
];

function formatNumber(n: number, isDecimal: boolean) {
  if (isDecimal) return n.toFixed(1).replace(".", ",");
  return n >= 1000 ? Math.round(n).toLocaleString("pt-BR") : String(Math.round(n));
}

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);
  const isDecimal = !Number.isInteger(stat.value);
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
        {formatNumber(value, isDecimal)}
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
