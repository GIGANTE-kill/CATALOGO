export type FornecedorData = {
  nome: string;
  logo: string;
  capa: string;
  anuncioPaginaInteira: string;
  anuncioMeiaPagina: string;
  anuncioUmQuarto: string;
};

// Mapa de fornecedores buscando da pasta /public/fornecedores/...
export const fornecedores: Record<string, FornecedorData> = {
  baly: {
    nome: "Baly",
    logo: "/fornecedores/baly/logo.png",
    capa: "/fornecedores/baly/capa.png",
    anuncioPaginaInteira: "/fornecedores/baly/inteira.png",
    anuncioMeiaPagina: "/fornecedores/baly/meia.png",
    anuncioUmQuarto: "/fornecedores/baly/quarto.png",
  },
  unilever: {
    nome: "Unilever",
    logo: "/fornecedores/unilever/logo.png",
    capa: "/fornecedores/unilever/capa.png",
    anuncioPaginaInteira: "/fornecedores/unilever/inteira.png",
    anuncioMeiaPagina: "/fornecedores/unilever/meia.png",
    anuncioUmQuarto: "/fornecedores/unilever/quarto.png",
  },
  loreal: {
    nome: "L'Oréal",
    logo: "/fornecedores/loreal/logo.png",
    capa: "/fornecedores/loreal/capa.png",
    anuncioPaginaInteira: "/fornecedores/loreal/inteira.png",
    anuncioMeiaPagina: "/fornecedores/loreal/meia.png",
    anuncioUmQuarto: "/fornecedores/loreal/quarto.png",
  },
  colgate: {
    nome: "Colgate",
    logo: "/fornecedores/colgate/logo.png",
    capa: "/fornecedores/colgate/capa.png",
    anuncioPaginaInteira: "/fornecedores/colgate/inteira.png",
    anuncioMeiaPagina: "/fornecedores/colgate/meia.png",
    anuncioUmQuarto: "/fornecedores/colgate/quarto.png",
  },
  palmolive: {
    nome: "Palmolive",
    logo: "/fornecedores/palmolive/logo.png",
    capa: "/fornecedores/palmolive/capa.png",
    anuncioPaginaInteira: "/fornecedores/palmolive/inteira.png",
    anuncioMeiaPagina: "/fornecedores/palmolive/meia.png",
    anuncioUmQuarto: "/fornecedores/palmolive/quarto.png",
  },
  raymundo: {
    nome: "Raymundo",
    logo: "/fornecedores/raymundo/logo.png",
    capa: "/fornecedores/raymundo/capa.png",
    anuncioPaginaInteira: "/fornecedores/raymundo/inteira.png",
    anuncioMeiaPagina: "/fornecedores/raymundo/meia.png",
    anuncioUmQuarto: "/fornecedores/raymundo/quarto.png",
  },
  dsr: {
    nome: "DSR",
    logo: "/fornecedores/dsr/logo.png",
    capa: "/fornecedores/dsr/capa.png",
    anuncioPaginaInteira: "/fornecedores/dsr/inteira.png",
    anuncioMeiaPagina: "/fornecedores/dsr/meia.png",
    anuncioUmQuarto: "/fornecedores/dsr/quarto.png",
  },
};

export const defaultFornecedor = fornecedores.dsr;
