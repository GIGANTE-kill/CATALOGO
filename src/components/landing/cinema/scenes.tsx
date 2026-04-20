import paginaInteira from "@/assets/anuncio-pagina-inteira.png";
import meiaPagina from "@/assets/anuncio-meia-pagina.png";
import umQuarto from "@/assets/anuncio-um-quarto.png";

export type Scene = {
  kicker: string;
  kickerColor: string;
  title: React.ReactNode;
  text: string;
  extra: React.ReactNode;
  image: string;
  imageAlt: string;
  glow: string;
  rotate: number;
  scale: number;
};

export const scenes: Scene[] = [
  {
    kicker: "Formato premium",
    kickerColor: "var(--brand-red)",
    title: <>PÁGINA<br /><span className="text-brand-red">INTEIRA</span></>,
    text: "Domínio visual absoluto. Sua marca ocupa toda a página do catálogo, sem concorrência por atenção. Ideal para lançamentos e campanhas de impacto.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-red">100%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página para sua marca</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-gold">MAX</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Impacto visual</div>
        </div>
      </div>
    ),
    image: paginaInteira,
    imageAlt: "Anúncio página inteira no catálogo DSR",
    glow: "rgba(224,30,43,0.6)",
    rotate: 2,
    scale: 1,
  },
  {
    kicker: "Formato equilibrado",
    kickerColor: "var(--brand-gold)",
    title: <>MEIA<br /><span className="text-brand-gold">PÁGINA</span></>,
    text: "Excelente custo-benefício com forte presença. Espaço suficiente para destacar produto, preço e chamada — divide a página com conteúdo editorial relevante.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-gold">50%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página em destaque</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-blue">★★★</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Custo-benefício</div>
        </div>
      </div>
    ),
    image: meiaPagina,
    imageAlt: "Anúncio meia página no catálogo DSR",
    glow: "rgba(255,214,0,0.6)",
    rotate: -4,
    scale: 1.02,
  },
  {
    kicker: "Formato estratégico",
    kickerColor: "var(--brand-blue)",
    title: <>UM QUARTO<br />DE <span className="text-brand-red">PÁGINA</span></>,
    text: "Entrada inteligente no catálogo. Posicionamento estratégico para reforço de marca, sazonais e ofertas pontuais — presença garantida com investimento enxuto.",
    extra: (
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <div className="font-display text-6xl text-brand-blue">25%</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Da página, alto giro</div>
        </div>
        <div>
          <div className="font-display text-6xl text-brand-red">$</div>
          <div className="text-brand-muted text-xs uppercase tracking-widest mt-1">Entrada acessível</div>
        </div>
      </div>
    ),
    image: umQuarto,
    imageAlt: "Anúncio um quarto de página no catálogo DSR",
    glow: "rgba(28,63,143,0.7)",
    rotate: 4,
    scale: 0.98,
  },
];
