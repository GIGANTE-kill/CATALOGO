const features = [
  { icon: "⚡", title: "Presença no ponto de decisão", text: "Sua marca aparece exatamente onde o lojista decide o próximo pedido." },
  { icon: "🎯", title: "Segmentação sem desperdício", text: "100% dos leitores são compradores ativos — zero verba jogada fora." },
  { icon: "🏆", title: "Associação de marca líder", text: "Anuncie ao lado das maiores marcas do mercado." },
  { icon: "📊", title: "Relatório de resultado", text: "Receba métricas reais de impacto da sua campanha." },
];

export function WhyAdvertise() {
  return (
    <section className="py-24 px-8 bg-bg">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="reveal font-display text-white text-5xl sm:text-6xl md:text-7xl mb-10 leading-[0.9]">
          SUA LATA<br />EM CADA<br /><span className="text-brand-red">PÁGINA</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="reveal group flex gap-4 p-5 bg-bg2 border-l-4 border-brand-blue hover:border-white hover:translate-x-1 transition-all"
            >
              <div className="text-3xl">{f.icon}</div>
              <div>
                <div className="font-display text-white text-2xl tracking-wide">{f.title}</div>
                <div className="text-brand-muted text-sm mt-1">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
