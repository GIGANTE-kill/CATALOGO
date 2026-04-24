import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { WhyAdvertise } from "@/components/landing/WhyAdvertise";
import { Checklist } from "@/components/landing/Checklist";
import { PresencaTotal } from "@/components/landing/PresencaTotal";
import { CinemaScroll } from "@/components/landing/CinemaScroll";
import { MixCompleto } from "@/components/landing/MixCompleto";
import { Stats } from "@/components/landing/Stats";
import { Pacotes } from "@/components/landing/Pacotes";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/components/landing/useReveal";
import { useFornecedor } from "@/hooks/useFornecedor";

export function FornecedorPage() {
  useReveal();
  const { data, isDefault } = useFornecedor();
  const fullModules = !isDefault;

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
            <PresencaTotal />
            <CinemaScroll images={images} />
            <MixCompleto />
            <Stats />
            <Pacotes images={images} />
          </>
        ) : (
          <Pacotes images={images} />
        )}
      </main>
      <Footer />
    </div>
  );
}
