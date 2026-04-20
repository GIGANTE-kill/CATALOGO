export function Quote() {
  return (
    <section className="py-32 px-8 bg-bg">
      <div className="max-w-4xl mx-auto text-center relative reveal">
        <div
          className="font-display absolute -top-4 left-1/2 -translate-x-1/2 text-brand-blue/25 select-none"
          style={{ fontSize: 200, lineHeight: 1 }}
        >
          "
        </div>
        <p className="relative font-display text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide">
          A Baly democratizou o energético no Brasil. A <span className="text-brand-red">DSR</span> democratiza a presença da Baly <span className="text-brand-gold">em cada ponto de venda do Nordeste</span>.
        </p>
        <div className="mt-10 text-brand-muted text-sm uppercase tracking-[0.3em] font-condensed">
          — Proposta de parceria DSR × Baly · 2025
        </div>
      </div>
    </section>
  );
}
