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
          A <span className="text-brand-red">DSR</span> leva sua marca <span className="text-white">a cada ponto de venda da nossa área de atuação</span>.
        </p>
        <div className="mt-10 text-brand-muted text-sm uppercase tracking-[0.3em] font-condensed">
          — Proposta de parceria DSR · 2026
        </div>
      </div>
    </section>
  );
}
