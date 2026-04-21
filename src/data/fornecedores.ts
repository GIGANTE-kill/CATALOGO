import capaCatalogo from "@/assets/capa-catalogo.png";
import paginaInteira from "@/assets/anuncio-pagina-inteira.png";
import meiaPagina from "@/assets/anuncio-meia-pagina.png";
import umQuarto from "@/assets/anuncio-um-quarto.png";
import logoBaly from "@/assets/logo-baly.png";

export type FornecedorData = {
  nome: string;
  logo?: string; // logo do fornecedor exibido na Navbar (opcional)
  capa: string;
  anuncioPaginaInteira: string;
  anuncioMeiaPagina: string;
  anuncioUmQuarto: string;
};

// Default (raiz) — DSR genérico, sem logo de fornecedor
export const defaultFornecedor: FornecedorData = {
  nome: "DSR",
  capa: capaCatalogo,
  anuncioPaginaInteira: paginaInteira,
  anuncioMeiaPagina: meiaPagina,
  anuncioUmQuarto: umQuarto,
};

// Para adicionar novo fornecedor: coloque imagens em src/assets/ e mapeie aqui.
export const fornecedores: Record<string, FornecedorData> = {
  baly: {
    nome: "Baly",
    logo: logoBaly,
    capa: capaCatalogo,
    anuncioPaginaInteira: paginaInteira,
    anuncioMeiaPagina: meiaPagina,
    anuncioUmQuarto: umQuarto,
  },
  unilever: {
    nome: "Unilever",
    capa: capaCatalogo,
    anuncioPaginaInteira: paginaInteira,
    anuncioMeiaPagina: meiaPagina,
    anuncioUmQuarto: umQuarto,
  },
  loreal: {
    nome: "L'Oréal",
    capa: capaCatalogo,
    anuncioPaginaInteira: paginaInteira,
    anuncioMeiaPagina: meiaPagina,
    anuncioUmQuarto: umQuarto,
  },
};
