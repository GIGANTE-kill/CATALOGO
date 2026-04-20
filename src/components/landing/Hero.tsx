import { CanPlaceholder } from "./CanPlaceholder";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-8 pt-[100px] pb-[60px]"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #E01E2B, #FFD600, #E01E2B, transparent)",
        }}
      />
      <div className="absolute inset-0 grid-bg" />

      {/* Orbs */}
      <div
        className="absolute rounded-full pointer-events-none animate-orb"
        style={{
          width: 600, height: 600,
          background: "rgba(28,63,143,0.18)", filter: "blur(100px)",
          top: -180, right: -150,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-orb"
        style={{
          width: 500, height: 500,
          background: "rgba(224,30,43,0.15)", filter: "blur(100px)",
          bottom: -150, left: -120, animationDelay: "2s",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-orb"
        style={{
          width: 400, height: 400,
          background: "rgba(255,214,0,0.08)", filter: "blur(100px)",
          top: "40%", left: "40%", animationDelay: "4s",
        }}
      />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-7">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/40 bg-brand-gold/5 text-brand-gold text-xs font-bold tracking-widest font-condensed uppercase">
            ★ Proposta exclusiva · DSR × Baly · 2025
          </div>

          <h1 className="reveal font-display text-white leading-[0.85] text-6xl sm:text-7xl md:text-8xl lg:text-9xl" style={{ transitionDelay: "0.1s" }}>
            SUA MARCA<br />
            NO <span className="text-brand-red">CATÁLOGO</span><br />
            QUE <span className="text-brand-gold">VENDE</span>
          </h1>

          <p className="reveal text-brand-muted text-lg max-w-xl leading-relaxed" style={{ transitionDelay: "0.2s" }}>
            A Distribuidora São Roque conecta a Baly a milhares de pontos de venda em todo o Nordeste — presença visual garantida onde a decisão de compra acontece.
          </p>

          <div className="reveal flex flex-wrap gap-4" style={{ transitionDelay: "0.3s" }}>
            <a
              href="#pacotes"
              className="bg-brand-red text-white px-7 py-4 rounded font-bold tracking-wider text-sm hover:-translate-y-0.5 transition-transform"
            >
              VER PACOTES DE ANÚNCIO →
            </a>
            <a
              href="#numeros"
              className="border-2 border-brand-blue text-white px-7 py-4 rounded font-bold tracking-wider text-sm hover:bg-brand-blue/20 transition-colors"
            >
              DESCOBRIR MAIS
            </a>
          </div>

          <div className="reveal pt-8 flex items-center gap-3 text-brand-muted text-xs font-condensed tracking-widest uppercase" style={{ transitionDelay: "0.5s" }}>
            <span>Role para descobrir</span>
            <div className="flex flex-col animate-scroll-hint">
              <span>↓</span>
            </div>
          </div>
        </div>

        {/* RIGHT - Can */}
        <div className="hidden md:flex justify-center items-center relative reveal" style={{ transitionDelay: "0.4s" }}>
          <div
            className="absolute bottom-0 left-1/2 w-[300px] h-[80px] rounded-full animate-glow-pulse"
            style={{
              background: "rgba(224,30,43,0.5)",
              filter: "blur(60px)",
            }}
          />
          <CanPlaceholder className="animate-can relative z-10" />
        </div>
      </div>
    </section>
  );
}
