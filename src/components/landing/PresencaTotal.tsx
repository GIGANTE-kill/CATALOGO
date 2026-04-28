import { Reveal, RevealItem } from "./Reveal";

const pillars = [
  {
    tag: "IMPRESSO",
    title: "VITRINE FÍSICA NO PDV",
    desc: "A ferramenta de campo que nosso vendedor leva em mãos para 9.000 clientes. Uma vitrine física constante no ponto de venda.",
    metric: "9.000",
    metricLabel: "CLIENTES IMPACTADOS",
  },
  {
    tag: "DIGITAL INTERATIVO",
    title: "DISPONÍVEL 24H NO SITE",
    desc: "Diferente do papel, o digital é atualizado em tempo real para acompanhar suas estratégias de preço e estoque.",
    metric: "24h",
    metricLabel: "SEMPRE ATIVO",
    highlight: true,
  },
];

export function PresencaTotal() {
  return (
    <section className="relative py-24 px-8 bg-bg2 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 mb-16 items-end">
          <Reveal variant="fade-right">
            <div className="font-display text-brand-red text-xs tracking-[0.3em] mb-4">
              PRESENÇA TOTAL
            </div>
            <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              FÍSICO <span className="text-brand-red">+</span> DIGITAL
            </h2>
          </Reveal>
          <Reveal variant="fade-left" delay={0.15}>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              O catálogo que não sai da mão (e da tela) do seu cliente. Sua marca presente
              no exato momento em que o pedido acontece — seja no balcão com nosso vendedor
              ou no clique do nosso e-commerce.
            </p>
          </Reveal>
        </div>

        <Reveal stagger staggerDelay={0.18} className="grid md:grid-cols-2 gap-6">
          {pillars.map((p) => (
            <RevealItem
              key={p.tag}
              variant="zoom-in"
              className={`relative rounded-2xl p-10 md:p-12 border backdrop-blur-xl ${
                p.highlight
                  ? "bg-white/[0.06] border-brand-red/40"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div
                className={`font-display text-xs tracking-[0.3em] ${
                  p.highlight ? "text-brand-red" : "text-white/40"
                }`}
              >
                {p.tag}
              </div>
              <h3 className="mt-3 font-display text-white text-3xl md:text-4xl tracking-wide">
                {p.title}
              </h3>
              <p className="mt-6 text-white/60 text-base leading-relaxed font-light">
                {p.desc}
              </p>
              <div className="mt-10 pt-6 border-t border-white/10 flex items-baseline justify-between">
                <span className="font-display text-white/40 text-xs tracking-[0.25em]">
                  {p.metricLabel}
                </span>
                <span
                  className={`font-display text-3xl md:text-4xl ${
                    p.highlight ? "text-brand-red" : "text-white"
                  }`}
                >
                  {p.metric}
                </span>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
