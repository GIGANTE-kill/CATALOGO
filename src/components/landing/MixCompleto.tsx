import { Reveal } from "./Reveal";

export function MixCompleto() {
  return (
    <section className="relative py-24 px-8 bg-bg overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(224,30,43,0.25) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <Reveal variant="fade-right">
            <div className="font-display text-brand-red text-xs tracking-[0.3em] mb-4">
              OPORTUNIDADE EXCLUSIVA
            </div>
            <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl leading-[0.9]">
              ANUNCIE E GARANTA<br />
              SEU MIX <span className="text-brand-red">100% VISÍVEL</span>
            </h2>
            <p className="mt-8 text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
              Na DSR, quem investe em anúncio ganha prioridade total. Enquanto outros
              pagam por item, você domina o catálogo com sua linha completa e um anúncio
              de impacto.
            </p>
          </Reveal>

          <Reveal variant="fade-left" delay={0.15}>
            <div className="relative rounded-2xl border border-brand-red/30 bg-white/[0.04] backdrop-blur-xl p-10 md:p-12">
              <div className="absolute top-6 right-6 font-display text-brand-red text-xs tracking-[0.3em]">
                INCLUSO
              </div>
              <div className="font-display text-white/40 text-xs tracking-[0.3em]">
                EXPOSIÇÃO COMPLETA
              </div>
              <div className="mt-4 font-display text-white text-5xl md:text-6xl leading-none">
                100<span className="text-brand-red">%</span>
              </div>
              <p className="mt-6 text-white/70 text-base leading-relaxed font-light">
                Ao contratar um anúncio, <span className="text-white font-medium">100% do seu mix de produtos é divulgado sem custo adicional</span> — linha completa visível em todos os canais.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-6">
                <div>
                  <div className="font-display text-brand-red text-2xl">✓</div>
                  <div className="mt-2 text-white/80 text-sm font-light">Linha completa no catálogo físico</div>
                </div>
                <div>
                  <div className="font-display text-brand-red text-2xl">✓</div>
                  <div className="mt-2 text-white/80 text-sm font-light">Mix 100% no e-commerce DSR</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
