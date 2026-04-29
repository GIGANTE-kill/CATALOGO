import { CanPlaceholder } from "./CanPlaceholder";
import { PromoVideo } from "./PromoVideo";
import heroBg from "@/assets/hero-bg.png";

type HeroProps = { capaImage?: string };

export function Hero({ capaImage }: HeroProps = {}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 pt-[100px] pb-[60px] bg-bg"
    >
      {/* Gradient background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      {/* Dark vignette overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,15,30,0.35) 0%, rgba(10,15,30,0.85) 100%)",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #E01E2B, #FFD600, #E01E2B, transparent)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />

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

      <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-center md:items-stretch">
        {/* LEFT */}
        <div className="contents md:block md:space-y-7">
          <div className="reveal order-1 md:order-none inline-flex self-start items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-xs font-bold tracking-widest font-condensed uppercase">
            ★ Proposta exclusiva
          </div>

          <h1 className="reveal order-2 md:order-none font-display text-white leading-[0.85] text-7xl sm:text-8xl md:text-8xl lg:text-9xl" style={{ transitionDelay: "0.1s" }}>
            SUA MARCA<br />
            NO <span className="text-brand-red">CATÁLOGO</span><br />
            QUE VENDE
          </h1>

          <p className="reveal order-5 md:order-none text-brand-muted text-base md:text-lg max-w-xl leading-relaxed font-light" style={{ transitionDelay: "0.2s" }}>
            A Distribuidora São Roque conecta seus produtos a milhares de pontos de venda estratégicos. Garanta visibilidade máxima e destaque sua marca exatamente onde o varejista toma a decisão de abastecimento.
          </p>


          <div className="reveal order-6 md:order-none pt-4 hidden md:flex flex-wrap gap-4" style={{ transitionDelay: "0.3s" }}>
            <a
              href="#pacotes"
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-brand-red text-white font-display font-black tracking-[0.25em] text-2xl md:text-3xl rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(224,30,43,0.5)] border-2 border-brand-red/20"
            >
              💰 VER INVESTIMENTOS
            </a>
          </div>

          <div className="reveal order-7 md:order-none pt-2 md:pt-8 flex items-center gap-3 text-brand-muted text-xs font-condensed tracking-widest uppercase" style={{ transitionDelay: "0.5s" }}>
            <span>Ou role para descobrir</span>
            <div className="flex flex-col animate-scroll-hint">
              <span>↓</span>
            </div>
          </div>
        </div>

        {/* RIGHT - Catálogo */}
        <div className="order-3 md:order-none flex justify-center items-center relative reveal" style={{ transitionDelay: "0.4s" }}>
          <div
            className="absolute bottom-0 left-1/2 w-[300px] h-[80px] rounded-full animate-glow-pulse"
            style={{
              background: "rgba(224,30,43,0.5)",
              filter: "blur(60px)",
            }}
          />
          <CanPlaceholder className="animate-can relative z-10" image={capaImage} />
        </div>

        {/* Promo Video — mobile only, abaixo do catálogo */}
        <div className="order-4 md:hidden w-full max-w-sm mx-auto reveal" style={{ transitionDelay: "0.45s" }}>
          <PromoVideo storageKey="promo-video-time" />
        </div>
      </div>
    </section>
  );
}
