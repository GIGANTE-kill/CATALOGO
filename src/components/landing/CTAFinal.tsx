import { Reveal } from "./Reveal";

export function CTAFinal() {
  return (
    <section
      id="cta"
      className="py-32 px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal variant="zoom-in" duration={0.9}>
          <h2 className="font-display text-white text-7xl sm:text-8xl md:text-9xl leading-[0.85]">
            VAMOS<br />
            <span className="text-brand-red">FECHAR</span>
            <span className="text-white">?</span>
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={0.2}>
          <p className="text-brand-muted text-lg mt-6 max-w-2xl mx-auto">
            A próxima edição já está em produção. Garanta agora a sua posição no catálogo que move o varejo da nossa área de atuação.
          </p>
        </Reveal>
        <Reveal variant="fade-up" delay={0.35} className="flex flex-wrap gap-4 justify-center mt-10">
          <a
            href="#"
            className="bg-brand-red text-white px-8 py-4 rounded font-bold tracking-wider text-sm hover:-translate-y-0.5 transition-transform"
          >
            FALAR COM A EQUIPE DSR →
          </a>
          <a
            href="#"
            className="border-2 border-brand-blue text-white px-8 py-4 rounded font-bold tracking-wider text-sm hover:bg-brand-blue/20 transition-colors"
          >
            WHATSAPP DIRETO ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
