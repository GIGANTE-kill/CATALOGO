import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { WhyAdvertise } from "@/components/landing/WhyAdvertise";
import { Checklist } from "@/components/landing/Checklist";
import { CinemaScroll } from "@/components/landing/CinemaScroll";
import { Stats } from "@/components/landing/Stats";
import { Quote } from "@/components/landing/Quote";
import { Pacotes } from "@/components/landing/Pacotes";
import { CTAFinal } from "@/components/landing/CTAFinal";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/components/landing/useReveal";
import type { FornecedorData } from "@/data/fornecedores";

type Props = {
  data: FornecedorData;
  fullModules?: boolean;
};

export function FornecedorPage({ data, fullModules = true }: Props) {
  useReveal();

  const images = {
    paginaInteira: data.anuncioPaginaInteira,
    meiaPagina: data.anuncioMeiaPagina,
    umQuarto: data.anuncioUmQuarto,
  };

  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <Navbar fornecedorLogo={data.logo} fornecedorNome={data.nome} />
      <main>
        <Hero capaImage={data.capa} />

        {fullModules ? (
          <>
            <Ticker />
            <WhyAdvertise />
            <Checklist />
            <CinemaScroll images={images} />
            <Stats />
            <Quote />
            <Pacotes images={images} />
            <CTAFinal />
          </>
        ) : (
          <Pacotes images={images} />
        )}
      </main>
      <Footer />
    </div>
  );
}
