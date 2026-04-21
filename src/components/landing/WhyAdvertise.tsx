import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "⚡", title: "Presença no ponto de decisão", text: "Sua marca aparece exatamente onde o lojista decide o próximo pedido." },
  { icon: "🎯", title: "Segmentação sem desperdício", text: "100% dos leitores são compradores de bebida — zero verba jogada fora." },
  { icon: "🏆", title: "Associação de marca líder", text: "Anuncie ao lado das maiores marcas do mercado de bebidas." },
  { icon: "📊", title: "Relatório de resultado", text: "Receba métricas reais de impacto da sua campanha." },
];

const channels = [
  { name: "Mercadinhos", value: 92, color: "var(--brand-gold)" },
  { name: "Conveniências", value: 85, color: "var(--brand-red)" },
  { name: "Bares", value: 78, color: "var(--brand-blue)" },
  { name: "Supermercados", value: 65, color: "var(--brand-blue)" },
  { name: "Atacarejos", value: 55, color: "var(--brand-blue)" },
];

function Bars() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && setShow(true));
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="space-y-5 mt-8">
      {channels.map((c) => (
        <div key={c.name}>
          <div className="flex justify-between mb-2 font-condensed font-bold uppercase text-sm tracking-widest">
            <span>{c.name}</span>
            <span style={{ color: c.color }}>{c.value}%</span>
          </div>
          <div className="h-2 bg-bg3 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-[width] duration-1000 ease-out"
              style={{ width: show ? `${c.value}%` : "0%", background: c.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WhyAdvertise() {
  return (
    <section className="py-24 px-8 bg-bg">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div>
          <h2 className="reveal font-display text-white text-5xl sm:text-6xl md:text-7xl mb-10 leading-[0.9]">
            SUA LATA<br />EM CADA<br /><span className="text-brand-red">PÁGINA</span>
          </h2>
          <div className="space-y-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="reveal group flex gap-4 p-5 bg-bg2 border-l-4 border-brand-blue hover:border-brand-gold hover:translate-x-1 transition-all"
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

        {/* RIGHT */}
        <div>
          <h3 className="font-display text-2xl text-white mb-3 tracking-widest uppercase">
            Onde a Baly já é forte
          </h3>
          <Bars />
        </div>
      </div>
    </section>
  );
}
