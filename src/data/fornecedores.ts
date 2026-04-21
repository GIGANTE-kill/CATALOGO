import capaCatalogo from "@/assets/capa-catalogo.png";
import paginaInteira from "@/assets/anuncio-pagina-inteira.png";
import meiaPagina from "@/assets/anuncio-meia-pagina.png";
import umQuarto from "@/assets/anuncio-um-quarto.png";

export type FornecedorData = {
  nome: string;
  capa: string;
  anuncioPaginaInteira: string;
  anuncioMeiaPagina: string;
  anuncioUmQuarto: string;
};

// Default (raiz) — DSR genérico
export const defaultFornecedor: FornecedorData = {
  nome: "DSR",
  capa: capaCatalogo,
  anuncioPaginaInteira: paginaInteira,
  anuncioMeiaPagina: meiaPagina,
  anuncioUmQuarto: umQuarto,
};

// Para trocar por fornecedor, basta substituir os arquivos
// em src/assets/fornecedores/<nome>/ e importar aqui.
export const fornecedores: Record<string, FornecedorData> = {
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
