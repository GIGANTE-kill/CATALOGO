export type FornecedorData = {
  nome: string;
  logo: string;
  capa: string;
  anuncioPaginaInteira: string;
  anuncioMeiaPagina: string;
  anuncioUmQuarto: string;
};

/**
 * Gera os dados do fornecedor dinamicamente com base no slug.
 * Segue o padrão de arquivos na pasta /public/fornecedores/[slug]/
 */
export const getFornecedorData = (slug?: string): FornecedorData => {
  const normalizedSlug = (slug || "dsr").toLowerCase();
  
  // Nomes formatados para fornecedores conhecidos
  const nomesEspeciais: Record<string, string> = {
    dsr: "DSR",
    baly: "Baly",
    loreal: "L'Oréal",
    unilever: "Unilever",
    colgate: "Colgate",
    palmolive: "Palmolive",
    raymundo: "Raymundo",
    baruel: "Baruel",
    bombril: "Bombril",
    pergola: "Pérgola",
    assim: "Assim",
    renata:"Renata",
    santher: "Santher",
    salon_line: "Salon Line",
    don_vitorio:"Dom Vitório",
    };

  const nome = nomesEspeciais[normalizedSlug] || normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1);

  return {
    nome,
    logo: `/fornecedores/${normalizedSlug}/logo.png`,
    capa: `/fornecedores/${normalizedSlug}/capa.png`,
    anuncioPaginaInteira: `/fornecedores/${normalizedSlug}/inteira.png`,
    anuncioMeiaPagina: `/fornecedores/${normalizedSlug}/meia.png`,
    anuncioUmQuarto: `/fornecedores/${normalizedSlug}/quarto.png`,
  };
};

export const defaultFornecedor = getFornecedorData("dsr");

