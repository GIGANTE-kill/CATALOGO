import { Reveal, RevealItem } from "./Reveal";
import { PromoVideo } from "./PromoVideo";

const pillars = [
  {
    number: "01",
    title: "PRESENÇA NO MOMENTO DA DECISÃO",
    text: "Seu anúncio posicionado exatamente na hora em que o lojista decide o que comprar. É o suporte visual que o nosso vendedor precisa para fechar o seu volume.",
  },
  {
    number: "02",
    title: "AUDIÊNCIA QUALIFICADA",
    highlight: "+9.000",
    highlightLabel: "COMPRADORES ATIVOS",
    text: "Impacto direto em uma base de 9.000 clientes ativos. Não é panfletagem; é exposição direta para quem tem o poder da caneta.",
  },
  {
    number: "03",
    title: "DOMÍNIO TERRITORIAL",
    highlight: "94%",
    highlightLabel: "DOS MUNICÍPIOS BAIANOS",
    text: "Sua marca presente em 94% dos municípios baianos. Garantimos que sua comunicação chegue onde a venda acontece, do grande centro ao interior.",
  },
  {
    number: "04",
    title: "INVESTIMENTO DE LONGO PRAZO",
    highlight: "2 ANOS",
    highlightLabel: "DE EXPOSIÇÃO CONTÍNUA",
    text: "Um único investimento com 24 meses de exposição. O catálogo acompanha o ciclo de vendas do nosso time por dois anos, garantindo o menor custo por impacto do mercado.",
  },
];

export function WhyAdvertise() {
  return (
    <section className="py-24 px-8 bg-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 mb-16 items-end">
          <Reveal variant="fade-right">
            <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              SUA MARCA<br />
              GUIANDO O PEDIDO<br />
              NO <span className="text-brand-red">PONTO DE VENDA</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-left" delay={0.15}>
            <p className="text-brand-muted text-base md:text-lg leading-relaxed font-light">
              O Catálogo DSR não é apenas um material de consulta; é a principal ferramenta de
              campo do nosso time. Ele entra em cada loja, é aberto em cada balcão e direciona a
              decisão de compra de milhares de varejistas.
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="grid md:grid-cols-2 gap-px bg-white/5">
          {pillars.map((p) => (
            <RevealItem
              key={p.number}
              variant="fade-up"
              className="group bg-bg p-8 md:p-10 hover:bg-bg2 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-display text-white/20 text-2xl tracking-wider">
                  {p.number}
                </span>
                <div className="h-px flex-1 bg-white/10 mx-4" />
                <span className="font-display text-brand-red text-xs tracking-[0.3em]">
                  PILAR
                </span>
              </div>

              <h3 className="font-display text-white text-2xl md:text-3xl tracking-wide mb-3">
                {p.title}
              </h3>

              {p.highlight && (
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-display text-brand-red text-4xl md:text-5xl leading-none">
                    {p.highlight}
                  </span>
                  <span className="font-display text-white/60 text-xs tracking-[0.2em]">
                    {p.highlightLabel}
                  </span>
                </div>
              )}

              <p className="text-brand-muted text-sm md:text-base leading-relaxed font-light">
                {p.text}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal variant="scale-in" delay={0.1} className="mt-16 max-w-3xl mx-auto text-center border-l-2 border-brand-red pl-6 md:border-l-0 md:border-t-2 md:pl-0 md:pt-8">
          <p className="font-display text-white text-2xl md:text-3xl leading-tight tracking-wide">
            "Diferente de um anúncio de revista que o cliente lê e joga fora, o nosso catálogo é a{" "}
            <span className="text-brand-red">bíblia de vendas</span> do nosso consultor. Estar
            nele é garantir que o nosso time vende a sua marca em cada visita."
          </p>
        </Reveal>

        {/* Promo Video — desktop only, abaixo da frase */}
        <Reveal variant="fade-up" delay={0.2} className="hidden md:block mt-12 max-w-md mx-auto">
          <PromoVideo storageKey="promo-video-time-desktop" />
        </Reveal>
      </div>
    </section>
  );
}
