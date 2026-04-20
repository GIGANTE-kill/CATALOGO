import { useCountUp } from "./useCountUp";

type Stat = { value: number; suffix: string; color: string; label: string };

const stats: Stat[] = [
  { value: 12, suffix: "K+", color: "text-brand-red", label: "Pontos de Venda ativos" },
  { value: 4, suffix: " EST", color: "text-brand-blue", label: "Estados cobertos" },
  { value: 48, suffix: "K", color: "text-brand-gold", label: "Exemplares por edição" },
  { value: 3, suffix: "×", color: "text-brand-blue", label: "Edições por ano" },
];

function StatCard({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div
      ref={ref}
      className="group relative bg-bg p-10 border-l-4 border-brand-blue hover:-translate-y-1 transition-transform"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      <div className={`font-display text-7xl ${stat.color}`}>
        {Math.round(value)}{stat.suffix}
      </div>
      <div className="text-brand-muted text-sm uppercase tracking-widest mt-3 font-condensed">
        {stat.label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="numeros" className="py-24 px-8 bg-bg2">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="reveal font-display text-white text-5xl sm:text-6xl md:text-7xl mb-12 leading-[0.9]">
          NÚMEROS QUE<br /><span className="text-brand-red">CONVENCEM</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-bg3">
          {stats.map((s) => <StatCard key={s.label} stat={s} />)}
        </div>
      </div>
    </section>
  );
}
