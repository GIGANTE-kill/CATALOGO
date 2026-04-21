import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Pacotes } from "@/components/landing/Pacotes";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/components/landing/useReveal";
import type { FornecedorData } from "@/data/fornecedores";

type Props = { data: FornecedorData };

export function FornecedorPage({ data }: Props) {
  useReveal();
  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <Navbar />
      <main>
        <Hero capaImage={data.capa} />
        <Pacotes
          images={{
            paginaInteira: data.anuncioPaginaInteira,
            meiaPagina: data.anuncioMeiaPagina,
            umQuarto: data.anuncioUmQuarto,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
